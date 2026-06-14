import {
  Layers,
  type LucideIcon,
  Paintbrush,
  RefreshCw,
  Shield,
  SlidersHorizontal,
} from "lucide-react";

const features: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: SlidersHorizontal,
    title: "100% Configurable",
    description: "Fine-tune every aspect with extensive configuration options.",
  },
  {
    icon: Layers,
    title: "Multi Configs (MC)",
    description: "Run multiple configurations side by side with ease.",
  },
  {
    icon: Paintbrush,
    title: "Modern Design",
    description: "Built with modern UI patterns and best practices.",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Enterprise-grade security baked into every layer.",
  },
  {
    icon: RefreshCw,
    title: "Auto Updates",
    description: "Stay up-to-date with automatic update management.",
  },
];

export function Features() {
  return (
    <section className="flex justify-center px-6 py-16 lg:py-24">
      <div className="flex min-w-0 max-w-5xl flex-col items-center gap-4 text-center">
        <div className="space-y-2">
          <h2 className="font-bold text-2xl tracking-tight lg:text-3xl">
            Features
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Everything you need to build and scale.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                className="flex flex-col items-center gap-2 border border-border bg-muted p-4 text-center"
                key={feature.title}
              >
                <Icon className="size-5 text-foreground" />
                <div className="space-y-0.5">
                  <h3 className="font-medium text-sm">{feature.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
