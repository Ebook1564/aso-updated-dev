import { NextResponse } from "next/server";
import crypto from "crypto";
import pool from "@/lib/db";
import { initDatabase } from "@/lib/init-db";

export async function POST(req: Request) {
    try {
        // PayU sends data as Form URL Encoded
        const formData = await req.formData();
        const data: any = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const {
            status,
            txnid,
            amount,
            productinfo,
            firstname,
            email,
            hash,
            mihpayid,
            unmappedstatus,
            udf1, // user_id
            mode
        } = data;

        const salt = process.env.PAYU_MERCHANT_SALT || "YOUR_PAYU_SALT";
        const key = process.env.PAYU_MERCHANT_KEY || "YOUR_PAYU_KEY";

        // Verify Hash for Security
        // Formula for verification: sha512(salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
        const checkHashString = `${salt}|${status}||||||${data.udf5 || ""}|${data.udf4 || ""}|${data.udf3 || ""}|${data.udf2 || ""}|${udf1 || ""}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
        const calculatedHash = crypto.createHash("sha512").update(checkHashString).digest("hex");

        if (calculatedHash !== hash) {
            console.error("PAYU_CALLBACK_CRITICAL: Hash mismatch! Possible tampering detected.");
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/v1/api/userdashboard?payment=failed&error=hash_mismatch`, { status: 303 });
        }

        if (status === "success") {
            console.log(`PAYU_SUCCESS: Transaction ${txnid} completed for user ${udf1}`);
            
            await initDatabase();
            const client = await pool.connect();
            try {
                // Update or Insert the payment record
                const query = `
                    INSERT INTO asopayments (name, email, phonenumber, amount, item_id, user_id, payment_status, transactionid)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    ON CONFLICT (transactionid) DO UPDATE 
                    SET payment_status = 'PAID', amount = EXCLUDED.amount
                `;
                await client.query(query, [firstname, email, data.phone || "", amount, productinfo, udf1, "PAID", txnid]);
            } finally {
                client.release();
            }

            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/v1/api/userdashboard/?id=${udf1}&payment=success`, { status: 303 });
        } else {
            console.warn(`PAYU_FAILURE: Transaction ${txnid} failed with status ${status}`);
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/v1/api/userdashboard/?id=${udf1}&payment=failed`, { status: 303 });
        }

    } catch (error: any) {
        console.error("PAYU_CALLBACK_ERROR:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
