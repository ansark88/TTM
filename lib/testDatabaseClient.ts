import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator'; 
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import pg from 'pg';
// テスト用のDBはtestcontainersで作成する
export const createTestDb = async () => {
  const container = await new PostgreSqlContainer().start();
  const connectionString = container.getConnectionUri();

  const pool = new pg.Pool({
    connectionString: connectionString,
  })

  const db = drizzle(pool);
  await migrate(db, { migrationsFolder: './tests/migrations' });
  return { db, container };
}