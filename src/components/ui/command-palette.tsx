"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useHotkey } from "@tanstack/react-hotkeys";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IconX, IconHome, IconMap, IconSearch, IconFileText, IconShieldCheck, IconScale, IconGavel, IconCode, IconInfoCircle, IconHelpCircle, IconMessageCircle } from "@tabler/icons-react";

const navigation_items = [
  { name: "Home", href: "/", icon: IconHome, description: "Go to homepage" },
  { name: "Roadmap", href: "/roadmap", icon: IconMap, description: "View roadmap" },
  { name: "Tech Stack", href: "/techstack", icon: IconCode, description: "Technologies we use" },
  { name: "About", href: "/about", icon: IconInfoCircle, description: "About the project" },
  { name: "FAQ", href: "/faq", icon: IconHelpCircle, description: "Frequently asked questions" },
  { name: "Support", href: "/support", icon: IconMessageCircle, description: "Get help & contact" },
];

const legal_items = [
  { name: "Legal Notice", href: "/legal", icon: IconFileText, description: "Legal information" },
  { name: "Privacy Policy", href: "/privacy", icon: IconShieldCheck, description: "Data & privacy" },
  { name: "Terms of Use", href: "/terms", icon: IconScale, description: "Usage terms" },
  { name: "Terms of Service", href: "/tos", icon: IconGavel, description: "Service agreement" },
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
    return () => window.removeEventListener("vomlabs:open-cmdk", handleExternalOpen);
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

  const filtered_navigation = navigation_items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  const filtered_legal = legal_items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  const has_results = filtered_navigation.length > 0 || filtered_legal.length > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false} className="max-w-lg gap-0 p-0 max-h-[90dvh] flex flex-col overflow-hidden">
        <div className="shrink-0 border-b border-border">
          <div className="flex items-center gap-3 px-4 py-4">
            <IconSearch className="size-5 text-muted-foreground shrink-0" stroke={1.5} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1.5 hover:bg-white/10 transition-colors"
            >
              <IconX className="size-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {filtered_navigation.length > 0 && (
              <section className="space-y-2">
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground px-2">
                  Navigation
                </h3>
                <div className="space-y-1">
                  {filtered_navigation.map((item) => (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => runCommand(() => router.push(item.href))}
                      className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-left hover:bg-muted/50 transition-colors"
                    >
                      <item.icon className="size-5 text-brand-accent shrink-0" stroke={1.5} />
                      <div className="flex flex-1 min-w-0">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="mx-2 text-muted-foreground/30">·</span>
                        <span className="text-sm text-muted-foreground truncate">{item.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {filtered_legal.length > 0 && (
              <section className="space-y-2">
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground px-2">
                  Legal
                </h3>
                <div className="space-y-1">
                  {filtered_legal.map((item) => (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => runCommand(() => router.push(item.href))}
                      className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-left hover:bg-muted/50 transition-colors"
                    >
                      <item.icon className="size-5 text-brand-accent shrink-0" stroke={1.5} />
                      <div className="flex flex-1 min-w-0">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="mx-2 text-muted-foreground/30">·</span>
                        <span className="text-sm text-muted-foreground truncate">{item.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {!has_results && query.length > 0 && (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No results found for "{query}"
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
