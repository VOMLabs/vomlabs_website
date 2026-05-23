import Link from "next/link";
import type { StaffMember } from "@/lib/staff";
import { socialIcons } from "./social-icons";

interface StaffCardProps {
  member: StaffMember;
  discordServer: string;
}

function SocialLink({
  href,
  platform,
  discordServer,
}: {
  href: string;
  platform: string;
  discordServer: string;
}) {
  const Icon = socialIcons[platform as keyof typeof socialIcons];
  if (!Icon) return null;

  const isDiscord = platform === "discord";
  const displayHref = isDiscord ? discordServer : href;

  return (
    <Link
      href={displayHref}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
    >
      <Icon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
    </Link>
  );
}

export function StaffCard({ member, discordServer }: StaffCardProps) {
  const socials = member.social || {};
  const discordMention = socials.discord;

  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center gap-4">
        {member.avatar ? (
          // biome-ignore lint/performance/noImgElement: remote avatar URLs may not be whitelisted for next/image
          <img
            src={member.avatar}
            alt={member.name}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900">
            <span className="text-xl font-medium text-neutral-600 dark:text-neutral-400">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-50">
            {member.name}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {member.role}
          </p>
          {discordMention && (
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              @{discordMention.toLowerCase()}
            </p>
          )}
        </div>
      </div>
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {member.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {Object.entries(socials)
          .filter((entry): entry is [string, string] => Boolean(entry[1]))
          .map(([platform, href]) => (
            <SocialLink
              key={platform}
              href={href}
              platform={platform}
              discordServer={discordServer}
            />
          ))}
      </div>
    </div>
  );
}
