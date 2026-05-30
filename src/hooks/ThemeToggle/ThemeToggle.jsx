// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <label className="swap swap-rotate btn btn-neutral text-neutral-content btn-circle">
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
      />

      {/* Sun — light mode */}
      <svg className="swap-off w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M5.64 17l-.71.71a1 1 0 0 0 1.41 1.41l.71-.71A1 1 0 0 0 5.64 17M5 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1m7-7a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1M18.36 7l.71-.71a1 1 0 0 0-1.41-1.41l-.71.71A1 1 0 0 0 18.36 7M19 12a1 1 0 0 0 1 1h1a1 1 0 0 0 0-2h-1a1 1 0 0 0-1 1m-9 7a1 1 0 0 0-2 0v1a1 1 0 0 0 2 0v-1M18.36 17A1 1 0 0 0 17 18.36l.71.71a1 1 0 0 0 1.41-1.41zM12 6a6 6 0 1 0 0 12A6 6 0 0 0 12 6z"/>
      </svg>

      {/* Moon — dark mode */}
      <svg className="swap-on w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21.64 13a1 1 0 0 0-1.27-.06A8 8 0 1 1 11.06 2.63a1 1 0 0 0-.06-1.27 1 1 0 0 0-1.05-.27A10 10 0 1 0 21.91 14.05a1 1 0 0 0-.27-1.05z"/>
      </svg>
    </label>
  );
}