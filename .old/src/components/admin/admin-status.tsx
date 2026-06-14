"use client";

import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminStatus({
  mobile,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.authed))
      .catch(() => setIsAdmin(false));
  }, []);

  if (!isAdmin) {
    return null;
  }

  if (mobile) {
    return (
      <Link
        className="block w-full rounded-xl bg-brand-accent px-4 py-3 text-center font-semibold text-background text-sm transition-all hover:bg-brand-accent/90 active:scale-[0.98]"
        href="/admin/dashboard"
        onClick={onNavigate}
      >
        <LayoutDashboard className="mr-2 inline-block size-4" />
        Dashboard
      </Link>
    );
  }

  return (
    <Link
      className="hidden items-center gap-2 rounded-lg bg-brand-accent px-4 py-2 font-semibold text-background text-sm transition-all hover:bg-brand-accent/90 active:scale-[0.97] md:inline-flex"
      href="/admin/dashboard"
    >
      <LayoutDashboard className="size-4" />
      <span className="hidden lg:inline">Dashboard</span>
    </Link>
  );
}
