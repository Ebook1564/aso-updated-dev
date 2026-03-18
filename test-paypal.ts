import { generateAccessToken, createOrder } from './lib/paypal';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function test() {
    console.log("--- PayPal Diagnostic Test ---");
    console.log("Client ID:", process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.substring(0, 10) + "...");
    console.log("Secret Logged:", !!process.env.PAYPAL_CLIENT_SECRET);

    try {
        console.log("\n1. Testing generateAccessToken()...");
        const token = await generateAccessToken();
        if (token) {
            console.log("SUCCESS: Access Token generated!");
            
            console.log("\n2. Testing createOrder()...");
            const result = await createOrder({ items: [] });
            console.log("Order Result:", JSON.stringify(result, null, 2));
            
            if (result.httpStatusCode === 201 || result.httpStatusCode === 200) {
                console.log("\nSUCCESS: PayPal API is fully functional for Order Creation!");
            } else {
                console.log("\nFAILURE: PayPal rejected the order creation.");
            }
        } else {
            console.log("FAILURE: Could not generate Access Token. Check your Client ID and Secret.");
        }
    } catch (error) {
        console.error("DIAGNOSTIC CRASHED:", error);
    } finally {
        process.exit(0);
    }
}

test();
