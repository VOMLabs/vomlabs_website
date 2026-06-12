import { getDiscordWidgetData, type DiscordWidgetData } from "@/lib/discord";
import DiscordWidgetClient from "./discord-widget-client";
import { UsersIcon, SignalIcon, HashtagIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

interface DiscordWidgetProps {
  className?: string;
  guildId?: string;
}

const DEFAULT_GUILD_ID = "1495056269298630806";

function WidgetSkeleton() {
  return (
    <div className="w-full border border-border/40 rounded-2xl bg-card/30 backdrop-blur-xl animate-pulse p-5 sm:p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-11 h-11 rounded-xl bg-muted" />
        <div className="space-y-2 flex-1">
          <div className="w-28 h-4 bg-muted rounded-md" />
          <div className="flex gap-3">
            <div className="w-16 h-3 bg-muted rounded opacity-50" />
            <div className="w-20 h-3 bg-muted rounded opacity-30" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 mb-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-7 w-20 bg-muted rounded-lg opacity-30" />
        ))}
      </div>
      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2.5">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-muted opacity-20" />
        ))}
      </div>
      <div className="mt-6 pt-5 border-t border-border/10 flex justify-between items-center">
        <div className="flex">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-7 h-7 rounded-full bg-muted opacity-25 -ml-1.5 first:ml-0" />
          ))}
        </div>
        <div className="w-28 h-9 bg-muted rounded-lg opacity-30" />
      </div>
    </div>
  );
}

function WidgetError() {
  return (
    <div className="w-full border border-border/40 rounded-2xl bg-card/30 backdrop-blur-xl p-8 sm:p-10 flex flex-col items-center justify-center text-center">
      <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 text-destructive fill-none stroke-current stroke-2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h4 className="text-foreground font-semibold mb-1.5">
        Couldn&apos;t load server data
      </h4>
      <p className="text-muted-foreground text-sm max-w-[220px]">
        The Discord widget might be disabled in the server settings.
      </p>
    </div>
  );
}

async function WidgetContent({
  guildId,
  className,
}: {
  guildId: string;
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

  const onlineMembers = data.members.filter(
    (m) => m.status === "online",
  ).length;
  const idleMembers = data.members.filter(
    (m) => m.status === "idle",
  ).length;
  const dndMembers = data.members.filter(
    (m) => m.status === "dnd",
  ).length;

  return (
    <div
      className={cn(
        "w-full border border-border/40 rounded-2xl bg-card/40 backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-brand-accent/5 transition-all duration-300",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-brand-accent/15 flex items-center justify-center shrink-0 ring-1 ring-brand-accent/20">
            <span className="text-lg font-bold text-brand-accent">
              {data.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground text-base tracking-tight truncate">
              {data.name}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                  <span className="relative inline-block w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                {data.presence_count} Online
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <UsersIcon className="w-3.5 h-3.5" />
                {data.members.length}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-brand-accent uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 shrink-0">
          <SignalIcon className="w-3 h-3" />
          Live
        </div>
      </div>

      {data.channels.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {data.channels.slice(0, 6).map((channel) => (
            <span
              key={channel.id}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted/50 border border-border/30 text-[11px] text-muted-foreground font-medium"
            >
              <HashtagIcon className="w-3 h-3" />
              {channel.name}
            </span>
          ))}
          {data.channels.length > 6 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-muted/30 text-[11px] text-muted-foreground font-medium">
              +{data.channels.length - 6}
            </span>
          )}
        </div>
      )}

      <div className="flex-1 min-h-[260px]">
        <DiscordWidgetClient
          members={data.members}
          inviteUrl={data.instant_invite}
          onlineCount={onlineMembers}
          idleCount={idleMembers}
          dndCount={dndMembers}
        />
      </div>
    </div>
  );
}

export default function DiscordWidget({
  className,
  guildId = DEFAULT_GUILD_ID,
}: DiscordWidgetProps) {
  return (
    <Suspense fallback={<WidgetSkeleton />}>
      <WidgetContent guildId={guildId} className={className} />
    </Suspense>
  );
}
