"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { BLOG_ICONS, getBlogIcon } from "@/lib/blogs/icons";

interface AuthorEntry {
  name: string;
  icon: string | null;
}

export default function AdminAuthors() {
  const [authors, setAuthors] = useState<AuthorEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const fetchAuthors = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/authors");
      const data = await res.json();
      setAuthors(data);
    } catch {
      toast.error("Failed to load authors");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const setIcon = async (author: string, icon: string | null) => {
    setSaving(author);
    try {
      const res = await fetch("/api/admin/authors", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, icon }),
      });
      if (!res.ok) throw new Error();
      setAuthors((prev) =>
        prev.map((a) => (a.name === author ? { ...a, icon } : a))
      );
      toast.success(`Icon set for ${author}`);
    } catch {
      toast.error("Failed to update icon");
    } finally {
      setSaving(null);
    }
  };

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
        <section className="max-w-2xl mx-auto px-6">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[11px] font-mono text-brand-accent mb-4 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              AUTHOR ICONS
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Manage Author Icons
            </h1>
            <p className="text-muted-foreground font-mono text-sm mt-1">
              $ set_icon &lt;author&gt; &lt;icon&gt;
            </p>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-20 rounded-xl bg-card/10 animate-pulse" />
              ))}
            </div>
          ) : authors.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground font-mono text-sm">
              No authors found. Create a blog post first.
            </div>
          ) : (
            <div className="space-y-4">
              {authors.map((author, i) => {
                const currentIcon = getBlogIcon(author.icon || undefined);
                return (
                  <motion.div
                    key={author.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm p-5"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {currentIcon ? (
                        <div
                          className="flex items-center justify-center rounded-lg size-10 shrink-0"
                          style={{ backgroundColor: `${currentIcon.color}15` }}
                        >
                          <currentIcon.component className="size-5" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center rounded-lg size-10 shrink-0 bg-muted/30 text-muted-foreground/50 text-sm font-mono">
                          ?
                        </div>
                      )}
                      <div>
                        <h2 className="font-semibold text-foreground">{author.name}</h2>
                        <p className="text-xs text-muted-foreground font-mono">
                          {author.icon || "no icon set"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {BLOG_ICONS.map((ico) => (
                        <button
                          key={ico.name}
                          type="button"
                          onClick={() => setIcon(author.name, author.icon === ico.name ? null : ico.name)}
                          disabled={saving === author.name}
                          data-active={author.icon === ico.name || undefined}
                          className="flex items-center justify-center rounded-lg size-8 transition-all border border-transparent data-[active]:ring-2 data-[active]:ring-offset-1 data-[active]:ring-offset-background hover:scale-110 disabled:opacity-40"
                          style={{
                            backgroundColor: `${ico.color}12`,
                            color: ico.color,
                            borderColor: author.icon === ico.name ? ico.color : "transparent",
                          }}
                          title={ico.label}
                        >
                          <ico.component className="size-4" />
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setIcon(author.name, null)}
                        disabled={saving === author.name}
                        data-active={!author.icon || undefined}
                        className="flex items-center justify-center rounded-lg size-8 transition-all border data-[active]:border-foreground/30 hover:bg-muted disabled:opacity-40 text-muted-foreground/50 text-[11px] font-mono"
                        title="No icon"
                      >
                        -
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
