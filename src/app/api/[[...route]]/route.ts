import { Elysia } from "elysia";
import { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } from "@/lib/blogs/authors";
import { getAllPostsAdmin, getPostBySlug, createPost, updatePost, deletePost, getAllPosts } from "@/lib/blogs";
import { hashKey, isValidToken } from "@/lib/admin-auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

const ADMIN_KEYS = (process.env.ADMIN_KEYS ?? "").split(",").map((k) => k.trim()).filter(Boolean);

async function getUserCookie(request: Request): Promise<string | undefined> {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/admin_token=([^;]+)/);
  return match?.[1];
}

const app = new Elysia()
  .onError(({ code, error: err, set }) => {
    if (code === "NOT_FOUND") return;
    set.status = 500;
    const message = err instanceof Error ? err.message : "Internal server error";
    return { error: message };
  })

  // Stats
  .get("/api/admin/stats", async () => {
    const guildId = process.env.NEXT_PUBLIC_DISCORD_GUILD_ID || "1495056269298630806";
    const [githubRes, discordRes] = await Promise.all([
      fetch("https://api.github.com/orgs/VOMLabs/repos?per_page=100&sort=updated"),
      fetch(`https://discord.com/api/guilds/${guildId}/widget.json`),
    ]);

    let stars = 0, repos = 0;
    if (githubRes.ok) {
      const reposData: any[] = await githubRes.json();
      stars = reposData.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0);
      repos = reposData.length;
    }

    let discordOnline = 0;
    if (discordRes.ok) {
      const widget: any = await discordRes.json();
      discordOnline = widget.presence_count ?? 0;
    }

    return { stars, repos, discordOnline };
  })

  // Auth
  .post("/api/admin/auth", async ({ body, set, cookie: { admin_token } }: any) => {
    const { key } = body;
    if (!key || !ADMIN_KEYS.includes(key)) {
      set.status = 401;
      return { error: "Invalid key" };
    }
    const hashed = await hashKey(key);
    admin_token?.set({ value: hashed, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
    return { ok: true };
  })
  .get("/api/admin/check", async ({ cookie: { admin_token } }: any) => {
    const authed = !!admin_token?.value && !!(await isValidToken(admin_token.value));
    return { authed };
  })
  .post("/api/admin/logout", async ({ cookie: { admin_token } }: any) => {
    admin_token?.set({ value: "", maxAge: 0, path: "/" });
    return { ok: true };
  })

  // Authors
  .get("/api/admin/authors", async () => {
    return await getAllAuthors();
  })
  .post("/api/admin/authors", async ({ body, set, request }: any) => {
    const token = await getUserCookie(request);
    if (!token || !(await isValidToken(token))) {
      set.status = 401;
      return { error: "Unauthorized" };
    }
    const { name, avatar, role } = body;
    if (!name?.trim()) {
      set.status = 400;
      return { error: "name is required" };
    }
    try {
      const author = await createAuthor({ name: name.trim(), avatar: avatar || null, role: role || null });
      set.status = 201;
      return author;
    } catch (e: any) {
      if (e.message?.includes("already exists")) {
        set.status = 409;
        return { error: e.message };
      }
      throw e;
    }
  })
  .get("/api/admin/authors/:name", async ({ params: { name }, set }: any) => {
    const author = await getAuthor(decodeURIComponent(name));
    if (!author) {
      set.status = 404;
      return { error: "Not found" };
    }
    return author;
  })
  .put("/api/admin/authors/:name", async ({ params: { name }, body, set, request }: any) => {
    const token = await getUserCookie(request);
    if (!token || !(await isValidToken(token))) {
      set.status = 401;
      return { error: "Unauthorized" };
    }
    const { newName, avatar, role } = body;
    const author = await updateAuthor(decodeURIComponent(name), {
      name: newName?.trim(),
      avatar: avatar !== undefined ? avatar : undefined,
      role: role !== undefined ? role : undefined,
    });
    if (!author) {
      set.status = 404;
      return { error: "Not found" };
    }
    return author;
  })
  .delete("/api/admin/authors/:name", async ({ params: { name }, request, set }: any) => {
    const token = await getUserCookie(request);
    if (!token || !(await isValidToken(token))) {
      set.status = 401;
      return { error: "Unauthorized" };
    }
    const deleted = await deleteAuthor(decodeURIComponent(name));
    if (!deleted) {
      set.status = 404;
      return { error: "Not found" };
    }
    return { ok: true };
  })

  // Blog posts (admin)
  .get("/api/admin/blogs", async () => {
    return await getAllPostsAdmin();
  })
  .post("/api/admin/blogs", async ({ body, set, request }: any) => {
    const token = await getUserCookie(request);
    if (!token || !(await isValidToken(token))) {
      set.status = 401;
      return { error: "Unauthorized" };
    }
    const { slug, title, date, authors, excerpt, content } = body;
    if (!slug || !title) {
      set.status = 400;
      return { error: "slug and title are required" };
    }
    try {
      const post = await createPost({
        slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
        title,
        date: date || new Date().toISOString().split("T")[0],
        authors: Array.isArray(authors) ? authors : [{ name: "VOMLabs", avatar: null }],
        excerpt: excerpt || "",
        content: content || "",
      });
      set.status = 201;
      return post;
    } catch (e: any) {
      if (e.message?.includes("already exists")) {
        set.status = 409;
        return { error: e.message };
      }
      throw e;
    }
  })
  .get("/api/admin/blogs/:slug", async ({ params: { slug }, set }: any) => {
    const post = await getPostBySlug(slug);
    if (!post) {
      set.status = 404;
      return { error: "Not found" };
    }
    return post;
  })
  .put("/api/admin/blogs/:slug", async ({ params: { slug }, body, set, request }: any) => {
    const token = await getUserCookie(request);
    if (!token || !(await isValidToken(token))) {
      set.status = 401;
      return { error: "Unauthorized" };
    }
    const { title, date, authors, excerpt, content } = body;
    const post = await updatePost(slug, {
      title, date,
      authors: Array.isArray(authors) ? authors : undefined,
      excerpt, content,
    });
    if (!post) {
      set.status = 404;
      return { error: "Not found" };
    }
    return post;
  })
  .delete("/api/admin/blogs/:slug", async ({ params: { slug }, request, set }: any) => {
    const token = await getUserCookie(request);
    if (!token || !(await isValidToken(token))) {
      set.status = 401;
      return { error: "Unauthorized" };
    }
    const deleted = await deletePost(slug);
    if (!deleted) {
      set.status = 404;
      return { error: "Not found" };
    }
    return { ok: true };
  })

  // Image upload
  .post("/api/admin/upload", async ({ body, set, request }: any) => {
    const token = await getUserCookie(request);
    if (!token || !(await isValidToken(token))) {
      set.status = 401;
      return { error: "Unauthorized" };
    }
    try {
      const cloned = request.clone();
      const formData = await cloned.formData();
      const file = formData.get("file");
      if (!file || !(file instanceof File)) {
        set.status = 400;
        return { error: "No file provided" };
      }
      if (!file.type.startsWith("image/")) {
        set.status = 400;
        return { error: "Only image files are allowed" };
      }
      if (file.size > 5 * 1024 * 1024) {
        set.status = 400;
        return { error: "File too large (max 5MB)" };
      }
      const filename = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.avif`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "authors");
      const buffer = Buffer.from(await file.arrayBuffer());
      const metadata = await sharp(buffer).metadata();
      const size = Math.min(metadata.width || 512, metadata.height || 512);
      const avifBuffer = await sharp(buffer)
        .resize(size, size, { fit: "cover", position: "centre" })
        .avif({ quality: 65 })
        .toBuffer();
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), avifBuffer);
      return { url: `/uploads/authors/${filename}` };
    } catch (e) {
      console.error("Upload error:", e);
      set.status = 500;
      return { error: "Failed to upload file" };
    }
  })

  // Upload from URL
  .post("/api/admin/upload-from-url", async ({ body, set, request }: any) => {
    const token = await getUserCookie(request);
    if (!token || !(await isValidToken(token))) {
      set.status = 401;
      return { error: "Unauthorized" };
    }
    try {
      const { url } = body;
      if (!url || typeof url !== "string") {
        set.status = 400;
        return { error: "No URL provided" };
      }
      const resp = await fetch(url);
      if (!resp.ok || !resp.headers.get("content-type")?.startsWith("image/")) {
        set.status = 400;
        return { error: "Failed to fetch image from URL" };
      }
      const buffer = Buffer.from(await resp.arrayBuffer());
      if (buffer.length > 5 * 1024 * 1024) {
        set.status = 400;
        return { error: "Image too large (max 5MB)" };
      }
      const filename = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.avif`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "authors");
      const metadata = await sharp(buffer).metadata();
      const size = Math.min(metadata.width || 512, metadata.height || 512);
      const avifBuffer = await sharp(buffer)
        .resize(size, size, { fit: "cover", position: "centre" })
        .avif({ quality: 65 })
        .toBuffer();
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), avifBuffer);
      return { url: `/uploads/authors/${filename}` };
    } catch (e) {
      console.error("Upload from URL error:", e);
      set.status = 500;
      return { error: "Failed to process image from URL" };
    }
  })

  // Minecraft
  .get("/api/admin/minecraft", async ({ query: { username }, set }: any) => {
    if (!username?.trim()) {
      set.status = 400;
      return { error: "username is required" };
    }
    try {
      const mojangRes = await fetch(`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(username.trim())}`);
      if (!mojangRes.ok) return { found: false, url: null };
      const profile: any = await mojangRes.json();
      return { found: true, url: `https://crafatar.com/avatars/${profile.id}?size=128&overlay` };
    } catch {
      set.status = 500;
      return { error: "Failed to check Minecraft username" };
    }
  })

  // Public blog routes
  .get("/api/blogs", async ({ query: { limit: limitStr } }: any) => {
    const posts = await getAllPosts();
    const limit = parseInt(limitStr || "10", 10);
    return posts.slice(0, limit);
  })
  .get("/api/blogs/:slug", async ({ params: { slug }, set }: any) => {
    const post = await getPostBySlug(slug);
    if (!post) {
      set.status = 404;
      return { error: "Not found" };
    }
    return post;
  });

async function handler(request: Request): Promise<Response> {
  const response = await app.fetch(request);
  return response || new Response("Not found", { status: 404 });
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
