import pool from './db';

export async function initDatabase() {
  const client = await pool.connect();
  try {
    console.log('Synchronizing tactical schema...');
    
    // Ensure UUID extension for secure identity management
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    // 1. User Persistence Layer
    await client.query(`
      CREATE TABLE IF NOT EXISTS creatednewusertable (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        username VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password TEXT,
        repassword TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Onboarding Data Layer
    await client.query(`
      CREATE TABLE IF NOT EXISTS asousertable (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phonenumber TEXT,
        country TEXT,
        appurl TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Strategic Form Tracking
    await client.query(`
      CREATE TABLE IF NOT EXISTS formfilledtable (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES creatednewusertable(id),
        email VARCHAR(255) UNIQUE,
        status INTEGER DEFAULT 0,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Session Intelligence Logs
    await client.query(`
      CREATE TABLE IF NOT EXISTS userlogintable (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES creatednewusertable(id),
        email VARCHAR(255),
        password TEXT,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    // 5. Payment Ledger Tracker
    await client.query(`
      CREATE TABLE IF NOT EXISTS asopayments (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        phonenumber TEXT,
        country TEXT,
        amount TEXT,
        item_id TEXT,
        user_id TEXT,
        payment_status TEXT DEFAULT 'COMPLETED',
        transactionid TEXT UNIQUE,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure item_id, user_id, and payment_status columns exist (Migration for existing tables)
    await client.query('ALTER TABLE asopayments ADD COLUMN IF NOT EXISTS item_id TEXT;');
    await client.query('ALTER TABLE asopayments ADD COLUMN IF NOT EXISTS user_id TEXT;');
    await client.query('ALTER TABLE asopayments ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT \'COMPLETED\';');
    await client.query('ALTER TABLE asopayments ADD COLUMN IF NOT EXISTS screenshot_url TEXT;');
    
    console.log('Tactical protocol: Database schema synchronized successfully.');
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    client.release();
  }
}
