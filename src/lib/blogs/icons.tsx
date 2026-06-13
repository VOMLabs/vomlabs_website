import {
  IconBrandDiscord,
  IconSpeakerphone,
  IconStar,
  IconNews,
  IconTools,
  IconCode,
  IconRocket,
  IconBulb,
  IconHeart,
  IconFlag,
  IconSparkles,
  IconBell,
  IconBook,
  IconBrandGithub,
  IconFileDescription,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

export interface BlogIconOption {
  name: string;
  label: string;
  color: string;
  component: ComponentType<any>;
}

export const BLOG_ICONS: BlogIconOption[] = [
  { name: "brand-discord", label: "Discord", color: "#5865F2", component: IconBrandDiscord },
  { name: "speakerphone", label: "Announcement", color: "#f59e0b", component: IconSpeakerphone },
  { name: "star", label: "Featured", color: "#eab308", component: IconStar },
  { name: "news", label: "News", color: "#3b82f6", component: IconNews },
  { name: "tools", label: "Update", color: "#8b5cf6", component: IconTools },
  { name: "code", label: "Development", color: "#06b6d4", component: IconCode },
  { name: "rocket", label: "Launch", color: "#10b981", component: IconRocket },
  { name: "bulb", label: "Idea", color: "#f59e0b", component: IconBulb },
  { name: "heart", label: "Community", color: "#ef4444", component: IconHeart },
  { name: "flag", label: "Milestone", color: "#22c55e", component: IconFlag },
  { name: "sparkles", label: "New", color: "#ec4899", component: IconSparkles },
  { name: "bell", label: "Notification", color: "#f97316", component: IconBell },
  { name: "book", label: "Guide", color: "#6366f1", component: IconBook },
  { name: "brand-github", label: "GitHub", color: "#6b7280", component: IconBrandGithub },
  { name: "file-description", label: "Post", color: "#a855f7", component: IconFileDescription },
];

export function getBlogIcon(name?: string): BlogIconOption | undefined {
  return BLOG_ICONS.find((ico) => ico.name === name);
}
