"use client";

import {
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { micromark } from "micromark";
import Link from "next/link";
import { useMemo, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { Input } from "@/components/ui/input";

interface FAQItem {
  answer: string;
  question: string;
}

export default function FAQContent({
  initialFAQs,
}: {
  initialFAQs: FAQItem[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) {
      return initialFAQs;
    }
    const query = searchQuery.toLowerCase();
    return initialFAQs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }, [searchQuery, initialFAQs]);

  return (
    <div className="min-h-screen px-6 pt-24 pb-16 selection:bg-brand-accent/30 selection:text-brand-accent">
      <div className="mx-auto max-w-5xl">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 font-bold text-4xl text-foreground tracking-tight md:text-5xl">
            Frequently Asked Questions
            <span className="text-brand-accent">.</span>
          </h1>
          <p className="mx-auto max-w-lg text-muted-foreground leading-relaxed md:text-lg">
            Everything you need to know about VOMLabs. Can&apos;t find an
            answer? Reach out on Discord or GitHub.
          </p>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative mx-auto max-w-xl">
            <MagnifyingGlassIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-brand-accent/50" />
            <Input
              className="w-full rounded-xl border-brand-accent/20 bg-card/50 py-3 pl-12"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              value={searchQuery}
            />
          </div>
        </motion.div>

        {filteredFAQs.length === 0 && searchQuery ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="py-12 text-center"
            initial={{ opacity: 0 }}
          >
            <p className="text-muted-foreground">
              No results for &quot;{searchQuery}&quot;
            </p>
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredFAQs.map((faq, i) => {
              const htmlContent = sanitizeHtml(micromark(faq.answer), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                  "img",
                  "code",
                  "pre",
                ]),
                allowedAttributes: {
                  ...sanitizeHtml.defaults.allowedAttributes,
                  a: ["href", "name", "target", "rel"],
                },
              });

              return (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="group -mx-4 rounded-xl border-border/30 border-b px-4 pt-2 pb-8 transition-all duration-200 hover:bg-card/30"
                  initial={{ opacity: 0, y: 15 }}
                  key={faq.question}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                    <QuestionMarkCircleIcon className="h-5 w-5 shrink-0 text-brand-accent/50" />
                    {faq.question}
                  </h3>
                  <div
                    className="prose prose-invert prose-sm max-w-none text-muted-foreground text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="mb-6 text-muted-foreground">Still have questions?</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-semibold text-background transition-all hover:bg-brand-accent/90"
              href="https://discord.vomlabs.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Join Discord
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-xl border border-brand-accent/30 px-6 py-3 text-foreground transition-all hover:border-brand-accent hover:bg-brand-accent/10"
              href="https://github.com/VOMLabs"
              rel="noopener noreferrer"
              target="_blank"
            >
              View on GitHub
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
