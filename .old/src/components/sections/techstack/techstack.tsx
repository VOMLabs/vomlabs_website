"use client";

import {
  IconApi,
  IconBook2,
  IconBrandDocker,
  IconBrandGit,
  IconBrandGithub,
  IconBrandKotlin,
  IconBrandMinecraft,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
  IconCode,
  IconCoffee,
  IconLetterZ,
  IconRocket,
  IconSparkles,
} from "@tabler/icons-react";
import { IconVercel } from "@/components/icons/vercel-icon";
import { FadeInView } from "@/components/ui/fade-in-view";
import { SectionPill } from "@/components/ui/section-pill";

interface TechItem {
  description: string;
  name: string;
}

interface TechCategory {
  accent: string;
  description: string;
  dot: string;
  items: TechItem[];
  number: string;
  title: string;
}

const minecraft_stack: TechItem[] = [
  { name: "Paper API", description: "High-performance Minecraft server API" },
  {
    name: "Gradle (Kotlin DSL)",
    description: "Build automation with type-safe configuration",
  },
  { name: "Kotlin", description: "Modern JVM language for plugin development" },
  { name: "Java", description: "Core language for Minecraft platform" },
  {
    name: "Paper + its forks",
    description: "Highly optimized Minecraft server software",
  },
  {
    name: "PlaceholderAPI",
    description: "Extensive placeholder system for Minecraft",
  },
];

const website_stack: TechItem[] = [
  { name: "Next.js", description: "React framework with Turbopack" },
  {
    name: "React",
    description: "The library for web and native user interfaces",
  },
  { name: "TypeScript", description: "Type-safe JavaScript" },
  { name: "Tailwind CSS", description: "Utility-first CSS framework" },
  { name: "Framer Motion", description: "Animation library" },
  {
    name: "shadcn/ui",
    description:
      "Beautifully designed components built with Radix UI and Base UI",
  },
  { name: "Fumadocs", description: "Documentation framework for Next.js" },
  { name: "Vercel", description: "Deployment platform" },
];

const tools_stack: TechItem[] = [
  { name: "Git", description: "Version control" },
  { name: "GitHub", description: "Code hosting & CI/CD" },
  { name: "Docker", description: "Containerization" },
  {
    name: "Cursor / VSCode",
    description: "AI-powered IDEs for modern development",
  },
  { name: "Zed", description: "High-performance multiplayer code editor" },
  {
    name: "TurboRepos",
    description: "High-performance build system for monorepos",
  },
];

const techstackData: TechCategory[] = [
  {
    title: "Minecraft Services",
    number: "01",
    description:
      "Powering our plugins and mods with industry-standard tooling and high-performance APIs for the Minecraft platform.",
    accent: "text-orange-400",
    dot: "bg-orange-400",
    items: minecraft_stack,
  },
  {
    title: "Websites",
    number: "02",
    description:
      "Modern web technologies for building fast, responsive, and accessible digital experiences.",
    accent: "text-blue-400",
    dot: "bg-blue-400",
    items: website_stack,
  },
  {
    title: "Tools",
    number: "03",
    description: "Development tools and services we rely on.",
    accent: "text-green-400",
    dot: "bg-green-400",
    items: tools_stack,
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Paper API": IconBrandMinecraft,
  "Gradle (Kotlin DSL)": IconCode,
  Kotlin: IconBrandKotlin,
  Java: IconCoffee,
  "Paper + its forks": IconBrandMinecraft,
  PlaceholderAPI: IconApi,
  "Next.js": IconBrandNextjs,
  React: IconBrandReact,
  TypeScript: IconBrandTypescript,
  "Tailwind CSS": IconBrandTailwind,
  "Framer Motion": IconSparkles,
  "shadcn/ui": IconSparkles,
  Fumadocs: IconBook2,
  Vercel: IconVercel,
  Git: IconBrandGit,
  GitHub: IconBrandGithub,
  Docker: IconBrandDocker,
  "Cursor / VSCode": IconCode,
  Zed: IconLetterZ,
  TurboRepos: IconRocket,
};

export function TechStackSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <FadeInView className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <div className="flex justify-center">
            <SectionPill>Under the Hood</SectionPill>
          </div>
          <h1 className="font-bold text-5xl text-foreground tracking-tight sm:text-6xl md:text-7xl">
            Tech <span className="text-brand-accent italic">Stack</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            The technologies powering VOMLabs projects and this website.
          </p>
        </div>

        <div className="space-y-24">
          {techstackData.map((category) => {
            const total = category.items.length;
            return (
              <FadeInView key={category.title}>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
                    <div className="mb-4 flex items-center gap-4">
                      <span className="font-bold text-5xl text-muted-foreground/20 tracking-tighter">
                        {category.number}
                      </span>
                      <div
                        className={`h-px flex-1 bg-gradient-to-r from-current to-transparent ${category.accent} opacity-20`}
                      />
                    </div>
                    <h2
                      className={`font-bold text-3xl tracking-tight sm:text-4xl ${category.accent}`}
                    >
                      {category.title}
                    </h2>
                    <p className="mt-3 max-w-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 font-mono text-muted-foreground/40 text-xs">
                      <span>
                        {total} {total === 1 ? "technology" : "technologies"}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/20" />
                      <span>{category.title.split(" ")[0]}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {category.items.map((tech) => {
                        const Icon = iconMap[tech.name];
                        return (
                          <div
                            className="group flex items-start gap-4 rounded-xl p-4 transition-all duration-200 hover:bg-card/40"
                            key={tech.name}
                          >
                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-accent/5 transition-colors group-hover:bg-brand-accent/10">
                              {Icon ? (
                                <Icon className="size-5 text-brand-accent/60 transition-colors group-hover:text-brand-accent" />
                              ) : (
                                <span className="size-1.5 rounded-full bg-brand-accent/40" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-[15px] text-foreground">
                                {tech.name}
                              </h3>
                              <p className="mt-0.5 text-muted-foreground/70 text-sm leading-relaxed">
                                {tech.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </FadeInView>
            );
          })}
        </div>
      </FadeInView>
    </section>
  );
}
