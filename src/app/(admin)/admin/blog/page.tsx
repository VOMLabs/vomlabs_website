"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { parseAsString } from "nuqs";
import { Plus, Search, Edit, Trash2, ExternalLink, Calendar, FileText } from "lucide-react";
import { toast } from "sonner";
import type { BlogPostData } from "@/lib/blogs";

export default function AdminBlogList() {
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const router = useRouter();

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (slug: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blogs/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Post deleted");
      fetchPosts();
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const filtered = posts.filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
  );

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
        <section className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[11px] font-mono text-brand-accent mb-4 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                BLOG MANAGER
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Blog Posts
              </h1>
              <p className="text-muted-foreground font-mono text-sm mt-1">
                $ ls -la /blog/ &nbsp;→&nbsp; <span className="text-brand-accent">{posts.length} posts</span>
              </p>
            </div>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-background font-semibold text-sm transition-all"
            >
              <Plus className="size-4" />
              New Post
            </Link>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value || null)}
              placeholder="Search posts..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-brand-accent/40 transition-colors"
            />
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-xl bg-card/10 animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="size-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-mono text-sm">
                {search ? "No posts match your search" : "No blog posts yet"}
              </p>
              {!search && (
                <Link
                  href="/admin/blog/new"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-brand-accent/10 text-brand-accent text-sm font-medium hover:bg-brand-accent/20 transition-colors"
                >
                  <Plus className="size-4" />
                  Create your first post
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="group rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm hover:border-brand-accent/30 transition-all duration-200"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                            <Calendar className="size-3" />
                            {post.date}
                          </span>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="text-xs text-muted-foreground font-mono">
                            {post.authors?.map((a) => a.name).join(", ") || "VOMLabs"}
                          </span>
                        </div>
                        <h2 className="text-base font-semibold text-foreground truncate">
                          {post.title}
                        </h2>
                        <p className="text-sm text-muted-foreground/80 mt-1 line-clamp-1">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          <ExternalLink className="size-4" />
                        </Link>
                        <Link
                          href={`/admin/blog/${post.slug}/edit`}
                          className="flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          <Edit className="size-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.slug, post.title)}
                          className="flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
