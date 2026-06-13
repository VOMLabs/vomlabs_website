import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  accent?: string;
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-3xl sm:text-4xl",
  md: "text-4xl sm:text-5xl md:text-6xl",
  lg: "text-5xl sm:text-6xl md:text-7xl",
};

export function SectionHeading({
  children,
  accent,
  description,
  className,
  as: Tag = "h2",
  size = "md",
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 text-center", className)}>
      <Tag
        className={cn(
          "mb-4 font-bold text-foreground tracking-tight",
          sizeClasses[size]
        )}
      >
        {children}
        {accent && (
          <>
            {" "}
            <span className="text-brand-accent italic">{accent}</span>
          </>
        )}
      </Tag>
      {description && (
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
