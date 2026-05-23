"use client";

import { motion } from "framer-motion";
import { MapIcon, RocketLaunchIcon, BeakerIcon, LightBulbIcon } from "@heroicons/react/24/outline";

interface RoadmapItem {
    title: string;
    items: string[];
    icon: React.ElementType;
    accent: string;
}

const roadmapData: RoadmapItem[] = [
    {
        title: "Planned",
        icon: MapIcon,
        accent: "text-amber-400",
        items: [
            "Performance optimizations",
            "Launcher auto-updater",
            "Documentation & help resources",
        ],
    },
    {
        title: "In Progress",
        icon: RocketLaunchIcon,
        accent: "text-brand-accent",
        items: [
            "Windows, Linux & macOS clients",
            "Configurable keyboard shortcuts",
            "Rich Discord presence",
            "Built-in mod installer",
        ],
    },
    {
        title: "Long-Term",
        icon: LightBulbIcon,
        accent: "text-purple-400",
        items: [
            "Plugin/extension system",
            "Mobile companion app",
            "Custom OAuth2 integrations",
        ],
    },
];

export function RoadmapSection() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-64 bg-brand-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
                        Vesper <span className="text-brand-accent italic">Roadmap</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Here&apos;s what we&apos;re building, what&apos;s brewing, and where we want to take Vesper.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {roadmapData.map((column, colIndex) => (
                        <motion.div
                            key={column.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: colIndex * 0.1 }}
                            className="relative p-6 rounded-2xl bg-card/40 border border-border backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-2 rounded-lg bg-card border border-border ${column.accent}`}>
                                    <column.icon className={`w-5 h-5 ${column.accent}`} />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">{column.title}</h3>
                            </div>

                            <ul className="space-y-3">
                                {column.items.map((item, itemIndex) => (
                                    <motion.li
                                        key={itemIndex}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: colIndex * 0.1 + itemIndex * 0.05 }}
                                        className="flex items-start gap-3 text-muted-foreground"
                                    >
                                        <BeakerIcon className="w-4 h-4 mt-1 shrink-0 text-brand-accent/60" />
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 text-center text-sm text-muted-foreground"
                >
                    This roadmap reflects our <span className="text-brand-accent font-medium">intentions</span>, not official promises.
                    Want to suggest something? <a className="underline hover:text-brand-accent transition-colors" target="_blank" href="https://github.com/ArexLabs/vesper-website">Contribute on GitHub</a>.
                </motion.p>
            </motion.div>
        </section>
    );
}
