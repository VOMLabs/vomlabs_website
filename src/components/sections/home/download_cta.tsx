"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IconBrandWindows,
  IconBrandApple,
  IconBrandUbuntu,
} from "@tabler/icons-react";
import {
  ShieldCheckIcon,
  LockClosedIcon,
  CodeBracketIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";

export function download_cta() {
  return (
    <section id="download" className="py-32 relative border-t border-border/50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,207,168,0.06)_0%,transparent_60%)]" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[48px] md:text-[60px] font-bold text-foreground leading-[1.1] tracking-tight mb-6"
          >
            Ready to
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-brand-accent italic"
            >
              launch?
            </motion.span>
          </motion.h2>

           <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-lg font-light text-muted-foreground max-w-md mx-auto tracking-tight mb-12"
           >
             Explore our open source projects. Available on GitHub. Free forever, no account required.
           </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                 href="https://github.com/VOMLabs"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block w-full sm:w-auto"
              >
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-b from-brand-accent/50 to-brand-accent/20 pointer-events-auto" />
                <div className="relative bg-foreground rounded-xl px-6 py-4 flex items-center justify-center gap-3 overflow-hidden">
                  <div className="absolute inset-0 bg-brand-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <IconBrandWindows
                    className="relative z-10 text-background"
                    stroke={1.5}
                  />
                  <div className="relative z-10 text-left">
                    <div className="text-sm font-semibold text-background">
                      Windows
                    </div>
                    <div className="text-[10px] font-mono text-background/80">
                      x64 · exe
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                 href="https://github.com/VOMLabs"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block w-full sm:w-auto"
              >
                <div className="rounded-xl border border-border bg-card px-6 py-4 flex items-center justify-center gap-3 hover:bg-white/[0.03] hover:border-brand-accent/30 transition-all duration-300">
                  <IconBrandApple
                    className="text-muted-foreground group-hover:text-brand-accent transition-colors"
                    stroke={1.5}
                  />
                  <div className="text-left">
                    <div className="text-sm font-semibold text-foreground">
                      macOS
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground">
                      aarch64 · dmg
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                 href="https://github.com/VOMLabs"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block w-full sm:w-auto"
              >
                <div className="rounded-xl border border-border bg-card px-6 py-4 flex items-center justify-center gap-3 hover:bg-white/[0.03] hover:border-brand-accent/30 transition-all duration-300">
                  <IconBrandUbuntu
                    className="text-muted-foreground group-hover:text-brand-accent transition-colors"
                    stroke={1.5}
                  />
                  <div className="text-left">
                    <div className="text-sm font-semibold text-foreground">
                      Linux
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground">
                      x64 · AppImage
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-mono"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheckIcon className="w-3.5 h-3.5" /> No malware
            </span>
            <span className="flex items-center gap-1.5">
              <LockClosedIcon className="w-3.5 h-3.5" /> No account needed
            </span>
            <span className="flex items-center gap-1.5">
              <CodeBracketIcon className="w-3.5 h-3.5" /> Apache 2.0 Licensed
            </span>
            <span className="flex items-center gap-1.5">
              <CommandLineIcon className="w-3.5 h-3.5" /> Open Source
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
