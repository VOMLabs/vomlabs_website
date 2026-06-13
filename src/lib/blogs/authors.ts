import fs from "fs";
import path from "path";

const AUTHORS_FILE = path.join(process.cwd(), "src/data/authors.json");

type AuthorIconMap = Record<string, string>;

function readAuthorIcons(): AuthorIconMap {
  if (!fs.existsSync(AUTHORS_FILE)) return {};
  return JSON.parse(fs.readFileSync(AUTHORS_FILE, "utf-8"));
}

function writeAuthorIcons(map: AuthorIconMap): void {
  fs.writeFileSync(AUTHORS_FILE, JSON.stringify(map, null, 2), "utf-8");
}

export function getAuthorIconName(author: string): string | undefined {
  const map = readAuthorIcons();
  return map[author];
}

export function setAuthorIcon(author: string, iconName: string | null): void {
  const map = readAuthorIcons();
  if (iconName) {
    map[author] = iconName;
  } else {
    delete map[author];
  }
  writeAuthorIcons(map);
}

export function getAllAuthorIcons(): AuthorIconMap {
  return readAuthorIcons();
}

export function getDistinctAuthors(): string[] {
  // Read authors from blog posts to get all known authors
  try {
    const dataFile = path.join(process.cwd(), "src/data/blogs.json");
    if (fs.existsSync(dataFile)) {
      const posts = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
      const authors = new Set<string>();
      for (const post of posts) {
        if (post.author) authors.add(post.author);
      }
      return Array.from(authors).sort();
    }
  } catch {}
  return Object.keys(readAuthorIcons());
}
