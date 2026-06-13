"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { TiptapEditor } from "@/components/admin/tiptap-editor";

export default function NewBlogPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("VOMLabs");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(val));
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), slug: slug.trim(), excerpt: excerpt.trim(), author, date, content }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create post");
      }

      toast.success("Post created");
      router.push("/admin/blog");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to create post");
    } finally {
      setSaving(false);
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

      <main className="flex-1 w-full pt-8 pb-24">
        <section className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link
                href="/admin/blog"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
              >
                <ArrowLeft className="size-4" />
                Back to posts
              </Link>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                New Blog Post
              </h1>
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-background font-semibold text-sm transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              {saving ? (
                <span className="inline-block size-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {saving ? "Saving..." : "Publish"}
            </button>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border/40 bg-muted/10">
                <span className="text-xs font-mono text-muted-foreground">
                  $ title
                </span>
              </div>
              <input
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Post title..."
                className="w-full px-4 py-3 bg-transparent text-foreground font-medium text-lg placeholder:text-muted-foreground/40 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm overflow-hidden">
                <div className="px-3 py-2 border-b border-border/40 bg-muted/10">
                  <span className="text-[11px] font-mono text-muted-foreground">
                    $ slug
                  </span>
                </div>
                <input
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="post-slug"
                  className="w-full px-3 py-2.5 bg-transparent text-foreground text-sm font-mono placeholder:text-muted-foreground/40 focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm overflow-hidden">
                <div className="px-3 py-2 border-b border-border/40 bg-muted/10">
                  <span className="text-[11px] font-mono text-muted-foreground">
                    $ author
                  </span>
                </div>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author"
                  className="w-full px-3 py-2.5 bg-transparent text-foreground text-sm font-mono placeholder:text-muted-foreground/40 focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm overflow-hidden">
                <div className="px-3 py-2 border-b border-border/40 bg-muted/10">
                  <span className="text-[11px] font-mono text-muted-foreground">
                    $ date
                  </span>
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-transparent text-foreground text-sm font-mono placeholder:text-muted-foreground/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border/40 bg-muted/10">
                <span className="text-xs font-mono text-muted-foreground">
                  $ excerpt
                </span>
              </div>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of the post..."
                rows={2}
                className="w-full px-4 py-3 bg-transparent text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none resize-none"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[11px] font-mono text-brand-accent mb-4 tracking-wide w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                CONTENT
              </div>
              <TiptapEditor
                content=""
                onChange={(html) => setContent(html)}
                placeholder="Start writing your blog post..."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
