"use client";

import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import LegalPageLayout from "@/components/legal/legal-page-layout";
import SectionCard from "@/components/legal/section-card";

const sections = [
  {
    content: (
      <p className="text-muted-foreground leading-relaxed">
        These Terms of Use (&quot;Terms&quot;) govern your use of{" "}
        <strong>VOMLabs</strong> software and this website. By accessing or
        using VOMLabs software, you agree to be bound by these Terms.
      </p>
    ),
    text: "These Terms of Use govern your use of VOMLabs software and this website. By accessing or using VOMLabs software, you agree to be bound by these Terms.",
  },
  {
    title: "Eligibility",
    content: (
      <ul className="space-y-3 text-muted-foreground">
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>
            VOMLabs software is for{" "}
            <span className="font-medium text-foreground">
              personal, non-commercial use
            </span>{" "}
            only. If you&apos;d like to use our for{" "}
            <span className="font-medium text-foreground">commercial use</span>,
            then you need to reach out to us to{" "}
            <span className="font-medium text-foreground">
              request a commercial license
            </span>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>
            You must comply with all applicable laws and respect the
            intellectual property rights of others.
          </span>
        </li>
      </ul>
    ),
    text: "VOMLabs software is for personal, non-commercial use only. For commercial use, request a commercial license.\nYou must comply with all applicable laws and respect the intellectual property rights of others.",
  },
  {
    title: "Acceptable Use",
    content: (
      <>
        <p className="mb-4 text-muted-foreground">You agree NOT to:</p>
        <div className="space-y-2">
          {[
            "Use VOMLabs software for any illegal activities.",
            "Attempt to bypass, exploit, or compromise Minecraft servers or systems.",
            "Reverse engineer, decompile, or tamper with VOMLabs software.",
            "Violate Mojang's or Microsoft's End User License Agreement (EULA).",
          ].map((rule, i) => (
            <div
              className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3"
              key={i}
            >
              <span className="font-mono text-destructive text-sm">✕</span>
              <span className="text-muted-foreground text-sm">{rule}</span>
            </div>
          ))}
        </div>
      </>
    ),
    text: "You agree NOT to:\n- Use VOMLabs software for any illegal activities.\n- Attempt to bypass, exploit, or compromise Minecraft servers or systems.\n- Reverse engineer, decompile, or tamper with VOMLabs software.\n- Violate Mojang's or Microsoft's EULA.",
  },
  {
    title: "No Warranty",
    icon: <TriangleAlert className="size-5" />,
    content: (
      <p className="text-muted-foreground leading-relaxed">
        VOMLabs software is provided{" "}
        <span className="font-medium text-foreground">&quot;as is&quot;</span>{" "}
        and{" "}
        <span className="font-medium text-foreground">
          &quot;as available&quot;
        </span>
        . <span className="font-medium text-brand-accent">No warranty</span> of
        any kind is provided, express or implied, including fitness for a
        particular purpose or non-infringement.
      </p>
    ),
    text: "VOMLabs software is provided as-is and as-available. No warranty of any kind is provided, express or implied, including fitness for a particular purpose or non-infringement.",
  },
  {
    title: "Limitation of Liability",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed">
          In no event shall VOMLabs contributors be liable for any damages
          arising from your use or inability to use VOMLabs software.
        </p>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          {[
            "Loss of data",
            "Business interruption",
            "Indirect or consequential damages",
          ].map((item, i) => (
            <li className="flex items-start gap-2 text-sm" key={i}>
              <span className="font-mono text-brand-accent">$</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
    text: "In no event shall VOMLabs contributors be liable for any damages arising from your use or inability to use VOMLabs software. This includes loss of data, business interruption, and indirect or consequential damages.",
  },
  {
    title: "Intellectual Property",
    content: (
      <ul className="space-y-3 text-muted-foreground">
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>
            <span className="font-medium text-foreground">Minecraft</span> is a
            trademark of Microsoft and Mojang. VOMLabs is independent and not
            affiliated.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>
            All third-party assets and content are property of their respective
            owners.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 font-mono text-brand-accent">$</span>
          <span>
            VOMLabs software and this website are{" "}
            <span className="font-medium text-foreground">open source</span>.
            See{" "}
            <a
              className="text-brand-accent hover:underline"
              href="https://github.com/VOMLabs"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>{" "}
            for details.
          </span>
        </li>
      </ul>
    ),
    text: "Minecraft is a trademark of Microsoft and Mojang. VOMLabs is independent and not affiliated.\nAll third-party assets and content are property of their respective owners.\nVOMLabs software and this website are open source. See GitHub for details.",
  },
  {
    title: "Changes to Terms",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        These Terms may be updated at any time.{" "}
        <span className="font-medium text-foreground">Continued use</span> of
        VOMLabs software after changes constitutes acceptance of the new Terms.
      </p>
    ),
    text: "These Terms may be updated at any time. Continued use of VOMLabs software after changes constitutes acceptance of the new Terms.",
  },
  {
    title: "Termination",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        We reserve the right to{" "}
        <span className="font-medium text-foreground">revoke access</span> to
        VOMLabs software or this website at any time for violation of these
        Terms or for any other reason.
      </p>
    ),
    text: "We reserve the right to revoke access to VOMLabs software or this website at any time for violation of these Terms or for any other reason.",
  },
  {
    title: "Contact",
    content: (
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Questions about these Terms? Contact us:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/30 px-4 py-2 font-mono text-muted-foreground text-sm transition-all hover:bg-card/50 hover:text-foreground"
            href="mailto:support@vomlabs.com"
          >
            $ support@vomlabs.com
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
    text: "Questions about these Terms? Contact us at: support@vomlabs.com",
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
          href="/tos"
        >
          $ cat /tos
        </Link>
      </div>
    ),
    text: "Quick links: /legal, /privacy, /tos",
  },
];

export default function TermsOfUse() {
  return (
    <LegalPageLayout
      filename="terms-of-use.txt"
      plaintextSections={sections.map((s) => ({
        title: s.title,
        text: s.text,
      }))}
      subtitle="The rules and conditions for using VOMLabs software."
      title="Terms of Use"
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
