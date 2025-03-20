import type { Config } from 'drizzle-kit';

export default {
  schema: "./schema/",
  out: "./tests/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;