"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  icon?: ReactNode;
  index: number;
  children: ReactNode;
}

export default function SectionCard({
  title,
  icon,
  index,
  children,
}: SectionCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/20 backdrop-blur-sm"
    >
      {title && (
        <div className="flex items-center gap-3 mb-5">
          {icon && (
            <div className="p-2 rounded-lg bg-brand-accent/10 text-brand-accent">
              {icon}
            </div>
          )}
          <h2 className="text-lg font-semibold text-foreground font-mono tracking-tight">
            {icon ? "" : "$ "}
            {title}
          </h2>
        </div>
      )}
      {children}
    </motion.section>
  );
}
