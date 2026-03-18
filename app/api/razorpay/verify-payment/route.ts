import { NextResponse } from "next/server";
import crypto from "crypto";
import pool from "@/lib/db";
import { initDatabase } from "@/lib/init-db";

export async function POST(req: Request) {
    try {
        const { 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature,
            userId,
            itemId,
            amount,
            payerInfo
        } = await req.json();

        // 1. Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            console.error("TACTICAL ERROR: Razorpay Signature Verification Failed");
            return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
        }

        console.log("TACTICAL: Razorpay Signature Verified. Recording payment...", razorpay_payment_id);

        // 2. Record to Database
        await initDatabase();
        const client = await pool.connect();
        try {
            const insertQuery = `
                INSERT INTO asopayments (name, email, phonenumber, country, amount, item_id, user_id, payment_status, transactionid)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (transactionid) DO NOTHING
            `;
            const values = [
                payerInfo?.name || "Razorpay User",
                payerInfo?.email || "unknown@razorpay.com",
                payerInfo?.contact || "",
                "IN", // Default to India for Razorpay
                amount,
                itemId,
                userId,
                "COMPLETED",
                razorpay_payment_id
            ];
            await client.query(insertQuery, values);
            console.log(`TACTICAL: Razorpay payment ${razorpay_payment_id} logged successfully for user ${userId}.`);
        } finally {
            client.release();
        }

        return NextResponse.json({ success: true, message: "Payment verified and recorded" });
    } catch (error: any) {
        console.error("RAZORPAY VERIFICATION ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Verification failed." },
            { status: 500 }
        );
    }
}
