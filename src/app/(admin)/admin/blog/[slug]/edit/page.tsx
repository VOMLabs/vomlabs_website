"use client";

import { ArrowLeft, Check, Image, Plus, Save, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TiptapEditor } from "@/components/admin/tiptap-editor";
import type { AuthorEntry } from "@/lib/blogs";

interface AuthorOption {
  avatar: string | null;
  name: string;
  role?: string | null;
}

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [originalSlug, setOriginalSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [authors, setAuthors] = useState<AuthorEntry[]>([]);
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authorOptions, setAuthorOptions] = useState<AuthorOption[]>([]);
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);
  const [showNewAuthor, setShowNewAuthor] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorAvatar, setNewAuthorAvatar] = useState("");
  const [newAuthorRole, setNewAuthorRole] = useState("");
  const [creatingAuthor, setCreatingAuthor] = useState(false);

  useEffect(() => {
    fetch("/api/admin/authors")
      .then((res) => res.json())
      .then((data) => setAuthorOptions(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const processAvatarUrl = async (
    url: string | null
  ): Promise<string | null> => {
    if (!url) {
      return null;
    }
    if (url.startsWith("/uploads/")) {
      return url;
    }
    const res = await fetch("/api/admin/upload-from-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) {
      throw new Error("Failed to process avatar URL");
    }
    const data = await res.json();
    return data.url;
  };

  const handleCreateAuthor = async () => {
    if (!newAuthorName.trim()) {
      return;
    }
    setCreatingAuthor(true);
    try {
      const avatar = newAuthorAvatar.trim() || null;
      const processedAvatar = avatar ? await processAvatarUrl(avatar) : null;
      const res = await fetch("/api/admin/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newAuthorName.trim(),
          avatar: processedAvatar,
          role: newAuthorRole.trim() || null,
        }),
      });
      if (!res.ok) {
        throw new Error();
      }
      const created = await res.json();
      setAuthorOptions((prev) => [...prev, created]);
      setAuthors((prev) => [
        ...prev,
        { name: created.name, avatar: created.avatar, role: created.role },
      ]);
      setShowNewAuthor(false);
      setNewAuthorName("");
      setNewAuthorAvatar("");
      setNewAuthorRole("");
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
      if (exists) {
        return prev.filter((a) => a.name !== opt.name);
      }
      return [{ name: opt.name, avatar: opt.avatar, role: opt.role }, ...prev];
    });
  };

  const removeAuthor = (name: string) => {
    setAuthors((prev) => prev.filter((a) => a.name !== name));
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/admin/blogs/${params.slug}`);
        if (!res.ok) {
          throw new Error("Not found");
        }
        const post = await res.json();
        setTitle(post.title);
        setSlug(post.slug);
        setOriginalSlug(post.slug);
        setExcerpt(post.excerpt);
        setAuthors(
          Array.isArray(post.authors)
            ? post.authors
            : [{ name: "VOMLabs", avatar: null }]
        );
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

  const generateSlug = (val: string) =>
    val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (authors.length === 0) {
      toast.error("At least one author is required");
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
          authors,
          date,
          content,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update post");
      }

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
      <div className="relative flex min-h-screen flex-col overflow-hidden pt-20">
        <main className="w-full flex-1 pt-8 pb-24">
          <section className="mx-auto max-w-3xl px-6">
            <div className="space-y-6">
              <div className="h-10 w-48 animate-pulse rounded-xl bg-card/10" />
              <div className="h-14 animate-pulse rounded-xl bg-card/10" />
              <div className="grid grid-cols-3 gap-4">
                <div className="h-14 animate-pulse rounded-xl bg-card/10" />
                <div className="h-14 animate-pulse rounded-xl bg-card/10" />
                <div className="h-14 animate-pulse rounded-xl bg-card/10" />
              </div>
              <div className="h-20 animate-pulse rounded-xl bg-card/10" />
              <div className="h-96 animate-pulse rounded-xl bg-card/10" />
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden pt-20 selection:bg-brand-accent/30 selection:text-brand-accent">
      <div className="fixed inset-0 z-[-2] bg-background" />
      <div
        className="pointer-events-none fixed inset-0 z-[-1] opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <main className="w-full flex-1 pt-8 pb-24">
        <section className="mx-auto max-w-3xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link
                className="mb-3 inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
                href="/admin/blog"
              >
                <ArrowLeft className="size-4" />
                Back to posts
              </Link>
              <h1 className="font-bold text-2xl text-foreground tracking-tight">
                Edit Post
              </h1>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-4 py-2.5 font-semibold text-background text-sm transition-all hover:bg-brand-accent/90 disabled:pointer-events-none disabled:opacity-40"
              disabled={saving}
              onClick={handleSave}
              type="button"
            >
              {saving ? (
                <span className="inline-block size-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
              ) : (
                <Save className="size-4" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm">
              <div className="border-border/40 border-b bg-muted/10 px-4 py-2.5">
                <span className="font-mono text-muted-foreground text-xs">
                  $ title
                </span>
              </div>
              <input
                className="w-full bg-transparent px-4 py-3 font-medium text-foreground text-lg placeholder:text-muted-foreground/40 focus:outline-none"
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (slug === generateSlug(title) || !slug) {
                    setSlug(generateSlug(e.target.value));
                  }
                }}
                placeholder="Post title..."
                value={title}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="overflow-hidden rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm">
                <div className="border-border/40 border-b bg-muted/10 px-3 py-2">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    $ slug
                  </span>
                </div>
                <input
                  className="w-full bg-transparent px-3 py-2.5 font-mono text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none"
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="post-slug"
                  value={slug}
                />
              </div>

              <div className="relative z-20 rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm">
                <div className="border-border/40 border-b bg-muted/10 px-3 py-2">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    $ authors
                  </span>
                </div>
                <div className="flex min-h-[42px] flex-wrap items-center gap-1.5 p-2">
                  {authors.map((a) => (
                    <span
                      className="inline-flex items-center gap-1 rounded-md bg-brand-accent/10 px-2 py-0.5 font-medium text-brand-accent text-xs"
                      key={a.name}
                    >
                      {a.avatar ? (
                        <img
                          alt=""
                          className="size-4 rounded-full object-cover"
                          src={a.avatar}
                        />
                      ) : (
                        <Image className="size-3" />
                      )}
                      {a.name}
                      <button
                        className="ml-0.5 transition-colors hover:text-destructive"
                        onClick={() => removeAuthor(a.name)}
                        type="button"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-muted-foreground text-xs transition-colors hover:bg-muted/30 hover:text-foreground"
                    onClick={() => setShowAuthorDropdown(!showAuthorDropdown)}
                    type="button"
                  >
                    <Plus className="size-3" />
                    {authors.length === 0 ? "Add authors" : "Add"}
                  </button>
                </div>

                {showAuthorDropdown && (
                  <div className="absolute top-full right-0 left-0 z-50 mt-1 overflow-hidden rounded-xl border border-border/60 bg-card shadow-lg backdrop-blur-xl">
                    {authorOptions.length === 0 ? (
                      <div className="px-3 py-4 text-center text-muted-foreground text-xs">
                        No authors yet
                      </div>
                    ) : (
                      authorOptions.map((opt) => {
                        const selected = authors.some(
                          (a) => a.name === opt.name
                        );
                        return (
                          <button
                            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted/50"
                            key={opt.name}
                            onClick={() => toggleAuthor(opt)}
                            type="button"
                          >
                            {opt.avatar ? (
                              <img
                                alt=""
                                className="size-5 rounded-full object-cover"
                                src={opt.avatar}
                              />
                            ) : (
                              <Image className="size-4 text-muted-foreground" />
                            )}
                            <span className="flex-1 text-foreground">
                              {opt.name}
                            </span>
                            {selected && (
                              <Check className="size-3.5 text-brand-accent" />
                            )}
                          </button>
                        );
                      })
                    )}
                    <div className="border-border/40 border-t">
                      {showNewAuthor ? (
                        <div className="space-y-2 p-3">
                          <input
                            className="w-full rounded-lg border border-border/60 bg-background/50 px-2.5 py-2 text-foreground text-xs placeholder:text-muted-foreground/40 focus:border-brand-accent/40 focus:outline-none"
                            onChange={(e) => setNewAuthorName(e.target.value)}
                            placeholder="Author name"
                            value={newAuthorName}
                          />
                          <input
                            className="w-full rounded-lg border border-border/60 bg-background/50 px-2.5 py-2 text-foreground text-xs placeholder:text-muted-foreground/40 focus:border-brand-accent/40 focus:outline-none"
                            onChange={(e) => setNewAuthorRole(e.target.value)}
                            placeholder="Role (e.g. Developer)"
                            value={newAuthorRole}
                          />
                          <input
                            className="w-full rounded-lg border border-border/60 bg-background/50 px-2.5 py-2 text-foreground text-xs placeholder:text-muted-foreground/40 focus:border-brand-accent/40 focus:outline-none"
                            onChange={(e) => setNewAuthorAvatar(e.target.value)}
                            placeholder="Avatar URL (optional)"
                            value={newAuthorAvatar}
                          />
                          <div className="flex items-center gap-2">
                            <button
                              className="rounded-lg bg-brand-accent px-3 py-1.5 font-medium text-background text-xs transition-all hover:bg-brand-accent/90 disabled:opacity-40"
                              disabled={creatingAuthor || !newAuthorName.trim()}
                              onClick={handleCreateAuthor}
                              type="button"
                            >
                              {creatingAuthor ? "Creating..." : "Create"}
                            </button>
                            <button
                              className="rounded-lg px-3 py-1.5 text-muted-foreground text-xs transition-all hover:text-foreground"
                              onClick={() => {
                                setShowNewAuthor(false);
                                setNewAuthorName("");
                                setNewAuthorAvatar("");
                                setNewAuthorRole("");
                              }}
                              type="button"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          className="flex w-full items-center gap-2 px-3 py-2.5 text-muted-foreground text-sm transition-colors hover:bg-muted/50 hover:text-foreground"
                          onClick={() => setShowNewAuthor(true)}
                          type="button"
                        >
                          <Plus className="size-4" />
                          Add new author
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="overflow-hidden rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm">
                <div className="border-border/40 border-b bg-muted/10 px-3 py-2">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    $ date
                  </span>
                </div>
                <input
                  className="w-full bg-transparent px-3 py-2.5 font-mono text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none"
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  value={date}
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm">
              <div className="border-border/40 border-b bg-muted/10 px-4 py-2.5">
                <span className="font-mono text-muted-foreground text-xs">
                  $ excerpt
                </span>
              </div>
              <textarea
                className="w-full resize-none bg-transparent px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none"
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of the post..."
                rows={2}
                value={excerpt}
              />
            </div>

            <div>
              <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1.5 font-mono text-[11px] text-brand-accent tracking-wide">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
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
