"use client";

import { motion } from "framer-motion";
import { UsersIcon, ClockIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function beta_waitlist() {
  return (
    <section id="beta" className="max-w-4xl mx-auto px-6 py-24 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
          Join the <span className="text-brand-accent italic">Beta</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed md:text-lg">
          Be among the first to experience the next generation of Minecraft launching.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl bg-card/60 border border-border p-6 text-center"
        >
          <div className="flex items-center justify-center rounded-lg bg-brand-accent/10 w-12 h-12 mx-auto mb-4">
            <ClockIcon className="w-6 h-6 text-brand-accent" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Beta Coming Soon</h3>
          <p className="text-sm text-muted-foreground">
            Public beta opening soon. Stay tuned for official release dates.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl bg-card/60 border border-border p-6 text-center"
        >
          <div className="flex items-center justify-center rounded-lg bg-brand-accent/10 w-12 h-12 mx-auto mb-4">
            <UsersIcon className="w-6 h-6 text-brand-accent" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Join Our Community</h3>
          <p className="text-sm text-muted-foreground">
            Connect with fellow testers and get early access to features.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-xl bg-card/60 border border-border p-6 text-center"
        >
          <div className="flex items-center justify-center rounded-lg bg-brand-accent/10 w-12 h-12 mx-auto mb-4">
            <CodeBracketIcon className="w-6 h-6 text-brand-accent" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Contributors Welcome</h3>
          <p className="text-sm text-muted-foreground">
            Experienced with Rust + Tauri? Apply for early access via Discord.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-center"
      >
        <Link
          href="https://dc.devflare.de"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-brand-accent hover:bg-brand-accent/90 text-background transition-all active:scale-95"
        >
          Join Discord to Apply
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </Link>
        <p className="text-xs text-muted-foreground mt-4">
          Limited spots available for early beta testers with Rust/Tauri experience
        </p>
      </motion.div>
    </section>
  );
}
