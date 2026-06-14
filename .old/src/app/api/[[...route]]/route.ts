import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { hashKey, isValidToken } from "@/lib/admin-auth";
import {
  createPost,
  deletePost,
  getAllPosts,
  getAllPostsAdmin,
  getPostBySlug,
  updatePost,
} from "@/lib/blogs";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
} from "@/lib/blogs/authors";

const ADMIN_KEYS = (process.env.ADMIN_KEYS ?? "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);

async function getUserCookie(r: Request): Promise<string | undefined> {
  const m = r.headers.get("cookie")?.match(/admin_token=([^;]+)/);
  return m?.[1];
}

async function isAuth(r: Request): Promise<boolean> {
  const t = await getUserCookie(r);
  return !!t && !!(await isValidToken(t));
}

function respond(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

type RouteMatch = Record<string, string> | null;
function match(pattern: string, pathname: string): RouteMatch {
  const pa = pattern.split("/"),
    pb = pathname.split("/");
  if (pa.length !== pb.length) {
    return null;
  }
  const p: Record<string, string> = {};
  for (let i = 0; i < pa.length; i++) {
    if (pa[i].startsWith(":")) {
      p[pa[i].slice(1)] = decodeURIComponent(pb[i]);
    } else if (pa[i] !== pb[i]) {
      return null;
    }
  }
  return p;
}

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const m = req.method;
  const p = url.pathname;

  // Simple ping
  if (m === "GET" && p === "/api/ping") {
    return respond({ pong: true });
  }

  try {
    // === STATS ===
    if (m === "GET" && p === "/api/admin/stats") {
      const gid =
        process.env.NEXT_PUBLIC_DISCORD_GUILD_ID || "1495056269298630806";
      const [gr, dr] = await Promise.all([
        fetch(
          "https://api.github.com/orgs/VOMLabs/repos?per_page=100&sort=updated"
        ),
        fetch(`https://discord.com/api/guilds/${gid}/widget.json`),
      ]);
      let stars = 0,
        repos = 0;
      if (gr.ok) {
        const d: any[] = await gr.json();
        stars = d.reduce(
          (a: number, r: any) => a + (r.stargazers_count || 0),
          0
        );
        repos = d.length;
      }
      let online = 0;
      if (dr.ok) {
        const d: any = await dr.json();
        online = d.presence_count ?? 0;
      }
      return respond({ stars, repos, discordOnline: online });
    }

    // === AUTH ===
    if (m === "POST" && p === "/api/admin/auth") {
      const { key } = await req.json();
      if (!(key && ADMIN_KEYS.includes(key))) {
        return respond({ error: "Invalid key" }, 401);
      }
      const h = await hashKey(key);
      const r = respond({ ok: true });
      r.headers.set(
        "Set-Cookie",
        `admin_token=${h}; HttpOnly; Secure=${process.env.NODE_ENV === "production"}; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 30}`
      );
      return r;
    }
    if (m === "GET" && p === "/api/admin/check") {
      return respond({ authed: await isAuth(req) });
    }
    if (m === "POST" && p === "/api/admin/logout") {
      const r = respond({ ok: true });
      r.headers.set("Set-Cookie", "admin_token=; Max-Age=0; Path=/");
      return r;
    }

    // === AUTHORS ===
    if (m === "GET" && p === "/api/admin/authors") {
      return respond(await getAllAuthors());
    }
    if (m === "POST" && p === "/api/admin/authors") {
      if (!(await isAuth(req))) {
        return respond({ error: "Unauthorized" }, 401);
      }
      const { name, avatar, role } = await req.json();
      if (!name?.trim()) {
        return respond({ error: "name is required" }, 400);
      }
      try {
        return respond(
          await createAuthor({
            name: name.trim(),
            avatar: avatar || null,
            role: role || null,
          }),
          201
        );
      } catch (e: any) {
        if (e.message?.includes("already exists")) {
          return respond({ error: e.message }, 409);
        }
        throw e;
      }
    }
    const ap = match("/api/admin/authors/:name", p);
    if (ap) {
      if (m === "GET") {
        const a = await getAuthor(ap.name);
        if (!a) {
          return respond({ error: "Not found" }, 404);
        }
        return respond(a);
      }
      if (m === "PUT") {
        if (!(await isAuth(req))) {
          return respond({ error: "Unauthorized" }, 401);
        }
        const { newName, avatar, role } = await req.json();
        const a = await updateAuthor(ap.name, {
          name: newName?.trim(),
          avatar: avatar === undefined ? undefined : avatar,
          role: role === undefined ? undefined : role,
        });
        if (!a) {
          return respond({ error: "Not found" }, 404);
        }
        return respond(a);
      }
      if (m === "DELETE") {
        if (!(await isAuth(req))) {
          return respond({ error: "Unauthorized" }, 401);
        }
        const d = await deleteAuthor(ap.name);
        if (!d) {
          return respond({ error: "Not found" }, 404);
        }
        return respond({ ok: true });
      }
    }

    // === BLOGS (admin) ===
    if (m === "GET" && p === "/api/admin/blogs") {
      return respond(await getAllPostsAdmin());
    }
    if (m === "POST" && p === "/api/admin/blogs") {
      if (!(await isAuth(req))) {
        return respond({ error: "Unauthorized" }, 401);
      }
      const { slug, title, date, authors, excerpt, content } = await req.json();
      if (!(slug && title)) {
        return respond({ error: "slug and title are required" }, 400);
      }
      try {
        return respond(
          await createPost({
            slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
            title,
            date: date || new Date().toISOString().split("T")[0],
            authors: Array.isArray(authors)
              ? authors
              : [{ name: "VOMLabs", avatar: null }],
            excerpt: excerpt || "",
            content: content || "",
          }),
          201
        );
      } catch (e: any) {
        if (e.message?.includes("already exists")) {
          return respond({ error: e.message }, 409);
        }
        throw e;
      }
    }
    const bp = match("/api/admin/blogs/:slug", p);
    if (bp) {
      if (m === "GET") {
        const po = await getPostBySlug(bp.slug);
        if (!po) {
          return respond({ error: "Not found" }, 404);
        }
        return respond(po);
      }
      if (m === "PUT") {
        if (!(await isAuth(req))) {
          return respond({ error: "Unauthorized" }, 401);
        }
        const { title, date, authors, excerpt, content } = await req.json();
        const po = await updatePost(bp.slug, {
          title,
          date,
          authors: Array.isArray(authors) ? authors : undefined,
          excerpt,
          content,
        });
        if (!po) {
          return respond({ error: "Not found" }, 404);
        }
        return respond(po);
      }
      if (m === "DELETE") {
        if (!(await isAuth(req))) {
          return respond({ error: "Unauthorized" }, 401);
        }
        const d = await deletePost(bp.slug);
        if (!d) {
          return respond({ error: "Not found" }, 404);
        }
        return respond({ ok: true });
      }
    }

    // === UPLOAD ===
    if (m === "POST" && p === "/api/admin/upload") {
      if (!(await isAuth(req))) {
        return respond({ error: "Unauthorized" }, 401);
      }
      const fd = await req.formData();
      const file = fd.get("file");
      if (!(file && file instanceof File)) {
        return respond({ error: "No file" }, 400);
      }
      if (!file.type.startsWith("image/")) {
        return respond({ error: "Not an image" }, 400);
      }
      if (file.size > 5 * 1024 * 1024) {
        return respond({ error: "Too large" }, 400);
      }
      const fn = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.avif`;
      const ud = path.join(process.cwd(), "public", "uploads", "authors");
      const buf = Buffer.from(await file.arrayBuffer());
      const meta = await sharp(buf).metadata();
      const sz = Math.min(meta.width || 512, meta.height || 512);
      const avif = await sharp(buf)
        .resize(sz, sz, { fit: "cover", position: "centre" })
        .avif({ quality: 65 })
        .toBuffer();
      await mkdir(ud, { recursive: true });
      await writeFile(path.join(ud, fn), avif);
      return respond({ url: `/uploads/authors/${fn}` });
    }

    if (m === "POST" && p === "/api/admin/upload-from-url") {
      if (!(await isAuth(req))) {
        return respond({ error: "Unauthorized" }, 401);
      }
      const { url: imgUrl } = await req.json();
      if (!imgUrl) {
        return respond({ error: "No URL" }, 400);
      }
      const ir = await fetch(imgUrl);
      if (!(ir.ok && ir.headers.get("content-type")?.startsWith("image/"))) {
        return respond({ error: "Bad image URL" }, 400);
      }
      const buf = Buffer.from(await ir.arrayBuffer());
      if (buf.length > 5 * 1024 * 1024) {
        return respond({ error: "Too large" }, 400);
      }
      const fn = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.avif`;
      const ud = path.join(process.cwd(), "public", "uploads", "authors");
      const meta = await sharp(buf).metadata();
      const sz = Math.min(meta.width || 512, meta.height || 512);
      const avif = await sharp(buf)
        .resize(sz, sz, { fit: "cover", position: "centre" })
        .avif({ quality: 65 })
        .toBuffer();
      await mkdir(ud, { recursive: true });
      await writeFile(path.join(ud, fn), avif);
      return respond({ url: `/uploads/authors/${fn}` });
    }

    // === MINECRAFT ===
    if (m === "GET" && p === "/api/admin/minecraft") {
      const u = url.searchParams.get("username");
      if (!u?.trim()) {
        return respond({ error: "username required" }, 400);
      }
      const mr = await fetch(
        `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(u.trim())}`
      );
      if (!mr.ok) {
        return respond({ found: false, url: null });
      }
      const pr: any = await mr.json();
      return respond({
        found: true,
        url: `https://crafatar.com/avatars/${pr.id}?size=128&overlay`,
      });
    }

    // === PUBLIC BLOG ===
    if (m === "GET" && p === "/api/blogs") {
      const posts = await getAllPosts();
      return respond(
        posts.slice(
          0,
          Number.parseInt(url.searchParams.get("limit") || "10", 10)
        )
      );
    }
    const pp = match("/api/blogs/:slug", p);
    if (pp && m === "GET") {
      const po = await getPostBySlug(pp.slug);
      if (!po) {
        return respond({ error: "Not found" }, 404);
      }
      return respond(po);
    }

    return respond({ error: "Not found" }, 404);
  } catch (e) {
    console.error("[/api] error:", e);
    return respond({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
}

export async function GET(request: Request): Promise<Response> {
  return handler(request);
}
export async function POST(request: Request): Promise<Response> {
  return handler(request);
}
export async function PUT(request: Request): Promise<Response> {
  return handler(request);
}
export async function DELETE(request: Request): Promise<Response> {
  return handler(request);
}
