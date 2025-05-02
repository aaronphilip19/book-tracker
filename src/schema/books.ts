// src/schema/books.ts
import { pgTable, text, integer, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";

export const books = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  author: text("author"),
  rating: integer("rating").default(0),
  dateFinished: timestamp("date_finished", { mode: "date" }),
  isRead: boolean("is_read").default(false),
  userId: uuid("user_id").references(() => users.id), // Removed .notNull()
});

export type NewBook = typeof books.$inferInsert;