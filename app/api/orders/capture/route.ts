import { NextResponse } from "next/server";
import { captureOrder } from "@/lib/paypal";
import pool from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { orderID } = body;

        const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

        // TACTICAL LOGGING: Full response inspection
        console.log("TACTICAL CAPTURE RESPONSE:", JSON.stringify(jsonResponse, null, 2));

        // Record the transaction locally if successful
        if (httpStatusCode === 200 || httpStatusCode === 201) {
            try {
                const payerEmail = jsonResponse.payer?.email_address || "";
                const givenName = jsonResponse.payer?.name?.given_name || "";
                const surname = jsonResponse.payer?.name?.surname || "";
                const payerName = `${givenName} ${surname}`.trim();
                const payerCountry = jsonResponse.payer?.address?.country_code || "";
                const payerPhone = jsonResponse.payer?.phone?.phone_number?.national_number || "";
                
                const captures = jsonResponse.purchase_units?.[0]?.payments?.captures;
                const capture = captures ? captures[0] : null;

                // TACTICAL: Look for custom_id in multiple possible locations
                const customId = jsonResponse.purchase_units?.[0]?.custom_id || 
                                 capture?.custom_id || 
                                 "";
                
                const transactionId = capture?.id || jsonResponse.id;
                const status = capture?.status || jsonResponse.status || "COMPLETED";
                const amount = capture?.amount?.value || "";
                
                console.log(`TACTICAL: Extracted Custom ID: "${customId}"`);

                // Parse the composite ID (itemId|userId)
                const [itemId, userId] = customId.includes("|") 
                    ? customId.split("|") 
                    : [customId, "unknown"];

                if (transactionId) {
                    const { initDatabase } = await import("@/lib/init-db");
                    await initDatabase(); // Ensure the table exists before trying to insert

                    const client = await pool.connect();
                    try {
                        const insertQuery = `
                            INSERT INTO asopayments (name, email, phonenumber, country, amount, item_id, user_id, payment_status, transactionid)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                            ON CONFLICT (transactionid) DO NOTHING
                        `;
                        const values = [payerName, payerEmail, payerPhone, payerCountry, amount, itemId, userId, status, transactionId];
                        await client.query(insertQuery, values);
                        console.log(`TACTICAL: Payment ${transactionId} (Status: ${status}) logged successfully for user ${userId} and item ${itemId}.`);
                    } finally {
                        client.release();
                    }
                }
            } catch (dbError) {
                console.error("TACTICAL ERROR: Failed to log payment to Database:", dbError);
                // Do not throw here so the user still gets their confirmed checkout!
            }
        }

        return NextResponse.json(jsonResponse, { status: httpStatusCode });
    } catch (error) {
        console.error("Failed to capture order:", error);
        return NextResponse.json(
            { error: "Failed to capture order." },
            { status: 500 }
        );
    }
}
