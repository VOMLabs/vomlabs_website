"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-20 selection:bg-brand-accent/30 selection:text-brand-accent">
      {/* Ambient Glow Bg */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-64 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/5 blur-[120px]" />

      <motion.div
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 backdrop-blur-sm"
        initial={{ y: 30, opacity: 0 }}
        role="status"
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <ArrowPathIcon className="h-5 w-5 animate-spin text-brand-accent" />
        <span className="font-medium font-mono text-brand-accent text-xs uppercase tracking-wide">
          Loading
        </span>
      </motion.div>

      <motion.h1
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl text-center font-bold text-5xl text-foreground tracking-tight md:text-7xl"
        initial={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Just a <span className="text-brand-accent italic">moment…</span>
      </motion.h1>

      <motion.p
        animate={{ y: 0, opacity: 1 }}
        className="mt-6 max-w-2xl text-center text-lg text-muted-foreground md:text-xl"
        initial={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        We&apos;re getting things ready for you. <br />
        The site will appear shortly.
      </motion.p>
    </div>
  );
}
