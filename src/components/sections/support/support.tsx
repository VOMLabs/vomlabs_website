"use client";

import { motion } from "framer-motion";
import { SparklesIcon, EnvelopeIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { IconBrandDiscord, IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import DiscordWidget from "@/components/ui/discord-widget";

const contactMethods = [
  {
    name: "Email",
    description: "For general inquiries and support",
    email: "support@devflare.de",
    icon: EnvelopeIcon,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    hoverColor: "hover:border-blue-500/40 hover:bg-blue-500/5",
  },
  {
    name: "Discord",
    description: "Join our community for real-time help",
    href: "https://discord.devflare.de",
    icon: IconBrandDiscord,
    color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    hoverColor: "hover:border-indigo-500/40 hover:bg-indigo-500/5",
  },
  {
    name: "GitHub",
    description: "Report bugs and request features",
    href: "https://github.com/ArexLabs/vesper-website/issues",
    icon: IconBrandGithub,
    color: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    hoverColor: "hover:border-gray-500/40 hover:bg-gray-500/5",
  },
];

export function SupportSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-64 bg-brand-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
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
            <span className="text-sm font-medium text-brand-accent">Need Help?</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
            Contact & <span className="text-brand-accent italic">Support</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Have questions? We&apos;re here to help. Reach out through any of the channels below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 sm:mb-12"
        >
          {contactMethods.map((method, i) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.name}
                href={method.href || `mailto:${method.email}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`flex flex-col items-center justify-center p-8 rounded-2xl border border-border bg-card/40 ${method.hoverColor} transition-all group text-center`}
              >
                <div className={`p-4 rounded-2xl ${method.color} mb-4`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-brand-accent transition-colors">{method.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{method.description}</p>
                {method.email && (
                  <p className="text-sm text-brand-accent mt-3 font-medium">{method.email}</p>
                )}
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 sm:mb-16"
        >
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Join Our Community</h3>
          <div className="max-w-md mx-auto">
            <DiscordWidget />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <h3 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h3>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20 transition-colors"
            >
              View All
              <ArrowTopRightOnSquareIcon className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { q: "How do I download Vesper?", a: "Visit our homepage and run the install script for your platform." },
              { q: "Is Vesper free to use?", a: "Yes, Vesper is completely free and open source." },
              { q: "What Minecraft versions are supported?", a: "Vesper supports all major Minecraft versions." },
              { q: "How do I report a bug?", a: "Open an issue on GitHub or reach out on Discord." },
            ].map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="p-5 rounded-xl border border-border bg-card/30 hover:bg-card/50 transition-colors"
              >
                <h4 className="font-medium text-foreground mb-2">{item.q}</h4>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          Can&apos;t find what you&apos;re looking for?{" "}
          <Link href="/faq" className="text-brand-accent hover:underline">
            Check our FAQ
          </Link>{" "}
          or{" "}
          <a href="mailto:support@devflare.de" className="text-brand-accent hover:underline">
            email us
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
