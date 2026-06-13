"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function IconVesper({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const src =
    !mounted || resolvedTheme === "dark"
      ? "/logo/svg/logo-nobg.svg"
      : "/logo/svg/logo.svg";

  return <img alt="VOMLabs" className={className} src={src} />;
}
