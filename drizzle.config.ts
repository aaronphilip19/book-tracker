import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema",
  out: "./src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://user:pass@localhost:5432/db",
  },
} satisfies Config;