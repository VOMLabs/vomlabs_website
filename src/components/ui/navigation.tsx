"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Search, Map, Home, Code, Info, ChevronDown,
  ExternalLink, MessageCircle, FileText, Scale, ShieldCheck, Gavel,
  HelpCircle, Headphones, BookOpen, FileCode,
} from "lucide-react";
import Link from "next/link";
import SocialsModal from "./socials-modal";
import { ThemeToggle } from "./theme-toggle";
import AdminStatus from "../admin/admin-status";
import { IconVesper } from "../icons/vesper-icon";
import { IconBrandDiscord } from "@tabler/icons-react";

interface NavLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Docs", href: "https://docs.vomlabs.com", icon: FileCode },
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
      { name: "Roadmap", href: "/roadmap", icon: Map, description: "Future plans" },
      { name: "Tech Stack", href: "/techstack", icon: Code, description: "Technologies used" },
      { name: "About", href: "/about", icon: Info, description: "About VOMLabs" },
      { name: "FAQ", href: "/faq", icon: HelpCircle, description: "Common questions" },
    ],
  },
  {
    name: "Community",
    items: [
      { name: "Support", href: "/support", icon: Headphones, description: "Get help & contact" },
      { name: "GitHub", href: "https://github.com/VOMLabs", icon: ExternalLink, description: "Our projects" },
      { name: "Discord", href: "/discord", icon: IconBrandDiscord, description: "Join our server" },
    ],
  },
  {
    name: "Legal",
    items: [
      { name: "Legal Notice", href: "/legal", icon: FileText, description: "Legal information" },
      { name: "Privacy Policy", href: "/privacy", icon: ShieldCheck, description: "Data & privacy" },
      { name: "Terms of Use", href: "/terms", icon: Scale, description: "Usage terms" },
      { name: "Terms of Service", href: "/tos", icon: Gavel, description: "Service agreement" },
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
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
    const handleResize = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleOpenSocials = () => setSocialsModalOpen(true);
    window.addEventListener("vomlabs:open-socials", handleOpenSocials);
    return () => window.removeEventListener("vomlabs:open-socials", handleOpenSocials);
  }, []);

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("vomlabs:open-cmdk"));
    setMobileMenuOpen(false);
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 26 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/96 backdrop-blur-2xl border-b border-border/10 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <IconVesper className="size-8 sm:size-9 shrink-0" />
              <span className="font-mono font-bold tracking-tight text-foreground text-sm sm:text-base italic">
                VOMLabs
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isExternal = link.href.startsWith("http");
                const isActive = !isExternal && pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                      isActive
                        ? "text-brand-accent bg-brand-accent/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
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
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                      openDropdown === dropdown.name
                        ? "text-brand-accent bg-brand-accent/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
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
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-56 py-2 bg-card border border-border/60 rounded-xl shadow-xl z-50"
                      >
                        {dropdown.items.map((item) => {
                          const Icon = item.icon;
                          const isExternal = item.href.startsWith("http");
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              target={isExternal ? "_blank" : undefined}
                              rel={isExternal ? "noopener noreferrer" : undefined}
                              className="flex items-start gap-3 px-4 py-2.5 text-sm hover:bg-accent/50 transition-colors"
                            >
                              <Icon className="size-4 text-brand-accent shrink-0 mt-0.5" />
                              <div>
                                <div className="font-medium text-foreground">
                                  {item.name}
                                  {isExternal && (
                                    <ExternalLink className="inline-block size-3 ml-1 opacity-50" />
                                  )}
                                </div>
                                {item.description && (
                                  <div className="text-[11px] text-muted-foreground mt-0.5">
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
                onClick={handleOpenSearch}
                className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground bg-card/50 border border-border/60 hover:border-brand-accent/30 rounded-lg transition-all duration-200"
              >
                <Search className="size-4" />
                <span className="hidden lg:inline">Search</span>
                <div className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted text-[10px] font-medium text-muted-foreground">
                  <span className="text-[8px] opacity-60">⌘</span>K
                </div>
              </button>
              <button
                onClick={handleOpenSearch}
                className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-accent/50 transition-colors"
                aria-label="Open search"
              >
                <MagnifyingGlassIcon className="size-5" />
              </button>
              <button
                onClick={() => { setSocialsModalOpen(true); setMobileMenuOpen(false); }}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-brand-accent hover:bg-brand-accent/90 text-background rounded-lg transition-all active:scale-[0.97]"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span className="hidden lg:inline">Socials</span>
              </button>
              <AdminStatus />
              <ThemeToggle />
              <button
                className="md:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors active:scale-90"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <XMarkIcon className="size-5" /> : <Bars3Icon className="size-5" />}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 bg-background/80 backdrop-blur-xl z-40 md:hidden"
            />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-16 left-0 right-0 bottom-0 md:hidden z-50 bg-card/98 backdrop-blur-xl border-t border-border/10 overflow-y-auto"
            >
              <div className="p-4 space-y-1">
                <motion.div variants={childVariants}>
                  <button
                    onClick={handleOpenSearch}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-muted-foreground hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Search className="size-4" />
                      <span className="text-sm font-medium">Search</span>
                    </div>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted text-[10px]">
                      ⌘K
                    </div>
                  </button>
                </motion.div>

                <div className="pt-3 pb-1 space-y-0.5">
                  {navLinks.map((link) => {
                    const isExternal = link.href.startsWith("http");
                    const isActive = !isExternal && pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <motion.div key={link.name} variants={childVariants}>
                        <Link
                          href={link.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          onClick={closeMobile}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${
                            isActive
                              ? "bg-brand-accent/10 text-brand-accent"
                              : "text-foreground hover:bg-accent/50"
                          }`}
                        >
                          <Icon className="size-4" />
                          <span className="text-sm font-medium">{link.name}</span>
                          {isExternal && <ExternalLink className="size-3.5 text-muted-foreground ml-auto" />}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {dropdowns.map((dropdown) => (
                  <motion.div key={dropdown.name} variants={childVariants} className="pt-4 space-y-0.5">
                    <div className="px-4 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                      {dropdown.name}
                    </div>
                    {dropdown.items.map((item) => {
                      const Icon = item.icon;
                      const isExternal = item.href.startsWith("http");
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          onClick={closeMobile}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-foreground hover:bg-accent/50 transition-colors"
                        >
                          <Icon className="size-4 text-brand-accent shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">{item.name}</div>
                            {item.description && (
                              <div className="text-[11px] text-muted-foreground truncate">
                                {item.description}
                              </div>
                            )}
                          </div>
                          {isExternal && <ExternalLink className="size-3.5 text-muted-foreground shrink-0" />}
                        </Link>
                      );
                    })}
                  </motion.div>
                ))}

                <motion.div variants={childVariants} className="pt-6 pb-4 space-y-3">
                  <button
                    onClick={() => { setSocialsModalOpen(true); closeMobile(); }}
                    className="w-full px-4 py-3 bg-brand-accent hover:bg-brand-accent/90 text-background rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
                  >
                    Socials
                  </button>
                  <div className="flex items-center gap-2 px-4 py-2.5">
                    <div className="flex-1">
                      <AdminStatus />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-medium">Theme</span>
                      <ThemeToggle />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SocialsModal open={socialsModalOpen} onClose={() => setSocialsModalOpen(false)} />
    </>
  );
}


