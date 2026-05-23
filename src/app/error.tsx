"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <div className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[70vh] selection:bg-brand-accent/30 selection:text-brand-accent">
            {/* Ambient Glow Bg */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-brand-accent/5 rounded-full blur-[120px] -z-10" />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-destructive/20 mb-8"
                role="alert"
            >
                <XCircleIcon className="w-5 h-5 text-destructive" />
                <span className="text-xs font-mono font-medium tracking-wide text-destructive uppercase">
                    Error — Unexpected
                </span>
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-center tracking-tight text-foreground max-w-4xl"
            >
                Something <span className="text-brand-accent italic">went wrong</span>
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-2xl"
            >
                We're sorry, an unexpected error has occurred.
                <br />
                <span className="block mt-2 text-sm text-destructive font-mono">
                    {error?.message && `Error: ${error.message}`}
                </span>
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-10 flex items-center justify-center gap-4"
            >
                <button
                    type="button"
                    onClick={() => reset()}
                    className="flex items-center gap-3 font-mono relative overflow-hidden transition-all px-6 py-3 text-sm rounded-lg border-2 border-transparent bg-destructive text-background hover:border-brand-accent/40 font-semibold"
                >
                    Try again
                </button>
                <Link
                    href="/"
                    className="flex items-center gap-3 font-mono relative overflow-hidden transition-all px-6 py-3 text-sm rounded-lg border-2 border-transparent bg-foreground text-background hover:border-brand-accent/40 font-semibold"
                >
                    Go back home
                </Link>
            </motion.div>
        </div>
    );
}
