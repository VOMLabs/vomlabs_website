"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { KeyRound, ArrowRight, ShieldAlert } from "lucide-react";

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
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-6 selection:bg-brand-accent/30 selection:text-brand-accent">
      <div className="fixed inset-0 z-[-2] bg-background" />
      <div
        className="fixed inset-0 z-[-1] opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      />
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[11px] font-mono text-brand-accent mb-6 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            ADMIN ACCESS
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Authenticate
          </h1>
          <p className="text-muted-foreground text-sm mt-2 font-mono">
            $ ssh admin@vomlabs.com
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40 bg-muted/10">
              <KeyRound className="size-4 text-brand-accent" />
              <span className="text-xs font-mono text-muted-foreground">
                admin_key.pub
              </span>
            </div>
            <textarea
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Paste your admin key here..."
              rows={3}
              className="w-full px-4 py-3 bg-transparent text-foreground font-mono text-sm placeholder:text-muted-foreground/40 focus:outline-none resize-none"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive"
            >
              <ShieldAlert className="size-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading || !key.trim()}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-background font-semibold text-sm transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
            ) : (
              <>
                Authenticate
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-[11px] text-muted-foreground/60 font-mono mt-6">
          $ echo &quot;Access restricted to authorized personnel&quot;
        </p>
      </motion.div>
    </div>
  );
}
