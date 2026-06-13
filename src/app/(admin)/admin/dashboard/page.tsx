"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  GitFork,
  LogOut,
  Plus,
  Star,
  UserCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Stats {
  discordOnline: number;
  repos: number;
  stars: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

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
    <div className="relative flex min-h-screen flex-col overflow-hidden pt-20 selection:bg-brand-accent/30 selection:text-brand-accent">
      <div className="fixed inset-0 z-[-2] bg-background" />
      <div
        className="pointer-events-none fixed inset-0 z-[-1] opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <main className="w-full flex-1 pt-12 pb-24">
        <section className="mx-auto max-w-6xl px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1.5 font-mono text-[11px] text-brand-accent tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
            DASHBOARD
          </div>
          <h1 className="mb-3 font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            Welcome back, <span className="text-brand-accent">Admin</span>
          </h1>
          <p className="mb-12 font-mono text-muted-foreground text-sm">
            $ whoami &nbsp;→&nbsp;{" "}
            <span className="text-brand-accent">root</span>
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <motion.div
                className="rounded-xl border border-border/60 bg-card/20 p-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                key={card.title}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="mb-3 flex items-center gap-2 font-mono text-muted-foreground text-xs">
                  <span className={card.color}>{card.icon}</span>
                  <span>$ {card.title.toLowerCase().replace(/\s+/g, "_")}</span>
                </div>
                <div className="mb-1 font-bold font-mono text-3xl text-foreground">
                  {card.value}
                </div>
                <div className="text-muted-foreground text-sm">{card.desc}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 rounded-xl border border-border/60 bg-card/20 p-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="mb-6 font-mono text-muted-foreground text-sm">
              $ ls /admin/features
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Link
                className="group rounded-xl border border-border/60 bg-card/10 p-5 transition-all hover:border-brand-accent/30"
                href="/admin/blog"
              >
                <div className="mb-2 flex items-center gap-3">
                  <FileText className="size-5 text-brand-accent" />
                  <span className="font-semibold text-foreground transition-colors group-hover:text-brand-accent">
                    Blog Manager
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Create, edit and manage blog posts
                </p>
              </Link>
              <Link
                className="group rounded-xl border border-border/60 bg-card/10 p-5 transition-all hover:border-brand-accent/30"
                href="/admin/blog/new"
              >
                <div className="mb-2 flex items-center gap-3">
                  <Plus className="size-5 text-brand-accent" />
                  <span className="font-semibold text-foreground transition-colors group-hover:text-brand-accent">
                    New Post
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Write a new blog post
                </p>
              </Link>
              <Link
                className="group rounded-xl border border-border/60 bg-card/10 p-5 transition-all hover:border-brand-accent/30"
                href="/admin/authors"
              >
                <div className="mb-2 flex items-center gap-3">
                  <UserCircle className="size-5 text-brand-accent" />
                  <span className="font-semibold text-foreground transition-colors group-hover:text-brand-accent">
                    Authors
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Manage authors and profile pictures
                </p>
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3 border-border/40 border-t pt-6">
              <Link
                className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-5 py-2.5 font-semibold text-background text-sm transition-all hover:bg-brand-accent/90"
                href="/"
              >
                Back to site
                <ArrowRight className="size-4" />
              </Link>
              <button
                className="inline-flex items-center gap-2 rounded-xl border border-destructive/40 px-5 py-2.5 font-semibold text-muted-foreground text-sm transition-all hover:bg-destructive/10 hover:text-destructive"
                onClick={handleLogout}
                type="button"
              >
                <LogOut className="size-4" />
                Log out
              </button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
