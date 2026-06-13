"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Check, Image, X } from "lucide-react";
import { toast } from "sonner";
import { TiptapEditor } from "@/components/admin/tiptap-editor";
import type { AuthorEntry } from "@/lib/blogs";

interface AuthorOption {
  name: string;
  avatar: string | null;
}

export default function NewBlogPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [authors, setAuthors] = useState<AuthorEntry[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [authorOptions, setAuthorOptions] = useState<AuthorOption[]>([]);
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);
  const [showNewAuthor, setShowNewAuthor] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorAvatar, setNewAuthorAvatar] = useState("");
  const [creatingAuthor, setCreatingAuthor] = useState(false);

  useEffect(() => {
    fetch("/api/admin/authors")
      .then((res) => res.json())
      .then((data) => {
        const opts = Array.isArray(data) ? data : [];
        setAuthorOptions(opts);
      })
      .catch(() => toast.error("Failed to load authors"));
  }, []);

  const handleCreateAuthor = async () => {
    if (!newAuthorName.trim()) return;
    setCreatingAuthor(true);
    try {
      const res = await fetch("/api/admin/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newAuthorName.trim(),
          avatar: newAuthorAvatar.trim() || null,
        }),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setAuthorOptions((prev) => [...prev, created]);
      setAuthors((prev) => [...prev, { name: created.name, avatar: created.avatar }]);
      setShowNewAuthor(false);
      setNewAuthorName("");
      setNewAuthorAvatar("");
      toast.success(`Author "${created.name}" created`);
    } catch {
      toast.error("Failed to create author");
    } finally {
      setCreatingAuthor(false);
    }
  };

  const toggleAuthor = (opt: AuthorOption) => {
    setAuthors((prev) => {
      const exists = prev.find((a) => a.name === opt.name);
      if (exists) return prev.filter((a) => a.name !== opt.name);
      return [...prev, { name: opt.name, avatar: opt.avatar }];
    });
  };

  const removeAuthor = (name: string) => {
    setAuthors((prev) => prev.filter((a) => a.name !== name));
  };

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
    if (authors.length === 0) {
      toast.error("At least one author is required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), slug: slug.trim(), excerpt: excerpt.trim(), authors, date, content }),
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

              <div className="rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm overflow-hidden relative">
                <div className="px-3 py-2 border-b border-border/40 bg-muted/10">
                  <span className="text-[11px] font-mono text-muted-foreground">
                    $ authors
                  </span>
                </div>
                <div className="p-2 min-h-[42px] flex flex-wrap items-center gap-1.5">
                  {authors.map((a) => (
                    <span
                      key={a.name}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-accent/10 text-brand-accent text-xs font-medium"
                    >
                      {a.avatar ? (
                        <img src={a.avatar} alt="" className="size-4 rounded-full object-cover" />
                      ) : (
                        <Image className="size-3" />
                      )}
                      {a.name}
                      <button
                        type="button"
                        onClick={() => removeAuthor(a.name)}
                        className="ml-0.5 hover:text-destructive transition-colors"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowAuthorDropdown(!showAuthorDropdown)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 text-xs transition-colors"
                  >
                    <Plus className="size-3" />
                    {authors.length === 0 ? "Add authors" : "Add"}
                  </button>
                </div>

                {showAuthorDropdown && (
                  <div className="absolute top-full left-0 right-0 z-10 mt-1 rounded-xl border border-border/60 bg-card backdrop-blur-xl overflow-hidden shadow-lg">
                    {authorOptions.length === 0 ? (
                      <div className="px-3 py-4 text-xs text-muted-foreground text-center">
                        No authors yet
                      </div>
                    ) : (
                      authorOptions.map((opt) => {
                        const selected = authors.some((a) => a.name === opt.name);
                        return (
                          <button
                            key={opt.name}
                            type="button"
                            onClick={() => toggleAuthor(opt)}
                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left hover:bg-muted/50 transition-colors"
                          >
                            {opt.avatar ? (
                              <img src={opt.avatar} alt="" className="size-5 rounded-full object-cover" />
                            ) : (
                              <Image className="size-4 text-muted-foreground" />
                            )}
                            <span className="flex-1 text-foreground">{opt.name}</span>
                            {selected && (
                              <Check className="size-3.5 text-brand-accent" />
                            )}
                          </button>
                        );
                      })
                    )}
                    <div className="border-t border-border/40">
                      {showNewAuthor ? (
                        <div className="p-3 space-y-2">
                          <input
                            value={newAuthorName}
                            onChange={(e) => setNewAuthorName(e.target.value)}
                            placeholder="Author name"
                            className="w-full px-2.5 py-2 rounded-lg border border-border/60 bg-background/50 text-foreground text-xs placeholder:text-muted-foreground/40 focus:outline-none focus:border-brand-accent/40"
                          />
                          <input
                            value={newAuthorAvatar}
                            onChange={(e) => setNewAuthorAvatar(e.target.value)}
                            placeholder="Avatar URL (optional)"
                            className="w-full px-2.5 py-2 rounded-lg border border-border/60 bg-background/50 text-foreground text-xs placeholder:text-muted-foreground/40 focus:outline-none focus:border-brand-accent/40"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={handleCreateAuthor}
                              disabled={creatingAuthor || !newAuthorName.trim()}
                              className="px-3 py-1.5 rounded-lg bg-brand-accent hover:bg-brand-accent/90 text-background text-xs font-medium transition-all disabled:opacity-40"
                            >
                              {creatingAuthor ? "Creating..." : "Create"}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowNewAuthor(false);
                                setNewAuthorName("");
                                setNewAuthorAvatar("");
                              }}
                              className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground text-xs transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowNewAuthor(true)}
                          className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <Plus className="size-4" />
                          Add new author
                        </button>
                      )}
                    </div>
                  </div>
                )}
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
