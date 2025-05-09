"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useEffect } from "react";

export default function StarRating({
    name = "rating",
    defaultValue = 0,
    resetSignal = 0,
  }: {
    name?: string;
    defaultValue?: number;
    resetSignal?: number;
  }) {
    const [rating, setRating] = useState(defaultValue);
    const [hover, setHover] = useState(0);
  
    useEffect(() => {
      setRating(0);
    }, [resetSignal]);
  
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
            className="text-yellow-400"
            aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                (hover || rating) >= value ? "fill-yellow-400" : "fill-muted"
              }`}
            />
          </button>
        ))}
        <input type="hidden" name={name} value={rating} />
      </div>
    );
  }
  
