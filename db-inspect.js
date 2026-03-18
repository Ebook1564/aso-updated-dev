
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function inspect() {
    const pool = new Pool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log("--- TACTICAL DATABASE INSPECTION ---");
        
        console.log("\n1. Recent Payments (asopayments):");
        const payments = await pool.query('SELECT user_id, item_id, email, transactionid, timestamp FROM asopayments ORDER BY timestamp DESC LIMIT 10;');
        console.table(payments.rows);

        console.log("\n2. User Identity Check (creatednewusertable):");
        const users = await pool.query('SELECT id, email, username FROM creatednewusertable LIMIT 10;');
        console.table(users.rows);

        console.log("\n3. Current Schema Check (All Tables):");
        const tables = await pool.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';");
        console.table(tables.rows);

        console.log("\n4. Current Schema Check (asopayments columns):");
        const columns = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'asopayments';");
        console.table(columns.rows);

        console.log("\n5. taskdeliverkeywordtable Schema:");
        const keywordColumns = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'taskdeliverkeywordtable';");
        console.table(keywordColumns.rows);

        console.log("\n6. Recent Entries in taskdeliverkeywordtable:");
        const keywordEntries = await pool.query("SELECT * FROM taskdeliverkeywordtable LIMIT 5;");
        console.log(JSON.stringify(keywordEntries.rows, null, 2));

    } catch (err) {
        console.error("INSPECTION FAILED:", err);
    } finally {
        await pool.end();
    }
}

inspect();
