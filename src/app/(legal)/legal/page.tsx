"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LegalNotice() {
    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col selection:bg-brand-accent/30 selection:text-brand-accent">
            <div className="fixed inset-0 z-[-2] bg-background" />
            <div
                className="fixed inset-0 z-[-1] opacity-20 dark:opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                    maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)"
                }}
            />
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

            <main className="flex-1 w-full pt-16">
                <section className="max-w-3xl mx-auto px-6 py-12 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Legal <span className="text-brand-accent italic">Notice</span>
                        </h1>
                        <p className="text-muted-foreground max-w-lg mx-auto">
                            Important legal information about Vesper Client and this website.
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {[
                            {
                                title: "Independent Project",
                                content: (
                                    <p className="text-muted-foreground leading-relaxed">
                                        <strong>Vesper Client</strong> is an independent open source project and is <span className="text-brand-accent font-medium">not affiliated with Mojang, Microsoft, or any of their subsidiaries</span>. It is not endorsed or supported by them in any way.
                                    </p>
                                )
                            },
                            {
                                title: "Publisher Information",
                                content: (
                                    <div className="space-y-3 text-muted-foreground">
                                        <p>
                                            <span className="font-medium text-foreground">Project Lead:</span> DevFlare by ItzzMateo
                                        </p>
                                        <p>
                                            <span className="font-medium text-foreground">Website:</span>{" "}
                                            <a href="https://vesper.devflare.de" className="text-brand-accent hover:underline">vesper.devflare.de</a>
                                        </p>
                                        <p>
                                            <span className="font-medium text-foreground">Legal Contact:</span>{" "}
                                            <a href="mailto:itzzmateo@devflare.de" className="text-brand-accent hover:underline">itzzmateo@devflare.de</a>
                                        </p>
                                        <p>
                                            <span className="font-medium text-foreground">Support:</span>{" "}
                                            <a href="mailto:support@devflare.de" className="text-brand-accent hover:underline">support@devflare.de</a>
                                        </p>
                                    </div>
                                )
                            },
                            {
                                title: "Disclaimer",
                                content: (
                                    <ul className="space-y-3 text-muted-foreground">
                                        <li className="flex items-start gap-3">
                                            <span className="text-brand-accent mt-1">•</span>
                                            <span><span className="font-medium text-foreground">Minecraft</span> is a trademark of Microsoft and Mojang. This project is <span className="text-brand-accent">not endorsed or supported</span> by Microsoft or Mojang.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-brand-accent mt-1">•</span>
                                            <span>Vesper Client provides <span className="font-medium text-foreground">no warranty</span> and is supplied &quot;as-is&quot;. Use at your own risk.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-brand-accent mt-1">•</span>
                                            <span>We collect <span className="font-medium text-foreground">no telemetry or tracking data</span>. See our <Link href="/privacy" className="text-brand-accent hover:underline">Privacy Policy</Link> for details.</span>
                                        </li>
                                    </ul>
                                )
                            },
                            {
                                title: "Open Source",
                                content: (
                                    <>
                                        <p className="text-muted-foreground leading-relaxed mb-4">
                                            Vesper Client and this website are open source. View the source code and license on GitHub.
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            <a href="https://github.com/ArexLabs/vesper-client" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-card border border-border hover:border-brand-accent/50 transition-colors text-sm font-medium">
                                                vesper-client
                                            </a>
                                            <a href="https://github.com/ArexLabs/vesper-website" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-card border border-border hover:border-brand-accent/50 transition-colors text-sm font-medium">
                                                vesper-website
                                            </a>
                                        </div>
                                    </>
                                )
                            },
                            {
                                title: "Quick Links",
                                content: (
                                    <div className="flex flex-wrap gap-3">
                                        <Link href="/privacy" className="px-4 py-2 rounded-lg bg-card border border-border hover:border-brand-accent/50 transition-colors text-sm">
                                            Privacy Policy
                                        </Link>
                                        <Link href="/terms" className="px-4 py-2 rounded-lg bg-card border border-border hover:border-brand-accent/50 transition-colors text-sm">
                                            Terms of Use
                                        </Link>
                                        <Link href="/tos" className="px-4 py-2 rounded-lg bg-card border border-border hover:border-brand-accent/50 transition-colors text-sm">
                                            Terms of Service
                                        </Link>
                                    </div>
                                )
                            }
                        ].map((section, i) => (
                            <motion.section
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="p-6 sm:p-8 rounded-2xl border border-border bg-card/30"
                            >
                                <h2 className="text-xl font-semibold text-foreground mb-4">{section.title}</h2>
                                {section.content}
                            </motion.section>
                        ))}
                    </div>

                    <hr className="my-12 border-border/40" />
                    <p className="text-sm text-muted-foreground text-center">
                        Last updated: April 2026
                    </p>
                </section>
            </main>
        </div>
    );
}
