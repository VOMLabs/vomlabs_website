import { NextResponse } from "next/server";
import { getAdminKeys, hashKey } from "@/lib/admin-auth";

const ADMIN_KEYS = getAdminKeys();

export async function POST(request: Request) {
  const { key } = await request.json();

  if (!key || !ADMIN_KEYS.includes(key)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 401 });
  }

  const hashed = await hashKey(key);

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_token", hashed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
