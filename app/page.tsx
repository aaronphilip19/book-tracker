import { db } from "@/database/db";
import { books } from "@/schema/books";
import { eq } from "drizzle-orm";
import BookForm from "@/components/BookForm";
import { toggleReadStatus, deleteBook } from "@/actions/books";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const allBooks = await db
    .select()
    .from(books)
    .where(eq(books.userId, "00000000-0000-0000-0000-000000000000")); // Replace later with session ID

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 space-y-10">
      <h1 className="text-3xl font-bold text-center">📚 My Book List</h1>

      <div className="flex justify-center">
        <BookForm />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {allBooks.map((book) => (
          <Card key={book.id} className="transition-all duration-300 hover:scale-[1.02] fade-in">
            <CardContent className="p-6 space-y-2">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-400">Author: {book.author ?? "N/A"}</p>
              <p>Rating: {book.rating}/5</p>
              <p>Status: {book.isRead ? "✅ Read" : "📖 Unread"}</p>
              {book.review && <p className="text-sm italic">“{book.review}”</p>}

              <div className="flex gap-3 pt-2">
                <form
                  action={async () => {
                    "use server";
                    await toggleReadStatus(book.id, book.isRead ?? false);
                  }}
                >
                  <Button variant="outline" size="sm">
                    Mark as {book.isRead ? "Unread" : "Read"}
                  </Button>
                </form>

                <form
                  action={async () => {
                    "use server";
                    await deleteBook(book.id);
                  }}
                >
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
