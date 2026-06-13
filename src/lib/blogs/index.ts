import fs from "fs";
import path from "path";
import { eq, desc, sql } from "drizzle-orm";
import { posts as postsTable, type Post, type NewPost } from "@/db/schema";
import { getDb } from "@/db";
import { getAuthorIconName, getAllAuthorIcons } from "./authors";

export interface BlogPostData {
  id?: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  published?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  authorIcon?: string | null;
}

type DbPost = Post;
type DbNewPost = NewPost;

const DATA_FILE = path.join(process.cwd(), "src/data/blogs.json");

function hasDb(): boolean {
  return !!process.env.DATABASE_URL;
}

function readJsonData(): DbPost[] {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  if (!Array.isArray(raw)) return [];
  return raw.map(jsonPostToDbRow);
}

function writeJsonData(posts: DbPost[]): void {
  const json = posts.map(dbRowToJson);
  fs.writeFileSync(DATA_FILE, JSON.stringify(json, null, 2), "utf-8");
}

function jsonPostToDbRow(p: Record<string, unknown>): DbPost {
  return {
    id: (p.id as string) || crypto.randomUUID(),
    title: (p.title as string) || "Untitled",
    slug: (p.slug as string) || "",
    content: (p.content as string) || "",
    excerpt: (p.excerpt as string) || null,
    author: (p.author as string) || "VOMLabs",
    published: (p.published as boolean) ?? true,
    publishedAt: p.publishedAt
      ? new Date(p.publishedAt as string)
      : p.date
        ? new Date(p.date as string)
        : new Date(),
    createdAt: p.createdAt
      ? new Date(p.createdAt as string)
      : p.date
        ? new Date(p.date as string)
        : new Date(),
    updatedAt: p.updatedAt ? new Date(p.updatedAt as string) : new Date(),
  };
}

function dbRowToJson(p: DbPost): Record<string, unknown> {
  return {
    slug: p.slug,
    title: p.title,
    date: p.publishedAt?.toISOString().split("T")[0] || p.createdAt?.toISOString().split("T")[0] || "",
    author: p.author,
    excerpt: p.excerpt || "",
    content: p.content,
  };
}

function toBlogPostData(post: DbPost, authorIcon?: string | null): BlogPostData {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.publishedAt?.toISOString().split("T")[0] || post.createdAt?.toISOString().split("T")[0] || "",
    author: post.author,
    excerpt: post.excerpt || "",
    content: post.content,
    published: post.published,
    publishedAt: post.publishedAt?.toISOString(),
    createdAt: post.createdAt?.toISOString(),
    updatedAt: post.updatedAt?.toISOString(),
    authorIcon,
  };
}

function toDbInsert(data: Partial<BlogPostData>): Partial<DbNewPost> {
  const insert: Partial<DbNewPost> = {};
  if (data.title !== undefined) insert.title = data.title;
  if (data.slug !== undefined) insert.slug = data.slug;
  if (data.content !== undefined) insert.content = data.content;
  if (data.excerpt !== undefined) insert.excerpt = data.excerpt || null;
  if (data.author !== undefined) insert.author = data.author;
  if (data.published !== undefined) insert.published = data.published;
  if (data.publishedAt !== undefined) insert.publishedAt = new Date(data.publishedAt);
  else if (data.date !== undefined) insert.publishedAt = new Date(data.date);
  return insert;
}

export async function getAllPosts(): Promise<BlogPostData[]> {
  const iconMap = getAllAuthorIcons();

  if (hasDb()) {
    const db = getDb();
    const rows = await db
      .select()
      .from(postsTable)
      .where(eq(postsTable.published, true))
      .orderBy(desc(postsTable.publishedAt));
    return rows.map((r) => toBlogPostData(r, iconMap[r.author]));
  }

  return readJsonData()
    .filter((p) => p.published)
    .sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0))
    .map((r) => toBlogPostData(r, iconMap[r.author]));
}

