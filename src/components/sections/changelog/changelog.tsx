"use client";

import { motion } from "framer-motion";
import { SparklesIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

const changelog = [
  {
    version: "alpha-0.0.0",
    displayVersion: "Alpha v0.0.0",
    date: "2026-03-27",
    isReleased: false,
    changes: [
      {
        type: "Added",
        items: [
          "Initial alpha release of the Vesper Client Desktop Client.",
          "Multi-platform builds for Windows (.exe), Mac (.dmg), and Linux (.AppImage, .deb, .rpm).",
          "Modern user interface with light and dark mode support.",
          "Launcher autoupdate support (checks for new versions on startup).",
          "Simple onboarding and account login flow.",
          "First implementation of Minecraft modpack installation for supported platforms.",
          "Integrated automatic Java runtime download for Minecraft instances.",
        ],
      },
      {
        type: "Known Issues",
        items: [
          "Authentication is basic and may not fully reflect future planned account features.",
          "Not all Minecraft versions, mods, or loaders are fully tested in this early alpha.",
          "By default minecraft version 1.20.1 is selected",
        ],
      },
    ],
  },
];

const typeStyles: Record<string, { bg: string; text: string; border: string }> = {
  Added: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20" },
  Improved: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
  Removed: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20" },
  Fixed: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20" },
  "Known Issues": { bg: "bg-yellow-400/10", text: "text-yellow-600", border: "border-yellow-400/20" },
};

function ChangelogItem({ entry }: { entry: typeof changelog[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative min-h-[200px]"
    >
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border lg:left-1/2 lg:-translate-x-px" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center w-8 h-8 rounded-full border border-brand-accent/30 bg-background text-brand-accent absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 z-10"
      >
        <span className="text-xs font-bold">{entry.version.replace(/[^0-9]/g, "").charAt(0) || "0"}</span>
      </motion.div>

      <div className="ml-12 lg:ml-0 lg:w-[calc(50%-2rem)] lg:odd:ml-auto">
        <div className="p-6 rounded-2xl border border-border bg-card/40 hover:bg-card/60 hover:border-brand-accent/30 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-brand-accent">{entry.displayVersion || entry.version}</h3>
              {!entry.isReleased && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-400/10 text-yellow-600 border border-yellow-400/20">
                  <ClockIcon className="w-3 h-3" />
                  Upcoming
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarIcon className="w-4 h-4" />
              {entry.date}
            </span>
          </div>

          <div className="space-y-5">
            {entry.changes.map((change) => (
              <div key={change.type}>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${typeStyles[change.type]?.bg || "bg-muted"} ${typeStyles[change.type]?.text || "text-muted-foreground"} ${typeStyles[change.type]?.border || "border-muted"}`}
                >
                  {change.type}
                </span>
                <ul className="mt-3 space-y-2">
                  {change.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-brand-accent mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ChangelogSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-64 bg-brand-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-brand-accent/10 border border-brand-accent/20"
          >
            <SparklesIcon className="w-4 h-4 text-brand-accent" />
            <span className="text-sm font-medium text-brand-accent">What's New</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
            Change<span className="text-brand-accent italic">log</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-6">
            Follow the evolution of Vesper Client. Check out our{" "}
            <Link
              className="text-brand-accent hover:underline"
              target="_blank"
              href="https://github.com/ArexLabs/vesper-client/blob/main/CHANGELOG.md"
            >
              CHANGELOG.md
            </Link>{" "}
            on GitHub for more details.
          </p>
          <div className="inline-flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>This is the Vesper Client <b>Desktop App</b> changelog. Use at your own risk.</span>
          </div>
        </motion.div>

        <div className="space-y-12">
          {changelog.map((entry) => (
            <ChangelogItem key={entry.version} entry={entry} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
