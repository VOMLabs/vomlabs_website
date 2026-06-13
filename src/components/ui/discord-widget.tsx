import {
  HashtagIcon,
  SignalIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { type DiscordWidgetData, getDiscordWidgetData } from "@/lib/discord";
import { cn } from "@/lib/utils";
import DiscordWidgetClient from "./discord-widget-client";

interface DiscordWidgetProps {
  className?: string;
  guildId?: string;
}

const DEFAULT_GUILD_ID = "1495056269298630806";

function WidgetSkeleton() {
  return (
    <div className="w-full animate-pulse rounded-2xl border border-border/40 bg-card/30 p-5 backdrop-blur-xl sm:p-6">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-11 w-11 rounded-xl bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-28 rounded-md bg-muted" />
          <div className="flex gap-3">
            <div className="h-3 w-16 rounded bg-muted opacity-50" />
            <div className="h-3 w-20 rounded bg-muted opacity-30" />
          </div>
        </div>
      </div>
      <div className="mb-5 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="h-7 w-20 rounded-lg bg-muted opacity-30" key={i} />
        ))}
      </div>
      <div className="grid grid-cols-6 gap-2.5 sm:grid-cols-8">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            className="aspect-square rounded-xl bg-muted opacity-20"
            key={i}
          />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-border/10 border-t pt-5">
        <div className="flex">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              className="-ml-1.5 h-7 w-7 rounded-full bg-muted opacity-25 first:ml-0"
              key={i}
            />
          ))}
        </div>
        <div className="h-9 w-28 rounded-lg bg-muted opacity-30" />
      </div>
    </div>
  );
}

function WidgetError() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-border/40 bg-card/30 p-8 text-center backdrop-blur-xl sm:p-10">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <svg
          className="h-7 w-7 fill-none stroke-2 stroke-current text-destructive"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
      </div>
      <h4 className="mb-1.5 font-semibold text-foreground">
        Couldn&apos;t load server data
      </h4>
      <p className="max-w-[220px] text-muted-foreground text-sm">
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

  if (!data) {
    return <WidgetError />;
  }

  const onlineMembers = data.members.filter(
    (m) => m.status === "online"
  ).length;
  const idleMembers = data.members.filter((m) => m.status === "idle").length;
  const dndMembers = data.members.filter((m) => m.status === "dnd").length;

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-border/40 bg-card/40 p-5 shadow-2xl shadow-brand-accent/5 backdrop-blur-xl transition-all duration-300 sm:p-6",
        className
      )}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/15 ring-1 ring-brand-accent/20">
            <span className="font-bold text-brand-accent text-lg">
              {data.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-base text-foreground tracking-tight">
              {data.name}
            </h3>
            <div className="mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-block h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {data.presence_count} Online
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <UsersIcon className="h-3.5 w-3.5" />
                {data.members.length}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-2.5 py-1 font-semibold text-[10px] text-brand-accent uppercase tracking-wider">
          <SignalIcon className="h-3 w-3" />
          Live
        </div>
      </div>

      {data.channels.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-1.5">
          {data.channels.slice(0, 6).map((channel) => (
            <span
              className="inline-flex items-center gap-1 rounded-lg border border-border/30 bg-muted/50 px-2.5 py-1 font-medium text-[11px] text-muted-foreground"
              key={channel.id}
            >
              <HashtagIcon className="h-3 w-3" />
              {channel.name}
            </span>
          ))}
          {data.channels.length > 6 && (
            <span className="inline-flex items-center rounded-lg bg-muted/30 px-2.5 py-1 font-medium text-[11px] text-muted-foreground">
              +{data.channels.length - 6}
            </span>
          )}
        </div>
      )}

      <div className="min-h-[260px] flex-1">
        <DiscordWidgetClient
          dndCount={dndMembers}
          idleCount={idleMembers}
          inviteUrl={data.instant_invite}
          members={data.members}
          onlineCount={onlineMembers}
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
      <WidgetContent className={className} guildId={guildId} />
    </Suspense>
  );
}
