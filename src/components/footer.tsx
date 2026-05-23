import Image from "next/image";
import Link from "next/link";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-red-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Image alt="Logo" src={"/logo.png"} height={24} width={24} />
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              © {year} VOMLabs. All rights reserved.
            </p>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
            >
              Privacy Policy
            </Link>
            <Link
              href="/tos"
              className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
