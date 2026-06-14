import { cn } from "@/lib/utils";

interface GlowBackgroundProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "max-w-[600px] h-48",
  md: "max-w-[800px] h-64",
  lg: "max-w-[1000px] h-80",
};

const blurClasses = {
  sm: "blur-[100px]",
  md: "blur-[120px]",
  lg: "blur-[150px]",
};

export function GlowBackground({
  className,
  size = "md",
  color = "bg-brand-accent/10",
}: GlowBackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-1/2 left-1/2 -z-10 w-full -translate-x-1/2 -translate-y-1/2 rounded-full",
        sizeClasses[size],
        blurClasses[size],
        color,
        className
      )}
    />
  );
}
