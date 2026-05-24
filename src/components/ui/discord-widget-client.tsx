"use client";

import { motion } from "framer-motion";
import { type DiscordMember } from "@/lib/discord";
import Image from "next/image";

interface DiscordWidgetClientProps {
  members: DiscordMember[];
  inviteUrl: string | null;
}

export default function DiscordWidgetClient({
  members,
  inviteUrl,
}: DiscordWidgetClientProps) {
  // Limit members to 24 for UI performance and space
  const displayMembers = members.slice(0, 24);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-4 pb-12">
          {displayMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              className="relative group"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-muted p-0.5">
                <Image
                  src={member.avatar_url}
                  alt={member.username}
                  width={40}
                  height={40}
                  className="rounded-[10px] object-cover"
                />
              </div>

              {/* Status Indicator */}
              <div
                className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-background z-10 ${
                  member.status === "online"
                    ? "bg-emerald-500"
                    : member.status === "idle"
                      ? "bg-amber-500"
                      : "bg-rose-500"
                }`}
              >
                {member.status === "online" && (
                  <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 bg-popover text-popover-foreground text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-border/50 shadow-sm shadow-black/5">
                {member.username}
                {member.game && (
                  <span className="block text-muted-foreground italic truncate max-w-[80px]">
                    Playing {member.game.name}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-border/10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex -space-x-2">
            {members.slice(24, 27).map((member, i) => (
              <div
                key={member.id}
                className="w-6 h-6 rounded-full border-2 border-background overflow-hidden bg-muted"
              >
                <Image
                  src={member.avatar_url}
                  alt=""
                  width={24}
                  height={24}
                  className="object-cover"
                />
              </div>
            ))}
            {members.length > 24 && (
              <div className="w-6 h-6 rounded-full border-2 border-background bg-card flex items-center justify-center text-[8px] font-bold text-muted-foreground">
                +{members.length - 24}
              </div>
            )}
          </div>

          <a
            href={inviteUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-background text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-accent/25"
          >
            Join Discord
          </a>
        </div>
      </div>
    </div>
  );
}
