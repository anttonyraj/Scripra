"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    // Read the theme on mount
    const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark";
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  const applyTheme = (mode: "light" | "dark") => {
    document.documentElement.setAttribute("data-theme", mode);
    setTheme(mode);
    try {
      localStorage.setItem("scripra-theme", mode);
    } catch {
      // Ignored
    }

    // Dispatch a custom event in case the canvas animation needs to refresh its colors
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("scripra-theme-change"));
    }
  };

  // Prevent hydration mismatch by not rendering the active state until mounted
  const isMounted = theme !== null;

  return (
    <div
      className="flex gap-[2px] p-[3px] bg-card border border-line rounded-full z-50 transition-colors duration-300"
      role="group"
      aria-label="Colour theme"
    >
      <button
        onClick={() => applyTheme("light")}
        className={`border-none bg-transparent cursor-pointer font-sans text-[11.5px] font-semibold px-[13px] py-[6px] rounded-full transition-colors duration-200 ${
          isMounted && theme === "light"
            ? "bg-indigo text-white"
            : "text-ink-3 hover:text-ink"
        }`}
      >
        Light
      </button>
      <button
        onClick={() => applyTheme("dark")}
        className={`border-none bg-transparent cursor-pointer font-sans text-[11.5px] font-semibold px-[13px] py-[6px] rounded-full transition-colors duration-200 ${
          isMounted && theme === "dark"
            ? "bg-indigo text-white"
            : "text-ink-3 hover:text-ink"
        }`}
      >
        Dark
      </button>
    </div>
  );
}
