"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ImportForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = document.getElementById("upload") as HTMLInputElement;
    if (!input?.files?.[0]) return;

    const text = await input.files[0].text();
    const res = await fetch("/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: text,
    });

    const result = await res.json();

    if (result.success) {
      setMessage(`✅ Imported ${result.count} books successfully!`);
      setIsError(false);
      router.refresh(); 
    } else {
      setMessage(`❌ ${result.error}`);
      setIsError(true);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          id="upload"
          type="file"
          accept=".json"
          className="text-white file:bg-green-600 file:text-white file:px-4 file:py-2 file:rounded file:cursor-pointer"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          📤 Import Books
        </button>
      </form>

      {message && (
        <p className={`text-sm ${isError ? "text-red-400" : "text-green-400"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
