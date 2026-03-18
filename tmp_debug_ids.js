
const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}${process.env.DB_SSL === 'true' ? '?sslmode=require' : ''}`,
  ssl: {
    rejectUnauthorized: false
  }
});

async function debugIds() {
  const client = await pool.connect();
  try {
    console.log('--- asousertable (ID 13) ---');
    const asoRes = await client.query('SELECT * FROM asousertable WHERE id = 13');
    console.table(asoRes.rows);

    if (asoRes.rows.length > 0) {
      const email = asoRes.rows[0].email;
      console.log(`--- creatednewusertable (Email: ${email}) ---`);
      const accountRes = await client.query('SELECT * FROM creatednewusertable WHERE email = $1', [email]);
      console.table(accountRes.rows);

      console.log(`--- formfilledtable (Email: ${email}) ---`);
      const formRes = await client.query('SELECT * FROM formfilledtable WHERE email = $1', [email]);
      console.table(formRes.rows);
    }

    console.log('--- Recent asousertable Entries ---');
    const recentAso = await client.query('SELECT * FROM asousertable ORDER BY created_at DESC LIMIT 5');
    console.table(recentAso.rows);

  } catch (err) {
    console.error(err);
  } finally {
    client.release();
    process.exit(0);
  }
}

debugIds();
