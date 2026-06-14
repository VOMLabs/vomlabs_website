"use client";

import { TriangleAlert, User, Zap } from "lucide-react";
import Link from "next/link";
import LegalPageLayout from "@/components/legal/legal-page-layout";
import SectionCard from "@/components/legal/section-card";

const sections = [
  {
    content: (
      <p className="text-muted-foreground leading-relaxed">
        These Terms of Service (&quot;TOS&quot;) explain the rules and
        expectations for using <strong>VOMLabs</strong> software and this
        website. By accessing or using VOMLabs software, you agree to abide by
        these Terms of Service.
      </p>
    ),
    text: "These Terms of Service explain the rules and expectations for using VOMLabs software and this website. By accessing or using VOMLabs software, you agree to abide by these Terms of Service.",
  },
  {
    title: "Who Can Use VOMLabs Software",
    icon: <User className="size-5" />,
    content: (
      <ul className="space-y-3 text-muted-foreground">
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>
            VOMLabs software is for{" "}
            <span className="font-medium text-foreground">
              personal, non-commercial use
            </span>{" "}
            only. For commercial use, request a commercial license.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>
            You must be of legal age to use this software in your jurisdiction.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>
            You must not violate any applicable laws or infringe intellectual
            property rights.
          </span>
        </li>
      </ul>
    ),
    text: "VOMLabs software is for personal, non-commercial use only.\nYou must be of legal age to use this software in your jurisdiction.\nYou must not violate any applicable laws or infringe intellectual property rights.",
  },
  {
    title: "Service Rules",
    content: (
      <>
        <p className="mb-4 text-muted-foreground">
          When using VOMLabs software, you must NOT:
        </p>
        <div className="space-y-2">
          {[
            "Use the service for any illegal purposes",
            "Hack, exploit, or attempt to bypass security measures",
            "Reverse engineer or decompile the software",
            "Violate Mojang's or Microsoft's EULA",
            "Attempt to damage or disrupt the service or servers",
          ].map((rule, i) => (
            <div
              className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3"
              key={i}
            >
              <span className="shrink-0 font-mono text-destructive text-sm">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <span className="text-muted-foreground text-sm">{rule}</span>
            </div>
          ))}
        </div>
      </>
    ),
    text: "When using VOMLabs software, you must NOT:\n- Use the service for any illegal purposes\n- Hack, exploit, or attempt to bypass security measures\n- Reverse engineer or decompile the software\n- Violate Mojang's or Microsoft's EULA\n- Attempt to damage or disrupt the service or servers",
  },
  {
    title: "Service Availability",
    icon: <Zap className="size-5" />,
    content: (
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          VOMLabs software and this website are provided{" "}
          <span className="font-medium text-foreground">&quot;as is&quot;</span>{" "}
          and{" "}
          <span className="font-medium text-foreground">
            &quot;as available&quot;
          </span>
          .
        </p>
        <p className="text-muted-foreground text-sm">
          <span className="font-medium text-brand-accent">No warranty</span> —
          express or implied — including fitness for a particular purpose,
          non-infringement, or uninterrupted/error-free operation.
        </p>
      </>
    ),
    text: "VOMLabs software and this website are provided as-is and as-available. No warranty, express or implied, including fitness for a particular purpose, non-infringement, or uninterrupted/error-free operation.",
  },
  {
    title: "Liability",
    icon: <TriangleAlert className="size-5" />,
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed">
          VOMLabs contributors are{" "}
          <span className="font-medium text-brand-accent">not liable</span> for
          any damages arising from your use of VOMLabs software.
        </p>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          {[
            "Loss of data or game progress",
            "Business interruption",
            "Indirect, consequential, or punitive damages",
          ].map((item, i) => (
            <li className="flex items-start gap-2 text-sm" key={i}>
              <span className="font-mono text-brand-accent">$</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
    text: "VOMLabs contributors are not liable for any damages arising from your use of VOMLabs software, including loss of data, business interruption, and indirect or consequential damages.",
  },
  {
    title: "Ownership",
    content: (
      <ul className="space-y-3 text-muted-foreground">
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>Minecraft is a trademark of Microsoft and Mojang.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>
            VOMLabs is independent and not affiliated with Mojang or Microsoft.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>
            All referenced content and assets belong to their respective owners.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>VOMLabs is open source. View on GitHub.</span>
        </li>
      </ul>
    ),
    text: "Minecraft is a trademark of Microsoft and Mojang.\nVOMLabs is independent and not affiliated with Mojang or Microsoft.\nAll referenced content and assets belong to their respective owners.\nVOMLabs is open source. View on GitHub.",
  },
  {
    title: "Service Changes",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        We reserve the right to{" "}
        <span className="font-medium text-foreground">
          modify, suspend, or discontinue
        </span>{" "}
        any part of VOMLabs software at any time. These Terms may be updated,
        and continued use constitutes acceptance of changes.
      </p>
    ),
    text: "We reserve the right to modify, suspend, or discontinue any part of VOMLabs software at any time. These Terms may be updated, and continued use constitutes acceptance of changes.",
  },
  {
    title: "Termination",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed">
          Your access may be{" "}
          <span className="font-medium text-foreground">
            revoked at any time
          </span>
          , with or without notice, for:
        </p>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          {[
            "Violation of these Terms",
            "Illegal activity",
            "Any reason at our discretion",
          ].map((item, i) => (
            <li className="flex items-start gap-2 text-sm" key={i}>
              <span className="font-mono text-destructive">$</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
    text: "Your access may be revoked at any time, with or without notice, for violation of these Terms, illegal activity, or any reason at our discretion.",
  },
  {
    title: "Contact",
    content: (
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Questions about these Terms of Service?
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/30 px-4 py-2 font-mono text-muted-foreground text-sm transition-all hover:bg-card/50 hover:text-foreground"
            href="mailto:support@devflare.de"
          >
            $ support@devflare.de
          </a>
          <Link
            className="rounded-lg border border-border/60 bg-card/30 px-4 py-2 font-mono text-muted-foreground text-sm transition-all hover:bg-card/50 hover:text-foreground"
            href="/legal"
          >
            $ cat /legal
          </Link>
        </div>
      </>
    ),
    text: "Questions about these Terms of Service? Contact us at: support@devflare.de",
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
      </div>
    ),
    text: "Quick links: /legal, /privacy, /terms",
  },
];

export default function TermsOfService() {
  return (
    <LegalPageLayout
      filename="terms-of-service.txt"
      plaintextSections={sections.map((s) => ({
        title: s.title,
        text: s.text,
      }))}
      subtitle="The service agreement for using VOMLabs software."
      title="Terms of Service"
    >
      {sections.map((section, i) => (
        <SectionCard
          icon={section.icon}
          index={i}
          key={i}
          title={section.title}
        >
          {section.content}
        </SectionCard>
      ))}
    </LegalPageLayout>
  );
}
