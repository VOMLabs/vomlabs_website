import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getAdminKeys(): string[] {
  return (process.env.ADMIN_KEYS ?? "")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

async function hashKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function isValidToken(token: string): Promise<boolean> {
  if (!token) return false;
  const keys = getAdminKeys();
  for (const key of keys) {
    const hashed = await hashKey(key);
    if (hashed === token) return true;
  }
  return false;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;

  if (!token || !(await isValidToken(token))) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
