import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { books, NewBook } from "@/schema/books";
import { z } from "zod";


const HARDCODED_USER_ID = "00000000-0000-0000-0000-000000000000";


const BookSchema = z.object({
  title: z.string(),
  author: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  isRead: z.boolean().optional(),
  dateFinished: z.string().optional(), 
  review: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Expected an array of books." }, { status: 400 });
    }

    const validBooks: NewBook[] = [];

    for (const book of body) {
      const parsed = BookSchema.safeParse(book);
      if (parsed.success) {
        const parsedBook: NewBook = {
          ...parsed.data,
          userId: HARDCODED_USER_ID,
          dateFinished: parsed.data.dateFinished
            ? new Date(parsed.data.dateFinished)
            : undefined,
        };
        validBooks.push(parsedBook);
      }
    }

    if (validBooks.length === 0) {
      return NextResponse.json({ error: "No valid books in upload." }, { status: 400 });
    }

    for (const book of validBooks) {
      await db.insert(books).values(book);
    }

    return NextResponse.json({ success: true, count: validBooks.length });
  } catch (err) {
    console.error("Import error:", err);
    return NextResponse.json({ error: "Invalid JSON or server error." }, { status: 500 });
  }
}
