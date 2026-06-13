"use client";

import {
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import type React from "react";
import { FadeInView } from "@/components/ui/fade-in-view";
import { GlowBackground } from "@/components/ui/glow-bg";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionPill } from "@/components/ui/section-pill";

const contactMethods = [
  {
    name: "Email",
    description: "For general inquiries and support",
    email: "support@vomlabs.com",
    detail: "support@vomlabs.com",
    icon: EnvelopeIcon,
    gradient: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/10",
    borderHover: "hover:border-blue-500/30",
  },
  {
    name: "Discord",
    description: "Join our community for real-time help",
    href: "https://discord.vomlabs.com",
    detail: "discord.vomlabs.com",
    icon: ChatBubbleLeftRightIcon,
    gradient: "from-indigo-500 to-purple-500",
    bgGlow: "bg-indigo-500/10",
    borderHover: "hover:border-indigo-500/30",
  },
  {
    name: "GitHub",
    description: "Report bugs and request features",
    href: "https://github.com/VOMLabs",
    detail: "github.com/VOMLabs",
    icon: CodeBracketIcon,
    gradient: "from-gray-500 to-zinc-500",
    bgGlow: "bg-gray-500/10",
    borderHover: "hover:border-gray-500/30",
  },
];

interface SupportSectionProps {
  children?: React.ReactNode;
}

export function SupportSection({ children }: SupportSectionProps) {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <GlowBackground size="lg" />

      <div className="mx-auto max-w-5xl">
        <FadeInView>
          <div className="mb-16 text-center">
            <div className="flex justify-center">
              <SectionPill>Need Help?</SectionPill>
            </div>
            <SectionHeading accent="help" className="mb-0" size="md">
              We&apos;re here to
            </SectionHeading>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              Have questions, feedback, or need assistance? Choose the channel
              that works best for you.
            </p>
          </div>
        </FadeInView>

        <FadeInView
          className="mb-16 grid grid-cols-1 gap-5 sm:mb-20 md:grid-cols-3"
          delay={0.1}
        >
          {contactMethods.map((method, i) => {
            const Icon = method.icon;
            return (
              <FadeInView
                className="group relative"
                delay={i * 0.1}
                key={method.name}
              >
                <div
                  className={`absolute -inset-0.5 rounded-2xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100 ${method.bgGlow}`}
                />
                <Link
                  className={`relative flex flex-col items-center rounded-2xl border border-border bg-card/50 p-8 text-center backdrop-blur-sm ${method.borderHover} h-full transition-all duration-300`}
                  href={method.href || `mailto:${method.email}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div
                    className={`rounded-xl bg-gradient-to-br p-3.5 ${method.gradient} mb-5 shadow-lg`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="mb-2 font-semibold text-foreground text-lg transition-colors group-hover:text-brand-accent">
                    {method.name}
                  </h3>
                  <p className="mb-4 text-muted-foreground text-sm">
                    {method.description}
                  </p>

                  <span className="mt-auto inline-flex translate-y-1 items-center gap-1.5 font-medium text-brand-accent text-sm opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    {method.email ? "Send an email" : "Open link"}
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </span>

                  <span className="absolute top-4 right-4 font-mono text-[10px] text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/70">
                    {method.detail}
                  </span>
                </Link>
              </FadeInView>
            );
          })}
        </FadeInView>

        <FadeInView className="mb-16 sm:mb-20" delay={0.15}>
          <div className="mb-10 text-center">
            <h3 className="mb-3 font-bold text-2xl text-foreground sm:text-3xl">
              Join Our Community
            </h3>
            <p className="mx-auto max-w-lg text-muted-foreground">
              Connect with other developers and users in real-time. Get answers,
              share ideas, and stay up to date.
            </p>
          </div>
          <div className="mx-auto max-w-2xl">{children}</div>
        </FadeInView>

        <FadeInView delay={0.2}>
          <div className="mb-10 text-center">
            <h3 className="mb-3 font-bold text-2xl text-foreground sm:text-3xl">
              Frequently Asked Questions
            </h3>
            <p className="mx-auto max-w-lg text-muted-foreground">
              Quick answers to common questions. For more details, visit our
              full FAQ page.
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                q: "How do I download VOMLabs projects?",
                a: "All our projects are available on GitHub. Check the repositories for releases and downloads.",
              },
              {
                q: "Is VOMLabs software free to use?",
                a: "Yes, everything we build is free and open source under the GPL-3.0 license.",
              },
              {
                q: "What kind of projects do you work on?",
                a: "We build Minecraft launchers, developer tools, and modern web applications.",
              },
              {
                q: "How do I report a bug?",
                a: "Open an issue on the relevant GitHub repository or reach out on Discord.",
              },
            ].map((item, i) => (
              <FadeInView
                className="group relative rounded-xl border border-border bg-card/30 p-5 transition-all duration-200 hover:border-brand-accent/20 hover:bg-card/50"
                delay={i * 0.05}
                direction="up"
                key={item.q}
              >
                <div className="flex items-start gap-3">
                  <QuestionMarkCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" />
                  <div>
                    <h4 className="mb-1.5 font-medium text-foreground">
                      {item.q}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>

          <FadeInView className="mt-10 text-center" delay={0.3}>
            <Link
              className="inline-flex items-center gap-2 rounded-xl border border-brand-accent/20 bg-brand-accent/10 px-6 py-3 font-medium text-brand-accent text-sm transition-all hover:bg-brand-accent/20"
              href="/faq"
            >
              View all FAQs
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </FadeInView>
        </FadeInView>

        <FadeInView
          className="mt-16 text-center text-muted-foreground text-sm"
          delay={0.4}
        >
          Still need help?{" "}
          <Link
            className="font-medium text-brand-accent hover:underline"
            href="mailto:support@vomlabs.com"
          >
            Email us directly
          </Link>{" "}
          or check the{" "}
          <Link
            className="font-medium text-brand-accent hover:underline"
            href="/faq"
          >
            FAQ page
          </Link>
          .
        </FadeInView>
      </div>
    </section>
  );
}
