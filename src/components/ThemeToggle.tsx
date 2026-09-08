"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("scripra-theme") as "light" | "dark" | null;
    const currentTheme =
      (document.documentElement.getAttribute("data-theme") as "light" | "dark") ||
      saved ||
      "light";

    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setTheme(currentTheme);

    const onThemeChange = () => {
      const mode = (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";
      setTheme(mode);
    };
    window.addEventListener("scripra-theme-change", onThemeChange);
    return () => window.removeEventListener("scripra-theme-change", onThemeChange);
  }, []);

  const applyTheme = (mode: "light" | "dark") => {
    document.documentElement.setAttribute("data-theme", mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setTheme(mode);
    try {
      localStorage.setItem("scripra-theme", mode);
    } catch {
      // Ignored
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("scripra-theme-change"));
    }
  };

  return (
    <div
      className="inline-flex items-center gap-[2px] p-[3px] bg-raise border border-line rounded-full shadow-2xs transition-colors duration-200 shrink-0"
      role="group"
      aria-label="Colour theme"
    >
      <button
        type="button"
        onClick={() => applyTheme("light")}
        className={`border-none cursor-pointer font-sans text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all flex items-center gap-1 ${
          isMounted && theme === "light"
            ? "bg-card text-ink shadow-xs"
            : "bg-transparent text-ink-3 hover:text-ink"
        }`}
        title="Switch to Light Mode"
      >
        <span>☀️</span>
        <span>Light</span>
      </button>
      <button
        type="button"
        onClick={() => applyTheme("dark")}
        className={`border-none cursor-pointer font-sans text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all flex items-center gap-1 ${
          isMounted && theme === "dark"
            ? "bg-indigo text-white shadow-xs"
            : "bg-transparent text-ink-3 hover:text-ink"
        }`}
        title="Switch to Dark Mode"
      >
        <span>🌙</span>
        <span>Dark</span>
      </button>
    </div>
  );
}
