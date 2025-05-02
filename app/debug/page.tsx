import { db } from "@/database/db";
import { books } from "@/schema/books";

export default async function DebugPage() {
  const allBooks = await db.select().from(books);

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Books in Database</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(allBooks, null, 2)}</pre>
    </main>
  );
}
