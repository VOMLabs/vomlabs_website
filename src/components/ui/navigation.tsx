"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Search,
  Image as ImageIcon,
  History,
  Map,
  Home,
  Code,
  Command as CommandIcon,
  Info,
  ChevronDown,
  ExternalLink,
  MessageCircle,
  FileText,
  Scale,
  ShieldCheck,
  Gavel,
  HelpCircle,
  Headphones,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import DownloadModal from "./download-modal";
import GitHubModal from "./github-modal";
import { ThemeToggle } from "./theme-toggle";
import { IconVesper } from "../icons/vesper-icon";
import { IconBrandDiscord } from "@tabler/icons-react";

// Custom GitHub "star" icon
function StarIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <title>GitHub Star</title>
      <polygon
        fill="currentColor"
        stroke="none"
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        className="star"
      />
    </svg>
  );
}

function GitHubIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <title>GitHub</title>
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.021c0 4.427 2.867 8.184 6.839 9.504.5.093.682-.217.682-.482
        0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.153-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608
        1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.339-2.22-.253-4.555-1.113-4.555-4.951
        0-1.093.39-1.987 1.029-2.686-.103-.254-.447-1.272.098-2.651 0 0 .84-.27 2.75 1.025A9.564 9.564 0
        0 1 12 6.844a9.6 9.6 0 0 1 2.504.338c1.909-1.296 2.747-1.025 2.747-1.025.547 1.379.203 2.397.1 2.651.64.699
        1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012
        2.417-.012 2.747 0 .267.18.579.688.481A10.019 10.019 0 0 0 22 12.021C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface NavLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Blog", href: "/blog", icon: BookOpen },
];

interface DropdownItem {
  name: string;
  href: string;
  icon: React.ElementType;
  description?: string;
}

