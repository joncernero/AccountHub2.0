import { db } from './index';
import { migrate } from 'drizzle-orm/neon-http/migrator';

const main = async () => {
  try {
    console.log('Running database migrations...');
    await migrate(db, {
      migrationsFolder: 'src/db/migrations',
    });
    console.log('Migrations applied successfully!');
  } catch (error) {
    console.error('Error during migration', error);
    process.exit(1);
  }
};

main();
