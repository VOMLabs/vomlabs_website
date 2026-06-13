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

async function requireAuth(request: Request): Promise<boolean> {
  const token = await getUserCookie(request);
  return !!token && !!(await isValidToken(token));
}

function json(data: unknown, status = 200): Response {
  return Response.json(data, { status });
}

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const method = request.method;
  const pathname = url.pathname;

  // Helper to extract a named segment from the path
  const matchPath = (pattern: string): Record<string, string> | null => {
    const patternParts = pattern.split("/");
    const pathParts = pathname.split("/");
    if (patternParts.length !== pathParts.length) return null;
    const params: Record<string, string> = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(":")) {
        params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }
    return params;
  };

  try {
    // Stats
    if (method === "GET" && pathname === "/api/admin/stats") {
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
      return json({ stars, repos, discordOnline });
    }

    // Auth
    if (method === "POST" && pathname === "/api/admin/auth") {
      const { key } = await request.json();
      if (!key || !ADMIN_KEYS.includes(key)) return json({ error: "Invalid key" }, 401);
      const hashed = await hashKey(key);
      const response = json({ ok: true });
      response.headers.set(
        "Set-Cookie",
        `admin_token=${hashed}; HttpOnly; Secure=${process.env.NODE_ENV === "production"}; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 30}`
      );
      return response;
    }

    if (method === "GET" && pathname === "/api/admin/check") {
      return json({ authed: await requireAuth(request) });
    }

    if (method === "POST" && pathname === "/api/admin/logout") {
      const response = json({ ok: true });
      response.headers.set("Set-Cookie", "admin_token=; Max-Age=0; Path=/");
      return response;
    }

    // Authors
    if (method === "GET" && pathname === "/api/admin/authors") {
      return json(await getAllAuthors());
    }

    if (method === "POST" && pathname === "/api/admin/authors") {
      if (!(await requireAuth(request))) return json({ error: "Unauthorized" }, 401);
      const { name, avatar, role } = await request.json();
      if (!name?.trim()) return json({ error: "name is required" }, 400);
      try {
        const author = await createAuthor({ name: name.trim(), avatar: avatar || null, role: role || null });
        return json(author, 201);
      } catch (e: any) {
        if (e.message?.includes("already exists")) return json({ error: e.message }, 409);
        throw e;
      }
    }

    const authorParams = matchPath("/api/admin/authors/:name");
    if (authorParams) {
      if (method === "GET") {
        const author = await getAuthor(authorParams.name);
        if (!author) return json({ error: "Not found" }, 404);
        return json(author);
      }
      if (method === "PUT") {
        if (!(await requireAuth(request))) return json({ error: "Unauthorized" }, 401);
        const { newName, avatar, role } = await request.json();
        const author = await updateAuthor(authorParams.name, {
          name: newName?.trim(),
          avatar: avatar !== undefined ? avatar : undefined,
          role: role !== undefined ? role : undefined,
        });
        if (!author) return json({ error: "Not found" }, 404);
        return json(author);
      }
      if (method === "DELETE") {
        if (!(await requireAuth(request))) return json({ error: "Unauthorized" }, 401);
        const deleted = await deleteAuthor(authorParams.name);
        if (!deleted) return json({ error: "Not found" }, 404);
        return json({ ok: true });
      }
    }

    // Blog posts (admin)
    if (method === "GET" && pathname === "/api/admin/blogs") {
      return json(await getAllPostsAdmin());
    }

    if (method === "POST" && pathname === "/api/admin/blogs") {
      if (!(await requireAuth(request))) return json({ error: "Unauthorized" }, 401);
      const { slug, title, date, authors, excerpt, content } = await request.json();
      if (!slug || !title) return json({ error: "slug and title are required" }, 400);
      try {
        const post = await createPost({
          slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
          title,
          date: date || new Date().toISOString().split("T")[0],
          authors: Array.isArray(authors) ? authors : [{ name: "VOMLabs", avatar: null }],
          excerpt: excerpt || "",
          content: content || "",
        });
        return json(post, 201);
      } catch (e: any) {
        if (e.message?.includes("already exists")) return json({ error: e.message }, 409);
        throw e;
      }
    }

    const blogParams = matchPath("/api/admin/blogs/:slug");
    if (blogParams) {
      if (method === "GET") {
        const post = await getPostBySlug(blogParams.slug);
        if (!post) return json({ error: "Not found" }, 404);
        return json(post);
      }
      if (method === "PUT") {
        if (!(await requireAuth(request))) return json({ error: "Unauthorized" }, 401);
        const { title, date, authors, excerpt, content } = await request.json();
        const post = await updatePost(blogParams.slug, {
          title, date,
          authors: Array.isArray(authors) ? authors : undefined,
          excerpt, content,
        });
        if (!post) return json({ error: "Not found" }, 404);
        return json(post);
      }
      if (method === "DELETE") {
        if (!(await requireAuth(request))) return json({ error: "Unauthorized" }, 401);
        const deleted = await deletePost(blogParams.slug);
        if (!deleted) return json({ error: "Not found" }, 404);
        return json({ ok: true });
      }
    }

    // Image upload
    if (method === "POST" && pathname === "/api/admin/upload") {
      if (!(await requireAuth(request))) return json({ error: "Unauthorized" }, 401);
      try {
        const formData = await request.formData();
        const file = formData.get("file");
        if (!file || !(file instanceof File)) return json({ error: "No file provided" }, 400);
        if (!file.type.startsWith("image/")) return json({ error: "Only image files are allowed" }, 400);
        if (file.size > 5 * 1024 * 1024) return json({ error: "File too large (max 5MB)" }, 400);
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
        return json({ url: `/uploads/authors/${filename}` });
      } catch (e) {
        console.error("Upload error:", e);
        return json({ error: "Failed to upload file" }, 500);
      }
    }

    // Upload from URL
    if (method === "POST" && pathname === "/api/admin/upload-from-url") {
      if (!(await requireAuth(request))) return json({ error: "Unauthorized" }, 401);
      try {
        const { url } = await request.json();
        if (!url || typeof url !== "string") return json({ error: "No URL provided" }, 400);
        const resp = await fetch(url);
        if (!resp.ok || !resp.headers.get("content-type")?.startsWith("image/"))
          return json({ error: "Failed to fetch image from URL" }, 400);
        const buffer = Buffer.from(await resp.arrayBuffer());
        if (buffer.length > 5 * 1024 * 1024) return json({ error: "Image too large (max 5MB)" }, 400);
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
        return json({ url: `/uploads/authors/${filename}` });
      } catch (e) {
        console.error("Upload from URL error:", e);
        return json({ error: "Failed to process image from URL" }, 500);
      }
    }

    // Minecraft
    if (method === "GET" && pathname === "/api/admin/minecraft") {
      const username = url.searchParams.get("username");
      if (!username?.trim()) return json({ error: "username is required" }, 400);
      try {
        const mojangRes = await fetch(`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(username.trim())}`);
        if (!mojangRes.ok) return json({ found: false, url: null });
        const profile: any = await mojangRes.json();
        return json({ found: true, url: `https://crafatar.com/avatars/${profile.id}?size=128&overlay` });
      } catch {
        return json({ error: "Failed to check Minecraft username" }, 500);
      }
    }

    // Public blog routes
    if (method === "GET" && pathname === "/api/blogs") {
      const posts = await getAllPosts();
      const limit = parseInt(url.searchParams.get("limit") || "10", 10);
      return json(posts.slice(0, limit));
    }

    const blogPublicParams = matchPath("/api/blogs/:slug");
    if (blogPublicParams && method === "GET") {
      const post = await getPostBySlug(blogPublicParams.slug);
      if (!post) return json({ error: "Not found" }, 404);
      return json(post);
    }

    return json({ error: "Not found" }, 404);
  } catch (e) {
    console.error("[/api] error:", e);
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
}

export { handleRequest as GET, handleRequest as POST, handleRequest as PUT, handleRequest as DELETE };
