"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import Link from "next/link";

export default function AdminStatus() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.authed))
      .catch(() => setIsAdmin(false));
  }, []);

  if (!isAdmin) return null;

  return (
    <Link
      href="/admin/dashboard"
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-medium text-brand-accent bg-brand-accent/10 border border-brand-accent/20 hover:bg-brand-accent/15 transition-all"
    >
      <Shield className="size-3" />
      Admin
    </Link>
  );
}
