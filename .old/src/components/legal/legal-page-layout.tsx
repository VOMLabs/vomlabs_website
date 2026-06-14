"use client";

import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadPlaintext } from "@/lib/legal-plaintext";

interface LegalPageLayoutProps {
  children: React.ReactNode;
  filename: string;
  plaintextSections: { title?: string; text: string }[];
  subtitle: string;
  title: string;
}

export default function LegalPageLayout({
  title,
  subtitle,
  filename,
  children,
  plaintextSections,
}: LegalPageLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden selection:bg-brand-accent/30 selection:text-brand-accent">
      <div className="fixed inset-0 z-[-2] bg-background" />
      <div
        className="pointer-events-none fixed inset-0 z-[-1] opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none fixed top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-brand-accent/5 blur-[150px]" />

      <main className="w-full flex-1 pt-16">
        <section className="mx-auto max-w-3xl px-6 py-12 md:py-20">
          {/* Header */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1.5 font-mono text-[11px] text-brand-accent tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
              LEGAL
            </div>
            <h1 className="font-bold text-4xl text-foreground leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
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
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-6">{children}</div>

          {/* Footer */}
          <hr className="my-12 border-border/40" />
          <div className="flex flex-col items-center gap-4">
            <p className="font-mono text-muted-foreground text-sm">
              Last updated: May 2026
            </p>
            <Button
              className="border-border/60 bg-card/30 px-4 py-2 font-mono hover:bg-card/50"
              onClick={() =>
                downloadPlaintext(filename, title, plaintextSections)
              }
              variant="outline"
            >
              <FileDown className="size-4" />
              <span>$ cat {filename}</span>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
