"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  GitFork,
  LayoutDashboard,
  LogOut,
  Plus,
  Star,
  UserCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Stats {
  discordOnline: number;
  repos: number;
  stars: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

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
      bgGlow: "bg-amber-500/5",
      borderHover: "hover:border-amber-500/30",
    },
    {
      title: "Discord Online",
      value: stats?.discordOnline ?? "--",
      desc: "Members currently online",
      icon: <Users className="size-4" />,
      color: "text-indigo-500",
      bgGlow: "bg-indigo-500/5",
      borderHover: "hover:border-indigo-500/30",
    },
    {
      title: "Repositories",
      value: stats?.repos ?? "--",
      desc: "Public VOMLabs repos",
      icon: <GitFork className="size-4" />,
      color: "text-success",
      bgGlow: "bg-success/10",
      borderHover: "hover:border-success/30",
    },
  ];

  const features = [
    {
      title: "Blog Manager",
      desc: "Create, edit and manage blog posts",
      icon: <FileText className="size-5 text-brand-accent" />,
      href: "/admin/blog",
    },
    {
      title: "New Post",
      desc: "Write a new blog post",
      icon: <Plus className="size-5 text-brand-accent" />,
      href: "/admin/blog/new",
    },
    {
      title: "Authors",
      desc: "Manage authors and profile pictures",
      icon: <UserCircle className="size-5 text-brand-accent" />,
      href: "/admin/authors",
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
      <div className="pointer-events-none fixed top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-brand-accent/5 blur-[150px]" />

      <main className="w-full flex-1 pt-12 pb-24">
        <section className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1.5 font-mono text-[11px] text-brand-accent tracking-wide">
                <LayoutDashboard className="size-3.5" />
                DASHBOARD
              </div>
              <h1 className="mb-3 font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-brand-accent to-brand-accent/60 bg-clip-text text-transparent">
                  Admin
                </span>
              </h1>
              <p className="mb-12 font-mono text-muted-foreground text-sm">
                $ whoami &nbsp;→&nbsp;{" "}
                <span className="text-brand-accent">root</span>
              </p>
            </motion.div>

            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
            >
              {cards.map((card) => (
                <motion.div
                  className={`rounded-xl border border-border/60 bg-card/20 p-6 backdrop-blur-sm transition-all duration-300 ${card.borderHover} ${card.bgGlow} hover:shadow-lg`}
                  key={card.title}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  <div className="mb-3 flex items-center gap-2 font-mono text-muted-foreground text-xs">
                    <span className={card.color}>{card.icon}</span>
                    <span>$ {card.title.toLowerCase().replace(/\s+/g, "_")}</span>
                  </div>
                  <motion.div
                    className="mb-1 font-bold font-mono text-3xl text-foreground"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                  >
                    {card.value}
                  </motion.div>
                  <div className="text-muted-foreground text-sm">{card.desc}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-12 rounded-xl border border-border/60 bg-card/20 p-8 backdrop-blur-sm"
              variants={itemVariants}
            >
              <p className="mb-6 font-mono text-muted-foreground text-sm">
                $ ls /admin/features
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {features.map((feature) => (
                  <Link
                    className="group rounded-xl border border-border/60 bg-card/10 p-5 transition-all duration-200 hover:border-brand-accent/30 hover:bg-card/20 hover:shadow-sm"
                    href={feature.href}
                    key={feature.title}
                  >
                    <div className="mb-2 flex items-center gap-3">
                      {feature.icon}
                      <span className="font-semibold text-foreground transition-colors group-hover:text-brand-accent">
                        {feature.title}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{feature.desc}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center gap-3 border-border/40 border-t pt-6">
                <Link
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-5 py-2.5 font-semibold text-background text-sm transition-all hover:bg-brand-accent/90 active:scale-[0.97]"
                  href="/"
                >
                  Back to site
                  <ArrowRight className="size-4" />
                </Link>
                <Button
                  className="border-destructive/40 px-5 py-2.5"
                  onClick={handleLogout}
                  variant="destructive"
                >
                  <LogOut className="size-4" />
                  Log out
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
