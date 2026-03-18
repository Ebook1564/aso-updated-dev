import pool from './lib/db';

async function checkRecords() {
  try {
    const users = await pool.query("SELECT * FROM creatednewusertable ORDER BY created_at DESC LIMIT 10");
    console.log("--- LATEST USERS (creatednewusertable) ---");
    console.table(users.rows.map(r => ({ ...r, password: '***', repassword: '***' })));

    const asoUsers = await pool.query("SELECT * FROM asousertable LIMIT 10");
    console.log("--- FORM DATA (asousertable) ---");
    console.table(asoUsers.rows);

    const forms = await pool.query("SELECT * FROM formfilledtable LIMIT 10");
    console.log("--- FORM STATUS (formfilledtable) ---");
    console.table(forms.rows);

    const logs = await pool.query("SELECT * FROM userlogintable ORDER BY timestamp DESC LIMIT 10");
    console.log("--- LOGIN LOGS (userlogintable) ---");
    console.table(logs.rows.map(r => ({ ...r, password: '***' })));

    console.log("--- TABLE SCHEMAS ---");
    const tables = ['creatednewusertable', 'asousertable', 'formfilledtable', 'userlogintable'];
    for (const table of tables) {
      const cols = await pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = $1
      `, [table]);
      console.log(`Schema for ${table}:`);
      console.table(cols.rows);
    }

    process.exit(0);
  } catch (err) {
    console.error("Database check failed:", err);
    process.exit(1);
  }
}

checkRecords();
