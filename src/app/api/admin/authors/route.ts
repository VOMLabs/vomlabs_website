import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidToken } from "@/lib/admin-auth";
import { getAllAuthors, createAuthor } from "@/lib/blogs/authors";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return !!token && isValidToken(token);
}

export async function GET() {
  const authors = await getAllAuthors();
  return NextResponse.json(authors);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, avatar } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const author = await createAuthor({ name: name.trim(), avatar: avatar || null });
    return NextResponse.json(author, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message.includes("already exists")) {
      return NextResponse.json({ error: e.message }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create author" }, { status: 500 });
  }
}
