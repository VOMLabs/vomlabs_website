"use client";

import LegalPageLayout from "@/components/legal/legal-page-layout";
import SectionCard from "@/components/legal/section-card";
import Link from "next/link";

const sections = [
  {
    title: "Independent Project",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        <strong>VOMLabs</strong> is an independent open source
        organization and is{" "}
        <span className="text-brand-accent font-medium">
          not affiliated with Mojang, Microsoft, or any of their
          subsidiaries
        </span>
        . It is not endorsed or supported by them in any way.
      </p>
    ),
    text:
      "VOMLabs is an independent open source organization and is not affiliated with Mojang, Microsoft, or any of their subsidiaries. It is not endorsed or supported by them in any way.",
  },
  {
    title: "Publisher Information",
    content: (
      <div className="space-y-2 text-muted-foreground text-sm font-mono">
        <div className="flex items-start gap-2">
          <span className="text-brand-accent shrink-0">$</span>
          <div>
            <span className="text-foreground">Project Lead:</span> Tobics, Jakob & Mateo
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-brand-accent shrink-0">$</span>
          <div>
            <span className="text-foreground">Website:</span>{" "}
            <a href="https://vomlabs.com" className="text-brand-accent hover:underline">
              vomlabs.com
            </a>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-brand-accent shrink-0">$</span>
          <div>
            <span className="text-foreground">Legal Contact:</span>{" "}
            <a href="mailto:legal@vomlabs.com" className="text-brand-accent hover:underline">
              legal@vomlabs.com
            </a>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-brand-accent shrink-0">$</span>
          <div>
            <span className="text-foreground">Support:</span>{" "}
            <a href="mailto:support@vomlabs.com" className="text-brand-accent hover:underline">
              support@vomlabs.com
            </a>
          </div>
        </div>
      </div>
    ),
    text:
      "Project Lead: Tobics, Jakob & Mateo\nWebsite: vomlabs.com\nLegal Contact: legal@vomlabs.com\nSupport: support@vomlabs.com",
  },
  {
    title: "Disclaimer",
    content: (
      <ul className="space-y-3 text-muted-foreground">
        <li className="flex items-start gap-3">
          <span className="text-brand-accent mt-1 font-mono">$</span>
          <span>
            <span className="font-medium text-foreground">Minecraft</span> is a
            trademark of Microsoft and Mojang. This project is{" "}
            <span className="text-brand-accent">not endorsed or supported</span>{" "}
            by Microsoft or Mojang.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-brand-accent mt-1 font-mono">$</span>
          <span>
            VOMLabs software provides{" "}
            <span className="font-medium text-foreground">no warranty</span> and
            is supplied &quot;as-is&quot;. Use at your own risk.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-brand-accent mt-1 font-mono">$</span>
          <span>
            We collect{" "}
            <span className="font-medium text-foreground">
              no telemetry or tracking data
            </span>
            . See our{" "}
            <Link href="/privacy" className="text-brand-accent hover:underline">
              Privacy Policy
            </Link>{" "}
            for details.
          </span>
        </li>
      </ul>
    ),
    text:
      "Minecraft is a trademark of Microsoft and Mojang. This project is not endorsed or supported by Microsoft or Mojang.\nVOMLabs software provides no warranty and is supplied as-is. Use at your own risk.\nWe collect no telemetry or tracking data. See our Privacy Policy for details.",
  },
  {
    title: "Open Source",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-4">
          VOMLabs projects and this website are open source. View the source
          code and license on GitHub.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/VOMLabs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 bg-card/30 hover:bg-card/50 text-sm font-mono text-muted-foreground hover:text-foreground transition-all"
          >
            $ gh repo view VOMLabs
          </a>
        </div>
      </>
    ),
    text:
      "VOMLabs projects and this website are open source. View the source code and license on GitHub at github.com/VOMLabs.",
  },
  {
    title: "Quick Links",
    content: (
      <div className="flex flex-wrap gap-3">
        <Link
          href="/privacy"
          className="px-4 py-2 rounded-lg border border-border/60 bg-card/30 hover:bg-card/50 text-sm font-mono text-muted-foreground hover:text-foreground transition-all"
        >
          $ cat /privacy
        </Link>
        <Link
          href="/terms"
          className="px-4 py-2 rounded-lg border border-border/60 bg-card/30 hover:bg-card/50 text-sm font-mono text-muted-foreground hover:text-foreground transition-all"
        >
          $ cat /terms
        </Link>
        <Link
          href="/tos"
          className="px-4 py-2 rounded-lg border border-border/60 bg-card/30 hover:bg-card/50 text-sm font-mono text-muted-foreground hover:text-foreground transition-all"
        >
          $ cat /tos
        </Link>
      </div>
    ),
    text: "Quick links: /privacy, /terms, /tos",
  },
];

export default function LegalNotice() {
  return (
    <LegalPageLayout
      title="Legal Notice"
      subtitle="Important legal information about VOMLabs and this website."
      filename="legal-notice.txt"
      plaintextSections={sections.map((s) => ({ title: s.title, text: s.text }))}
    >
      {sections.map((section, i) => (
        <SectionCard key={section.title} title={section.title} index={i}>
          {section.content}
        </SectionCard>
      ))}
    </LegalPageLayout>
  );
}
