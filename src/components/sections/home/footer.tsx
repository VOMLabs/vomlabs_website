import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 border-border border-t px-6 py-8">
      <p className="text-muted-foreground text-xs">
        &copy; 2026 VOMLabs. All Rights Reserved.
      </p>
      <div className="flex gap-4">
        <Link
          className="text-muted-foreground text-xs underline underline-offset-2 hover:text-foreground"
          to="/privacy"
        >
          Privacy Policy
        </Link>
        <Link
          className="text-muted-foreground text-xs underline underline-offset-2 hover:text-foreground"
          to="/terms"
        >
          Terms of Use
        </Link>
        <Link
          className="text-muted-foreground text-xs underline underline-offset-2 hover:text-foreground"
          to="/legal"
        >
          Legal Notice
        </Link>
      </div>
    </footer>
  );
}
