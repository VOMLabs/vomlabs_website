"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800"
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  const isLight =
    theme === "light" || (theme === "system" && resolvedTheme === "light");
  const isDark =
    theme === "dark" || (theme === "system" && resolvedTheme === "dark");

  return (
    <div className="flex items-center gap-1 rounded-md border border-neutral-200 dark:border-neutral-800 p-1">
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
          isLight
            ? "bg-neutral-200 dark:bg-neutral-700"
            : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
        }`}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
          isDark
            ? "bg-neutral-200 dark:bg-neutral-700"
            : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
        }`}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
      </button>
    </div>
  );
}
