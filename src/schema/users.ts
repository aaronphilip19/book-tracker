import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),      // UUID primary key
  email: text("email").notNull().unique(),          // User's email
  password: text("password").notNull(),             // Hashed password
  createdAt: timestamp("created_at").defaultNow(),  // Optional: audit
});