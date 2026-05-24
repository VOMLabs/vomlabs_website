"use client";

import { motion } from "framer-motion";
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
    <section className="max-w-7xl mx-auto px-6 py-24" id="developers">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
        >
          Built for <span className="text-brand-accent italic">Engineers</span>
        </motion.h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          We prioritize developer experience, performance, and code quality in
          everything we build.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dev_features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group p-6 rounded-2xl bg-card/40 border border-border hover:border-brand-accent/40 transition-all duration-300 backdrop-blur-sm"
          >
            <div className="p-3 rounded-xl bg-brand-accent/10 border border-brand-accent/20 w-fit mb-4 group-hover:bg-brand-accent/20 transition-colors">
              <feature.icon className="w-6 h-6 text-brand-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {feature.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-center"
      >
        <Link
          href="https://github.com/VOMLabs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
        >
          <WrenchScrewdriverIcon className="w-4 h-4" />
          View Developer Documentation
        </Link>
      </motion.div>
    </section>
  );
}
