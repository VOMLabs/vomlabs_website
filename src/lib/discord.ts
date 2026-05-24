export interface DiscordMember {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  status: "online" | "idle" | "dnd";
  avatar_url: string;
  game?: {
    name: string;
  };
}

export interface DiscordWidgetData {
  id: string;
  name: string;
  instant_invite: string | null;
  channels: Array<{
    id: string;
    name: string;
    position: number;
  }>;
  members: DiscordMember[];
  presence_count: number;
}

export async function getDiscordWidgetData(guildId: string): Promise<DiscordWidgetData> {
  const response = await fetch(
    `https://discord.com/api/guilds/${guildId}/widget.json`,
    { next: { revalidate: 60 } },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Discord widget data: ${response.statusText}`);
  }

  return response.json();
}


