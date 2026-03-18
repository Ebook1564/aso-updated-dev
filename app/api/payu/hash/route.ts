import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { 
            txnid, 
            amount, 
            productinfo, 
            firstname, 
            email,
            udf1,
            udf2,
            udf3,
            udf4,
            udf5
        } = await req.json();

        const key = process.env.PAYU_MERCHANT_KEY || "YOUR_PAYU_KEY";
        const salt = process.env.PAYU_MERCHANT_SALT || "YOUR_PAYU_SALT";

        if (!txnid || !amount || !productinfo || !firstname || !email) {
            return NextResponse.json({ error: "Missing required fields for hash generation" }, { status: 400 });
        }

        // PayU Hash Formula: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt)
        const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1 || ""}|${udf2 || ""}|${udf3 || ""}|${udf4 || ""}|${udf5 || ""}||||||${salt}`;
        
        const hash = crypto.createHash("sha512").update(hashString).digest("hex");

        return NextResponse.json({ hash });
    } catch (error: any) {
        console.error("PAYU_HASH_ERROR:", error);
        return NextResponse.json({ error: error.message || "Hash generation failed" }, { status: 500 });
    }
}
