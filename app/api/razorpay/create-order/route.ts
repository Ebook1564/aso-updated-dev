import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: Request) {
    try {
        const { amount, currency, receipt, notes } = await req.json();

        const options = {
            amount: Math.round(parseFloat(amount) * 100), // Razorpay expects amount in paise
            currency: currency || "INR",
            receipt: receipt || `receipt_${Date.now()}`,
            notes: notes || {}
        };

        const order = await razorpay.orders.create(options);

        console.log("TACTICAL: Razorpay Order Created:", order.id);
        return NextResponse.json(order);
    } catch (error: any) {
        console.error("RAZORPAY ORDER CREATION ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create order." },
            { status: 500 }
        );
    }
}
