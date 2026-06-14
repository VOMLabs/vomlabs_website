"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { micromark } from "micromark";
import Link from "next/link";
import { useState } from "react";
import sanitizeHtml from "sanitize-html";
import { Button } from "@/components/ui/button";
import { FadeInView } from "@/components/ui/fade-in-view";

interface FAQItem {
  answer: string;
  question: string;
}

const HOMEPAGE_FAQ_COUNT = 6;

function AccordionFAQ({
  faqs,
  limit = faqs.length,
}: {
  faqs: FAQItem[];
  limit?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (idx: number) =>
    setOpenIndex((prev) => (prev === idx ? null : idx));
  const displayFaqs = faqs.slice(0, limit);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {displayFaqs.map((faq, i) => {
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
          <FadeInView
            className="overflow-hidden rounded-xl border border-border/60 bg-muted/30 transition-all duration-300 hover:border-brand-accent/50"
            delay={i * 0.05}
            key={faq.question}
          >
            <Button
              aria-expanded={openIndex === i}
              className="flex w-full justify-between gap-4 px-5 py-4"
              onClick={() => toggle(i)}
              variant="ghost"
            >
              <span className="font-mono font-semibold text-foreground group-hover:text-brand-accent">
                {faq.question}
              </span>
              <ChevronDownIcon
                className={`h-5 w-5 shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180 text-brand-accent" : "text-muted-foreground"}`}
              />
            </Button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  className="prose prose-sm prose-invert max-w-none px-5 pb-5 text-muted-foreground text-sm"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                  exit={{ height: 0, opacity: 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
          </FadeInView>
        );
      })}
    </div>
  );
}

export default function FAQ({ faqs }: { faqs: FAQItem[] }) {
  const visibleCount = HOMEPAGE_FAQ_COUNT;

  return (
    <section
      className="relative mx-auto max-w-6xl border-border/50 border-t px-6 py-24"
      id="faq"
    >
      <div className="pointer-events-none absolute top-[20%] left-1/2 -z-10 h-[110px] w-[60vw] max-w-2xl -translate-x-1/2 bg-brand-accent/10 blur-[75px]" />

      <FadeInView className="mb-12 text-center">
        <h2 className="mb-4 font-bold font-mono text-4xl text-foreground tracking-tight md:text-5xl">
          FAQ<span className="text-brand-accent">.</span>
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground leading-relaxed md:text-lg">
          Answers to what people usually want to know about VOMLabs and our
          approach to building great software.
        </p>
      </FadeInView>

      <AccordionFAQ faqs={faqs} limit={visibleCount} />

      {faqs.length > visibleCount && (
        <FadeInView className="relative mt-8 text-center" delay={0.3}>
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="relative inline-flex flex-col items-center gap-4 bg-background px-8 py-4">
            <p className="text-muted-foreground">
              Showing {visibleCount} of {faqs.length} questions
            </p>
            <Link
              className="inline-flex items-center gap-2 rounded-lg bg-brand-accent px-6 py-2.5 font-mono font-semibold text-background transition-colors hover:bg-brand-accent/90"
              href="/faq"
            >
              View All FAQ
            </Link>
          </div>
        </FadeInView>
      )}
    </section>
  );
}
