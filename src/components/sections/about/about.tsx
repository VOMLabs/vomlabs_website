"use client";

import {
  ArrowRightIcon,
  BoltIcon,
  HeartIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import {
  IconClock,
  IconCode,
  IconEye,
  IconGift,
  IconHeartHandshake,
  IconRocket,
  IconShield,
} from "@tabler/icons-react";
import { FadeInView } from "@/components/ui/fade-in-view";
import { FeatureCard } from "@/components/ui/feature-card";
import { GlowBackground } from "@/components/ui/glow-bg";
import { SectionPill } from "@/components/ui/section-pill";

const stats = [
  { value: "99%", label: "Open Source", icon: IconCode },
  { value: "0", label: "Tracking", icon: IconEye },
  { value: "Free", label: "Forever", icon: IconGift },
  { value: "365+", label: "Days in Beta", icon: IconClock },
];

const milestones = [
  {
    year: "2026",
    title: "The Beginning",
    description:
      "VOMLabs started as a simple idea: build great Minecraft software and websites with a focus on performance, privacy, and user experience.",
  },
];

const values = [
  {
    title: "Performance First",
    description:
      "Every feature is evaluated by its impact on performance. If it slows things down, it does not belong in our software.",
    icon: IconRocket,
  },
  {
    title: "Privacy by Design",
    description:
      "We do not track you. We do not sell your data. We do not show ads. Your privacy is our priority.",
    icon: IconShield,
  },
  {
    title: "Open Source",
    description:
      "All our code is publicly available. You can audit it, contribute to it, or fork it for your own projects.",
    icon: IconCode,
  },
  {
    title: "Community Driven",
    description:
      "Your feedback shapes VOMLabs. We listen to the community and build what users actually want.",
    icon: IconHeartHandshake,
  },
];

const guarantees = [
  {
    title: "No Bloatware",
    description: "Only the features you need. Nothing extra, nothing slow.",
    icon: BoltIcon,
  },
  {
    title: "No Tracking",
    description: "Your data stays local. We have no analytics.",
    icon: ShieldCheckIcon,
  },
  {
    title: "No Ads",
    description: "Clean interface. No sponsored content ever.",
    icon: IconShield,
  },
  {
    title: "Free Forever",
    description: "No paid features. No premium tiers. Just free.",
    icon: HeartIcon,
  },
];

export function AboutSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <GlowBackground className="h-96 max-w-4xl blur-[150px]" size="lg" />

      <div className="mx-auto max-w-5xl">
        <FadeInView className="mb-24">
          <div className="text-center">
            <div className="flex justify-center">
              <SectionPill>About VOMLabs</SectionPill>
            </div>

            <h1 className="mb-6 font-bold text-5xl text-foreground tracking-tight sm:text-6xl md:text-7xl">
              Building software{" "}
              <span className="bg-gradient-to-r from-brand-accent to-brand-accent/60 bg-clip-text text-transparent">
                differently
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-muted-foreground text-xl leading-relaxed">
              Most software is bloated, slow, and full of tracking. We built
              VOMLabs Software to be the opposite: fast, private, and made for
              users who just want great tools.
            </p>
          </div>
        </FadeInView>

        <FadeInView className="mb-24 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              className="group rounded-2xl border border-border bg-card/30 p-4 transition-all duration-300 hover:border-brand-accent/50 hover:bg-card/50"
              key={stat.label}
            >
              <stat.icon className="mb-2 h-5 w-5 text-brand-accent" />
              <div className="mb-1 font-bold text-2xl text-foreground">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-xs">{stat.label}</div>
            </div>
          ))}
        </FadeInView>

        <FadeInView className="mb-24">
          <div className="mb-10 text-center">
            <h2 className="mb-3 font-bold text-3xl text-foreground">
              Our Story
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              From a side project to a community-driven launcher
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-0 bottom-0 left-4 w-px bg-brand-accent/30 md:left-1/2" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <FadeInView
                  className={`relative flex items-center ${
                    i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  } gap-6`}
                  delay={i * 0.1}
                  direction={i % 2 === 0 ? "left" : "right"}
                  key={milestone.title}
                >
                  <div className="hidden flex-1 md:block" />
                  <div className="absolute left-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-brand-accent md:left-1/2">
                    <span className="font-bold text-black text-xs">
                      {milestone.year.slice(-2)}
                    </span>
                  </div>
                  <div className="flex-1 pl-12 md:pl-0">
                    <div className="rounded-2xl border border-border bg-card/40 p-6 transition-all hover:border-brand-accent/30 hover:bg-card/60">
                      <span className="font-medium text-brand-accent text-sm">
                        {milestone.year}
                      </span>
                      <h3 className="mt-1 mb-2 font-semibold text-foreground text-lg">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </FadeInView>

        <FadeInView className="mb-24">
          <div className="mb-10 text-center">
            <h2 className="mb-3 font-bold text-3xl text-foreground">
              What We Believe
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Core principles that guide every decision we make
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {values.map((value, i) => (
              <FeatureCard
                delay={i * 0.1}
                description={value.description}
                icon={<value.icon className="h-6 w-6" />}
                key={value.title}
                title={value.title}
                variant="developer"
              />
            ))}
          </div>
        </FadeInView>

        <FadeInView className="mb-12">
          <div className="rounded-3xl border border-border bg-card/30 p-8">
            <div className="mb-8 text-center">
              <h2 className="mb-2 font-bold text-2xl text-foreground">
                Our Promise to You
              </h2>
              <p className="text-muted-foreground">
                What you will always get with VOMLabs
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {guarantees.map((guarantee, i) => (
                <FadeInView
                  className="text-center"
                  delay={i * 0.1}
                  direction="scale"
                  key={guarantee.title}
                >
                  <guarantee.icon className="mx-auto mb-3 h-6 w-6 text-brand-accent" />
                  <h4 className="mb-1 font-semibold text-foreground text-sm">
                    {guarantee.title}
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    {guarantee.description}
                  </p>
                </FadeInView>
              ))}
            </div>
          </div>
        </FadeInView>

        <FadeInView className="text-center">
          <a
            className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-medium text-black transition-colors hover:bg-brand-accent/90"
            href="https://github.com/VOMLabs"
            rel="noopener noreferrer"
            target="_blank"
          >
            View on GitHub
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </FadeInView>
      </div>
    </section>
  );
}
