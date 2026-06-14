"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
  icon?: ReactNode;
  index: number;
  title?: string;
}

export default function SectionCard({
  title,
  icon,
  index,
  children,
}: SectionCardProps) {
  return (
    <motion.section
      className="rounded-2xl border border-border/60 bg-card/20 p-6 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {title && (
        <div className="mb-5 flex items-center gap-3">
          {icon && (
            <div className="rounded-lg bg-brand-accent/10 p-2 text-brand-accent">
              {icon}
            </div>
          )}
          <h2 className="font-mono font-semibold text-foreground text-lg tracking-tight">
            {icon ? "" : "$ "}
            {title}
          </h2>
        </div>
      )}
      {children}
    </motion.section>
  );
}
