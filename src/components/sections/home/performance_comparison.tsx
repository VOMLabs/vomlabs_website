"use client";

import {
  BoltIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { FeatureCard } from "@/components/ui/feature-card";
import { SectionHeading } from "@/components/ui/section-heading";

const features = [
  {
    title: "Minecraft Plugins",
    description:
      "Performant, modern, and 100% configurable plugins designed to enhance any server experience without the bloat.",
    icon: BoltIcon,
  },
  {
    title: "Minecraft Mods",
    description:
      "Feature-rich modifications that bring custom content, mechanics, and gameplay possibilities to your world.",
    icon: SparklesIcon,
  },
  {
    title: "Web Development",
    description:
      "Clean, responsive, and performant websites built with modern frameworks and best-in-class tooling.",
    icon: RocketLaunchIcon,
  },
  {
    title: "Developer Tools",
    description:
      "Open-source resources, libraries, and tooling for the Minecraft development community and beyond.",
    icon: CpuChipIcon,
  },
];

export function performance_comparison() {
  return (
    <section
      className="mx-auto max-w-6xl border-border/50 border-t px-6 py-24"
      id="performance"
    >
      <SectionHeading
        accent="VOMLabs"
        description="We are an organization of developers crafting Minecraft services, modern websites, developer tools, and more."
      >
        What is
      </SectionHeading>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature, i) => (
          <FeatureCard
            delay={i * 0.1}
            description={feature.description}
            icon={<feature.icon className="h-5 w-5" />}
            key={feature.title}
            title={feature.title}
            variant="compact"
          />
        ))}
      </div>
    </section>
  );
}
