import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_KEYS = (process.env.ADMIN_KEYS ?? "").split(",").map((k) => k.trim());

function isAuthed(request: NextRequest): boolean {
  const token = request.cookies.get("admin_token")?.value;
  return !!token && ADMIN_KEYS.includes(token);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  if (!isAuthed(request)) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
