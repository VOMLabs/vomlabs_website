"use client";

import { motion } from "framer-motion";
import { BoltIcon, CpuChipIcon, RocketLaunchIcon, SparklesIcon } from "@heroicons/react/24/outline";

const features = [
  {
    title: "Minecraft Plugins",
    description: "Performant, modern, and 100% configurable plugins designed to enhance any server experience without the bloat.",
    icon: BoltIcon,
  },
  {
    title: "Minecraft Mods",
    description: "Feature-rich modifications that bring custom content, mechanics, and gameplay possibilities to your world.",
    icon: SparklesIcon,
  },
  {
    title: "Web Development",
    description: "Clean, responsive, and performant websites built with modern frameworks and best-in-class tooling.",
    icon: RocketLaunchIcon,
  },
  {
    title: "Developer Tools",
    description: "Open-source resources, libraries, and tooling for the Minecraft development community and beyond.",
    icon: CpuChipIcon,
  },
];

export function performance_comparison() {
  return (
    <section id="performance" className="max-w-6xl mx-auto px-6 py-24 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
         <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
           What is <span className="text-brand-accent italic">VOMLabs</span>?
         </h2>
         <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed md:text-lg">
           We are an organization of developers crafting Minecraft services, modern websites, developer tools, and more.
         </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-xl bg-card/60 border border-border p-6 hover:border-brand-accent/40 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center rounded-lg bg-brand-accent/10 w-10 h-10 group-hover:bg-brand-accent/20 transition-colors">
                <feature.icon className="w-5 h-5 text-brand-accent" />
              </div>
              <h3 className="font-semibold text-foreground text-lg">{feature.title}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
