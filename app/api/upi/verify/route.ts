import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { initDatabase } from "@/lib/init-db";

export async function POST(req: Request) {
    try {
        const reqData = await req.json();
        const { 
            userId,
            itemId,
            amount,
            utr,
            payerInfo
        } = reqData;

        if (!utr || !userId || !itemId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        console.log("\n=======================================================");
        console.log("🚨 TACTICAL ALERT: NEW UPI PAYMENT SUBMITTED 🚨");
        console.log(`UTR: ${utr}`);
        console.log(`AMOUNT: ${amount}`);
        console.log(`USER: ${userId}`);
        console.log("ACTION: Verify in bank app and run admin-control.js");
        console.log("=======================================================\n");

        // Record to Database as PENDING_VERIFICATION
        await initDatabase();
        const client = await pool.connect();
        try {
            const insertQuery = `
                INSERT INTO asopayments (name, email, phonenumber, country, amount, item_id, user_id, payment_status, transactionid, screenshot_url)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                ON CONFLICT (transactionid) DO NOTHING
            `;
            const values = [
                payerInfo?.name || "UPI User",
                payerInfo?.email || "unknown@upi.com",
                payerInfo?.contact || "",
                "IN", 
                amount,
                itemId,
                userId,
                "PENDING_VERIFICATION", 
                utr,
                reqData.screenshot || null
            ];
            const result = await client.query(insertQuery, values);
            if (result.rowCount === 0) {
                console.warn(`TACTICAL WARN: UPI payment ${utr} was NOT inserted (likely duplicate UTR).`);
            } else {
                console.log(`TACTICAL SUCCESS: UPI payment ${utr} logged for verification. User: ${userId}.`);
            }
        } catch (dbErr: any) {
            console.error("TACTICAL DB ERROR:", dbErr);
            throw dbErr;
        } finally {
            client.release();
        }

        return NextResponse.json({ success: true, message: "Transaction submitted for verification" });
    } catch (error: any) {
        console.error("UPI VERIFICATION SUBMISSION ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Submission failed." },
            { status: 500 }
        );
    }
}
