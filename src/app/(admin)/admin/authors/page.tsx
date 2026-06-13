"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Gamepad2,
  Image,
  Link2,
  Pencil,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface AuthorEntry {
  avatar: string | null;
  id?: string;
  name: string;
  role?: string | null;
}

function AvatarUpload({
  value,
  onChange,
  username,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  username?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [fetchingMinecraft, setFetchingMinecraft] = useState(false);
  const [downloadingUrl, setDownloadingUrl] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState("");
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
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Upload failed");
      }
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
    if (file) {
      uploadFile(file);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleUrlSubmit = async () => {
    const trimmed = urlValue.trim();
    if (!trimmed) {
      return;
    }
    setDownloadingUrl(true);
    try {
      const res = await fetch("/api/admin/upload-from-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      if (!res.ok) {
        throw new Error("Failed to download image");
      }
      const data = await res.json();
      onChange(data.url);
      setShowUrlInput(false);
      setUrlValue("");
    } catch {
      toast.error("Failed to download image from URL");
    } finally {
      setDownloadingUrl(false);
    }
  };

  const fetchMinecraftSkin = async () => {
    if (!username?.trim()) {
      toast.error("Enter a name first");
      return;
    }

    setFetchingMinecraft(true);
    try {
      const res = await fetch(
        `/api/admin/minecraft?username=${encodeURIComponent(username.trim())}`
      );
      if (!res.ok) {
        throw new Error();
      }
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
      <input
        accept="image/*"
        className="hidden"
        onChange={handleSelect}
        ref={inputRef}
        type="file"
      />

      {value ? (
        <div className="flex items-center gap-3">
          <img
            alt=""
            className="size-14 shrink-0 rounded-full object-cover"
            src={value}
          />
          <div className="flex flex-col gap-1.5">
            <button
              className="text-left text-brand-accent text-xs hover:underline"
              onClick={() => inputRef.current?.click()}
              type="button"
            >
              Change image
            </button>
            <button
              className="text-left text-destructive text-xs hover:underline"
              onClick={() => onChange(null)}
              type="button"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div
            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors ${
              dragOver
                ? "border-brand-accent bg-brand-accent/5"
                : "border-border/60 hover:border-brand-accent/40 hover:bg-muted/20"
            }`}
            onClick={() => inputRef.current?.click()}
            onDragLeave={() => setDragOver(false)}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDrop={handleDrop}
          >
            {uploading ? (
              <span className="inline-block size-6 animate-spin rounded-full border-2 border-border/30 border-t-brand-accent" />
            ) : (
              <Upload className="size-6 text-muted-foreground" />
            )}
            <span className="font-mono text-muted-foreground text-xs">
              {uploading ? "Uploading..." : "Drop an image or click to upload"}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border/60 px-3 py-2 text-muted-foreground text-xs transition-colors hover:bg-muted/20 hover:text-foreground disabled:opacity-40"
              disabled={fetchingMinecraft || !username?.trim()}
              onClick={fetchMinecraftSkin}
              type="button"
            >
              {fetchingMinecraft ? (
                <span className="inline-block size-4 animate-spin rounded-full border-2 border-border/30 border-t-brand-accent" />
              ) : (
                <Gamepad2 className="size-4" />
              )}
              {fetchingMinecraft ? "Checking..." : "Minecraft"}
            </button>
            <button
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border/60 px-3 py-2 text-muted-foreground text-xs transition-colors hover:bg-muted/20 hover:text-foreground"
              onClick={() => setShowUrlInput(!showUrlInput)}
              type="button"
            >
              <Link2 className="size-4" />
              Paste URL
            </button>
          </div>
          {showUrlInput && (
            <div className="flex items-center gap-2">
              <input
                className="flex-1 rounded-lg border border-border/60 bg-background/50 px-3 py-2 text-foreground text-xs placeholder:text-muted-foreground/40 focus:border-brand-accent/40 focus:outline-none"
                onChange={(e) => setUrlValue(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                value={urlValue}
              />
              <button
                className="rounded-lg bg-brand-accent px-3 py-2 font-medium text-background text-xs transition-all hover:bg-brand-accent/90 disabled:opacity-40"
                disabled={!urlValue.trim() || downloadingUrl}
                onClick={handleUrlSubmit}
                type="button"
              >
                {downloadingUrl ? (
                  <span className="inline-block size-3.5 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                ) : (
                  "Set"
                )}
              </button>
            </div>
          )}
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
  const [newRole, setNewRole] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingAuthorName, setEditingAuthorName] = useState<string | null>(
    null
  );
  const [editName, setEditName] = useState("");
  const [editAvatarUrl, setEditAvatarUrl] = useState<string | null>(null);
  const [editRole, setEditRole] = useState("");

  const fetchAuthors = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/authors");
      if (!res.ok) {
        throw new Error();
      }
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
          role: newRole.trim() || null,
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
      setNewRole("");
      setShowAdd(false);
      toast.success(`Author "${author.name}" created`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to create author");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateAuthor = async (
    name: string,
    newName: string,
    avatar: string | null,
    role: string
  ) => {
    if (!newName.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      const res = await fetch(
        `/api/admin/authors/${encodeURIComponent(name)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newName: newName.trim(),
            avatar,
            role: role.trim() || null,
          }),
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      const updated = await res.json();
      setAuthors((prev) => prev.map((a) => (a.name === name ? updated : a)));
      toast.success("Author updated");
    } catch {
      toast.error("Failed to update author");
    }

    setEditingAuthorName(null);
    setEditName("");
    setEditAvatarUrl(null);
    setEditRole("");
  };

  const handleDelete = async (name: string) => {
    if (!window.confirm(`Delete author "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(
        `/api/admin/authors/${encodeURIComponent(name)}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      setAuthors((prev) => prev.filter((a) => a.name !== name));
      toast.success(`Author "${name}" deleted`);
    } catch {
      toast.error("Failed to delete author");
    }
  };

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
        <section className="mx-auto max-w-2xl px-6">
          <Link
            className="mb-6 inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="/admin/dashboard"
          >
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1.5 font-mono text-[11px] text-brand-accent tracking-wide">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                AUTHORS
              </div>
              <h1 className="font-bold text-3xl text-foreground tracking-tight">
                Manage Authors
              </h1>
              <p className="mt-1 font-mono text-muted-foreground text-sm">
                $ ls /authors &nbsp;→&nbsp;{" "}
                <span className="text-brand-accent">
                  {authors.length} authors
                </span>
              </p>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-4 py-2.5 font-semibold text-background text-sm transition-all hover:bg-brand-accent/90"
              onClick={() => setShowAdd(true)}
              type="button"
            >
              <Plus className="size-4" />
              Add Author
            </button>
          </div>

          {showAdd && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-5 backdrop-blur-sm"
              initial={{ opacity: 0, y: -10 }}
            >
              <div className="space-y-3">
                <input
                  className="w-full rounded-lg border border-border/60 bg-background/50 px-3 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/40 focus:border-brand-accent/40 focus:outline-none"
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Author name..."
                  value={newName}
                />
                <input
                  className="w-full rounded-lg border border-border/60 bg-background/50 px-3 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/40 focus:border-brand-accent/40 focus:outline-none"
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="Role (e.g. Developer, Designer...)"
                  value={newRole}
                />
                <AvatarUpload
                  onChange={setNewAvatar}
                  username={newName}
                  value={newAvatar}
                />
                <div className="flex items-center gap-2">
                  <button
                    className="rounded-lg bg-brand-accent px-4 py-2 font-medium text-background text-sm transition-all hover:bg-brand-accent/90 disabled:opacity-40"
                    disabled={saving || !newName.trim()}
                    onClick={handleAdd}
                    type="button"
                  >
                    {saving ? "Creating..." : "Create"}
                  </button>
                  <button
                    className="rounded-lg px-4 py-2 text-muted-foreground text-sm transition-all hover:text-foreground"
                    onClick={() => {
                      setShowAdd(false);
                      setNewName("");
                      setNewAvatar(null);
                      setNewRole("");
                    }}
                    type="button"
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
                <div
                  className="h-20 animate-pulse rounded-xl bg-card/10"
                  key={i}
                />
              ))}
            </div>
          ) : authors.length === 0 ? (
            <div className="py-16 text-center font-mono text-muted-foreground text-sm">
              No authors yet. Click &ldquo;Add Author&rdquo; to create one.
            </div>
          ) : (
            <div className="space-y-3">
              {authors.map((author, i) => (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-border/60 bg-card/20 p-4 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  key={author.name}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <div className="flex items-center gap-4">
                    {author.avatar ? (
                      <img
                        alt={author.name}
                        className="size-10 shrink-0 rounded-full object-cover"
                        src={author.avatar}
                      />
                    ) : (
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted/30 text-muted-foreground/50">
                        <Image className="size-5" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate font-semibold text-foreground">
                        {author.name}
                      </h2>
                      <p className="truncate font-mono text-muted-foreground text-xs">
                        {author.role ||
                          (author.avatar ? "avatar set" : "no avatar")}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        onClick={() => {
                          setEditingAuthorName(author.name);
                          setEditName(author.name);
                          setEditAvatarUrl(author.avatar);
                          setEditRole(author.role || "");
                        }}
                        title="Edit author"
                        type="button"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(author.name)}
                        title="Delete"
                        type="button"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>

                  {editingAuthorName === author.name && (
                    <motion.div
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 space-y-3 border-border/40 border-t pt-3"
                      initial={{ opacity: 0, height: 0 }}
                    >
                      <input
                        className="w-full rounded-lg border border-border/60 bg-background/50 px-3 py-2 text-foreground text-sm placeholder:text-muted-foreground/40 focus:border-brand-accent/40 focus:outline-none"
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Author name..."
                        value={editName}
                      />
                      <input
                        className="w-full rounded-lg border border-border/60 bg-background/50 px-3 py-2 text-foreground text-sm placeholder:text-muted-foreground/40 focus:border-brand-accent/40 focus:outline-none"
                        onChange={(e) => setEditRole(e.target.value)}
                        placeholder="Role (e.g. Developer, Designer...)"
                        value={editRole}
                      />
                      <AvatarUpload
                        onChange={(url) => setEditAvatarUrl(url)}
                        username={editName}
                        value={editAvatarUrl}
                      />
                      <div className="flex items-center gap-2">
                        <button
                          className="rounded-lg bg-brand-accent px-3 py-2 font-medium text-background text-xs transition-all hover:bg-brand-accent/90"
                          onClick={() =>
                            handleUpdateAuthor(
                              author.name,
                              editName,
                              editAvatarUrl,
                              editRole
                            )
                          }
                          type="button"
                        >
                          Save
                        </button>
                        <button
                          className="rounded-lg px-3 py-2 text-muted-foreground text-xs transition-all hover:text-foreground"
                          onClick={() => {
                            setEditingAuthorName(null);
                            setEditName("");
                            setEditAvatarUrl(null);
                            setEditRole("");
                          }}
                          type="button"
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
