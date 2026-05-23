import { motion } from "framer-motion";
import { WrenchScrewdriverIcon, CodeBracketIcon, PuzzlePieceIcon, BookOpenIcon } from "@heroicons/react/24/outline";

const developer_features = [
  { title: "Plugin API", description: "Build custom plugins using our comprehensive TypeScript/JavaScript API", icon: CodeBracketIcon },
  { title: "Mod Loader Support", description: "Full compatibility with Forge, Fabric, and Quilt mod loaders", icon: PuzzlePieceIcon },
  { title: "Documentation", description: "Detailed guides, API references, and example projects", icon: BookOpenIcon },
];

export function for_developers() {
  return (
    <section id="developers" className="relative max-w-7xl mx-auto px-6 py-24 border-t border-border/50" aria-labelledby="developers-heading">
      <div className="absolute left-1/2 top-8 -translate-x-1/2 w-[80vw] max-w-3xl h-[120px] bg-brand-accent/10 blur-[85px] -z-10 pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-12">
        <h2 id="developers-heading" className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-foreground mb-3">
          <span className="text-brand-accent">For</span> Developers
        </h2>
        <p className="max-w-xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
          Vesper provides powerful tools and APIs for developers to create plugins, integrate mod loaders, and extend functionality.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {developer_features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="flex flex-col p-5 border border-dashed border-border bg-card/30 rounded-xl hover:border-brand-accent/50 hover:bg-card/50 transition-all"
          >
            <span className="flex items-center justify-center rounded-lg bg-brand-accent/10 w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4">
              <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent" />
            </span>
            <h3 className="text-base font-semibold text-foreground mb-1.5 sm:mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8 text-center">
        <a href="https://github.com/ArexLabs/vesper-client" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all">
          <WrenchScrewdriverIcon className="w-4 h-4" />
          View Developer Documentation
        </a>
      </motion.div>
    </section>
  );
}
