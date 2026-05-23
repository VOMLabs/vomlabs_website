"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon, ClipboardIcon, XCircleIcon, SparklesIcon, StarIcon, ArrowTopRightOnSquareIcon, RocketLaunchIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import Link from "next/link";

type os_type = "windows" | "mac" | "linux" | "unknown";

const install_scripts: Record<os_type, string> = {
  windows: "irm https://vesper.devflare.de/install | iex",
  mac: "curl -sSfL https://vesper.devflare.de/install | sh",
  linux: "curl -sSfL https://vesper.devflare.de/install | sh",
  unknown: "curl -sSfL https://vesper.devflare.de/install | sh",
};

const os_labels: Record<os_type, string> = {
  windows: "Windows",
  mac: "macOS / Linux",
  linux: "macOS / Linux",
  unknown: "macOS / Linux",
};

const features = [
  "Blazing fast startup",
  "Built-in mod support",
  "Modern & minimal UI",
  "Free & open source",
];

function detect_os(): os_type {
  if (typeof window === "undefined") return "unknown";
  const platform = navigator.platform.toLowerCase();
  const user_agent = navigator.userAgent.toLowerCase();

  if (platform.includes("win") || user_agent.includes("win")) return "windows";
  if (platform.includes("mac") || user_agent.includes("mac")) return "mac";
  if (platform.includes("linux") || user_agent.includes("linux")) return "linux";
  return "unknown";
}

export function hero() {
  const [os, set_os] = useState<os_type>("unknown");
  const [copy_state, set_copy_state] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    set_os(detect_os());
  }, []);

  async function copy_install_script() {
    try {
      await navigator.clipboard.writeText(install_scripts[os]);
      set_copy_state("copied");
      toast.success("Copied install script!");
      setTimeout(() => set_copy_state("idle"), 1800);
    } catch {
      set_copy_state("error");
      toast.error("Failed to copy install script.");
      setTimeout(() => set_copy_state("idle"), 2500);
    }
  }

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] py-20 px-6" id="hero">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-64 bg-brand-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-yellow-200/20 border border-yellow-400/30">
          <InformationCircleIcon className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-yellow-600">Stats shown are just placeholders</span>
        </motion.div>
   

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
          Minecraft Launchers, <span className="text-brand-accent italic">Redefined</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Built from scratch with <span className="text-foreground font-semibold">Rust + Tauri</span> for instant startup, minimal resource usage, and a modern native experience that puts you in control.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="flex flex-wrap justify-center gap-3 mb-10">
          {features.map((feature) => (
            <span key={feature} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 border border-border text-sm font-medium">
              <CheckCircleIcon className="w-4 h-4 text-brand-accent" />
              {feature}
            </span>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }} className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/ArexLabs/vesper-website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-foreground transition-all active:scale-95"
            >
              <StarIcon className="w-5 h-5 text-yellow-400" />
              Star on GitHub
            </a>
            <Link
              href="https://dc.devflare.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-brand-accent hover:bg-brand-accent/90 text-background transition-all active:scale-95"
            >
              Join Discord
            </Link>
          </div>

          <div className="w-full max-w-xl border border-border rounded-xl bg-card/80 backdrop-blur overflow-hidden opacity-60 pointer-events-none relative">
            <code className="block px-3 py-3 text-xs sm:text-sm font-mono text-muted-foreground truncate max-w-[calc(100%-2rem)] select-none">
              {install_scripts[os]}
            </code>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="px-3 py-1.5 rounded-full bg-background/80 backdrop-blur text-xs font-medium text-muted-foreground border border-border">
                Coming Soon
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            Installer under development
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
          </p>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="mt-8 text-sm text-muted-foreground">
          Currently targeting {os_labels[os]} · Public beta coming soon
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2"
      >
        <button
          type="button"
          onClick={() =>
            document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
