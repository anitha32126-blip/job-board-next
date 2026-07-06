"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  savedCount: number;
}

export default function Header({
  savedCount,
}: HeaderProps) {
  const { user } = useAuth();

  const [darkMode, setDarkMode] = useState(() => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") === "dark";
  }
  return false;
});

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);

  function toggleDarkMode() {
    const newMode = !darkMode;

    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <>
      <header
        className="
          mb-5
          flex
          justify-between
          items-center
          border-b
          pb-3
        "
      >
        <div>
          <h1 className="text-2xl font-bold">
            Job Board
          </h1>

          <p>
            User: {user ? user.name : "Not Logged In"}
          </p>

          <p className="mt-2">
            <Link
              href="/saved"
              className="text-blue-600 underline"
            >
              Saved Jobs ({savedCount})
            </Link>
          </p>
        </div>

        <button
          aria-label="Toggle Dark Mode"
          onClick={toggleDarkMode}
          className="
            border
            rounded
            px-3
            py-2
          "
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      <nav
        className="
          md:hidden
          fixed
          bottom-0
          left-0
          right-0
          border-t
          bg-background
          text-foreground
          flex
          justify-around
          py-3
        "
      >
        <Link href="/">Home</Link>

        <Link href="/saved">Saved</Link>

        <button aria-label="Profile">
          Profile
        </button>
      </nav>
    </>
  );
}