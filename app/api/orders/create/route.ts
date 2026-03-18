import { NextResponse } from "next/server";
import { createOrder } from "@/lib/paypal";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // body might contain cart info to process
        const { cart } = body;

        const { jsonResponse, httpStatusCode } = await createOrder(cart);

        console.log(`TACTICAL SERVER: Order Created. Status: ${httpStatusCode}, ID: ${jsonResponse.id}`);
        return NextResponse.json(jsonResponse, { status: httpStatusCode });
    } catch (error: any) {
        console.error("Failed to create order:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create order." },
            { status: 500 }
        );
    }
}
