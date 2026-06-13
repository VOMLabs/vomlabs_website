"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Edit,
  ExternalLink,
  FileText,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useEffect, useState } from "react";
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
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
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
    if (!window.confirm(`Delete "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/blogs/${slug}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error();
      }
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
    <div className="relative flex min-h-screen flex-col overflow-hidden pt-20 selection:bg-brand-accent/30 selection:text-brand-accent">
      <div className="fixed inset-0 z-[-2] bg-background" />
      <div
        className="pointer-events-none fixed inset-0 z-[-1] opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <main className="w-full flex-1 pt-12 pb-24">
        <section className="mx-auto max-w-4xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1.5 font-mono text-[11px] text-brand-accent tracking-wide">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                BLOG MANAGER
              </div>
              <h1 className="font-bold text-3xl text-foreground tracking-tight">
                Blog Posts
              </h1>
              <p className="mt-1 font-mono text-muted-foreground text-sm">
                $ ls -la /blog/ &nbsp;→&nbsp;{" "}
                <span className="text-brand-accent">{posts.length} posts</span>
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-4 py-2.5 font-semibold text-background text-sm transition-all hover:bg-brand-accent/90"
              href="/admin/blog/new"
            >
              <Plus className="size-4" />
              New Post
            </Link>
          </div>

          <div className="relative mb-8">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-10 w-full rounded-xl border border-border/60 bg-card/20 pr-4 pl-10 text-foreground text-sm backdrop-blur-sm transition-colors placeholder:text-muted-foreground/40 focus:border-brand-accent/40 focus:outline-none"
              onChange={(e) => setSearch(e.target.value || null)}
              placeholder="Search posts..."
              value={search}
            />
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  className="h-24 animate-pulse rounded-xl bg-card/10"
                  key={i}
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <FileText className="mx-auto mb-4 size-12 text-muted-foreground/30" />
              <p className="font-mono text-muted-foreground text-sm">
                {search ? "No posts match your search" : "No blog posts yet"}
              </p>
              {!search && (
                <Link
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-accent/10 px-4 py-2 font-medium text-brand-accent text-sm transition-colors hover:bg-brand-accent/20"
                  href="/admin/blog/new"
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
                  animate={{ opacity: 1, y: 0 }}
                  className="group rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm transition-all duration-200 hover:border-brand-accent/30"
                  initial={{ opacity: 0, y: 10 }}
                  key={post.slug}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="mb-1.5 flex items-center gap-2">
                          <span className="flex items-center gap-1 font-mono text-muted-foreground text-xs">
                            <Calendar className="size-3" />
                            {post.date}
                          </span>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="font-mono text-muted-foreground text-xs">
                            {post.authors?.map((a) => a.name).join(", ") ||
                              "VOMLabs"}
                          </span>
                        </div>
                        <h2 className="truncate font-semibold text-base text-foreground">
                          {post.title}
                        </h2>
                        <p className="mt-1 line-clamp-1 text-muted-foreground/80 text-sm">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1">
                        <Link
                          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          href={`/blog/${post.slug}`}
                          target="_blank"
                        >
                          <ExternalLink className="size-4" />
                        </Link>
                        <Link
                          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          href={`/admin/blog/${post.slug}/edit`}
                        >
                          <Edit className="size-4" />
                        </Link>
                        <button
                          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDelete(post.slug, post.title)}
                          type="button"
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
