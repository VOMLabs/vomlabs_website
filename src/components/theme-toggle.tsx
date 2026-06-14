import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="icon"
      variant="ghost"
    >
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
