"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { faqs } from "@/data/faqs";
import Link from "next/link";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const query = searchQuery.toLowerCase();
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        (faq.answer?.toString().toLowerCase().includes(query) ?? false)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 selection:bg-brand-accent/30 selection:text-brand-accent">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Frequently Asked Questions<span className="text-brand-accent">.</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed md:text-lg">
            Everything you need to know about Vesper. Can&apos;t find an answer? Reach out on Discord or GitHub.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="relative max-w-xl mx-auto">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-accent/50" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-card/50 border border-brand-accent/20 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/50 text-foreground placeholder:text-muted-foreground transition-all"
            />
          </div>
        </motion.div>

        {filteredFAQs.length === 0 && searchQuery ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">
              No results for &quot;{searchQuery}&quot;
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
          >
            {filteredFAQs.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="border-b border-border/30 pb-8 pt-2 group hover:bg-card/30 -mx-4 px-4 rounded-xl transition-all duration-200"
              >
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <QuestionMarkCircleIcon className="w-5 h-5 text-brand-accent/50 shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">Still have questions?</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="https://dc.devflare.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-accent text-background font-semibold hover:bg-brand-accent/90 transition-all"
            >
              Join Discord
            </Link>
            <Link
              href="https://github.com/ArexLabs/vesper-client"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-accent/30 text-foreground hover:border-brand-accent hover:bg-brand-accent/10 transition-all"
            >
              View on GitHub
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
