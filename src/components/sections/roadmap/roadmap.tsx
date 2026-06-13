"use client";

import {
  BeakerIcon,
  LightBulbIcon,
  MapIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { FadeInView } from "@/components/ui/fade-in-view";
import { GlowBackground } from "@/components/ui/glow-bg";

interface RoadmapItem {
  accent: string;
  icon: React.ElementType;
  items: string[];
  title: string;
}

const roadmapData: RoadmapItem[] = [
  {
    title: "Planned",
    icon: MapIcon,
    accent: "text-amber-400",
    items: [],
  },
  {
    title: "In Progress",
    icon: RocketLaunchIcon,
    accent: "text-brand-accent",
    items: [],
  },
  {
    title: "Long-Term",
    icon: LightBulbIcon,
    accent: "text-purple-400",
    items: [],
  },
];

export function RoadmapSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <GlowBackground />

      <FadeInView className="mx-auto max-w-5xl">
        <FadeInView className="mb-16 text-center" direction="scale">
          <h2 className="mb-4 font-bold text-4xl text-foreground tracking-tight sm:text-5xl md:text-6xl">
            VOMLabs <span className="text-brand-accent italic">Roadmap</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Here&apos;s what we&apos;re building, what&apos;s brewing, and where
            we want to take VOMLabs.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {roadmapData.map((column, colIndex) => (
            <FadeInView
              className="relative rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm"
              delay={colIndex * 0.1}
              key={column.title}
            >
              <div className="mb-6 flex items-center gap-3">
                <div
                  className={`rounded-lg border border-border bg-card p-2 ${column.accent}`}
                >
                  <column.icon className={`h-5 w-5 ${column.accent}`} />
                </div>
                <h3 className="font-semibold text-foreground text-xl">
                  {column.title}
                </h3>
              </div>

              <ul className="space-y-3">
                {column.items.map((item, itemIndex) => (
                  <FadeInView
                    delay={colIndex * 0.1 + itemIndex * 0.05}
                    direction="left"
                    key={itemIndex}
                  >
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <BeakerIcon className="mt-1 h-4 w-4 shrink-0 text-brand-accent/60" />
                      <span>{item}</span>
                    </li>
                  </FadeInView>
                ))}
              </ul>
            </FadeInView>
          ))}
        </div>

        <FadeInView
          className="mt-12 text-center text-muted-foreground text-sm"
          delay={0.4}
        >
          This roadmap reflects our{" "}
          <span className="font-medium text-brand-accent">intentions</span>, not
          official promises. Want to suggest something?{" "}
          <Link
            className="underline transition-colors hover:text-brand-accent"
            href="https://github.com/VOMLabs"
            target="_blank"
          >
            Contribute on GitHub
          </Link>
          .
        </FadeInView>
      </FadeInView>
    </section>
  );
}
