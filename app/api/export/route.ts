import { NextResponse } from "next/server";
import { db } from "@/database/db";
import { books } from "@/schema/books";
import { eq } from "drizzle-orm";


const HARDCODED_USER_ID = "00000000-0000-0000-0000-000000000000";

export async function GET() {
  try {
    const userBooks = await db
      .select()
      .from(books)
      .where(eq(books.userId, HARDCODED_USER_ID));

    return new NextResponse(JSON.stringify(userBooks, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": "attachment; filename=books.json",
      },
    });
  } catch (err) {
    console.error("Export error:", err);
    return new NextResponse("Failed to export books", { status: 500 });
  }
}
