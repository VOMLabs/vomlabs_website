"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function AdminStatus({ mobile, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.authed))
      .catch(() => setIsAdmin(false));
  }, []);

  if (!isAdmin) return null;

  if (mobile) {
    return (
      <Link
        href="/admin/dashboard"
        onClick={onNavigate}
        className="w-full px-4 py-3 bg-brand-accent hover:bg-brand-accent/90 text-background rounded-xl text-sm font-semibold transition-all active:scale-[0.98] text-center block"
      >
        <LayoutDashboard className="size-4 inline-block mr-2" />
        Dashboard
      </Link>
    );
  }

  return (
    <Link
      href="/admin/dashboard"
      className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-brand-accent hover:bg-brand-accent/90 text-background rounded-lg transition-all active:scale-[0.97]"
    >
      <LayoutDashboard className="size-4" />
      <span className="hidden lg:inline">Dashboard</span>
    </Link>
  );
}
