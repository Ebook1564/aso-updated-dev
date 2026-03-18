require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}${process.env.DB_SSL === 'true' ? '?sslmode=require' : ''}`,
});

async function runAdminControl() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (command === 'list') {
        console.log("\n--- TACTICAL PAYMENT OVERVIEW (PENDING VERIFICATION) ---");
        const res = await pool.query("SELECT id, name, amount, transactionid as utr, item_id, CASE WHEN screenshot_url IS NOT NULL THEN 'YES' ELSE 'NO' END as proof_attached FROM asopayments WHERE payment_status = 'PENDING_VERIFICATION'");
        
        if (res.rows.length === 0) {
            console.log("No pending protocols detected. All clear.");
        } else {
            console.table(res.rows);
            console.log("\nTo view a proof image, run: node admin-control.js view-proof <utr>");
            console.log("To approve a payment, run: node admin-control.js approve <utr>");
        }
        process.exit(0);
    }

    if (command === 'view-proof') {
        const utr = args[1];
        if (!utr) {
            console.error("ERROR: Missing UTR coordinate.");
            process.exit(1);
        }

        const res = await pool.query("SELECT screenshot_url FROM asopayments WHERE transactionid = $1", [utr]);
        const screenshot = res.rows[0]?.screenshot_url;

        if (screenshot) {
            try {
                const fs = require('fs');
                const path = require('path');
                // Extract base64 content
                const base64Data = screenshot.replace(/^data:image\/\w+;base64,/, "");
                const buffer = Buffer.from(base64Data, 'base64');
                const fileName = `proof_${utr}.jpg`;
                const filePath = path.join(process.cwd(), fileName);
                
                fs.writeFileSync(filePath, buffer);
                console.log(`\nMISSION SUCCESSFUL: Screenshot saved to ${fileName}`);
                console.log(`Run 'start ${fileName}' to view the image.`);
            } catch (err) {
                console.error("DECODING_FAILURE:", err.message);
            }
        } else {
            console.log("No screenshot found for this protocol.");
        }
        process.exit(0);
    }

    if (command === 'approve') {
        const utr = args[1];
        if (!utr) {
            console.error("ERROR: Missing UTR coordinate.");
            process.exit(1);
        }

        console.log(`\nAUTH_PROTOCOL: Approving transaction ${utr}...`);
        const res = await pool.query(
            "UPDATE asopayments SET payment_status = 'PAID' WHERE transactionid = $1 RETURNING *",
            [utr]
        );

        if (res.rowCount > 0) {
            console.log("MISSION SUCCESSFUL: Status updated to 'PAID'. User dashboard will reflect this instantly.");
        } else {
            console.error("ERROR: Protocol not found or already verified.");
        }
        process.exit(0);
    }

    console.log("Commands: list, view <utr>, approve <utr>");
    process.exit(0);
}

runAdminControl().catch(err => {
    console.error("ADMIN_PROTOCOL_FAILURE:", err);
    process.exit(1);
});
