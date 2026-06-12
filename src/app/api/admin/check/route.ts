import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_KEYS = (process.env.ADMIN_KEYS ?? "").split(",").map((k) => k.trim());

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const authed = !!token && ADMIN_KEYS.includes(token);

  return NextResponse.json({ authed });
}
