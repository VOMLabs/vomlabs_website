"use client";

import { motion } from "framer-motion";
import {
  StarIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const contributors = [
  {
    name: "ItzzMateo",
    avatar: "IM",
    role: "Founder & Lead Developer",
    github: "https://github.com/itzzjustmateo/",
  },
  {
    name: "Blaxk",
    avatar: "BK",
    role: "Designer",
    github: "https://github.com/blax-k/",
  },
];

const stats = [
  { value: "2", label: "Contributors" },
  { value: "100%", label: "Open Source" },
  { value: "0", label: "Tracking" },
];

export function social_proof() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
          Built by <span className="text-brand-accent italic">passionate</span>{" "}
          developers
        </h2>
         <p className="text-muted-foreground max-w-lg mx-auto">
           An organization dedicated to creating the best Minecraft software,
           websites, and developer tools.
         </p>
      </motion.div>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
        {contributors.map((person, i) => (
          <motion.a
            key={person.name}
            href={person.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card/60 border border-border hover:border-brand-accent/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-brand-accent">
                {person.avatar}
              </span>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                {person.name}
                <ArrowTopRightOnSquareIcon className="w-3 h-3 text-muted-foreground/50" />
              </p>
              <p className="text-xs text-muted-foreground">{person.role}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4"
      >
         <Link
           href="https://github.com/VOMLabs"
           target="_blank"
           rel="noopener noreferrer"
           className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card/60 border border-border hover:border-brand-accent/40 transition-colors"
         >
           <StarIcon className="w-4 h-4 text-yellow-500" />
           <span className="text-sm font-medium text-foreground">
             Star on GitHub
           </span>
           <ArrowTopRightOnSquareIcon className="w-3 h-3 text-muted-foreground" />
         </Link>
         <Link
           href="https://github.com/VOMLabs"
           target="_blank"
           rel="noopener noreferrer"
           className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card/60 border border-border hover:border-brand-accent/40 transition-colors"
         >
           <CodeBracketIcon className="w-4 h-4 text-brand-accent" />
           <span className="text-sm font-medium text-foreground">
             View Projects
           </span>
           <ArrowTopRightOnSquareIcon className="w-3 h-3 text-muted-foreground" />
         </Link>
        <Link
          href="https://discord.devflare.de"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card/60 border border-border hover:border-brand-accent/40 transition-colors"
        >
          <HeartIcon className="w-4 h-4 text-[#5865F2]" />
          <span className="text-sm font-medium text-foreground">
            Join Discord
          </span>
          <ArrowTopRightOnSquareIcon className="w-3 h-3 text-muted-foreground" />
        </Link>
      </motion.div>
    </section>
  );
}
