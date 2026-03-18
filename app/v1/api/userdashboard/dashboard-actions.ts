"use server";

import pool from "@/lib/db";

export async function getUserDashboardData(userIdOrLegacyId: string) {
    if (!userIdOrLegacyId) return null;

    try {
        console.log("TACTICAL: getUserDashboardData called with ID:", userIdOrLegacyId);
        const client = await pool.connect();
        try {
            let userId = userIdOrLegacyId;
            let email = "";
            let username = "";
            
            // TACTICAL RESOLVER: If ID is a numeric string (e.g. "13"), resolve the Account UUID
            const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(userIdOrLegacyId);
            const isNumericId = /^\d+$/.test(userIdOrLegacyId);

            if (isNumericId) {
                console.log("TACTICAL: Detected Numeric ID. Resolving account...", userIdOrLegacyId);
                const asoRes = await client.query(
                    "SELECT email, name FROM asousertable WHERE id = $1",
                    [parseInt(userIdOrLegacyId)]
                );
                if (asoRes.rows.length > 0) {
                    email = asoRes.rows[0].email;
                    username = asoRes.rows[0].name;

                    const accountRes = await client.query(
                        "SELECT id FROM creatednewusertable WHERE email = $1",
                        [email]
                    );
                    if (accountRes.rows.length > 0) {
                        userId = accountRes.rows[0].id;
                        console.log("TACTICAL: Resolved Numeric ID to Account UUID:", userId);
                    } else {
                        console.warn("TACTICAL: Numeric ID found, but no full account yet. Using numeric ID as user identifier.");
                    }
                } else {
                    console.warn("TACTICAL WARN: Numeric ID not found in asousertable:", userIdOrLegacyId);
                    // If not in asousertable, maybe it's a legacy ID from somewhere else? 
                    // Let's not return null immediately if there's a chance it's a valid ID for some other table.
                }
            } else if (isUuid) {
                console.log("TACTICAL: Using direct UUID for lookup:", userId);
                const userRes = await client.query(
                    "SELECT email, username FROM creatednewusertable WHERE id = $1",
                    [userId]
                );
                if (userRes.rows.length > 0) {
                    email = userRes.rows[0].email;
                    username = userRes.rows[0].username;
                }
            }

            // Fallback for username if still empty
            if (!username) username = "AWAITING_ASSIGNMENT";

            // 2. Get all successful payments for this user_id or email
            const paymentsRes = await client.query(
                "SELECT item_id, amount, payment_status, transactionid, timestamp FROM asopayments WHERE user_id = $1 OR email = $2",
                [userId, email]
            );

            // 3. Get delivered keywords from taskdeliverkeywordtable
            // We join with asopayments and use the same user resolution as the payments query
            const keywordsRes = await client.query(
                `SELECT p.item_id, k.keyword_upload 
                 FROM taskdeliverkeywordtable k
                 JOIN asopayments p ON k.payment_id = p.id
                 WHERE p.user_id = $1 OR p.email = $2`,
                [userId, email]
            );

            const deliveredKeywords = keywordsRes.rows;

            console.log("TACTICAL: Final Payload:", { 
                userEmail: email, 
                userId: userId, 
                paymentsCount: paymentsRes.rows.length,
                keywordsCount: deliveredKeywords.length
            });

            return {
                user: { email, username, id: userId },
                payments: paymentsRes.rows,
                deliveredKeywords: deliveredKeywords
            };
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("TACTICAL CRITICAL: Dashboard Action Error:", error);
        return { error: "DATA_FETCH_FAILED" };
    }
}
