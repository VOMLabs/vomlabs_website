"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export function ToastProvider() {
  const { resolvedTheme } = useTheme();
  return <Toaster richColors theme={resolvedTheme === "dark" ? "dark" : "light"} />;
}
