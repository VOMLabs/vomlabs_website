"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BoltIcon, CpuChipIcon, RocketLaunchIcon, SparklesIcon } from "@heroicons/react/24/outline";

const comparisons = [
  {
    metric: "Startup Time",
    vesper: "< 1 second",
    others: [
      { name: "Feather", value: "1-2 seconds", url: "https://feathermc.com" },
      { name: "Lunar", value: "2-5 seconds", url: "https://lunarclient.com" },
      { name: "Labymod", value: "2-4 seconds", url: "https://labymod.net" },
      { name: "Lux", value: "3-6 seconds", url: "https://lux.pluginhub.de" },
      { name: "Traditional", value: "3-10 seconds", url: "https://minecraft.net" },
    ],
    icon: BoltIcon,
    vesperPercent: 90,
    description: "Native Rust binary vs Electron/Java overhead",
  },
  {
    metric: "Memory Usage",
    vesper: "~50MB idle",
    others: [
      { name: "Feather", value: "~80MB", url: "https://feathermc.com" },
      { name: "Lunar", value: "300-500MB", url: "https://lunarclient.com" },
      { name: "Labymod", value: "200-400MB", url: "https://labymod.net" },
      { name: "Lux", value: "150-300MB", url: "https://lux.pluginhub.de" },
      { name: "Traditional", value: "200-500MB+", url: "https://minecraft.net" },
    ],
    icon: CpuChipIcon,
    vesperPercent: 85,
    description: "Lightweight native UI vs heavy frameworks",
  },
  {
    metric: "Mod Support",
    vesper: "Fabric, Forge, NeoForge",
    others: [
      { name: "Feather", value: "Fabric", url: "https://feathermc.com" },
      { name: "Lunar", value: "Fabric, Forge, NeoForge, Quilt", url: "https://lunarclient.com" },
      { name: "Labymod", value: "Fabric, Forge, NeoForge", url: "https://labymod.net" },
      { name: "Lux", value: "Fabric, Forge", url: "https://lux.pluginhub.de" },
      { name: "Traditional", value: "None", url: "https://minecraft.net" },
    ],
    icon: SparklesIcon,
    vesperPercent: 85,
    description: "Wide mod loader compatibility",
  },
  {
    metric: "Cross-Platform",
    vesper: "Win, Mac, Linux",
    others: [
      { name: "Feather", value: "Win, Mac (ARM)", url: "https://feathermc.com" },
      { name: "Lunar", value: "Win, Mac (Intel/ARM), Linux", url: "https://lunarclient.com" },
      { name: "Labymod", value: "Win, Mac (Intel/ARM), Linux", url: "https://labymod.net" },
      { name: "Lux", value: "Win, Mac, Linux", url: "https://lux.pluginhub.de" },
      { name: "Traditional", value: "Win, Mac, Linux", url: "https://minecraft.net" },
    ],
    icon: RocketLaunchIcon,
    vesperPercent: 100,
    description: "First-class Linux support out of the box",
  },
];

export function performance_comparison() {
  return (
    <section id="performance" className="max-w-6xl mx-auto px-6 py-24 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
          Why <span className="text-brand-accent italic">Vesper</span>?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed md:text-lg">
          Built from the ground up with performance as the foundation. See how we compare to popular launchers.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparisons.map((item, i) => (
          <motion.div
            key={item.metric}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-xl bg-card/60 border border-border p-6 hover:border-brand-accent/40 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center rounded-lg bg-brand-accent/10 w-10 h-10">
                <item.icon className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{item.metric}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <Link
                  href="https://vesper.devflare.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent font-semibold hover:underline"
                >
                  Vesper
                </Link>
                <span className="text-brand-accent font-mono font-semibold">{item.vesper}</span>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.vesperPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  className="absolute left-0 top-0 h-full bg-brand-accent rounded-full"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-border/50">
                {item.others.map((other) => (
                  <div key={other.name} className="flex items-center justify-between text-sm">
                    <Link
                      href={other.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground hover:underline transition-colors"
                    >
                      {other.name}
                    </Link>
                    <span className="text-muted-foreground/70 font-mono">{other.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-xs text-muted-foreground mt-6"
      >
        *Metrics based on typical benchmarks. Actual performance may vary.
      </motion.p>
    </section>
  );
}
