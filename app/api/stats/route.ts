import { db } from "@/database/db";
import { books } from "@/schema/books";
import { eq, count, avg, and } from "drizzle-orm";
import { NextResponse } from "next/server";

// Replace with session later
const HARDCODED_USER_ID = "00000000-0000-0000-0000-000000000000";

export async function GET() {
  try {
    const totalBooks = await db
      .select({ count: count() })
      .from(books)
      .where(eq(books.userId, HARDCODED_USER_ID));

    const readBooks = await db
      .select({ count: count() })
      .from(books)
      .where(and(eq(books.userId, HARDCODED_USER_ID), eq(books.isRead, true)));

    const avgRating = await db
      .select({ avg: avg(books.rating) })
      .from(books)
      .where(and(eq(books.userId, HARDCODED_USER_ID), eq(books.isRead, true)));

    return NextResponse.json({
      total: totalBooks[0].count,
      read: readBooks[0].count,
      averageRating: avgRating[0].avg ?? 0,
    });
  } catch (err) {
    console.error("Stats error:", err);
    return NextResponse.json({ error: "Could not compute stats." }, { status: 500 });
  }
}
