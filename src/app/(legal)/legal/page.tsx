"use client";

import Link from "next/link";
import LegalPageLayout from "@/components/legal/legal-page-layout";
import SectionCard from "@/components/legal/section-card";

const sections = [
  {
    title: "Independent Project",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        <strong>VOMLabs</strong> is an independent open source organization and
        is{" "}
        <span className="font-medium text-brand-accent">
          not affiliated with Mojang, Microsoft, or any of their subsidiaries
        </span>
        . It is not endorsed or supported by them in any way.
      </p>
    ),
    text: "VOMLabs is an independent open source organization and is not affiliated with Mojang, Microsoft, or any of their subsidiaries. It is not endorsed or supported by them in any way.",
  },
  {
    title: "Publisher Information",
    content: (
      <div className="space-y-2 font-mono text-muted-foreground text-sm">
        <div className="flex items-start gap-2">
          <span className="shrink-0 text-brand-accent">$</span>
          <div>
            <span className="text-foreground">Project Lead:</span> Tobics, Jakob
            & Mateo
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="shrink-0 text-brand-accent">$</span>
          <div>
            <span className="text-foreground">Website:</span>{" "}
            <a
              className="text-brand-accent hover:underline"
              href="https://vomlabs.com"
            >
              vomlabs.com
            </a>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="shrink-0 text-brand-accent">$</span>
          <div>
            <span className="text-foreground">Legal Contact:</span>{" "}
            <a
              className="text-brand-accent hover:underline"
              href="mailto:legal@vomlabs.com"
            >
              legal@vomlabs.com
            </a>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="shrink-0 text-brand-accent">$</span>
          <div>
            <span className="text-foreground">Support:</span>{" "}
            <a
              className="text-brand-accent hover:underline"
              href="mailto:support@vomlabs.com"
            >
              support@vomlabs.com
            </a>
          </div>
        </div>
      </div>
    ),
    text: "Project Lead: Tobics, Jakob & Mateo\nWebsite: vomlabs.com\nLegal Contact: legal@vomlabs.com\nSupport: support@vomlabs.com",
  },
  {
    title: "Disclaimer",
    content: (
      <ul className="space-y-3 text-muted-foreground">
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>
            <span className="font-medium text-foreground">Minecraft</span> is a
            trademark of Microsoft and Mojang. This project is{" "}
            <span className="text-brand-accent">not endorsed or supported</span>{" "}
            by Microsoft or Mojang.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>
            VOMLabs software provides{" "}
            <span className="font-medium text-foreground">no warranty</span> and
            is supplied &quot;as-is&quot;. Use at your own risk.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>
            We collect{" "}
            <span className="font-medium text-foreground">
              no telemetry or tracking data
            </span>
            . See our{" "}
            <Link className="text-brand-accent hover:underline" href="/privacy">
              Privacy Policy
            </Link>{" "}
            for details.
          </span>
        </li>
      </ul>
    ),
    text: "Minecraft is a trademark of Microsoft and Mojang. This project is not endorsed or supported by Microsoft or Mojang.\nVOMLabs software provides no warranty and is supplied as-is. Use at your own risk.\nWe collect no telemetry or tracking data. See our Privacy Policy for details.",
  },
  {
    title: "Open Source",
    content: (
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          VOMLabs projects and this website are open source. View the source
          code and license on GitHub.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/30 px-4 py-2 font-mono text-muted-foreground text-sm transition-all hover:bg-card/50 hover:text-foreground"
            href="https://github.com/VOMLabs"
            rel="noopener noreferrer"
            target="_blank"
          >
            $ gh repo view VOMLabs
          </a>
        </div>
      </>
    ),
    text: "VOMLabs projects and this website are open source. View the source code and license on GitHub at github.com/VOMLabs.",
  },
  {
    title: "Quick Links",
    content: (
      <div className="flex flex-wrap gap-3">
        <Link
          className="rounded-lg border border-border/60 bg-card/30 px-4 py-2 font-mono text-muted-foreground text-sm transition-all hover:bg-card/50 hover:text-foreground"
          href="/privacy"
        >
          $ cat /privacy
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
    text: "Quick links: /privacy, /terms, /tos",
  },
];

export default function LegalNotice() {
  return (
    <LegalPageLayout
      filename="legal-notice.txt"
      plaintextSections={sections.map((s) => ({
        title: s.title,
        text: s.text,
      }))}
      subtitle="Important legal information about VOMLabs and this website."
      title="Legal Notice"
    >
      {sections.map((section, i) => (
        <SectionCard index={i} key={section.title} title={section.title}>
          {section.content}
        </SectionCard>
      ))}
    </LegalPageLayout>
  );
}
