import { cva, type VariantProps } from "class-variance-authority";
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
  aRR?: boolean; // All Rights Reserved flag
  aRRText?: string; // custom disclaimer/legal text
  links?: FooterLink[]; // array of { label, href }
  logo?: React.ReactNode; // logo element
  logoOnClick?: () => void; // click handler for logo
  year?: number; // copyright/founding year
}

export function Footer({
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

  // Validate custom year logic
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

  // Default disclaimer text
  const defaultArrTxt = "Not affiliated with Mojang or Microsoft.";

  // Only use user-provided links, show nothing if not provided or empty
  const resolvedLinks = Array.isArray(links) && links.length > 0 ? links : [];

  return (
    <footer
      className={cn(footerVariants({ variant, padding, className }))}
      id="footer"
      {...props}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-8 font-mono text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:items-start">
          {/* Optional logo */}
          {logo && (
            <div className="mb-2">
              {logoOnClick ? (
                <button className="cursor-pointer" onClick={logoOnClick}>
                  {logo}
                </button>
              ) : (
                <div>{logo}</div>
              )}
            </div>
          )}
          <div className="flex flex-col items-center sm:items-start">
            <span className="block text-center sm:text-left">
              <span className="font-semibold text-brand-accent">
                {yearDisplay} ItzzMateo Studios.
              </span>
              {/* Show ARR if enabled */}
              {aRR && <span className="ml-1">All Rights Reserved.</span>}
              {/* Custom/legal text always shown if provided. Otherwise show default */}
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
          </div>
        </div>
        {resolvedLinks.length > 0 && (
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap items-center gap-2">
              {resolvedLinks.map((link, i) => (
                <li key={link.href + link.label + i}>
                  <Button
                    asChild
                    className="px-2 text-brand-accent text-xs transition-colors hover:text-brand-accent/90"
                    size="sm"
                    variant="link"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </footer>
  );
}
