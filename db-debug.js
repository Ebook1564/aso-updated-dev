const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
});

async function inspect() {
    console.log("TACTICAL SCHEMA INSPECTION STARTING...");
    const client = await pool.connect();
    try {
        console.log("--- asopayments Table Schema ---");
        const schemaRes = await client.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'asopayments'
        `);
        if (schemaRes.rows.length === 0) {
            console.log("Table 'asopayments' NOT FOUND!");
        } else {
            schemaRes.rows.forEach(col => {
                console.log(`Column: ${col.column_name} | Type: ${col.data_type}`);
            });
        }

        console.log("\n--- Checking for unique constraint on transactionid ---");
        const constraintCheck = await client.query(`
            SELECT 1 FROM pg_indexes 
            WHERE tablename = 'asopayments' AND indexdef LIKE '%transactionid%' AND indexdef LIKE '%UNIQUE%'
        `);
        if (constraintCheck.rows.length > 0) {
            console.log("Unique constraint/index on transactionid EXISTS.");
        } else {
            console.log("Unique constraint/index on transactionid MISSING! Adding it now...");
            // We use 'transactionid' because that's what's in the ON CONFLICT clause
            await client.query("ALTER TABLE asopayments ADD CONSTRAINT unique_transactionid UNIQUE (transactionid)");
            console.log("Unique constraint ADDED.");
        }

        console.log("\n--- RECENT PAYMENTS ---");
        const paymentsRes = await client.query("SELECT * FROM asopayments ORDER BY timestamp DESC LIMIT 5");
        console.log(JSON.stringify(paymentsRes.rows, null, 2));

    } catch (err) {
        console.error("INSPECTION ERROR:", err);
    } finally {
        if (client) client.release();
        process.exit();
    }
}

inspect();
