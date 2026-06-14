"use client";

import {
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { FadeInView, MotionItem } from "@/components/ui/fade-in-view";
import { GlowBackground } from "@/components/ui/glow-bg";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionPill } from "@/components/ui/section-pill";

const contactMethods = [
  {
    name: "Email",
    description: "For general inquiries and support",
    email: "support@vomlabs.com",
    detail: "support@vomlabs.com",
    href: "mailto:support@vomlabs.com",
    icon: EnvelopeIcon,
  },
  {
    name: "Discord",
    description: "Join our community for real-time help",
    href: "https://discord.vomlabs.com",
    detail: "discord.vomlabs.com",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "GitHub",
    description: "Report bugs and request features",
    href: "https://github.com/VOMLabs",
    detail: "github.com/VOMLabs",
    icon: CodeBracketIcon,
  },
];

const stagger = {
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export function SupportSection() {
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

        <motion.div
          className="mb-16 grid grid-cols-1 gap-6 sm:mb-20 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <MotionItem key={method.name}>
                <motion.div
                  className="h-full"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Link
                    className="group relative flex h-full flex-col rounded-2xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-brand-accent/30"
                    href={method.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-5 flex items-center justify-between">
                        <motion.div
                          className="flex size-12 items-center justify-center rounded-xl border border-border/50 bg-muted/30 text-foreground transition-colors group-hover:border-brand-accent/30 group-hover:text-brand-accent"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                          <Icon className="size-6" />
                        </motion.div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/70">
                          {method.name}
                        </span>
                      </div>

                      <h3 className="mb-2 font-semibold text-lg text-foreground transition-colors group-hover:text-brand-accent">
                        {method.name}
                      </h3>
                      <p className="mb-4 text-muted-foreground text-sm leading-relaxed">
                        {method.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-mono text-[11px] text-muted-foreground/50 transition-colors group-hover:text-muted-foreground/80">
                          {method.detail}
                        </span>
                        <motion.span
                          className="flex size-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground group-hover:bg-brand-accent/15 group-hover:text-brand-accent"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                          <ArrowRightIcon className="size-4" />
                        </motion.span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </MotionItem>
            );
          })}
        </motion.div>

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

          <motion.div
            className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
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
            ].map((item) => (
              <MotionItem key={item.q}>
                <div className="group relative rounded-xl border border-border bg-card/30 p-5 transition-all duration-200 hover:border-brand-accent/20 hover:bg-card/50">
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
                </div>
              </MotionItem>
            ))}
          </motion.div>

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
