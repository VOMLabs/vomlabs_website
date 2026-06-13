import fs from "fs";
import path from "path";
import { eq, desc, sql } from "drizzle-orm";
import { authors as authorsTable, type Author, type NewAuthor } from "@/db/schema";
import { getDb } from "@/db";

export interface AuthorData {
  id?: string;
  name: string;
  avatar: string | null;
  createdAt?: string;
  updatedAt?: string;
}

const DATA_FILE = path.join(process.cwd(), "src/data/authors.json");

function hasDb(): boolean {
  return !!process.env.DATABASE_URL;
}

function readJsonData(): Author[] {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  if (!Array.isArray(raw)) return [];
  return raw.map((a: Record<string, unknown>) => ({
    id: (a.id as string) || crypto.randomUUID(),
    name: (a.name as string) || "",
    avatar: (a.avatar as string) || null,
    createdAt: a.createdAt ? new Date(a.createdAt as string) : new Date(),
    updatedAt: a.updatedAt ? new Date(a.updatedAt as string) : new Date(),
  }));
}

function writeJsonData(data: Author[]): void {
  const json = data.map((a) => ({
    name: a.name,
    avatar: a.avatar,
  }));
  fs.writeFileSync(DATA_FILE, JSON.stringify(json, null, 2), "utf-8");
}

function toAuthorData(a: Author): AuthorData {
  return {
    id: a.id,
    name: a.name,
    avatar: a.avatar,
    createdAt: a.createdAt?.toISOString(),
    updatedAt: a.updatedAt?.toISOString(),
  };
}

export async function getAllAuthors(): Promise<AuthorData[]> {
  if (hasDb()) {
    const db = getDb();
    const rows = await db.select().from(authorsTable).orderBy(desc(authorsTable.createdAt));
    return rows.map(toAuthorData);
  }

  return readJsonData().map((a) => toAuthorData(a));
}

export async function getAuthor(name: string): Promise<AuthorData | undefined> {
  if (hasDb()) {
    const db = getDb();
    const rows = await db.select().from(authorsTable).where(eq(authorsTable.name, name)).limit(1);
    return rows.length > 0 ? toAuthorData(rows[0]) : undefined;
  }

  const author = readJsonData().find((a) => a.name === name);
  return author ? toAuthorData(author) : undefined;
}

export async function createAuthor(data: { name: string; avatar?: string | null }): Promise<AuthorData> {
  if (hasDb()) {
    const db = getDb();
    const rows = await db
      .insert(authorsTable)
      .values({ name: data.name, avatar: data.avatar || null })
      .returning();
    return toAuthorData(rows[0]);
  }

  const authors = readJsonData();
  if (authors.some((a) => a.name === data.name)) {
    throw new Error(`Author "${data.name}" already exists`);
  }

  const now = new Date();
  const newAuthor: Author = {
    id: crypto.randomUUID(),
    name: data.name,
    avatar: data.avatar || null,
    createdAt: now,
    updatedAt: now,
  };

  authors.push(newAuthor);
  writeJsonData(authors);
  return toAuthorData(newAuthor);
}

export async function updateAuthor(
  name: string,
  data: { name?: string; avatar?: string | null }
): Promise<AuthorData | null> {
  if (hasDb()) {
    const db = getDb();
    const updateData: Partial<NewAuthor> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.avatar !== undefined) updateData.avatar = data.avatar;
    updateData.updatedAt = new Date();

    const rows = await db
      .update(authorsTable)
      .set(updateData)
      .where(eq(authorsTable.name, name))
      .returning();
    return rows.length > 0 ? toAuthorData(rows[0]) : null;
  }

  const authors = readJsonData();
  const index = authors.findIndex((a) => a.name === name);
  if (index === -1) return null;

  if (data.name !== undefined) authors[index].name = data.name;
  if (data.avatar !== undefined) authors[index].avatar = data.avatar;
  authors[index].updatedAt = new Date();

  writeJsonData(authors);
  return toAuthorData(authors[index]);
}

export async function deleteAuthor(name: string): Promise<boolean> {
  if (hasDb()) {
    const db = getDb();
    const rows = await db
      .delete(authorsTable)
      .where(eq(authorsTable.name, name))
      .returning({ id: authorsTable.id });
    return rows.length > 0;
  }

  const authors = readJsonData();
  const index = authors.findIndex((a) => a.name === name);
  if (index === -1) return false;
  authors.splice(index, 1);
  writeJsonData(authors);
  return true;
}
