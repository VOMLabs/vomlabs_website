"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Pencil, Image, Upload, Gamepad2 } from "lucide-react";
import { toast } from "sonner";

interface AuthorEntry {
  id?: string;
  name: string;
  avatar: string | null;
}

function AvatarUpload({ value, onChange, username }: { value: string | null; onChange: (url: string | null) => void; username?: string }) {
  const [uploading, setUploading] = useState(false);
  const [fetchingMinecraft, setFetchingMinecraft] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large (max 5MB)");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange(data.url);
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const fetchMinecraftSkin = async () => {
    if (!username?.trim()) {
      toast.error("Enter a name first");
      return;
    }

    setFetchingMinecraft(true);
    try {
      const res = await fetch(`/api/admin/minecraft?username=${encodeURIComponent(username.trim())}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.found && data.url) {
        onChange(data.url);
        toast.success("Minecraft skin fetched");
      } else {
        toast.error("Minecraft user not found");
      }
    } catch {
      toast.error("Failed to fetch Minecraft skin");
    } finally {
      setFetchingMinecraft(false);
    }
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleSelect} />

      {value ? (
        <div className="flex items-center gap-3">
          <img src={value} alt="" className="size-14 rounded-full object-cover shrink-0" />
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs text-brand-accent hover:underline text-left"
            >
              Change image
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-xs text-destructive hover:underline text-left"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-2 p-6 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
              dragOver
                ? "border-brand-accent bg-brand-accent/5"
                : "border-border/60 hover:border-brand-accent/40 hover:bg-muted/20"
            }`}
          >
            {uploading ? (
              <span className="inline-block size-6 border-2 border-border/30 border-t-brand-accent rounded-full animate-spin" />
            ) : (
              <Upload className="size-6 text-muted-foreground" />
            )}
            <span className="text-xs text-muted-foreground font-mono">
              {uploading ? "Uploading..." : "Drop an image or click to upload"}
            </span>
          </div>
          <button
            type="button"
            onClick={fetchMinecraftSkin}
            disabled={fetchingMinecraft || !username?.trim()}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border/60 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors disabled:opacity-40"
          >
            {fetchingMinecraft ? (
              <span className="inline-block size-4 border-2 border-border/30 border-t-brand-accent rounded-full animate-spin" />
            ) : (
              <Gamepad2 className="size-4" />
            )}
            {fetchingMinecraft ? "Checking..." : "Fetch Minecraft skin avatar"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminAuthors() {
  const [authors, setAuthors] = useState<AuthorEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editingAuthorName, setEditingAuthorName] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editAvatarUrl, setEditAvatarUrl] = useState<string | null>(null);

  const fetchAuthors = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/authors");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAuthors(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load authors");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const handleAdd = async () => {
    if (!newName.trim()) {
      toast.error("Name is required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          avatar: newAvatar,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create author");
      }

      const author = await res.json();
      setAuthors((prev) => [...prev, author]);
      setNewName("");
      setNewAvatar(null);
      setShowAdd(false);
      toast.success(`Author "${author.name}" created`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to create author");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateAuthor = async (name: string, newName: string, avatar: string | null) => {
    if (!newName.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      const res = await fetch(`/api/admin/authors/${encodeURIComponent(name)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newName: newName.trim(), avatar }),
      });

      if (!res.ok) throw new Error();

      const updated = await res.json();
      setAuthors((prev) => prev.map((a) => (a.name === name ? updated : a)));
      toast.success("Author updated");
    } catch {
      toast.error("Failed to update author");
    }

    setEditingAuthorName(null);
    setEditName("");
    setEditAvatarUrl(null);
  };

  const handleDelete = async (name: string) => {
    if (!window.confirm(`Delete author "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/authors/${encodeURIComponent(name)}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setAuthors((prev) => prev.filter((a) => a.name !== name));
      toast.success(`Author "${name}" deleted`);
    } catch {
      toast.error("Failed to delete author");
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

          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[11px] font-mono text-brand-accent mb-4 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                AUTHORS
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Manage Authors
              </h1>
              <p className="text-muted-foreground font-mono text-sm mt-1">
                $ ls /authors &nbsp;→&nbsp; <span className="text-brand-accent">{authors.length} authors</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-background font-semibold text-sm transition-all"
            >
              <Plus className="size-4" />
              Add Author
            </button>
          </div>

          {showAdd && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-5 rounded-xl border border-brand-accent/30 bg-brand-accent/5 backdrop-blur-sm"
            >
              <div className="space-y-3">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Author name..."
                  className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-background/50 text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-brand-accent/40"
                />
                <AvatarUpload value={newAvatar} onChange={setNewAvatar} username={newName} />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={saving || !newName.trim()}
                    className="px-4 py-2 rounded-lg bg-brand-accent hover:bg-brand-accent/90 text-background text-sm font-medium transition-all disabled:opacity-40"
                  >
                    {saving ? "Creating..." : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdd(false);
                      setNewName("");
                      setNewAvatar(null);
                    }}
                    className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground text-sm transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-20 rounded-xl bg-card/10 animate-pulse" />
              ))}
            </div>
          ) : authors.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground font-mono text-sm">
              No authors yet. Click &ldquo;Add Author&rdquo; to create one.
            </div>
          ) : (
            <div className="space-y-3">
              {authors.map((author, i) => (
                <motion.div
                  key={author.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm p-4"
                >
                  <div className="flex items-center gap-4">
                    {author.avatar ? (
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="size-10 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="flex items-center justify-center size-10 rounded-full bg-muted/30 text-muted-foreground/50 shrink-0">
                        <Image className="size-5" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-foreground truncate">{author.name}</h2>
                      <p className="text-xs text-muted-foreground font-mono truncate">
                        {author.avatar || "no avatar"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAuthorName(author.name);
                          setEditName(author.name);
                          setEditAvatarUrl(author.avatar);
                        }}
                        className="flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        title="Edit author"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(author.name)}
                        className="flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>

                  {editingAuthorName === author.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-3 border-t border-border/40 space-y-3"
                    >
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Author name..."
                        className="w-full px-3 py-2 rounded-lg border border-border/60 bg-background/50 text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-brand-accent/40"
                      />
                      <AvatarUpload
                        value={editAvatarUrl}
                        onChange={(url) => setEditAvatarUrl(url)}
                        username={editName}
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateAuthor(author.name, editName, editAvatarUrl)}
                          className="px-3 py-2 rounded-lg bg-brand-accent hover:bg-brand-accent/90 text-background text-xs font-medium transition-all"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAuthorName(null);
                            setEditName("");
                            setEditAvatarUrl(null);
                          }}
                          className="px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground text-xs transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
