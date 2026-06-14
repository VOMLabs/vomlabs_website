"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-20 selection:bg-brand-accent/30 selection:text-brand-accent">
      {/* Ambient Glow Bg */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-64 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/5 blur-[120px]" />

      <motion.div
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 flex items-center gap-2 rounded-full border border-border bg-destructive/20 px-3 py-1.5"
        initial={{ y: 20, opacity: 0 }}
        role="alert"
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <XCircleIcon className="h-5 w-5 text-destructive" />
        <span className="font-medium font-mono text-destructive text-xs uppercase tracking-wide">
          404 — Not Found
        </span>
      </motion.div>

      <motion.h1
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl text-center font-bold text-5xl text-foreground tracking-tight md:text-7xl"
        initial={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        This page{" "}
        <span className="text-brand-accent italic">doesn&apos;t exist</span>
      </motion.h1>

      <motion.p
        animate={{ y: 0, opacity: 1 }}
        className="mt-6 max-w-2xl text-center text-lg text-muted-foreground md:text-xl"
        initial={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Sorry, we couldn&apos;t find the page you were looking for.
        <br />
        It may have been moved or deleted, or you mistyped the address.
      </motion.p>

      <motion.div
        animate={{ y: 0, opacity: 1 }}
        className="mt-10 flex items-center justify-center gap-4"
        initial={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link
          className="relative flex items-center gap-3 overflow-hidden rounded-lg border-2 border-transparent bg-foreground px-6 py-3 font-mono font-semibold text-background text-sm transition-all hover:border-brand-accent/40"
          href="/"
        >
          Go back home
        </Link>
      </motion.div>
    </div>
  );
}
