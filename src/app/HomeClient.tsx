"use client";

import {
  Hero,
  FeatureCards,
  performance_comparison,
  beta_waitlist,
  social_proof,
  for_developers,
  system_requirements,
  faq as FAQ,
  download_cta,
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
      {social_proof()}
      {for_developers()}
      {system_requirements()}
      <FAQ faqs={faqs} />
      {download_cta()}
    </>
  );
}
