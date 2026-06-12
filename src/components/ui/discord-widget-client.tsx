"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type DiscordMember } from "@/lib/discord";
import Image from "next/image";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface DiscordWidgetClientProps {
  members: DiscordMember[];
  inviteUrl: string | null;
  onlineCount: number;
  idleCount: number;
  dndCount: number;
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
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          {onlineCount} online
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          {idleCount} idle
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          {dndCount} dnd
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0">
        <div
          className="grid gap-2.5"
          style={{
            gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          }}
        >
          <AnimatePresence mode="popLayout">
            {displayMembers.map((member, i) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.2,
                  delay: i * 0.008,
                  layout: { duration: 0.3 },
                }}
                className="relative group cursor-default"
              >
                <div className="relative rounded-xl overflow-hidden bg-muted ring-1 ring-border/20 group-hover:ring-brand-accent/30 transition-all duration-200">
                  <Image
                    src={member.avatar_url}
                    alt={member.username}
                    width={AVATAR_SIZE}
                    height={AVATAR_SIZE}
                    className="w-full aspect-square object-cover"
                  />
                </div>

                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-[1.5px] border-background ${statusColor(member.status)}`}
                >
                  {member.status === "online" && (
                    <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-1 rounded-b-xl bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                  <p className="text-[9px] text-white font-medium truncate text-center leading-tight">
                    {member.username}
                  </p>
                </div>

                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 bg-popover text-popover-foreground text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-border/50 shadow-md shadow-black/10 backdrop-blur-sm">
                  <p className="font-medium">{member.username}</p>
                  {member.game && (
                    <p className="text-muted-foreground italic text-[9px] mt-0.5">
                      Playing {member.game.name}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-border/10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {members.slice(limit, limit + 3).map((member) => (
                <div
                  key={member.id}
                  className="w-6 h-6 rounded-full border-2 border-background overflow-hidden bg-muted"
                >
                  <Image
                    src={member.avatar_url}
                    alt=""
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {members.length > limit + 3 && (
                <div className="w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-bold text-muted-foreground">
                  +{members.length - limit - 3}
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {members.length} members
            </span>
          </div>

          <div className="flex items-center gap-2">
            {hasMore && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted border border-border/30 transition-all"
              >
                {showAll ? (
                  <span className="flex items-center gap-1">
                    Less <ChevronUpIcon className="w-3 h-3" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    View all <ChevronDownIcon className="w-3 h-3" />
                  </span>
                )}
              </button>
            )}

            <a
              href={inviteUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-background text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-accent/25 flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
