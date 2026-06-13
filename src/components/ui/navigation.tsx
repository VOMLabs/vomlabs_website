"use client";

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { IconBrandDiscord } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  Code,
  ExternalLink,
  FileCode,
  FileText,
  Gavel,
  Headphones,
  HelpCircle,
  Home,
  Info,
  Map,
  Scale,
  Search,
  Share2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AdminStatus from "../admin/admin-status";
import { IconVesper } from "../icons/vesper-icon";
import SocialsModal from "./socials-modal";
import { ThemeToggle } from "./theme-toggle";

interface NavLink {
  href: string;
  icon: React.ElementType;
  name: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Docs", href: "https://docs.vomlabs.com", icon: FileCode },
];

interface DropdownItem {
  description?: string;
  href: string;
  icon: React.ElementType;
  name: string;
}

interface Dropdown {
  items: DropdownItem[];
  name: string;
}

const dropdowns: Dropdown[] = [
  {
    name: "Explore",
    items: [
      {
        name: "Roadmap",
        href: "/roadmap",
        icon: Map,
        description: "Future plans",
      },
      {
        name: "Tech Stack",
        href: "/techstack",
        icon: Code,
        description: "Technologies used",
      },
      {
        name: "About",
        href: "/about",
        icon: Info,
        description: "About VOMLabs",
      },
      {
        name: "FAQ",
        href: "/faq",
        icon: HelpCircle,
        description: "Common questions",
      },
    ],
  },
  {
    name: "Community",
    items: [
      {
        name: "Support",
        href: "/support",
        icon: Headphones,
        description: "Get help & contact",
      },
      {
        name: "GitHub",
        href: "https://github.com/VOMLabs",
        icon: ExternalLink,
        description: "Our projects",
      },
      {
        name: "Discord",
        href: "/discord",
        icon: IconBrandDiscord,
        description: "Join our server",
      },
    ],
  },
  {
    name: "Legal",
    items: [
      {
        name: "Legal Notice",
        href: "/legal",
        icon: FileText,
        description: "Legal information",
      },
      {
        name: "Privacy Policy",
        href: "/privacy",
        icon: ShieldCheck,
        description: "Data & privacy",
      },
      {
        name: "Terms of Use",
        href: "/terms",
        icon: Scale,
        description: "Usage terms",
      },
      {
        name: "Terms of Service",
        href: "/tos",
        icon: Gavel,
        description: "Service agreement",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [socialsModalOpen, setSocialsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleOpenSocials = () => setSocialsModalOpen(true);
    window.addEventListener("vomlabs:open-socials", handleOpenSocials);
    return () =>
      window.removeEventListener("vomlabs:open-socials", handleOpenSocials);
  }, []);

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("vomlabs:open-cmdk"));
    setMobileMenuOpen(false);
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.header
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-border/10 border-b bg-background/96 shadow-sm backdrop-blur-2xl"
            : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 26 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between sm:h-20">
            {/* Logo */}
            <Link className="group flex shrink-0 items-center gap-2" href="/">
              <IconVesper className="size-8 shrink-0 sm:size-9" />
              <span className="font-bold font-mono text-foreground text-sm italic tracking-tight sm:text-base">
                VOMLabs
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-0.5 md:flex">
              {navLinks.map((link) => {
                const isExternal = link.href.startsWith("http");
                const isActive = !isExternal && pathname === link.href;
                return (
                  <Link
                    className={`rounded-lg px-3 py-2 font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-brand-accent/10 text-brand-accent"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                    href={link.href}
                    key={link.name}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    target={isExternal ? "_blank" : undefined}
                  >
                    {link.name}
                  </Link>
                );
              })}
              {dropdowns.map((dropdown) => (
                <div
                  className="relative"
                  key={dropdown.name}
                  onMouseEnter={() => setOpenDropdown(dropdown.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-sm transition-all duration-200 ${
                      openDropdown === dropdown.name
                        ? "bg-brand-accent/10 text-brand-accent"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {dropdown.name}
                    <ChevronDown
                      className={`size-3.5 transition-transform duration-200 ${
                        openDropdown === dropdown.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === dropdown.name && (
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 z-50 mt-2 w-56 rounded-xl border border-border/60 bg-card py-2 shadow-xl"
                        exit={{ opacity: 0, y: 6 }}
                        initial={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                      >
                        {dropdown.items.map((item) => {
                          const Icon = item.icon;
                          const isExternal = item.href.startsWith("http");
                          return (
                            <Link
                              className="flex items-start gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent/50"
                              href={item.href}
                              key={item.name}
                              rel={
                                isExternal ? "noopener noreferrer" : undefined
                              }
                              target={isExternal ? "_blank" : undefined}
                            >
                              <Icon className="mt-0.5 size-4 shrink-0 text-brand-accent" />
                              <div>
                                <div className="font-medium text-foreground">
                                  {item.name}
                                  {isExternal && (
                                    <ExternalLink className="ml-1 inline-block size-3 opacity-50" />
                                  )}
                                </div>
                                {item.description && (
                                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                                    {item.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                className="hidden items-center gap-2 rounded-lg border border-border/60 bg-card/50 px-3 py-2 text-muted-foreground text-sm transition-all duration-200 hover:border-brand-accent/30 hover:text-foreground md:flex"
                onClick={handleOpenSearch}
              >
                <Search className="size-4" />
                <span className="hidden lg:inline">Search</span>
                <div className="hidden items-center gap-1 rounded bg-muted px-1.5 py-0.5 font-medium text-[10px] text-muted-foreground lg:flex">
                  <span className="text-[8px] opacity-60">⌘</span>K
                </div>
              </button>
              <button
                aria-label="Open search"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent/50 md:hidden"
                onClick={handleOpenSearch}
              >
                <MagnifyingGlassIcon className="size-5" />
              </button>
              <button
                className="hidden items-center gap-2 rounded-lg bg-brand-accent px-4 py-2 font-semibold text-background text-sm transition-all hover:bg-brand-accent/90 active:scale-[0.97] md:inline-flex"
                onClick={() => {
                  setSocialsModalOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                <Share2 className="size-4" />
                <span className="hidden lg:inline">Socials</span>
              </button>
              <AdminStatus />
              <ThemeToggle />
              <button
                aria-label="Toggle menu"
                className="rounded-lg p-2 transition-colors hover:bg-accent/50 active:scale-90 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="size-5" />
                ) : (
                  <Bars3Icon className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-xl md:hidden"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={closeMobile}
            />
            <motion.div
              animate="visible"
              className="fixed top-16 right-0 bottom-0 left-0 z-50 overflow-y-auto border-border/10 border-t bg-card/98 backdrop-blur-xl md:hidden"
              exit="exit"
              initial="hidden"
              variants={containerVariants}
            >
              <div className="space-y-1 p-4">
                <motion.div variants={childVariants}>
                  <button
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-muted-foreground transition-colors hover:bg-accent/50"
                    onClick={handleOpenSearch}
                  >
                    <div className="flex items-center gap-3">
                      <Search className="size-4" />
                      <span className="font-medium text-sm">Search</span>
                    </div>
                    <div className="flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-[10px]">
                      ⌘K
                    </div>
                  </button>
                </motion.div>

                <div className="space-y-0.5 pt-3 pb-1">
                  {navLinks.map((link) => {
                    const isExternal = link.href.startsWith("http");
                    const isActive = !isExternal && pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <motion.div key={link.name} variants={childVariants}>
                        <Link
                          className={`flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors ${
                            isActive
                              ? "bg-brand-accent/10 text-brand-accent"
                              : "text-foreground hover:bg-accent/50"
                          }`}
                          href={link.href}
                          onClick={closeMobile}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          target={isExternal ? "_blank" : undefined}
                        >
                          <Icon className="size-4" />
                          <span className="font-medium text-sm">
                            {link.name}
                          </span>
                          {isExternal && (
                            <ExternalLink className="ml-auto size-3.5 text-muted-foreground" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {dropdowns.map((dropdown) => (
                  <motion.div
                    className="space-y-0.5 pt-4"
                    key={dropdown.name}
                    variants={childVariants}
                  >
                    <div className="px-4 py-1.5 font-semibold text-[10px] text-muted-foreground uppercase tracking-widest">
                      {dropdown.name}
                    </div>
                    {dropdown.items.map((item) => {
                      const Icon = item.icon;
                      const isExternal = item.href.startsWith("http");
                      return (
                        <Link
                          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-foreground transition-colors hover:bg-accent/50"
                          href={item.href}
                          key={item.name}
                          onClick={closeMobile}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          target={isExternal ? "_blank" : undefined}
                        >
                          <Icon className="size-4 shrink-0 text-brand-accent" />
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-sm">
                              {item.name}
                            </div>
                            {item.description && (
                              <div className="truncate text-[11px] text-muted-foreground">
                                {item.description}
                              </div>
                            )}
                          </div>
                          {isExternal && (
                            <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                          )}
                        </Link>
                      );
                    })}
                  </motion.div>
                ))}

                <motion.div
                  className="space-y-3 pt-6 pb-4"
                  variants={childVariants}
                >
                  <button
                    className="w-full rounded-xl bg-brand-accent px-4 py-3 font-semibold text-background text-sm transition-all hover:bg-brand-accent/90 active:scale-[0.98]"
                    onClick={() => {
                      setSocialsModalOpen(true);
                      closeMobile();
                    }}
                  >
                    Socials
                  </button>
                  <AdminStatus mobile onNavigate={closeMobile} />
                  <div className="flex items-center gap-2 px-4 py-2.5">
                    <div className="flex-1" />
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-muted-foreground text-sm">
                        Theme
                      </span>
                      <ThemeToggle />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SocialsModal
        onClose={() => setSocialsModalOpen(false)}
        open={socialsModalOpen}
      />
    </>
  );
}
