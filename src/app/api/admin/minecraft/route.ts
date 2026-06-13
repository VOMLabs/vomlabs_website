import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(username)}`
  );

  if (res.status === 204 || res.status === 404) {
    return NextResponse.json({ found: false });
  }
  if (!res.ok) {
    return NextResponse.json({ found: false });
  }

  return NextResponse.json({
    found: true,
    url: `https://mc-heads.net/avatar/${encodeURIComponent(username)}`,
  });
}
