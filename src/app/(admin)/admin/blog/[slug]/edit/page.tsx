"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Check, Image } from "lucide-react";
import { toast } from "sonner";
import { TiptapEditor } from "@/components/admin/tiptap-editor";

interface AuthorOption {
  name: string;
  avatar: string | null;
}

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [originalSlug, setOriginalSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
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
      .then((data) => setAuthorOptions(Array.isArray(data) ? data : []))
      .catch(() => {});
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
      setAuthor(created.name);
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

  const selectedAuthor = authorOptions.find((a) => a.name === author);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/admin/blogs/${params.slug}`);
        if (!res.ok) throw new Error("Not found");
        const post = await res.json();
        setTitle(post.title);
        setSlug(post.slug);
        setOriginalSlug(post.slug);
        setExcerpt(post.excerpt);
        setAuthor(post.author);
        setDate(post.date);
        setContent(post.content);
      } catch {
        toast.error("Failed to load post");
        router.push("/admin/blog");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.slug, router]);

  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/blogs/${originalSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          excerpt: excerpt.trim(),
          author,
          date,
          content,
        }),
      });

      if (!res.ok) throw new Error("Failed to update post");

      toast.success("Post updated");
      router.push("/admin/blog");
      router.refresh();
    } catch {
      toast.error("Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex flex-col pt-20">
        <main className="flex-1 w-full pt-8 pb-24">
          <section className="max-w-3xl mx-auto px-6">
            <div className="space-y-6">
              <div className="h-10 w-48 rounded-xl bg-card/10 animate-pulse" />
              <div className="h-14 rounded-xl bg-card/10 animate-pulse" />
              <div className="grid grid-cols-3 gap-4">
                <div className="h-14 rounded-xl bg-card/10 animate-pulse" />
                <div className="h-14 rounded-xl bg-card/10 animate-pulse" />
                <div className="h-14 rounded-xl bg-card/10 animate-pulse" />
              </div>
              <div className="h-20 rounded-xl bg-card/10 animate-pulse" />
              <div className="h-96 rounded-xl bg-card/10 animate-pulse" />
            </div>
          </section>
        </main>
      </div>
    );
  }

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
                Edit Post
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
              {saving ? "Saving..." : "Save Changes"}
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
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (slug === generateSlug(title) || !slug) {
                    setSlug(generateSlug(e.target.value));
                  }
                }}
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
                    $ author
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAuthorDropdown(!showAuthorDropdown)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 bg-transparent text-foreground text-sm font-mono text-left focus:outline-none"
                >
                  {selectedAuthor?.avatar ? (
                    <img src={selectedAuthor.avatar} alt="" className="size-5 rounded-full object-cover" />
                  ) : (
                    <Image className="size-4 text-muted-foreground" />
                  )}
                  <span className="flex-1">{author || "Select author..."}</span>
                  <Plus className="size-3.5 text-muted-foreground" />
                </button>

                {showAuthorDropdown && (
                  <div className="absolute top-full left-0 right-0 z-10 mt-1 rounded-xl border border-border/60 bg-card backdrop-blur-xl overflow-hidden shadow-lg">
                    {authorOptions.map((opt) => (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => {
                          setAuthor(opt.name);
                          setShowAuthorDropdown(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left hover:bg-muted/50 transition-colors"
                      >
                        {opt.avatar ? (
                          <img src={opt.avatar} alt="" className="size-5 rounded-full object-cover" />
                        ) : (
                          <Image className="size-4 text-muted-foreground" />
                        )}
                        <span className="flex-1 text-foreground">{opt.name}</span>
                        {opt.name === author && (
                          <Check className="size-3.5 text-brand-accent" />
                        )}
                      </button>
                    ))}
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
                content={content}
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
