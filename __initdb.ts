import { initDatabase } from './lib/init-db';

async function run() {
  try {
    await initDatabase();
    console.log("Database initialized successfully!");
  } catch (err) {
    console.error("Failed to initialize database:", err);
  } finally {
    process.exit(0);
  }
}

run();
