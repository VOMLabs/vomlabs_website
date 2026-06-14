"use client";

import {
  CodeBracketIcon,
  CommandLineIcon,
  CpuChipIcon,
  CubeTransparentIcon,
  GlobeAltIcon,
  ServerIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { FadeInView } from "@/components/ui/fade-in-view";
import { FeatureCard } from "@/components/ui/feature-card";
import { SectionHeading } from "@/components/ui/section-heading";

const dev_features = [
  {
    title: "Powerful APIs",
    description:
      "Hook into our core systems with well-documented, type-safe APIs designed for extensibility.",
    icon: CodeBracketIcon,
  },
  {
    title: "Open Core",
    description:
      "Most of our tools are open source. Audit the code, contribute, or build your own forks with ease.",
    icon: GlobeAltIcon,
  },
  {
    title: "Modern Tooling",
    description:
      "Leverage the latest technologies like Next.js, Rust, and Paper for high-performance development.",
    icon: CpuChipIcon,
  },
  {
    title: "CI/CD Ready",
    description:
      "Our software integrates seamlessly with modern deployment pipelines and automated workflows.",
    icon: ServerIcon,
  },
  {
    title: "CLI Utilities",
    description:
      "Speed up your workflow with powerful command-line tools designed for speed and automation.",
    icon: CommandLineIcon,
  },
  {
    title: "Documentation",
    description:
      "Comprehensive guides and references to help you get the most out of VOMLabs software.",
    icon: CubeTransparentIcon,
  },
];

export function for_developers() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24" id="developers">
      <FadeInView>
        <SectionHeading
          accent="Engineers"
          description="We prioritize developer experience, performance, and code quality in everything we build."
        >
          Built for
        </SectionHeading>
      </FadeInView>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dev_features.map((feature, i) => (
          <FeatureCard
            delay={i * 0.1}
            description={feature.description}
            icon={<feature.icon className="h-6 w-6" />}
            key={feature.title}
            title={feature.title}
            variant="developer"
          />
        ))}
      </div>

      <FadeInView className="mt-8 text-center" delay={0.4}>
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-medium text-sm transition-all hover:bg-white/10"
          href="https://github.com/VOMLabs"
          rel="noopener noreferrer"
          target="_blank"
        >
          <WrenchScrewdriverIcon className="h-4 w-4" />
          View Developer Documentation
        </Link>
      </FadeInView>
    </section>
  );
}
