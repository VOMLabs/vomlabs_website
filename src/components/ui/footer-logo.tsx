"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Footer, type FooterProps } from "./footer";

export function FooterLogo(props: FooterProps) {
  const router = useRouter();
  const pathname = usePathname();

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
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
        />
      }
      logoOnClick={handleLogoClick}
    />
  );
}
