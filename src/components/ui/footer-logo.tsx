"use client";

import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Footer, type FooterProps } from "./footer";

export function FooterLogo(props: FooterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const src =
    !mounted || resolvedTheme === "dark"
      ? "/logo/svg/logo-nobg.svg"
      : "/logo/svg/logo.svg";

  const handleLogoClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <Footer
      {...props}
      logo={<img alt="Logo" height={40} src={src} width={40} />}
      logoOnClick={handleLogoClick}
    />
  );
}
