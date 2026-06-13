"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="rounded-xl bg-white/5 p-2 transition-colors hover:bg-white/10">
        <Sun className="size-5" />
      </button>
    );
  }

  return (
    <button
      aria-label="Toggle theme"
      className="rounded-xl bg-white/5 p-2 text-muted-foreground transition-all duration-200 hover:bg-white/10 hover:text-foreground"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </button>
  );
}
