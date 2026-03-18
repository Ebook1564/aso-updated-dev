import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local BEFORE importing the pool
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import pool from './lib/db';

async function createFormFilledTable() {
  try {
    const client = await pool.connect();
    
    console.log('Creating formfilledtable...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS formfilledtable (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES creatednewusertable(id),
        email VARCHAR(255) UNIQUE NOT NULL,
        status INT DEFAULT 0, -- 0: Not filled, 1: Filled
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('formfilledtable created successfully.');
    client.release();
    process.exit(0);
  } catch (err) {
    console.error('Error creating formfilledtable:', err);
    process.exit(1);
  }
}

createFormFilledTable();