export async function getPostBySlug(slug: string): Promise<BlogPostData | undefined> {
  const iconMap = getAllAuthorIcons();

  if (hasDb()) {
    const db = getDb();
    const rows = await db
      .select()
      .from(postsTable)
      .where(sql`${postsTable.slug} = ${slug} AND ${postsTable.published} = true`)
      .limit(1);
    return rows.length > 0 ? toBlogPostData(rows[0], iconMap[rows[0].author]) : undefined;
  }

  const post = readJsonData().find((p) => p.slug === slug && p.published);
  return post ? toBlogPostData(post, iconMap[post.author]) : undefined;
}

export async function getPostById(id: string): Promise<BlogPostData | undefined> {
  if (hasDb()) {
    const db = getDb();
    const rows = await db.select().from(postsTable).where(eq(postsTable.id, id)).limit(1);
    return rows.length > 0 ? toBlogPostData(rows[0], undefined) : undefined;
  }

  const post = readJsonData().find((p) => p.id === id);
  return post ? toBlogPostData(post, undefined) : undefined;
}

export async function createPost(data: BlogPostData): Promise<BlogPostData> {
  if (hasDb()) {
    const db = getDb();
    const insertData = toDbInsert(data) as DbNewPost;
    const rows = await db.insert(postsTable).values(insertData).returning();
    return toBlogPostData(rows[0]);
  }

  const posts = readJsonData();
  if (posts.some((p) => p.slug === data.slug)) {
    throw new Error(`Post with slug "${data.slug}" already exists`);
  }

  const now = new Date();
  const pubDate = data.date ? new Date(data.date) : now;
  const newPost: DbPost = {
    id: crypto.randomUUID(),
    title: data.title,
    slug: data.slug,
    content: data.content,
    excerpt: data.excerpt || null,
    author: data.author || "VOMLabs",
    published: true,
    publishedAt: pubDate,
    createdAt: now,
    updatedAt: now,
  };

  posts.push(newPost);
  writeJsonData(posts);
  return toBlogPostData(newPost);
}

export async function updatePost(
  slug: string,
  data: Partial<BlogPostData>
): Promise<BlogPostData | null> {
  if (hasDb()) {
    const db = getDb();
    const updateData = toDbInsert(data);
    updateData.updatedAt = new Date();

    const rows = await db
      .update(postsTable)
      .set(updateData)
      .where(eq(postsTable.slug, slug))
      .returning();
    return rows.length > 0 ? toBlogPostData(rows[0]) : null;
  }

  const posts = readJsonData();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const now = new Date();
  const updated = { ...posts[index] };

  if (data.title !== undefined) updated.title = data.title;
  if (data.content !== undefined) updated.content = data.content;
  if (data.excerpt !== undefined) updated.excerpt = data.excerpt || null;
  if (data.author !== undefined) updated.author = data.author;
  if (data.published !== undefined) updated.published = data.published;
  if (data.publishedAt !== undefined) updated.publishedAt = new Date(data.publishedAt);
  else if (data.date !== undefined) updated.publishedAt = new Date(data.date);
  updated.updatedAt = now;

  posts[index] = updated;
  writeJsonData(posts);
  return toBlogPostData(updated);
}

export async function deletePost(slug: string): Promise<boolean> {
  if (hasDb()) {
    const db = getDb();
    const rows = await db.delete(postsTable).where(eq(postsTable.slug, slug)).returning({ id: postsTable.id });
    return rows.length > 0;
  }

  const posts = readJsonData();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return false;
  posts.splice(index, 1);
  writeJsonData(posts);
  return true;
}

export async function getAllPostsAdmin(): Promise<BlogPostData[]> {
  if (hasDb()) {
    const db = getDb();
    const rows = await db.select().from(postsTable).orderBy(desc(postsTable.createdAt));
    return rows.map((r) => toBlogPostData(r));
  }

  return readJsonData()
    .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
    .map((r) => toBlogPostData(r));
}

export async function getDistinctAuthorsFromPosts(): Promise<string[]> {
  if (hasDb()) {
    const db = getDb();
    const rows = await db
      .select({ author: postsTable.author })
      .from(postsTable)
      .groupBy(postsTable.author)
      .orderBy(postsTable.author);
    return rows.map((r) => r.author).filter(Boolean);
  }

  const posts = readJsonData();
  const authors = new Set(posts.map((p) => p.author).filter(Boolean));
  return Array.from(authors).sort();
}
