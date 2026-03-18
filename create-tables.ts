import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local BEFORE importing the pool
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import pool from './lib/db';

async function createTables() {
  console.log('Database Config Check:');
  console.log('Host:', process.env.DB_HOST);
  console.log('Database:', process.env.DB_NAME);
  console.log('User:', process.env.DB_USER);
  console.log('SSL Enabled:', process.env.DB_SSL === 'true');
  console.log('Password length:', process.env.DB_PASSWORD?.length || 0);

  try {
    const client = await pool.connect();
    
    console.log('Connected to database. Creating creatednewusertable...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS creatednewusertable (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        repassword TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Creating userlogintable...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS userlogintable (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES creatednewusertable(id),
        email VARCHAR(255) NOT NULL,
        password TEXT NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tables created successfully.');
    client.release();
    process.exit(0);
  } catch (err) {
    console.error('Error creating tables:', err);
    process.exit(1);
  }
}

createTables();
