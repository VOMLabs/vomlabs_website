"use client";

import { motion } from "framer-motion";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[70vh] selection:bg-brand-accent/30 selection:text-brand-accent">
      {/* Ambient Glow Bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-brand-accent/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 backdrop-blur-sm mb-8"
        role="status"
      >
        <ArrowPathIcon className="w-5 h-5 animate-spin text-brand-accent" />
        <span className="text-xs font-mono font-medium tracking-wide text-brand-accent uppercase">
          Loading
        </span>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold text-center tracking-tight text-foreground max-w-4xl"
      >
        Just a <span className="text-brand-accent italic">moment…</span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-2xl"
      >
        We&apos;re getting things ready for you. <br />
        The site will appear shortly.
      </motion.p>
    </div>
  );
}