import { sql } from "drizzle-orm";
import fs from "fs";
import path from "path";
import { getDb } from "./index";
import { posts } from "./schema";

const DATA_FILE = path.join(process.cwd(), "src/data/blogs.json");

interface JsonPost {
  author?: string;
  authors?: { name: string; avatar: string | null }[];
  content: string;
  date: string;
  excerpt: string;
  slug: string;
  title: string;
}

function readJsonPosts(): JsonPost[] {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

export async function migrateJsonToDb() {
  const jsonPosts = readJsonPosts();

  if (jsonPosts.length === 0) {
    console.log("No JSON posts found to migrate.");
    return;
  }

  const db = getDb();
  let inserted = 0;
  let skipped = 0;

  for (const post of jsonPosts) {
    const publishedDate = post.date ? new Date(post.date) : new Date();

    const existing = await db
      .select({ id: posts.id })
      .from(posts)
      .where(sql`${posts.slug} = ${post.slug}`)
      .limit(1);

    if (existing.length > 0) {
      console.log(`  Skipping "${post.title}" (slug already exists)`);
      skipped++;
      continue;
    }

    const authors = post.authors || [
      { name: post.author || "VOMLabs", avatar: null },
    ];
    await db.insert(posts).values({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || null,
      authors,
      published: true,
      publishedAt: publishedDate,
      createdAt: publishedDate,
      updatedAt: new Date(),
    });

    console.log(`  Inserted "${post.title}"`);
    inserted++;
  }

  console.log(`\nDone. Inserted ${inserted}, skipped ${skipped}.`);
}

await migrateJsonToDb();
