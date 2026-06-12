import fs from "fs";
import path from "path";

export interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
}

const BLOGS_DIR = path.join(process.cwd(), "src/lib/blogs");

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }

  const frontmatterRaw = match[1];
  const content = match[2];

  const data: Record<string, string> = {};
  for (const line of frontmatterRaw.split("\n")) {
    const sepIndex = line.indexOf(":");
    if (sepIndex !== -1) {
      const key = line.slice(0, sepIndex).trim();
      let value = line.slice(sepIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  }

  return { data, content };
}

export function getAllPosts(): BlogPostData[] {
  const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith(".mdx") && f !== "index.ts");

  const posts: BlogPostData[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOGS_DIR, file), "utf-8");
    const { data, content } = parseFrontmatter(raw);

    posts.push({
      slug: data.slug || file.replace(/\.mdx$/, ""),
      title: data.title || "Untitled",
      date: data.date || "",
      author: data.author || "",
      excerpt: data.excerpt || "",
      content,
    });
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPostData | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
