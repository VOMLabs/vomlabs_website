import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidToken } from "@/lib/admin-auth";
import { getAllPostsAdmin, createPost } from "@/lib/blogs";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return !!token && isValidToken(token);
}

export async function GET() {
  const posts = await getAllPostsAdmin();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug, title, date, author, excerpt, content } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: "slug and title are required" }, { status: 400 });
    }

    const post = await createPost({
      slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      title,
      date: date || new Date().toISOString().split("T")[0],
      author: author || "VOMLabs",
      excerpt: excerpt || "",
      content: content || "",
    });

    return NextResponse.json(post, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message.includes("already exists")) {
      return NextResponse.json({ error: e.message }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
