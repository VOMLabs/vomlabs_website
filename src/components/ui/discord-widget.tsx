import { getDiscordWidgetData, type DiscordWidgetData } from "@/lib/discord";
import DiscordWidgetClient from "./discord-widget-client";
import { UsersIcon, RadioIcon } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

interface DiscordWidgetProps {
  className?: string;
  guildId?: string;
  iconUrl?: string;
}

const DEFAULT_GUILD_ID = "1495056269298630806";

function WidgetSkeleton() {
  return (
    <div className="w-full h-[500px] border border-border/40 rounded-2xl bg-card/30 animate-pulse p-6 flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-muted" />
        <div className="space-y-2 flex-1">
          <div className="w-32 h-4 bg-muted rounded" />
          <div className="w-24 h-3 bg-muted rounded opacity-50" />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-3 flex-1">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="w-10 h-10 rounded-xl bg-muted opacity-20" />
        ))}
      </div>
      <div className="pt-6 border-t border-border/10 flex justify-end">
        <div className="w-32 h-10 bg-muted rounded-xl" />
      </div>
    </div>
  );
}

function WidgetError() {
  return (
    <div className="w-full h-[500px] border border-border/40 rounded-2xl bg-card/30 p-8 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4">
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 fill-none stroke-current stroke-2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h4 className="text-foreground font-bold mb-2">
        Failed to load server data
      </h4>
      <p className="text-muted-foreground text-sm max-w-[240px]">
        The Discord Widget might be disabled in the server settings.
      </p>
    </div>
  );
}

async function WidgetContent({
  guildId,
  iconUrl,
  className,
}: {
  guildId: string;
  iconUrl?: string;
  className?: string;
}) {
  let data: DiscordWidgetData | null = null;

  try {
    data = await getDiscordWidgetData(guildId);
  } catch (error) {
    console.error("Discord Widget Error:", error);
    return <WidgetError />;
  }

  if (!data) return <WidgetError />;

  const guildIcon = iconUrl || process.env.NEXT_PUBLIC_DISCORD_GUILD_ICON || null;

  return (
    <div
      className={cn(
        "w-full h-full min-h-[500px] border border-border/40 rounded-2xl bg-card/40 backdrop-blur-xl p-6 flex flex-col shadow-2xl shadow-brand-accent/5",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-brand-accent/20 ring-1 ring-brand-accent/20 flex items-center justify-center shadow-sm">
            {guildIcon ? (
              <Image
                src={guildIcon}
                alt={data.name}
                width={48}
                height={48}
                className="object-cover size-full"
                priority
              />
            ) : (
              <span className="text-lg font-bold text-brand-accent">
                {data.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground tracking-tight leading-none mb-1.5 flex items-center gap-2">
              {data.name}
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                {data.presence_count} Online
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <UsersIcon className="w-3.5 h-3.5" />
                {data.members.length} Members
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-accent uppercase tracking-widest px-2 py-0.5 rounded-full bg-brand-accent/10 border border-brand-accent/20">
            <RadioIcon className="w-3 h-3" />
            Live
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-[300px]">
        <DiscordWidgetClient
          members={data.members}
          inviteUrl={data.instant_invite}
        />
      </div>
    </div>
  );
}

export default function DiscordWidget({
  className,
  guildId = DEFAULT_GUILD_ID,
  iconUrl,
}: DiscordWidgetProps) {
  return (
    <Suspense fallback={<WidgetSkeleton />}>
      <WidgetContent guildId={guildId} iconUrl={iconUrl} className={className} />
    </Suspense>
  );
}
