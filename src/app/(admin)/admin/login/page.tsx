"use client";

import { motion } from "framer-motion";
import { ArrowRight, KeyRound, ShieldAlert } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: key.trim() }),
      });

      if (!res.ok) {
        setError("Invalid admin key. Access denied.");
        return;
      }

      const redirect = searchParams.get("redirect") || "/admin/dashboard";
      router.push(redirect);
      router.refresh();
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 selection:bg-brand-accent/30 selection:text-brand-accent">
      <div className="fixed inset-0 z-[-2] bg-background" />
      <div
        className="pointer-events-none fixed inset-0 z-[-1] opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none fixed top-1/3 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-accent/5 blur-[120px]" />

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1.5 font-mono text-[11px] text-brand-accent tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
            ADMIN ACCESS
          </div>
          <h1 className="font-bold text-3xl text-foreground tracking-tight">
            Authenticate
          </h1>
          <p className="mt-2 font-mono text-muted-foreground text-sm">
            $ ssh admin@vomlabs.com
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 border-border/40 border-b bg-muted/10 px-4 py-2.5">
              <KeyRound className="size-4 text-brand-accent" />
              <span className="font-mono text-muted-foreground text-xs">
                admin_key.pub
              </span>
            </div>
            <textarea
              className="w-full resize-none bg-transparent px-4 py-3 font-mono text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none"
              onChange={(e) => setKey(e.target.value)}
              placeholder="Paste your admin key here..."
              rows={3}
              value={key}
            />
          </div>

          {error && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-destructive text-sm"
              initial={{ opacity: 0, y: -8 }}
            >
              <ShieldAlert className="size-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-semibold text-background text-sm transition-all hover:bg-brand-accent/90 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40"
            disabled={loading || !key.trim()}
            type="submit"
          >
            {loading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
            ) : (
              <>
                Authenticate
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center font-mono text-[11px] text-muted-foreground/60">
          $ echo &quot;Access restricted to authorized personnel&quot;
        </p>
      </motion.div>
    </div>
  );
}
