"use client";

import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { FadeInView } from "@/components/ui/fade-in-view";
import { FeatureCard } from "@/components/ui/feature-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function beta_waitlist() {
  return (
    <section
      className="mx-auto max-w-4xl border-border/50 border-t px-6 py-24"
      id="beta"
    >
      <SectionHeading
        accent="Developer"
        description="Join our community and help build the future of Minecraft tooling."
      >
        Become a
      </SectionHeading>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          {
            title: "Join Our Community",
            description: "Connect with developers and contributors on Discord.",
            icon: UsersIcon,
          },
          {
            title: "Open Source",
            description:
              "Contribute to our projects on GitHub. All skill levels welcome.",
            icon: CodeBracketIcon,
          },
          {
            title: "Build with Us",
            description:
              "Work on Rust, Tauri, and web projects alongside experienced devs.",
            icon: WrenchScrewdriverIcon,
          },
        ].map((item, i) => (
          <FeatureCard
            delay={(i + 1) * 0.1}
            description={item.description}
            icon={<item.icon className="h-6 w-6" />}
            key={item.title}
            title={item.title}
            variant="minimal"
          />
        ))}
      </div>

      <FadeInView className="mt-8 text-center" delay={0.4}>
        <Link
          className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-semibold text-background text-sm transition-all hover:bg-brand-accent/90 active:scale-95"
          href="https://discord.vomlabs.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Join Discord to Apply
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
        </Link>
        <p className="mt-4 text-muted-foreground text-xs">
          Looking for Rust, Tauri, and web developers to join the team
        </p>
      </FadeInView>
    </section>
  );
}
