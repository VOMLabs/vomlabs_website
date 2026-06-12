"use client";

import { motion } from "framer-motion";
import {
  SparklesIcon,
  ArrowRightIcon,
  BoltIcon,
  ShieldCheckIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  IconRocket,
  IconShield,
  IconCode,
  IconHeartHandshake,
  IconClock,
  IconEye,
  IconGift,
} from "@tabler/icons-react";

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
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-brand-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-gradient-to-r from-brand-accent/20 to-brand-accent/5 border border-brand-accent/30">
              <SparklesIcon className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-accent">
                About VOMLabs
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
              Building software{" "}
              <span className="bg-gradient-to-r from-brand-accent to-brand-accent/60 bg-clip-text text-transparent">
                differently
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Most software is bloated, slow, and full of tracking. We built
              VOMLabs Software to be the opposite: fast, private, and made for
              users who just want great tools.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-24"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group p-4 rounded-2xl bg-card/30 border border-border hover:border-brand-accent/50 hover:bg-card/50 transition-all duration-300"
            >
              <stat.icon className="w-5 h-5 text-brand-accent mb-2" />
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Our Story
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From a side project to a community-driven launcher
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-brand-accent/30" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-center ${
                    i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  } gap-6`}
                >
                  <div className="flex-1 hidden md:block" />
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-accent border-4 border-background flex items-center justify-center">
                    <span className="text-xs font-bold text-black">
                      {milestone.year.slice(-2)}
                    </span>
                  </div>
                  <div className="flex-1 pl-12 md:pl-0">
                    <div className="p-6 rounded-2xl border border-border bg-card/40 hover:border-brand-accent/30 hover:bg-card/60 transition-all">
                      <span className="text-sm font-medium text-brand-accent">
                        {milestone.year}
                      </span>
                      <h3 className="text-lg font-semibold text-foreground mt-1 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              What We Believe
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Core principles that guide every decision we make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-card/40 border border-border hover:border-brand-accent/30 hover:bg-card/60 transition-all duration-300"
              >
                <div className="relative p-6 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand-accent/10">
                    <value.icon className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="p-8 rounded-3xl bg-card/30 border border-border">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Our Promise to You
              </h2>
              <p className="text-muted-foreground">
                What you will always get with VOMLabs
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {guarantees.map((guarantee, i) => (
                <motion.div
                  key={guarantee.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="text-center"
                >
                  <guarantee.icon className="w-6 h-6 text-brand-accent mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    {guarantee.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {guarantee.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a
            href="https://github.com/VOMLabs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-black font-medium transition-colors"
          >
            View on GitHub
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
