"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconExternalLink } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface SocialsModalProps {
  open: boolean;
  onClose: () => void;
}

interface SocialLink {
  name: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const socials: SocialLink[] = [
  {
    name: "Modrinth",
    description: "Browse our mods and projects",
    href: "https://modrinth.com/organization/vomlabs",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.303 0 9.6 4.297 9.6 9.6s-4.297 9.6-9.6 9.6-9.6-4.297-9.6-9.6S6.697 2.4 12 2.4zm4.8 9.6a.6.6 0 0 1-.6.6H7.8a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h8.4a.6.6 0 0 1 .6.6v2.4zm-3.6-1.2h-2.4v1.2h2.4V10.8z" />
      </svg>
    ),
    color: "text-[#1BD96A]",
    bgColor: "bg-[#1BD96A]/10 dark:bg-[#1BD96A]/20",
  },
  {
    name: "GitHub",
    description: "View our open source projects",
    href: "https://github.com/VOMLabs",
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.427 2.867 8.184 6.839 9.504.5.093.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.153-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.254-.447-1.272.098-2.651 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.6 9.6 0 0 1 2.504.338c1.909-1.296 2.747-1.025 2.747-1.025.547 1.379.203 2.397.1 2.651.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.579.688.481A10.019 10.019 0 0 0 22 12.021C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: "text-foreground",
    bgColor: "bg-foreground/5 dark:bg-foreground/10",
  },
  {
    name: "Discord",
    description: "Join our community server",
    href: "https://discord.vomlabs.com",
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
      </svg>
    ),
    color: "text-[#5865F2]",
    bgColor: "bg-[#5865F2]/10 dark:bg-[#5865F2]/20",
  },
];

const SocialsModal: React.FC<SocialsModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md gap-0 overflow-hidden p-0 sm:max-w-md max-h-[90dvh] flex flex-col">
        <div className="shrink-0 border-b border-border px-4 py-4 sm:px-6 sm:py-5">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold tracking-tight">
              Socials
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left transition-all",
                  "hover:border-border/80 hover:bg-muted/50 hover:shadow-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                    social.bgColor,
                    social.color,
                  )}
                >
                  {social.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-foreground">
                    {social.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {social.description}
                  </span>
                </div>
                <div className="shrink-0">
                  <span className="flex w-14 h-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-brand-accent/20 group-hover:text-brand-accent">
                    <IconExternalLink className="size-5" stroke={2} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialsModal;
