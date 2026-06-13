"use client";

import {
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { FeatureCard } from "@/components/ui/feature-card";
import { SectionHeading } from "@/components/ui/section-heading";

const features = [
  {
    title: "100% Configurable",
    description:
      "Everything can be tweaked to your liking. From UI colors to internal logic, you're in control of every detail.",
    icon: AdjustmentsHorizontalIcon,
  },
  {
    title: "Multi Configs",
    description:
      "Seamlessly switch between multiple configurations. Perfect for testing, development, and different project needs.",
    icon: WrenchScrewdriverIcon,
  },
  {
    title: "Modern Design",
    description:
      "A focused, elegant interface crafted for clarity, speed, and ease of use in professional workflows.",
    icon: CubeTransparentIcon,
  },
  {
    title: "Security",
    description:
      "We do not track any of your data. Your privacy is our priority, ensuring a safe and private development experience.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Automatic Updates",
    description:
      "Stay current effortlessly—updates arrive seamlessly to keep your tools sharp and secure without interruption.",
    icon: ArrowPathIcon,
  },
];

export function FeatureCards() {
  return (
    <section
      aria-labelledby="features-heading"
      className="mx-auto max-w-7xl px-6 py-24"
      id="features"
    >
      <SectionHeading
        accent="No Limitation"
        description="Designed with flexibility, privacy, and performance in mind. Experience ultimate control with VOMLabs tools."
      >
        Powerful Configuration,
      </SectionHeading>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <FeatureCard
            delay={i * 0.1}
            description={feature.description}
            icon={<feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />}
            key={feature.title}
            title={feature.title}
          />
        ))}
      </div>
    </section>
  );
}
