import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidToken } from "@/lib/admin-auth";
import { getAllAuthorIcons, setAuthorIcon, getDistinctAuthors } from "@/lib/blogs/authors";
import { getDistinctAuthorsFromPosts } from "@/lib/blogs";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return !!token && isValidToken(token);
}

export async function GET() {
  const posts = await getDistinctAuthorsFromPosts();
  const icons = getAllAuthorIcons();

  const authors = posts.map((name) => ({
    name,
    icon: icons[name] || null,
  }));

  return NextResponse.json(authors);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { author, icon } = body;

  if (!author) {
    return NextResponse.json({ error: "author is required" }, { status: 400 });
  }

  setAuthorIcon(author, icon || null);
  return NextResponse.json({ author, icon: icon || null });
}
