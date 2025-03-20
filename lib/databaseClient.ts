import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

const pool = new pg.Pool({
  connectionString: import.meta.env.VITE_DATABASE_URL || process.env.DATABASE_URL || '',
})

export const db = drizzle(pool);

export type DatabaseClientType = typeof db
