"use server";

import { db } from "@/database/db";
import { books } from "@/schema/books";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().nullish(),
  rating: z.coerce.number().min(0).max(5).nullish().default(0),
  dateFinished: z.coerce.date().nullish(),
  isRead: z.coerce.boolean().default(false),
  review: z.string().nullish(), 
});

export async function createBook(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    author: formData.get("author"),
    rating: formData.get("rating"),
    dateFinished: formData.get("dateFinished"),
    isRead: formData.get("isRead"),
    review: formData.get("review"), 
  };

  const result = BookSchema.safeParse(raw);

  if (!result.success) {
    return { errors: result.error.flatten() };
  }

  try {
    await db.insert(books).values({
      ...result.data,
      
      rating: result.data.rating ?? 0,
      isRead: result.data.isRead ?? false,
      userId: "00000000-0000-0000-0000-000000000000", // Placeholder for userId
    });
    
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Failed to create book" };
  }
}

export async function toggleReadStatus(bookId: string, currentStatus: boolean) {
    try {
      await db
        .update(books)
        .set({ isRead: !currentStatus })
        .where(eq(books.id, bookId));
  
      revalidatePath("/");
    } catch (error) {
      console.error("Failed to toggle read status:", error);
    }
  }

  export async function deleteBook(bookId: string) {
    try {
      await db.delete(books).where(eq(books.id, bookId));
      console.log("Book deleted successfully");
      revalidatePath("/");
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  }
  