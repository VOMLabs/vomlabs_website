export interface DiscordMember {
  avatar: string | null;
  avatar_url: string;
  discriminator: string;
  game?: {
    name: string;
  };
  id: string;
  status: "online" | "idle" | "dnd";
  username: string;
}

export interface DiscordWidgetData {
  channels: Array<{
    id: string;
    name: string;
    position: number;
  }>;
  id: string;
  instant_invite: string | null;
  members: DiscordMember[];
  name: string;
  presence_count: number;
}

export async function getDiscordWidgetData(
  guildId: string
): Promise<DiscordWidgetData> {
  const response = await fetch(
    `https://discord.com/api/guilds/${guildId}/widget.json`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Discord widget data: ${response.statusText}`
    );
  }

  return response.json();
}
