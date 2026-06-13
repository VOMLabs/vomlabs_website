"use client";

import type { ReactElement } from "react";
import { cn } from "@/lib/utils";
import { FadeInView } from "./fade-in-view";

interface FeatureCardProps {
  className?: string;
  delay?: number;
  description: string;
  icon: ReactElement<{ className?: string }>;
  title: string;
  variant?: "default" | "compact" | "minimal" | "developer";
}

const variants = {
  default: {
    wrapper:
      "group relative overflow-hidden rounded-xl bg-card/60 p-6 hover:shadow-xl border border-border transition-all duration-200",
    iconWrapper:
      "flex items-center justify-center rounded-lg bg-brand-accent/10 w-10 h-10 sm:w-12 sm:h-12 shrink-0",
    icon: "w-5 h-5 sm:w-6 sm:h-6 text-brand-accent",
    title: "text-base sm:text-lg font-semibold text-foreground tracking-tight",
    description: "text-sm text-muted-foreground leading-relaxed",
    layout: "flex flex-col h-full",
    header: "flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4",
    accentBar:
      "absolute left-0 top-0 bottom-0 w-1 bg-brand-accent/20 group-hover:bg-brand-accent transition-colors",
  },
  developer: {
    wrapper:
      "group p-6 rounded-2xl bg-card/40 border border-border hover:border-brand-accent/40 transition-all duration-300 backdrop-blur-sm",
    iconWrapper:
      "p-3 rounded-xl bg-brand-accent/10 border border-brand-accent/20 w-fit mb-4 group-hover:bg-brand-accent/20 transition-colors",
    icon: "w-6 h-6 text-brand-accent",
    title: "text-xl font-semibold text-foreground mb-2",
    description: "text-muted-foreground leading-relaxed",
    layout: "",
    header: "",
    accentBar: "",
  },
  compact: {
    wrapper:
      "rounded-xl bg-card/60 border border-border p-6 hover:border-brand-accent/40 transition-colors group",
    iconWrapper:
      "flex items-center justify-center rounded-lg bg-brand-accent/10 w-10 h-10 group-hover:bg-brand-accent/20 transition-colors",
    icon: "w-5 h-5 text-brand-accent",
    title: "font-semibold text-foreground text-lg",
    description: "text-muted-foreground leading-relaxed",
    layout: "",
    header: "flex items-center gap-3 mb-4",
    accentBar: "",
  },
  minimal: {
    wrapper: "rounded-xl bg-card/60 border border-border p-6 text-center",
    iconWrapper:
      "flex items-center justify-center rounded-lg bg-brand-accent/10 w-12 h-12 mx-auto mb-4",
    icon: "w-6 h-6 text-brand-accent",
    title: "font-semibold text-foreground mb-2",
    description: "text-sm text-muted-foreground",
    layout: "",
    header: "",
    accentBar: "",
  },
};

export function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
  variant = "default",
  className,
}: FeatureCardProps) {
  const v = variants[variant];

  return (
    <FadeInView
      className={cn("h-full", className)}
      delay={delay}
      duration={0.5}
    >
      <div className={cn(v.wrapper, "h-full")}>
        {v.accentBar && <div className={v.accentBar} />}
        <div className={cn(v.layout, "h-full")}>
          {v.header ? (
            <div className={v.header}>
              <span className={v.iconWrapper}>{icon}</span>
              <h3 className={v.title}>{title}</h3>
            </div>
          ) : (
            <>
              <div className={v.iconWrapper}>{icon}</div>
              <h3 className={v.title}>{title}</h3>
            </>
          )}
          <p className={v.description}>{description}</p>
        </div>
      </div>
    </FadeInView>
  );
}
