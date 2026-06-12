import { NextResponse } from "next/server";

const DEFAULT_GUILD_ID = "1495056269298630806";

export async function GET() {
  const guildId = process.env.NEXT_PUBLIC_DISCORD_GUILD_ID || DEFAULT_GUILD_ID;

  const [githubRes, discordRes] = await Promise.all([
    fetch("https://api.github.com/orgs/VOMLabs/repos?per_page=100&sort=updated", {
      next: { revalidate: 300 },
    }),
    fetch(`https://discord.com/api/guilds/${guildId}/widget.json`, {
      next: { revalidate: 60 },
    }),
  ]);

  let stars = 0;
  let repos = 0;
  if (githubRes.ok) {
    const reposData = await githubRes.json();
    stars = reposData.reduce((acc: number, r: { stargazers_count: number }) => acc + r.stargazers_count, 0);
    repos = reposData.length;
  }

  let discordOnline = 0;
  if (discordRes.ok) {
    const widget = await discordRes.json();
    discordOnline = widget.presence_count ?? 0;
  }

  return NextResponse.json({
    stars,
    repos,
    discordOnline,
  });
}
