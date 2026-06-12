"use client";

import {
  Hero,
  FeatureCards,
  performance_comparison,
  beta_waitlist,
  for_developers,
  faq as FAQ,
} from "@/components/sections/home";

interface FAQItem {
  question: string;
  answer: string;
}

export default function HomeClient({ faqs }: { faqs: FAQItem[] }) {
  return (
    <>
      <Hero />
      <FeatureCards />
      {performance_comparison()}
      {beta_waitlist()}
      {for_developers()}
      <FAQ faqs={faqs} />
    </>
  );
}
