"use client";

import { motion } from "framer-motion";
import {
  AdjustmentsHorizontalIcon,
  WrenchScrewdriverIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

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
      id="features"
      className="max-w-7xl mx-auto px-6 py-24"
      aria-labelledby="features-heading"
    >
      <motion.h2
        id="features-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-center tracking-tight text-foreground mb-8"
      >
        Powerful Configuration,{" "}
        <span className="text-brand-accent italic">No Limitation</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="max-w-2xl mx-auto mb-12 text-center text-lg text-muted-foreground"
      >
        Designed with flexibility, privacy, and performance in mind. Experience
        ultimate control with VOMLabs tools.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-card/60 p-6 hover:shadow-xl border border-border transition-all duration-200"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent/20 group-hover:bg-brand-accent transition-colors" />
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <span className="flex items-center justify-center rounded-lg bg-brand-accent/10 w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent" />
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-foreground tracking-tight">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
