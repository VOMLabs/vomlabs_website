"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { DiscordMember } from "@/lib/discord";

interface DiscordWidgetClientProps {
  dndCount: number;
  idleCount: number;
  inviteUrl: string | null;
  members: DiscordMember[];
  onlineCount: number;
}

const AVATAR_SIZE = 40;
const COLS = 6;

export default function DiscordWidgetClient({
  members,
  inviteUrl,
  onlineCount,
  idleCount,
  dndCount,
}: DiscordWidgetClientProps) {
  const [showAll, setShowAll] = useState(false);
  const limit = COLS * 4;
  const displayMembers = showAll
    ? members.slice(0, limit * 2)
    : members.slice(0, limit);
  const hasMore = members.length > limit;

  const statusColor = (status: DiscordMember["status"]) => {
    switch (status) {
      case "online":
        return "bg-emerald-500";
      case "idle":
        return "bg-amber-500";
      case "dnd":
        return "bg-rose-500";
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-3 text-muted-foreground text-xs">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {onlineCount} online
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          {idleCount} idle
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          {dndCount} dnd
        </span>
      </div>

      <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto">
        <div
          className="grid gap-2.5"
          style={{
            gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          }}
        >
          <AnimatePresence mode="popLayout">
            {displayMembers.map((member, i) => (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="group relative cursor-default"
                exit={{ opacity: 0, scale: 0.8 }}
                initial={{ opacity: 0, scale: 0.8 }}
                key={member.id}
                layout
                transition={{
                  duration: 0.2,
                  delay: i * 0.008,
                  layout: { duration: 0.3 },
                }}
              >
                <div className="relative overflow-hidden rounded-xl bg-muted ring-1 ring-border/20 transition-all duration-200 group-hover:ring-brand-accent/30">
                  <Image
                    alt={member.username}
                    className="aspect-square w-full object-cover"
                    height={AVATAR_SIZE}
                    src={member.avatar_url}
                    width={AVATAR_SIZE}
                  />
                </div>

                <div
                  className={`absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-[1.5px] border-background ${statusColor(member.status)}`}
                >
                  {member.status === "online" && (
                    <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60" />
                  )}
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-black/60 to-transparent p-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  <p className="truncate text-center font-medium text-[9px] text-white leading-tight">
                    {member.username}
                  </p>
                </div>

                <div className="pointer-events-none absolute top-full left-1/2 z-50 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border/50 bg-popover px-2 py-1 text-[10px] text-popover-foreground opacity-0 shadow-black/10 shadow-md backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <p className="font-medium">{member.username}</p>
                  {member.game && (
                    <p className="mt-0.5 text-[9px] text-muted-foreground italic">
                      Playing {member.game.name}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 border-border/10 border-t pt-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {members.slice(limit, limit + 3).map((member) => (
                <div
                  className="h-6 w-6 overflow-hidden rounded-full border-2 border-background bg-muted"
                  key={member.id}
                >
                  <Image
                    alt=""
                    className="h-full w-full object-cover"
                    height={24}
                    src={member.avatar_url}
                    width={24}
                  />
                </div>
              ))}
              {members.length > limit + 3 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted font-bold text-[8px] text-muted-foreground">
                  +{members.length - limit - 3}
                </div>
              )}
            </div>
            <span className="font-medium text-muted-foreground text-xs">
              {members.length} members
            </span>
          </div>

          <div className="flex items-center gap-2">
            {hasMore && (
              <button
                className="rounded-lg border border-border/30 bg-muted/50 px-3 py-1.5 font-medium text-muted-foreground text-xs transition-all hover:bg-muted hover:text-foreground"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? (
                  <span className="flex items-center gap-1">
                    Less <ChevronUpIcon className="h-3 w-3" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    View all <ChevronDownIcon className="h-3 w-3" />
                  </span>
                )}
              </button>
            )}

            <a
              className="flex items-center gap-1.5 rounded-xl bg-brand-accent px-5 py-2 font-semibold text-background text-sm shadow-brand-accent/25 shadow-lg transition-all hover:scale-[1.02] hover:bg-brand-accent/90 active:scale-[0.98]"
              href={inviteUrl || "#"}
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.076.076 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
              </svg>
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
