import { db } from './index';
import fs from 'fs';
import path from 'path';

async function checkMigrations() {
  console.log('Checking migration status...');

  try {
    // Fetch applied migrations
    const result = await db.execute(`
      SELECT hash, created_at FROM drizzle.__drizzle_migrations ORDER BY created_at DESC;
    `);

    const appliedMigrations = new Set(result.rows.map((row) => row.hash));

    // Read pending migration files
    const migrationsFolder = path.resolve(__dirname, '../../src/db/migrations');
    const migrationFiles = fs
      .readdirSync(migrationsFolder)
      .filter((file) => file.endsWith('.sql'))
      .map((file) => file.split('_')[0]); // Extract hash from filename

    console.log('\n✅ Applied Migrations:');
    result.rows.forEach((row) => {
      console.log(
        `- ${row.hash} (applied at ${new Date(
          row.created_at * 1000
        ).toISOString()})`
      );
    });

    console.log('\n⏳ Pending Migrations:');
    migrationFiles
      .filter((hash) => !appliedMigrations.has(hash))
      .forEach((hash) => console.log(`- ${hash}`));
  } catch (error) {
    console.error('❌ Error checking migration status:', error);
  }
}

checkMigrations();
