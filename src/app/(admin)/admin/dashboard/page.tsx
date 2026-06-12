"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, GitFork } from "lucide-react";
import Link from "next/link";

interface Stats {
  stars: number;
  repos: number;
  discordOnline: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const cards = [
    {
      title: "GitHub Stars",
      value: stats?.stars ?? "--",
      desc: "Across all VOMLabs repos",
      icon: <Star className="size-4" />,
      color: "text-amber-500",
    },
    {
      title: "Discord Online",
      value: stats?.discordOnline ?? "--",
      desc: "Members currently online",
      icon: <Users className="size-4" />,
      color: "text-indigo-500",
    },
    {
      title: "Repositories",
      value: stats?.repos ?? "--",
      desc: "Public VOMLabs repos",
      icon: <GitFork className="size-4" />,
      color: "text-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col selection:bg-brand-accent/30 selection:text-brand-accent pt-20">
      <div className="fixed inset-0 bg-background z-[-2]" />
      <div
        className="fixed inset-0 z-[-1] opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <main className="flex-1 w-full pt-12 pb-24">
        <section className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[11px] font-mono text-brand-accent mb-6 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            DASHBOARD
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            Welcome back,{" "}
            <span className="text-brand-accent">Admin</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm mb-12">
            $ whoami &nbsp;→&nbsp; <span className="text-brand-accent">root</span>
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
                  <span className={card.color}>{card.icon}</span>
                  <span>$ {card.title.toLowerCase().replace(/\s+/g, "_")}</span>
                </div>
                <div className="text-3xl font-bold text-foreground font-mono mb-1">
                  {card.value}
                </div>
                <div className="text-sm text-muted-foreground">{card.desc}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 p-8 rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm text-center"
          >
            <p className="text-muted-foreground font-mono text-sm mb-2">
              $ ls /admin/features
            </p>
            <p className="text-muted-foreground/60 font-mono text-sm">
              <span className="text-brand-accent">→</span> More admin features coming soon
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-background font-semibold text-sm transition-all"
              >
                Back to site
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
