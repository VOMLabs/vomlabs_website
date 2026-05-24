"use client";

import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/outline";
import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandGit,
  IconBrandGithub,
  IconBrandDocker,
  IconBrandMinecraft,
  IconCode,
  IconBrandKotlin,
  IconCoffee,
  IconApi,
  IconSparkles,
  IconRocket,
  IconLetterZ,
  IconBook2,
} from "@tabler/icons-react";
import { IconVercel } from "@/components/icons/vercel-icon";

interface TechItem {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TechCategory {
  title: string;
  description: string;
  accent: string;
  items: TechItem[];
}

const minecraft_stack: TechItem[] = [
  {
    name: "Paper API",
    description: "High-performance Minecraft server API",
    icon: IconBrandMinecraft,
  },
  {
    name: "Gradle (Kotlin DSL)",
    description: "Build automation with type-safe configuration",
    icon: IconCode,
  },
  {
    name: "Kotlin",
    description: "Modern JVM language for plugin development",
    icon: IconBrandKotlin,
  },
  {
    name: "Java",
    description: "Core language for Minecraft platform",
    icon: IconCoffee,
  },
  {
    name: "Paper + its forks",
    description: "Highly optimized Minecraft server software",
    icon: IconBrandMinecraft,
  },
  {
    name: "PlaceholderAPI",
    description: "Extensive placeholder system for Minecraft",
    icon: IconApi,
  },
];

const website_stack: TechItem[] = [
  {
    name: "Next.js",
    description: "React framework with Turbopack",
    icon: IconBrandNextjs,
  },
  {
    name: "React",
    description: "The library for web and native user interfaces",
    icon: IconBrandReact,
  },
  {
    name: "TypeScript",
    description: "Type-safe JavaScript",
    icon: IconBrandTypescript,
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework",
    icon: IconBrandTailwind,
  },
  {
    name: "Framer Motion",
    description: "Animation library",
    icon: IconSparkles,
  },
  {
    name: "shadcn/ui",
    description:
      "Beautifully designed components built with Radix UI and Base UI",
    icon: IconSparkles,
  },
  {
    name: "Fumadocs",
    description: "Documentation framework for Next.js",
    icon: IconBook2,
  },
  { name: "Vercel", description: "Deployment platform", icon: IconVercel },
];

const tools_stack: TechItem[] = [
  { name: "Git", description: "Version control", icon: IconBrandGit },
  {
    name: "GitHub",
    description: "Code hosting & CI/CD",
    icon: IconBrandGithub,
  },
  { name: "Docker", description: "Containerization", icon: IconBrandDocker },
  {
    name: "Cursor / VSCode",
    description: "AI-powered IDEs for modern development",
    icon: IconCode,
  },
  {
    name: "Zed",
    description: "High-performance multiplayer code editor",
    icon: IconLetterZ,
  },
  {
    name: "TurboRepos",
    description: "High-performance build system for monorepos",
    icon: IconRocket,
  },
];

const techstackData: TechCategory[] = [
  {
    title: "Minecraft Services",
    description:
      "Powering our plugins and mods with industry-standard tooling and high-performance APIs for the Minecraft platform.",
    accent: "text-orange-400",
    items: minecraft_stack,
  },
  {
    title: "Websites",
    description:
      "Modern web technologies for building fast, responsive, and accessible digital experiences.",
    accent: "text-blue-400",
    items: website_stack,
  },
  {
    title: "Tools",
    description: "Development tools and services we rely on.",
    accent: "text-green-400",
    items: tools_stack,
  },
];

function TechCard({ name, description, icon: Icon }: TechItem) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card/40 hover:border-brand-accent/50 hover:bg-card/60 transition-all"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-brand-accent/10 shrink-0">
        <Icon className="size-6 text-brand-accent" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

export function TechStackSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-64 bg-brand-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-brand-accent/10 border border-brand-accent/20"
          >
            <SparklesIcon className="w-4 h-4 text-brand-accent" />
            <span className="text-sm font-medium text-brand-accent">
              Under the Hood
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
            Tech <span className="text-brand-accent italic">Stack</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            The technologies powering VOMLabs projects and this website.
          </p>
        </motion.div>

        <div className="space-y-16">
          {techstackData.map((category, colIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: colIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <h3
                  className={`text-xl sm:text-2xl font-bold ${category.accent}`}
                >
                  {category.title}
                </h3>
                <div className="h-px flex-1 bg-border min-w-[40px]" />
              </div>
              <p className="text-muted-foreground mb-6">
                {category.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.items.map((tech, itemIndex) => (
                  <TechCard key={tech.name} {...tech} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
