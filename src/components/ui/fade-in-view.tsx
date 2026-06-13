"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none" | "scale";
  duration?: number;
  once?: boolean;
}

const directionVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function FadeInView({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.5,
  once = true,
}: FadeInViewProps) {
  const variants = directionVariants[direction] || directionVariants.up;

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      transition={{ duration, delay, ease: "easeOut" }}
      variants={variants}
      viewport={{ once }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}