interface Dropdown {
  name: string;
  items: DropdownItem[];
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
        name: "Changelog",
        href: "/changelog",
        icon: History,
        description: "Version history",
      },
      {
        name: "Gallery",
        href: "/gallery",
        icon: ImageIcon,
        description: "Screenshots",
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
      {
        name: "Documentation",
        href: "https://docs.vomlabs.com/",
        icon: ExternalLink,
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

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -20,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, y: -20 },
  open: { opacity: 1, y: 0 },
};

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [githubModalOpen, setGithubModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
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
    const checkWidth = () => {
      if (navRef.current) {
        const nav = navRef.current.querySelector(".nav-desktop") as HTMLElement;
        if (nav) {
          const navWidth = nav.offsetWidth;
          const containerWidth = navRef.current.offsetWidth;
          setIsCompact(navWidth > containerWidth - 32);
        }
      }
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const handleOpenDownloadModal = () => {
    setDownloadModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("vomlabs:open-cmdk"));
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleOpenGitHub = () => {
      setGithubModalOpen(true);
    };
    window.addEventListener("vomlabs:open-github", handleOpenGitHub);
    return () =>
      window.removeEventListener("vomlabs:open-github", handleOpenGitHub);
  }, []);

  return (
    <>
      <motion.header
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 130, damping: 25 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/96 backdrop-blur-2xl border-b border-white/5 shadow-sm"
            : "bg-transparent",
        )}
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link
              href="/"
              className="flex items-center gap-1.5 sm:gap-2.5 group shrink-0 min-w-0"
            >
              <IconVesper className="size-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 shrink-0" />
              <span className="font-mono font-bold tracking-tight text-foreground text-sm sm:text-base lg:text-lg italic truncate">
                VOMLabs.
              </span>
            </Link>

            <nav className="nav-desktop hidden md:flex items-center gap-0.5 lg:gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "px-2 lg:px-3 py-2 text-sm font-medium transition-all duration-200 rounded-full whitespace-nowrap",
                      isActive
                        ? "text-brand-accent bg-brand-accent/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              {dropdowns.map((dropdown) => (
                <div
                  key={dropdown.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(dropdown.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-0.5 lg:gap-1 px-2 lg:px-3 py-2 text-sm font-medium transition-all duration-200 rounded-full whitespace-nowrap",
                      openDropdown === dropdown.name
                        ? "text-brand-accent bg-brand-accent/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                    )}
                  >
                    {dropdown.name}
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform duration-200",
                        openDropdown === dropdown.name && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === dropdown.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-56 py-2 bg-card border border-border rounded-xl shadow-xl z-50"
                      >
                        {dropdown.items.map((item) => {
                          const Icon = item.icon;
                          const isExternal = item.href.startsWith("http");
                          return (
                            <a
                              key={item.name}
                              href={item.href}
                              target={isExternal ? "_blank" : undefined}
                              rel={
                                isExternal ? "noopener noreferrer" : undefined
                              }
                              className="flex items-start gap-3 px-4 py-3 text-sm hover:bg-white/5 transition-colors"
                            >
                              <Icon className="size-5 text-brand-accent shrink-0 mt-0.5" />
                              <div>
                                <div className="font-medium text-foreground">
                                  {item.name}
                                  {isExternal && (
                                    <ExternalLink className="inline-block size-3 ml-1 opacity-50" />
                                  )}
                                </div>
                                {item.description && (
                                  <div className="text-xs text-muted-foreground">
                                    {item.description}
                                  </div>
                                )}
                              </div>
                            </a>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleOpenSearch}
                className={cn(
                  "hidden md:flex items-center justify-center gap-2 px-2.5 py-2 text-sm text-muted-foreground hover:text-foreground bg-card/50 border border-border hover:border-brand-accent/30 rounded-xl transition-all duration-200",
                  isCompact && "hidden",
                )}
              >
                <Search className="size-4 shrink-0" />
                <span className="hidden lg:inline">Search</span>
                <div className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted text-[10px] font-medium text-muted-foreground">
                  <span className="text-[8px] opacity-60">⌘</span>
                  <span>K</span>
                </div>
              </button>

              <button
                onClick={handleOpenSearch}
                className="md:hidden p-2 rounded-xl text-muted-foreground hover:bg-white/5 transition-colors"
                aria-label="Open search"
              >
                <Search className="size-5" />
              </button>

              <button
                onClick={handleOpenDownloadModal}
                className="hidden md:flex items-center gap-2 px-2.5 lg:px-4 py-2 text-sm font-semibold bg-brand-accent hover:bg-brand-accent/90 text-background rounded-full transition-all duration-200"
              >
                <svg
                  className="size-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                <span className="hidden lg:inline">Download</span>
              </button>

              <a
                href="https://github.com/VOMLabs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 md:p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
                aria-label="Visit VOMLabs on GitHub"
              >
                <GitHubIcon className="size-5 md:size-6" />
              </a>

              <ThemeToggle />

              <button
                className="md:hidden p-2 rounded-xl bg-white/5 active:scale-90 transition-transform"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-xl z-40 md:hidden"
              />
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed top-[64px] sm:top-[80px] left-0 right-0 bottom-0 md:hidden z-50 bg-card/98 backdrop-blur-xl shadow-2xl overflow-y-auto"
              >
                <div className="space-y-1 p-4">
                  <button
                    onClick={handleOpenSearch}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-muted-foreground hover:bg-accent transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Search className="size-4" />
                      <span className="text-sm font-medium">Search</span>
                    </div>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted text-[10px] font-medium text-muted-foreground">
                      <CommandIcon className="size-3" />
                    </div>
                  </button>

                  <div className="pt-2 pb-1">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      const Icon = link.icon;
                      return (
                        <motion.div key={link.name} variants={itemVariants}>
                          <Link
                            href={link.href}
                            aria-current={isActive ? "page" : undefined}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors",
                              isActive
                                ? "bg-brand-accent/10 text-brand-accent"
                                : "text-foreground hover:bg-accent",
                            )}
                          >
                            <Icon className="size-4" />
                            <span className="text-sm font-medium">
                              {link.name}
                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {dropdowns.map((dropdown) => (
                    <motion.div
                      key={dropdown.name}
                      variants={itemVariants}
                      className="space-y-0.5"
                    >
                      <div className="px-4 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        {dropdown.name}
                      </div>
                      {dropdown.items.map((item) => {
                        const Icon = item.icon;
                        const isExternal = item.href.startsWith("http");
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-foreground hover:bg-accent transition-colors"
                          >
                            <Icon className="size-4 text-brand-accent" />
                            <div className="flex-1">
                              <div className="text-sm font-medium">
                                {item.name}
                              </div>
                            </div>
                            {isExternal && (
                              <ExternalLink className="size-3.5 text-muted-foreground" />
                            )}
                          </a>
                        );
                      })}
                    </motion.div>
                  ))}

                  <motion.div
                    variants={itemVariants}
                    className="space-y-1 pt-3 pb-1"
                  >
                    <button
                      onClick={handleOpenDownloadModal}
                      className="w-full px-4 py-2.5 bg-brand-accent text-background rounded-xl text-sm font-semibold shadow-sm active:scale-[0.98] transition-all"
                    >
                      Explore Projects
                    </button>
                    <a
                      href="https://github.com/VOMLabs"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full px-4 py-2.5 rounded-xl text-muted-foreground flex items-center justify-center gap-2 text-sm font-medium hover:bg-accent transition-colors"
                    >
                      <GitHubIcon className="size-4" />
                      View on GitHub
                    </a>
                    <div className="flex items-center justify-between px-4 py-2 rounded-xl hover:bg-accent transition-colors">
                      <span className="text-sm text-muted-foreground font-medium">
                        Theme
                      </span>
                      <ThemeToggle />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
      <DownloadModal
        open={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
      <GitHubModal
        open={githubModalOpen}
        onClose={() => setGithubModalOpen(false)}
      />
    </>
  );
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
