import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import React from "react";

const footerVariants = cva(
  "border-t border-border w-full",
  {
    variants: {
      variant: {
        default: "bg-muted/10",
        dark: "bg-background text-muted-foreground border-border",
        accent: "bg-brand-accent/10 text-brand-accent border-brand-accent",
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
  }
);

type FooterLink = { label: string; href: string };

export interface FooterProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof footerVariants> {
  aRR?: boolean;                      // All Rights Reserved flag
  aRRText?: string;                   // custom disclaimer/legal text
  year?: number;                      // copyright/founding year
  logo?: React.ReactNode;             // logo element
  logoOnClick?: () => void;           // click handler for logo
  links?: FooterLink[];               // array of { label, href }
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
  if (year !== undefined) {
    if (year > currentYear) {
      throw new Error(`[Footer] year prop (${year}) cannot be in the future (${currentYear}).`);
    }
    yearDisplay = year !== currentYear
      ? `© ${year}–${currentYear}`
      : `© ${currentYear}`;
  } else {
    yearDisplay = `© ${currentYear}`;
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
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-4 items-center sm:flex-row sm:justify-between sm:items-center font-mono text-xs text-muted-foreground">
        <div className="flex flex-col items-center sm:items-start gap-2 w-full sm:w-auto">
          {/* Optional logo */}
          {logo && (
            <div className="mb-2">
              {logoOnClick ? (
                <button onClick={logoOnClick} className="cursor-pointer">
                  {logo}
                </button>
              ) : (
                <div>{logo}</div>
              )}
            </div>
          )}
          <span className="block text-center sm:text-left">
            <span className="text-brand-accent font-semibold">
              {yearDisplay} DevFlare.
            </span>
            {/* Show ARR if enabled */}
            {aRR && <span className="ml-1">All Rights Reserved.</span>}
            {/* Custom/legal text always shown if provided. Otherwise show default */}
            <span className="ml-1">
              {typeof aRRText === "string"
                ? aRRText
                : !aRRText && !aRR
                  ? defaultArrTxt
                  : (!aRRText && aRR ? defaultArrTxt : null)
              }
            </span>
          </span>
        </div>
        {resolvedLinks.length > 0 && (
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap items-center gap-2">
              {resolvedLinks.map((link, i) => (
                <li key={link.href + link.label + i}>
                  <Button
                    asChild
                    variant="link"
                    size="sm"
                    className="px-2 text-xs text-brand-accent hover:text-brand-accent/90 transition-colors"
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
