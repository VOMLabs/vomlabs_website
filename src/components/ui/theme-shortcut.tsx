"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeShortcut() {
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "d" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !(e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement)
      ) {
        e.preventDefault();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setTheme, resolvedTheme]);

  return null;
}
