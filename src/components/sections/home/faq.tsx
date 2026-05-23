"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { faqs } from "@/data/faqs";

const HOMEPAGE_FAQ_COUNT = 6;

function AccordionFAQ({ limit = faqs.length }: { limit?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (idx: number) => setOpenIndex(prev => prev === idx ? null : idx);
  const displayFaqs = faqs.slice(0, limit);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {displayFaqs.map((faq, i) => (
        <motion.div
          key={faq.question}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="rounded-xl bg-muted/30 border border-border/60 hover:border-brand-accent/50 transition-all duration-300 overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none group"
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
          >
            <span className="font-mono font-semibold text-foreground group-hover:text-brand-accent transition-colors">
              {faq.question}
            </span>
            <ChevronDownIcon
              className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180 text-brand-accent" : "text-muted-foreground"}`}
            />
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="px-5 pb-5 text-muted-foreground"
              >
                {faq.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export default function FAQ() {
  const visibleCount = HOMEPAGE_FAQ_COUNT;

  return (
    <section id="faq" className="max-w-6xl mx-auto px-6 py-24 border-t border-border/50 relative">
      <div className="absolute left-1/2 top-[20%] -translate-x-1/2 w-[60vw] max-w-2xl h-[110px] bg-brand-accent/10 blur-[75px] -z-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 24 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.7 }} 
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-foreground mb-4 tracking-tight">
          FAQ<span className="text-brand-accent">.</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed md:text-lg">
          Answers to what people usually want to know about Vesper and why it is different.
        </p>
      </motion.div>

      <AccordionFAQ limit={visibleCount} />

      {faqs.length > visibleCount && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mt-8 text-center"
        >
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="relative inline-flex flex-col items-center gap-4 bg-background px-8 py-4">
            <p className="text-muted-foreground">
              Showing {visibleCount} of {faqs.length} questions
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-brand-accent text-background font-mono font-semibold hover:bg-brand-accent/90 transition-colors"
            >
              View All FAQ
            </Link>
          </div>
        </motion.div>
      )}
    </section>
  );
}
