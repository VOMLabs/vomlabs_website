import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidToken } from "@/lib/admin-auth";
import { getAuthor, updateAuthor, deleteAuthor } from "@/lib/blogs/authors";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return !!token && isValidToken(token);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const author = await getAuthor(decodeURIComponent(name));
  if (!author) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(author);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await params;
  const body = await request.json();
  const { newName, avatar, role } = body;

  const author = await updateAuthor(decodeURIComponent(name), {
    name: newName?.trim(),
    avatar: avatar !== undefined ? avatar : undefined,
    role: role !== undefined ? role : undefined,
  });

  if (!author) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(author);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await params;
  const deleted = await deleteAuthor(decodeURIComponent(name));
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
