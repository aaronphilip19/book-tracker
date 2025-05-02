// app/test-create/page.tsx
"use client";

import { createBook } from "@/actions/books";
import { useTransition } from "react";

export default function TestCreatePage() {
  const [isPending, startTransition] = useTransition();

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Create Test Book</h1>
      <form
        action={(formData) =>
          startTransition(() => {
            createBook(formData);
          })
        }
      >
        <input name="title" defaultValue="Test Book" />
        <input name="author" defaultValue="Test Author" />
        <input name="rating" type="number" defaultValue="4" />
        <input name="dateFinished" type="date" defaultValue="2024-01-01" />
        <button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Book"}
        </button>
      </form>
    </main>
  );
}
