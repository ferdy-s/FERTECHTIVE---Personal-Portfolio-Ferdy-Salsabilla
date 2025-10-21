"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme-dark");
    const isDark = saved ? saved === "1" : true;
    root.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !dark;
    root.classList.toggle("dark", next);
    localStorage.setItem("theme-dark", next ? "1" : "0");
    setDark(next);
  };

  return (
    <button
      onClick={toggle}
      className="inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 text-sm hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
