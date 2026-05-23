import { motion } from "framer-motion";
import { CpuChipIcon, ComputerDesktopIcon, RectangleStackIcon, CircleStackIcon, WifiIcon } from "@heroicons/react/24/outline";

const requirements = [
  { label: "Java Runtime", value: "Java 17 or 21 (required)", description: "Vesper requires Java to run Minecraft. Download from adoptium.net", icon: CpuChipIcon, required: true },
  { label: "Operating System", value: "Windows 10/11 (64-bit)", description: "Linux and macOS support coming soon", icon: ComputerDesktopIcon },
  { label: "Processor", value: "Intel Core i5 / AMD Ryzen 5 or better", description: "Modern dual-core processor recommended", icon: CpuChipIcon },
  { label: "Memory (RAM)", value: "4 GB minimum, 8 GB recommended", description: "More RAM allows for larger modpacks", icon: RectangleStackIcon },
  { label: "Storage", value: "1 GB available space", description: "Plus additional space for Minecraft installations", icon: CircleStackIcon },
  { label: "Internet", value: "Stable broadband connection", description: "Required for multiplayer and mod downloads", icon: WifiIcon },
];

export function system_requirements() {
  return (
    <section id="system" className="relative max-w-7xl mx-auto px-6 py-24 border-t border-border/50" aria-labelledby="system-req-heading">
      <div className="absolute left-1/2 top-8 -translate-x-1/2 w-[80vw] max-w-3xl h-[120px] bg-brand-accent/10 blur-[85px] -z-10 pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-12">
        <h2 id="system-req-heading" className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-foreground mb-3">
          <span className="text-brand-accent">System</span> Requirements
        </h2>
        <p className="max-w-xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
          Vesper is designed for seamless, fast performance—lightweight on resources, but tuned for modern desktop hardware.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {requirements.map((req, i) => (
          <motion.div
            key={req.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="relative flex flex-col p-5 border border-border bg-card/70 rounded-xl hover:border-brand-accent/50 transition-all"
          >
            {req.required && (
              <span className="absolute top-3 right-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-brand-accent/20 text-brand-accent">
                REQUIRED
              </span>
            )}
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="flex items-center justify-center rounded-lg bg-brand-accent/10 w-10 h-10 sm:w-11 sm:h-11 shrink-0">
                <req.icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent" />
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-sm font-mono font-semibold text-foreground mb-0.5 sm:mb-1">{req.label}</h3>
                <p className="text-sm sm:text-base text-foreground font-medium mb-0.5 sm:mb-1">{req.value}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{req.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8 text-center">
        <span className="inline-block font-mono text-xs text-muted-foreground/80 px-4 py-2 rounded bg-muted/40">
          Linux and macOS support coming soon!
        </span>
      </motion.div>
    </section>
  );
}
