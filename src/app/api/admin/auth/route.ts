import { NextResponse } from "next/server";

const ADMIN_KEYS = (process.env.ADMIN_KEYS ?? "").split(",").map((k) => k.trim());

export async function POST(request: Request) {
  const { key } = await request.json();

  if (!key || !ADMIN_KEYS.includes(key)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_token", key, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
