"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const footerVariants = cva("w-full border-border border-t", {
  variants: {
    variant: {
      default: "bg-muted/10",
      dark: "border-border bg-background text-muted-foreground",
      accent: "border-brand-accent bg-brand-accent/10 text-brand-accent",
    },
    padding: {
      default: "mt-12",
      none: "",
      sm: "mt-4",
      lg: "mt-20",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "default",
  },
});

type FooterLink = { label: string; href: string };

export interface FooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {
  aRR?: boolean;
  aRRText?: string;
  links?: FooterLink[];
  logo?: React.ReactNode;
  logoOnClick?: () => void;
  year?: number;
}

function FooterContent({
  className,
  variant,
  padding,
  aRR = false,
  aRRText,
  year,
  logo,
  logoOnClick,
  links,
  ...props
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  let yearDisplay: string;
  if (year === undefined) {
    yearDisplay = `© ${currentYear}`;
  } else {
    if (year > currentYear) {
      throw new Error(
        `[Footer] year prop (${year}) cannot be in the future (${currentYear}).`
      );
    }
    yearDisplay =
      year === currentYear ? `© ${currentYear}` : `© ${year}–${currentYear}`;
  }

  const defaultArrTxt = "Not affiliated with Mojang or Microsoft.";
  const resolvedLinks = Array.isArray(links) && links.length > 0 ? links : [];

  return (
    <footer
      className={cn(footerVariants({ variant, padding, className }))}
      id="footer"
      {...props}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-8 font-mono text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:items-start">
          {logo && (
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {logoOnClick ? (
                <Button className="h-auto p-0" onClick={logoOnClick} size="sm" variant="ghost">
                  {logo}
                </Button>
              ) : (
                <div>{logo}</div>
              )}
            </motion.div>
          )}
          <motion.div
            className="flex flex-col items-center sm:items-start"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="block text-center sm:text-left">
              <span className="font-semibold text-brand-accent">
                {yearDisplay} ItzzMateo Studios.
              </span>
              {aRR && <span className="ml-1">All Rights Reserved.</span>}
              <span className="ml-1">
                {typeof aRRText === "string"
                  ? aRRText
                  : aRRText || aRR
                    ? !aRRText && aRR
                      ? defaultArrTxt
                      : null
                    : defaultArrTxt}
              </span>
            </span>
            <span className="mt-1 block text-center text-muted-foreground/80 sm:text-left">
              <span className="font-semibold text-brand-accent">
                © 2026 VOMLabs.
              </span>{" "}
              All Rights Reserved.
            </span>
          </motion.div>
        </div>
        {resolvedLinks.length > 0 && (
          <motion.nav
            aria-label="Footer Navigation"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <ul className="flex flex-wrap items-center gap-2">
              {resolvedLinks.map((link, i) => (
                <motion.li
                  key={link.href + link.label + i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
                >
                  <Button
                    asChild
                    className="px-2 text-brand-accent text-xs transition-colors hover:text-brand-accent/90"
                    size="sm"
                    variant="link"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </div>
    </footer>
  );
}

export { FooterContent as Footer };
