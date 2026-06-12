"use client";

import { motion } from "framer-motion";
import {
  SparklesIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

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
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-80 bg-brand-accent/8 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-brand-accent/10 border border-brand-accent/20"
          >
            <SparklesIcon className="w-4 h-4 text-brand-accent" />
            <span className="text-sm font-medium text-brand-accent">
              Need Help?
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
            We&apos;re here to{" "}
            <span className="text-brand-accent italic">help</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Have questions, feedback, or need assistance? Choose the channel
            that works best for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16 sm:mb-20"
        >
          {contactMethods.map((method, i) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative"
              >
                <div
                  className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 ${method.bgGlow}`}
                />
                <Link
                  href={method.href || `mailto:${method.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative flex flex-col items-center text-center p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm ${method.borderHover} transition-all duration-300 h-full`}
                >
                  <div
                    className={`p-3.5 rounded-xl bg-gradient-to-br ${method.gradient} shadow-lg mb-5`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-brand-accent transition-colors">
                    {method.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {method.description}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                    {method.email ? "Send an email" : "Open link"}
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </span>

                  <span className="absolute top-4 right-4 text-[10px] font-mono text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors">
                    {method.detail}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-16 sm:mb-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Join Our Community
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Connect with other developers and users in real-time. Get
              answers, share ideas, and stay up to date.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">{children}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Quick answers to common questions. For more details, visit our
              full FAQ page.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
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
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="relative group p-5 rounded-xl border border-border bg-card/30 hover:bg-card/50 hover:border-brand-accent/20 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <QuestionMarkCircleIcon className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1.5">
                      {item.q}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-medium text-sm hover:bg-brand-accent/20 transition-all"
            >
              View all FAQs
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-16"
        >
          Still need help?{" "}
          <Link
            href="mailto:support@vomlabs.com"
            className="text-brand-accent hover:underline font-medium"
          >
            Email us directly
          </Link>{" "}
          or check the{" "}
          <Link
            href="/faq"
            className="text-brand-accent hover:underline font-medium"
          >
            FAQ page
          </Link>
          .
        </motion.p>
      </motion.div>
    </section>
  );
}
