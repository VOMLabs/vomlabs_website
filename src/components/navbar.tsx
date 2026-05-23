"use client";

import { Menu, X, ArrowDownCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";

const navLinks = [
  { href: "https://docs.vomlabs.com", label: "Docs", external: true },
  { href: "https://github.com/vomlabs", label: "GitHub", external: true },
  { href: "#staff", label: "Team", external: false },
  { href: "https://dc.vomlabs.de", label: "Discord", external: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50"
        >
          <Image alt="Logo" src={"/logo.png"} height={32} width={32} />
          VOMLabs
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
              >
                {link.label}
              </Link>
            ),
          )}
          <ModeToggle />
          <a
            href="https://github.com/vomlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer bg-red-500 text-white px-3 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 transition hover:bg-red-400"
          >
            <ArrowDownCircle size={18} /> Browse GitHub
          </a>
        </nav>

        <button
          type="button"
          className="flex items-center justify-center p-2 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-5 w-5 text-neutral-900 dark:text-neutral-50" />
          ) : (
            <Menu className="h-5 w-5 text-neutral-900 dark:text-neutral-50" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-neutral-200 bg-red-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
            <div className="pt-2">
              <ModeToggle />
            </div>
            <a
              href="https://github.com/vomlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer bg-red-500 text-white px-3 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 transition hover:bg-red-400 w-fit"
              onClick={() => setIsOpen(false)}
            >
              <ArrowDownCircle size={18} /> Browse GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
