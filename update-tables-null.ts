import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local BEFORE importing the pool
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import pool from './lib/db';

async function updateTables() {
  try {
    const client = await pool.connect();
    
    console.log('Updating creatednewusertable to allow NULL passwords for OAuth users...');
    await client.query(`
      ALTER TABLE creatednewusertable ALTER COLUMN password DROP NOT NULL;
      ALTER TABLE creatednewusertable ALTER COLUMN repassword DROP NOT NULL;
    `);

    console.log('Updating userlogintable to allow NULL passwords for record logging...');
    await client.query(`
      ALTER TABLE userlogintable ALTER COLUMN password DROP NOT NULL;
    `);

    console.log('Tables updated successfully.');
    client.release();
    process.exit(0);
  } catch (err) {
    console.error('Error updating tables:', err);
    process.exit(1);
  }
}

updateTables();
