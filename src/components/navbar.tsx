import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-border border-b bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-12 max-w-(--breakpoint-2xl) items-center justify-between px-6">
        <Link className="flex items-center gap-2" to="/">
          <span className="size-1.5 bg-primary" />
          <span className="font-bold text-sm">VOMLabs</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            className="font-medium text-muted-foreground text-sm hover:text-foreground"
            to="/faq"
          >
            FAQ
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
