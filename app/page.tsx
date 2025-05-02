import { db } from "@/database/db";
import { books } from "@/schema/books";
import BookForm from "@/components/BookForm";
import { toggleReadStatus, deleteBook } from "@/actions/books";
import { eq } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const allBooks = await db
    .select()
    .from(books)
    .where(eq(books.userId, "00000000-0000-0000-0000-000000000000"));

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-12 space-y-10">
      <h1 className="text-3xl font-bold text-center">📚 My Book List</h1>

      <div className="flex justify-center">
        <BookForm />
      </div>

      <div className="grid gap-6 max-w-2xl mx-auto">
        {allBooks.map((book) => (
          <Card key={book.id}>
            <CardContent className="p-6 space-y-2">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-400">
                Author: {book.author ?? "N/A"}
              </p>
              <p>Rating: {book.rating}/5</p>
              <p>
                Finished:{" "}
                {book.dateFinished
                  ? new Date(book.dateFinished).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>Status: {book.isRead ? "✅ Read" : "📖 Unread"}</p>

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
