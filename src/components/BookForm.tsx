"use client";

import { useState } from "react";
import { createBook } from "@/actions/books";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import StarRating from "./StarRating";

export default function BookForm() {
  const [message, setMessage] = useState("");
  const [resetCounter, setResetCounter] = useState(0);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const result = await createBook(formData);

    if (result?.success) {
      setMessage("✅ Book added successfully!");
      form.reset();
      setResetCounter((prev) => prev + 1);

    } else {
      setMessage("❌ Failed to add book.");
      console.error(result?.errors);
    }
  }

  return (
    <form
  onSubmit={handleSubmit}
  className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl space-y-4 bg-black/5 rounded-xl p-6 shadow-md"
>
  <h2 className="text-lg sm:text-xl font-semibold text-center">Add a New Book</h2>

  <div className="space-y-1">
    <Label htmlFor="title">Title</Label>
    <Input id="title" name="title" required />
  </div>

  <div className="space-y-1">
    <Label htmlFor="author">Author</Label>
    <Input id="author" name="author" />
  </div>

  <div className="space-y-1">
  <Label>Rating</Label>
  <StarRating name="rating" resetSignal={resetCounter} />
</div>


  <div className="space-y-1">
    <Label htmlFor="dateFinished">Date Finished</Label>
    <Input id="dateFinished" name="dateFinished" type="date" />
  </div>

  <div className="flex items-center space-x-2">
    <Checkbox id="isRead" name="isRead" />
    <Label htmlFor="isRead">Read</Label>
  </div>

  <div className="space-y-1">
    <Label htmlFor="review">Review</Label>
    <textarea
      id="review"
      name="review"
      rows={4}
      className="w-full p-2 border rounded text-sm dark:bg-black/10"
      placeholder="What did you think of this book?"
    />
  </div>

  <Button type="submit" className="w-full sm:w-auto">
    Add Book
  </Button>

  {message && (
  <p className="text-sm fade-in text-center text-green-400 dark:text-green-300">{message}</p>
)}

</form>

  );
}
