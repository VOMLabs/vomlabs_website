"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  IconDownload,
  IconBrandWindows,
  IconBrandApple,
  IconBrandDebian,
  IconBrandRedhat,
  IconBrandUbuntu,
  IconPackage,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  assets: GitHubAsset[];
}

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
}

// Platform icons - consistent 5x5 size with brand colors
const PlatformIcons = {
  windows: (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#0078D4]/10 text-[#0078D4] dark:bg-[#0078D4]/20">
      <IconBrandWindows className="size-5" stroke={1.5} />
    </div>
  ),
  mac: (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-foreground/5 text-foreground dark:bg-foreground/10">
      <IconBrandApple className="size-5" stroke={1.5} />
    </div>
  ),
  deb: (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#A80030]/10 text-[#A80030] dark:bg-[#A80030]/20">
      <IconBrandDebian className="size-5" stroke={1.5} />
    </div>
  ),
  rpm: (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#EE0000]/10 text-[#EE0000] dark:bg-[#EE0000]/20">
      <IconBrandRedhat className="size-5" stroke={1.5} />
    </div>
  ),
  appimage: (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E95420]/10 text-[#E95420] dark:bg-[#E95420]/20">
      <IconBrandUbuntu className="size-5" stroke={1.5} />
    </div>
  ),
  portable: (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
      <IconPackage className="size-5" stroke={1.5} />
    </div>
  ),
};

const platforms = [
  {
    label: "Windows",
    subtitle: ".exe installer",
    match: (name: string) => name.endsWith(".exe"),
    fallbackUrl: "https://github.com/ArexLabs/vesper-client/releases/latest",
    icon: PlatformIcons.windows,
    group: "desktop",
  },
  {
    label: "macOS",
    subtitle: ".dmg disk image",
    match: (name: string) => name.endsWith(".dmg"),
    fallbackUrl: "https://github.com/ArexLabs/vesper-client/releases/latest",
    icon: PlatformIcons.mac,
    group: "desktop",
  },
  {
    label: "Debian / Ubuntu",
    subtitle: ".deb package",
    match: (name: string) => name.toLowerCase().endsWith(".deb"),
    fallbackUrl: "https://github.com/ArexLabs/vesper-client/releases/latest",
    icon: PlatformIcons.deb,
    group: "linux",
  },
  {
    label: "Fedora / RHEL",
    subtitle: ".rpm package",
    match: (name: string) => name.toLowerCase().endsWith(".rpm"),
    fallbackUrl: "https://github.com/ArexLabs/vesper-client/releases/latest",
    icon: PlatformIcons.rpm,
    group: "linux",
  },
  {
    label: "Linux (Universal)",
    subtitle: ".AppImage portable",
    match: (name: string) => name.toLowerCase().includes("appimage"),
    fallbackUrl: "https://github.com/ArexLabs/vesper-client/releases/latest",
    icon: PlatformIcons.appimage,
    group: "linux",
  },
  {
    label: "Linux (Portable Binary)",
    subtitle: ".tar.gz archive",
    match: (name: string) => name.toLowerCase().endsWith(".tar.gz"),
    fallbackUrl: "https://github.com/ArexLabs/vesper-client/releases/latest",
    icon: PlatformIcons.portable,
    group: "linux",
  },
];

const DownloadModal: React.FC<DownloadModalProps> = ({ open, onClose }) => {
  const [downloading, setDownloading] = useState<Record<number, boolean>>({});
  const [error, setError] = useState("");

  const handleDownload = async (platformIdx: number) => {
    setDownloading((d) => ({ ...d, [platformIdx]: true }));
    setError("");
    try {
      const res = await fetch(
        "https://api.github.com/repos/ArexLabs/vesper-client/releases/latest"
      );
      const data = (await res.json()) as GitHubRelease;
      const platform = platforms[platformIdx];
      const asset = data.assets?.find((a) => platform.match(a.name));
      if (asset) {
        window.location.href = asset.browser_download_url;
      } else {
        window.open(platform.fallbackUrl, "_blank");
      }
    } catch {
      setError("Could not fetch release. Opening GitHub...");
      window.open(platforms[platformIdx].fallbackUrl, "_blank");
    } finally {
      setDownloading((d) => ({ ...d, [platformIdx]: false }));
    }
  };

  const desktopPlatforms = platforms.filter((p) => p.group === "desktop");
  const linuxPlatforms = platforms.filter((p) => p.group === "linux");

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0 sm:max-w-3xl max-h-[90dvh] flex flex-col">
        <div className="shrink-0 border-b border-border px-4 py-4 sm:px-6 sm:py-5">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold tracking-tight">
              Download Vesper Client
            </DialogTitle>
            <DialogDescription>
              Choose your platform to get the latest release.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-6 p-4 sm:p-6">
            <section className="space-y-2">
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Desktop
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {desktopPlatforms.map((platform, i) => {
                  const idx = platforms.indexOf(platform);
                  const isDownloading = !!downloading[idx];
                  return (
                    <PlatformTile
                      key={platform.label}
                      platform={platform}
                      isLoading={isDownloading}
                      onDownload={() => handleDownload(idx)}
                    />
                  );
                })}
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Linux
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {linuxPlatforms.map((platform, i) => {
                  const idx = platforms.indexOf(platform);
                  const isDownloading = !!downloading[idx];
                  return (
                    <PlatformTile
                      key={platform.label}
                      platform={platform}
                      isLoading={isDownloading}
                      onDownload={() => handleDownload(idx)}
                    />
                  );
                })}
              </div>
            </section>
          </div>
        </div>

        {error && (
          <div className="shrink-0 border-t border-border bg-destructive/5 px-4 py-3 sm:px-6">
            <p className="text-center text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="shrink-0 border-t border-border px-4 py-4 sm:px-6">
          <p className="text-center text-xs text-muted-foreground">
            Having trouble?{" "}
            <a
              href="https://github.com/ArexLabs/vesper-client/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              View all releases on GitHub
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

function PlatformTile({
  platform,
  isLoading,
  onDownload,
}: {
  platform: (typeof platforms)[0];
  isLoading: boolean;
  onDownload: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onDownload}
      disabled={isLoading}
      className={cn(
        "group flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left transition-all",
        "hover:border-border/80 hover:bg-muted/50 hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-60",
        "active:scale-[0.99]"
      )}
    >
      {platform.icon}
      <div className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-foreground whitespace-nowrap truncate">
          {platform.label}
        </span>
        <span className="block text-xs text-muted-foreground whitespace-nowrap">
          {platform.subtitle}
        </span>
      </div>
      <div className="shrink-0">
        {isLoading ? (
          <span className="flex size-8 items-center justify-center">
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        ) : (
          <span className="flex w-14 h-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-brand-accent/20 group-hover:text-brand-accent">
            <IconDownload className="size-5" stroke={2} />
          </span>
        )}
      </div>
    </button>
  );
}

export default DownloadModal;
