import type { Config } from 'drizzle-kit';

export default {
  schema: "./schema/",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: import.meta.env.VITE_DATABASE_URL!,
  },
} satisfies Config;