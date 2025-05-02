"use client";

import { useState } from "react";
import { createBook } from "@/actions/books";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function BookForm() {
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const result = await createBook(formData);

    if (result?.success) {
      setMessage("✅ Book added successfully!");
      form.reset();
    } else {
      setMessage("❌ Failed to add book.");
      console.error(result?.errors);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6 bg-black/20 p-6 rounded-lg border border-white/10"
    >
      <h2 className="text-lg font-semibold text-white">Add a New Book</h2>

      <div className="space-y-2">
        <Label htmlFor="title" className="text-white">
          Title
        </Label>
        <Input id="title" name="title" placeholder="Title" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author" className="text-white">
          Author
        </Label>
        <Input id="author" name="author" placeholder="Author" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating" className="text-white">
          Rating (0–5)
        </Label>
        <Input
          id="rating"
          name="rating"
          type="number"
          min={0}
          max={5}
          placeholder="4"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateFinished" className="text-white">
          Date Finished
        </Label>
        <Input id="dateFinished" name="dateFinished" type="date" />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="isRead" name="isRead" />
        <Label htmlFor="isRead" className="text-white">
          Read
        </Label>
      </div>

      <Button type="submit" className="w-full">
        Add Book
      </Button>

      {message && <p className="text-sm text-white">{message}</p>}
    </form>
  );
}
