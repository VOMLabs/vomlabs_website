"use client";

import {
  IconCode,
  IconFileText,
  IconGavel,
  IconHelpCircle,
  IconHome,
  IconInfoCircle,
  IconMap,
  IconMessageCircle,
  IconScale,
  IconSearch,
  IconShieldCheck,
  IconX,
} from "@tabler/icons-react";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const navigation_items = [
  { name: "Home", href: "/", icon: IconHome, description: "Go to homepage" },
  {
    name: "Roadmap",
    href: "/roadmap",
    icon: IconMap,
    description: "View roadmap",
  },
  {
    name: "Tech Stack",
    href: "/techstack",
    icon: IconCode,
    description: "Technologies we use",
  },
  {
    name: "About",
    href: "/about",
    icon: IconInfoCircle,
    description: "About the project",
  },
  {
    name: "FAQ",
    href: "/faq",
    icon: IconHelpCircle,
    description: "Frequently asked questions",
  },
  {
    name: "Support",
    href: "/support",
    icon: IconMessageCircle,
    description: "Get help & contact",
  },
];

const legal_items = [
  {
    name: "Legal Notice",
    href: "/legal",
    icon: IconFileText,
    description: "Legal information",
  },
  {
    name: "Privacy Policy",
    href: "/privacy",
    icon: IconShieldCheck,
    description: "Data & privacy",
  },
  {
    name: "Terms of Use",
    href: "/terms",
    icon: IconScale,
    description: "Usage terms",
  },
  {
    name: "Terms of Service",
    href: "/tos",
    icon: IconGavel,
    description: "Service agreement",
  },
];

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  useHotkey("Mod+K", () => setOpen((prev) => !prev), { ignoreInputs: false });

  React.useEffect(() => {
    const handleExternalOpen = () => setOpen(true);
    window.addEventListener("vomlabs:open-cmdk", handleExternalOpen);
    return () =>
      window.removeEventListener("vomlabs:open-cmdk", handleExternalOpen);
  }, []);

  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    if (!open) {
      setQuery("");
    }
  }, [open]);

  function runCommand(command: () => void) {
    setOpen(false);
    setQuery("");
    command();
  }

  const filtered_navigation = navigation_items.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  const filtered_legal = legal_items.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  const has_results =
    filtered_navigation.length > 0 || filtered_legal.length > 0;

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent
        className="flex max-h-[90dvh] max-w-lg flex-col gap-0 overflow-hidden p-0"
        showCloseButton={false}
      >
        <div className="shrink-0 border-border border-b">
          <div className="flex items-center gap-3 px-4 py-4">
            <IconSearch
              className="size-5 shrink-0 text-muted-foreground"
              stroke={1.5}
            />
            <input
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              ref={inputRef}
              type="text"
              value={query}
            />
            <button
              className="rounded-md p-1.5 transition-colors hover:bg-white/10"
              onClick={() => setOpen(false)}
              type="button"
            >
              <IconX className="size-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-6 p-4">
            {filtered_navigation.length > 0 && (
              <section className="space-y-2">
                <h3 className="px-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Navigation
                </h3>
                <div className="space-y-1">
                  {filtered_navigation.map((item) => (
                    <button
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted/50"
                      key={item.href}
                      onClick={() => runCommand(() => router.push(item.href))}
                      type="button"
                    >
                      <item.icon
                        className="size-5 shrink-0 text-brand-accent"
                        stroke={1.5}
                      />
                      <div className="flex min-w-0 flex-1">
                        <span className="font-medium text-sm">{item.name}</span>
                        <span className="mx-2 text-muted-foreground/30">·</span>
                        <span className="truncate text-muted-foreground text-sm">
                          {item.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {filtered_legal.length > 0 && (
              <section className="space-y-2">
                <h3 className="px-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Legal
                </h3>
                <div className="space-y-1">
                  {filtered_legal.map((item) => (
                    <button
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted/50"
                      key={item.href}
                      onClick={() => runCommand(() => router.push(item.href))}
                      type="button"
                    >
                      <item.icon
                        className="size-5 shrink-0 text-brand-accent"
                        stroke={1.5}
                      />
                      <div className="flex min-w-0 flex-1">
                        <span className="font-medium text-sm">{item.name}</span>
                        <span className="mx-2 text-muted-foreground/30">·</span>
                        <span className="truncate text-muted-foreground text-sm">
                          {item.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {!has_results && query.length > 0 && (
              <div className="py-8 text-center text-muted-foreground text-sm">
                No results found for "{query}"
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
