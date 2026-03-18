// lib/paypal.ts

const base = "https://api-m.sandbox.paypal.com"; // Use sandbox for testing

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
export async function generateAccessToken() {
    try {
        const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
        const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            console.error("CRITICAL ERROR: Missing PayPal API Credentials in server environment.");
            throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(
            clientId + ":" + clientSecret
        ).toString("base64");

        const response = await fetch(`${base}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        const data = await response.json();
        if (!data.access_token) {
            console.error("PayPal Auth Error Response:", data);
        }
        return data.access_token;
    } catch (error) {
        console.error("Failed to generate PayPal Access Token:", error);
        return null;
    }
}

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
export async function createOrder(cart: any) {
    // Dynamically use the amount and item ID passed from the frontend
    const amount = cart?.amount || "499.00"; 
    const itemId = cart?.id || "audit_protocol";
    const userId = cart?.userId || "unknown";
    
    console.log(
        "TACTICAL SERVER: Creating order for item:", itemId, "amount:", amount, "user:", userId
    );

    const accessToken = await generateAccessToken();
    if (!accessToken) {
        throw new Error("FAILED_TO_GENERATE_ACCESS_TOKEN");
    }

    const url = `${base}/v2/checkout/orders`;
    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                custom_id: `${itemId}|${userId}`,
                amount: {
                    currency_code: "USD",
                    value: amount,
                },
            },
        ],
    };

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
            // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
            // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        },
        method: "POST",
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
}

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
export async function captureOrder(orderID: string) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
            // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
            // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        },
    });

    return handleResponse(response);
}

async function handleResponse(response: Response) {
    try {
        const jsonResponse = await response.json();
        return {
            jsonResponse,
            httpStatusCode: response.status,
        };
    } catch (err) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}
