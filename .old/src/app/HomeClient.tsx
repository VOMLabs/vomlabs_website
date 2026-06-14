"use client";

import {
  beta_waitlist,
  faq as FAQ,
  FeatureCards,
  for_developers,
  Hero,
  performance_comparison,
} from "@/components/sections/home";

interface FAQItem {
  answer: string;
  question: string;
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
