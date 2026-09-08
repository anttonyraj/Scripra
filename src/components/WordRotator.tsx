"use client";

import React, { useState, useEffect } from "react";

const words = [
  "Automated Meeting Recaps",
  "Action Item Extraction",
  "Deep Call Analytics",
  "Searchable Voice Memory",
  "Executive Decision Tracking",
];

export default function WordRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-grid text-ink">
      {words.map((word, i) => (
        <span
          key={word}
          className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out whitespace-nowrap ${
            i === index
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
