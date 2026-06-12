"use client";

import LegalPageLayout from "@/components/legal/legal-page-layout";
import SectionCard from "@/components/legal/section-card";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    content: (
      <p className="text-muted-foreground leading-relaxed">
        These Terms of Use (&quot;Terms&quot;) govern your use of{" "}
        <strong>VOMLabs</strong> software and this website. By accessing or
        using VOMLabs software, you agree to be bound by these Terms.
      </p>
    ),
    text:
      "These Terms of Use govern your use of VOMLabs software and this website. By accessing or using VOMLabs software, you agree to be bound by these Terms.",
  },
  {
    title: "Eligibility",
    content: (
      <ul className="space-y-3 text-muted-foreground">
        <li className="flex items-start gap-3">
          <span className="text-brand-accent mt-1 font-mono">$</span>
          <span>
            VOMLabs software is for{" "}
            <span className="font-medium text-foreground">
              personal, non-commercial use
            </span>{" "}
            only. If you&apos;d like to use our for{" "}
            <span className="font-medium text-foreground">commercial use</span>
            , then you need to reach out to us to{" "}
            <span className="font-medium text-foreground">
              request a commercial license
            </span>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-brand-accent mt-1 font-mono">$</span>
          <span>
            You must comply with all applicable laws and respect the
            intellectual property rights of others.
          </span>
        </li>
      </ul>
    ),
    text:
      "VOMLabs software is for personal, non-commercial use only. For commercial use, request a commercial license.\nYou must comply with all applicable laws and respect the intellectual property rights of others.",
  },
  {
    title: "Acceptable Use",
    content: (
      <>
        <p className="text-muted-foreground mb-4">You agree NOT to:</p>
        <div className="space-y-2">
          {[
            "Use VOMLabs software for any illegal activities.",
            "Attempt to bypass, exploit, or compromise Minecraft servers or systems.",
            "Reverse engineer, decompile, or tamper with VOMLabs software.",
            "Violate Mojang's or Microsoft's End User License Agreement (EULA).",
          ].map((rule, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20"
            >
              <span className="text-destructive font-mono text-sm">✕</span>
              <span className="text-muted-foreground text-sm">{rule}</span>
            </div>
          ))}
        </div>
      </>
    ),
    text:
      "You agree NOT to:\n- Use VOMLabs software for any illegal activities.\n- Attempt to bypass, exploit, or compromise Minecraft servers or systems.\n- Reverse engineer, decompile, or tamper with VOMLabs software.\n- Violate Mojang's or Microsoft's EULA.",
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
        .{" "}
        <span className="text-brand-accent font-medium">No warranty</span> of
        any kind is provided, express or implied, including fitness for a
        particular purpose or non-infringement.
      </p>
    ),
    text:
      "VOMLabs software is provided as-is and as-available. No warranty of any kind is provided, express or implied, including fitness for a particular purpose or non-infringement.",
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
          {["Loss of data", "Business interruption", "Indirect or consequential damages"].map(
            (item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-brand-accent font-mono">$</span>
                <span>{item}</span>
              </li>
            )
          )}
        </ul>
      </>
    ),
    text:
      "In no event shall VOMLabs contributors be liable for any damages arising from your use or inability to use VOMLabs software. This includes loss of data, business interruption, and indirect or consequential damages.",
  },
  {
    title: "Intellectual Property",
    content: (
      <ul className="space-y-3 text-muted-foreground">
        <li className="flex items-start gap-3">
          <span className="text-brand-accent mt-1 font-mono">$</span>
          <span>
            <span className="font-medium text-foreground">Minecraft</span> is a
            trademark of Microsoft and Mojang. VOMLabs is independent and not
            affiliated.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-brand-accent mt-1 font-mono">$</span>
          <span>
            All third-party assets and content are property of their respective
            owners.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-brand-accent mt-1 font-mono">$</span>
          <span>
            VOMLabs software and this website are{" "}
            <span className="font-medium text-foreground">open source</span>.
            See{" "}
            <a
              href="https://github.com/VOMLabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent hover:underline"
            >
              GitHub
            </a>{" "}
            for details.
          </span>
        </li>
      </ul>
    ),
    text:
      "Minecraft is a trademark of Microsoft and Mojang. VOMLabs is independent and not affiliated.\nAll third-party assets and content are property of their respective owners.\nVOMLabs software and this website are open source. See GitHub for details.",
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
    text:
      "These Terms may be updated at any time. Continued use of VOMLabs software after changes constitutes acceptance of the new Terms.",
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
    text:
      "We reserve the right to revoke access to VOMLabs software or this website at any time for violation of these Terms or for any other reason.",
  },
  {
    title: "Contact",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Questions about these Terms? Contact us:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:support@vomlabs.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 bg-card/30 hover:bg-card/50 text-sm font-mono text-muted-foreground hover:text-foreground transition-all"
          >
            $ support@vomlabs.com
          </a>
          <Link
            href="/legal"
            className="px-4 py-2 rounded-lg border border-border/60 bg-card/30 hover:bg-card/50 text-sm font-mono text-muted-foreground hover:text-foreground transition-all"
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
          href="/legal"
          className="px-4 py-2 rounded-lg border border-border/60 bg-card/30 hover:bg-card/50 text-sm font-mono text-muted-foreground hover:text-foreground transition-all"
        >
          $ cat /legal
        </Link>
        <Link
          href="/privacy"
          className="px-4 py-2 rounded-lg border border-border/60 bg-card/30 hover:bg-card/50 text-sm font-mono text-muted-foreground hover:text-foreground transition-all"
        >
          $ cat /privacy
        </Link>
        <Link
          href="/tos"
          className="px-4 py-2 rounded-lg border border-border/60 bg-card/30 hover:bg-card/50 text-sm font-mono text-muted-foreground hover:text-foreground transition-all"
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
      title="Terms of Use"
      subtitle="The rules and conditions for using VOMLabs software."
      filename="terms-of-use.txt"
      plaintextSections={sections.map((s) => ({ title: s.title, text: s.text }))}
    >
      {sections.map((section, i) => (
        <SectionCard
          key={i}
          title={section.title}
          icon={section.icon}
          index={i}
        >
          {section.content}
        </SectionCard>
      ))}
    </LegalPageLayout>
  );
}
