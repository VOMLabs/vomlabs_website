"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FaGithub, FaDiscord } from "react-icons/fa";
import Link from "next/link";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Hero() {
  const [nextVersion, setNextVersion] = useState("15.x.x");

  useEffect(() => {
    fetch("/api/next-version")
      .then((res) => res.json())
      .then((data) => setNextVersion(data.version))
      .catch(() => {});
  }, []);
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] py-24 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-accent/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-brand-accent/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] bg-brand-accent/5 rounded-full blur-[80px]" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4955a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center max-w-5xl mx-auto"
      >
        {/* Tags */}
        <motion.div
          variants={childVariants}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {tags.map((tag) => (
            <span
              key={tag.label}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium tracking-wide ${tag.color}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {tag.label}
            </span>
          ))}
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={childVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.05]"
        >
          We build for{" "}
          <span className="relative inline-block">
            <span className="text-brand-accent">Minecraft</span>
            <svg
              className="absolute -bottom-1.5 left-0 w-full h-3"
              viewBox="0 0 200 16"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M1 12 C 20 4, 30 16, 50 10 S 80 4, 100 12 S 130 4, 150 10 S 180 16, 199 8"
                stroke="var(--brand-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </span>{" "}
          &amp; the web
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={childVariants}
          className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          High-performance Minecraft software, modern websites, and developer
          tools — all open source and built with passion.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={childVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://github.com/VOMLabs"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-border bg-card/50 hover:bg-card text-foreground font-semibold text-sm transition-all active:scale-[0.97]"
          >
            <FaGithub className="w-5 h-5" />
            GitHub
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
              →
            </span>
          </a>
          <Link
            href="https://discord.vomlabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-background font-semibold text-sm transition-all active:scale-[0.97]"
          >
            <FaDiscord className="w-5 h-5" />
            Join Discord
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Terminal */}
        <motion.div variants={childVariants} className="mt-16 w-full max-w-md">
          <div className="rounded-xl border border-border/60 bg-[#0d1117] shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-[#161b22]">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              </div>
              <span className="text-[11px] text-white/40 font-mono ml-2 tracking-wide">
                bash
              </span>
            </div>
            <div className="px-4 py-3.5 space-y-1.5 font-mono text-[13px] leading-relaxed">
              <div>
                <span className="text-green-400">user@vomlabs</span>
                <span className="text-white/30">:</span>
                <span className="text-sky-400">~</span>
                <span className="text-white/30">$</span>{" "}
                <span className="text-white/80">ls</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-white/60">
                <span className="text-sky-400">src/</span>
                <span className="text-emerald-400">package.json</span>
                <span className="text-amber-400">tsconfig.json</span>
                <span className="text-white/40">README.md</span>
                <span className="text-rose-400">.env</span>
              </div>
              <div className="pt-1">
                <span className="text-green-400">user@vomlabs</span>
                <span className="text-white/30">:</span>
                <span className="text-sky-400">~</span>
                <span className="text-white/30">$</span>{" "}
                <span className="text-white/80">npm run dev</span>
              </div>
              <div className="text-emerald-400">
                &gt; vomlabs-website@1.0.0 dev
              </div>
              <div className="text-white/60">
                <span className="text-white/40">▲</span> Next.js {nextVersion}
              </div>
              <div className="text-white/60">
                <span className="text-emerald-400">✓</span> Ready in{" "}
                <span className="text-white/80">236ms</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-400">user@vomlabs</span>
                <span className="text-white/30">:</span>
                <span className="text-sky-400">~</span>
                <span className="text-white/30">$</span>
                <span className="inline-block w-2 h-4 bg-white/70 animate-pulse ml-0.5" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div variants={childVariants} className="mt-20">
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors group"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
