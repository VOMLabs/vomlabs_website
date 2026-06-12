"use client";

import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import { downloadPlaintext } from "@/lib/legal-plaintext";

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  filename: string;
  children: React.ReactNode;
  plaintextSections: { title?: string; text: string }[];
}

export default function LegalPageLayout({
  title,
  subtitle,
  filename,
  children,
  plaintextSections,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col selection:bg-brand-accent/30 selection:text-brand-accent">
      <div className="fixed inset-0 z-[-2] bg-background" />
      <div
        className="fixed inset-0 z-[-1] opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <main className="flex-1 w-full pt-16">
        <section className="max-w-3xl mx-auto px-6 py-12 md:py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[11px] font-mono text-brand-accent mb-6 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              LEGAL
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              {title.split(" ").map((word, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i}>
                    <span className="text-brand-accent">{word}</span>
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto mt-4 leading-relaxed">
              {subtitle}
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-6">{children}</div>

          {/* Footer */}
          <hr className="my-12 border-border/40" />
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground font-mono">
              Last updated: May 2026
            </p>
            <button
              type="button"
              onClick={() => downloadPlaintext(filename, title, plaintextSections)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 bg-card/30 hover:bg-card/50 text-sm font-mono text-muted-foreground hover:text-foreground transition-all active:scale-[0.97]"
            >
              <FileDown className="size-4" />
              <span>$ cat {filename}</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
