"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const tags = [
  {
    label: "Minecraft Software",
    color:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    label: "Modern Websites",
    color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  },
  {
    label: "Open Source",
    color:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  {
    label: "Developer Tools",
    color:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export function Hero() {
  const [nextVersion, setNextVersion] = useState("");

  useEffect(() => {
    fetch("/api/next-version")
      .then((res) => res.json())
      .then((data) => setNextVersion(data.version))
      .catch(() => {});
  }, []);

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-accent/8 blur-[150px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-brand-accent/5 blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 h-[200px] w-[200px] rounded-full bg-brand-accent/5 blur-[80px]" />
      </div>
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4955a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Tags */}
        <motion.div
          {...fadeUp(0)}
          className="mb-8 flex flex-wrap justify-center gap-2"
        >
          {tags.map((tag) => (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-medium text-xs tracking-wide ${tag.color}`}
              key={tag.label}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {tag.label}
            </span>
          ))}
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-bold text-5xl text-foreground leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          We build for{" "}
          <span className="relative inline-block">
            <span className="text-brand-accent">Minecraft</span>
            <svg
              aria-hidden="true"
              className="absolute top-2/3 left-0 h-[0.58em] w-full fill-brand-accent/80"
              preserveAspectRatio="none"
              viewBox="0 0 418 42"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
          </span>{" "}
          &amp; the web
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg"
        >
          High-performance Minecraft software, modern websites, and developer
          tools — all open source and built with passion.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            className="group inline-flex items-center gap-2.5 rounded-xl border border-border bg-card/50 px-6 py-3 font-semibold text-foreground text-sm transition-all hover:bg-card active:scale-[0.97]"
            href="https://github.com/VOMLabs"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaGithub className="h-5 w-5" />
            GitHub
            <span className="text-muted-foreground transition-colors group-hover:text-foreground">
              →
            </span>
          </a>
          <Link
            className="group inline-flex items-center gap-2.5 rounded-xl bg-brand-accent px-6 py-3 font-semibold text-background text-sm transition-all hover:bg-brand-accent/90 active:scale-[0.97]"
            href="https://discord.vomlabs.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaDiscord className="h-5 w-5" />
            Join Discord
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div {...fadeUp(0.5)} className="mt-20">
          <Button
            className="flex-col gap-2 text-muted-foreground/60 hover:text-muted-foreground"
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            size="sm"
            variant="ghost"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
