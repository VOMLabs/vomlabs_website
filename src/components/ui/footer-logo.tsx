"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Footer, type FooterProps } from "./footer";

export function FooterLogo(props: FooterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const src = !mounted || resolvedTheme === "dark"
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
      logo={
        <Image
          src={src}
          alt="Logo"
          width={40}
          height={40}
        />
      }
      logoOnClick={handleLogoClick}
    />
  );
}
