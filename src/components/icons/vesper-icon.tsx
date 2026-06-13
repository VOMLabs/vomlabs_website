"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export function IconVesper({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const src = !mounted || resolvedTheme === "dark"
    ? "/logo/svg/logo-nobg.svg"
    : "/logo/svg/logo.svg";

  return (
    <Image
      src={src}
      alt="VOMLabs Logo"
      width={32}
      height={32}
      className={className}
    />
  );
}
