"use client";

import { Check, Shield } from "lucide-react";
import Link from "next/link";
import LegalPageLayout from "@/components/legal/legal-page-layout";
import SectionCard from "@/components/legal/section-card";

const sections = [
  {
    title: "Our Commitment",
    icon: <Shield className="size-5" />,
    content: (
      <p className="text-muted-foreground leading-relaxed">
        <strong>VOMLabs</strong> is committed to protecting your privacy. We
        believe in{" "}
        <span className="font-medium text-brand-accent">
          minimal data collection
        </span>{" "}
        — your data stays on your machine.
      </p>
    ),
    text: "VOMLabs is committed to protecting your privacy. We believe in minimal data collection - your data stays on your machine.",
  },
  {
    title: "Data Collection",
    content: (
      <div className="space-y-4">
        {[
          {
            title: "Anonymous Statistics",
            desc: "If you use our plugins, we collect anonymous statistics using FastStats. This helps us understand how our software is used and how to improve it.",
          },
          {
            title: "No Personal Tracking",
            desc: "We do not track any personal data, usage patterns on our website, or individual player information.",
          },
          {
            title: "Opt-out Policy",
            desc: "Data collection for plugins is generally non-optional and hardcoded to ensure consistent quality. Some plugins may allow disabling anonymous stats via their configuration files.",
          },
        ].map((item, j) => (
          <div className="flex items-start gap-3" key={j}>
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <Check className="size-3.5" />
            </div>
            <div>
              <span className="font-medium font-mono text-foreground text-sm">
                {item.title}
              </span>
              <p className="mt-0.5 text-muted-foreground text-sm">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    ),
    text: "Anonymous Statistics: If you use our plugins, we collect anonymous statistics using FastStats.\nNo Personal Tracking: We do not track any personal data, usage patterns on our website, or individual player information.\nOpt-out Policy: Data collection for plugins is generally non-optional and hardcoded. Some plugins may allow disabling stats via config.",
  },
  {
    title: "Your Rights",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        Since we don&apos;t collect or store personal data, there&apos;s minimal
        data subject rights concerns. If you contact us, any information
        provided will be used{" "}
        <span className="font-medium text-foreground">
          solely for communication
        </span>{" "}
        regarding your inquiry.
      </p>
    ),
    text: "Since we don't collect or store personal data, there's minimal data subject rights concerns. If you contact us, any information provided will be used solely for communication regarding your inquiry.",
  },
  {
    title: "Contact",
    content: (
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          For privacy-related questions, contact us at:
        </p>
        <a
          className="inline-flex items-center gap-2 font-mono text-brand-accent text-sm hover:underline"
          href="mailto:privacy@vomlabs.com"
        >
          <span className="text-muted-foreground">$</span> privacy@vomlabs.com
        </a>
      </>
    ),
    text: "For privacy-related questions, contact us at: privacy@vomlabs.com",
  },
  {
    title: "Quick Links",
    content: (
      <div className="flex flex-wrap gap-3">
        <Link
          className="rounded-lg border border-border/60 bg-card/30 px-4 py-2 font-mono text-muted-foreground text-sm transition-all hover:bg-card/50 hover:text-foreground"
          href="/legal"
        >
          $ cat /legal
        </Link>
        <Link
          className="rounded-lg border border-border/60 bg-card/30 px-4 py-2 font-mono text-muted-foreground text-sm transition-all hover:bg-card/50 hover:text-foreground"
          href="/terms"
        >
          $ cat /terms
        </Link>
        <Link
          className="rounded-lg border border-border/60 bg-card/30 px-4 py-2 font-mono text-muted-foreground text-sm transition-all hover:bg-card/50 hover:text-foreground"
          href="/tos"
        >
          $ cat /tos
        </Link>
      </div>
    ),
    text: "Quick links: /legal, /terms, /tos",
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout
      filename="privacy-policy.txt"
      plaintextSections={sections.map((s) => ({
        title: s.title,
        text: s.text,
      }))}
      subtitle="How we handle your data and protect your privacy."
      title="Privacy Policy"
    >
      {sections.map((section, i) => (
        <SectionCard
          icon={section.icon}
          index={i}
          key={section.title}
          title={section.title}
        >
          {section.content}
        </SectionCard>
      ))}
    </LegalPageLayout>
  );
}
