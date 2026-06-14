import { SparklesIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface SectionPillProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function SectionPill({ children, className, icon }: SectionPillProps) {
  return (
    <div
      className={cn(
        "mb-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-4 py-2",
        className
      )}
    >
      {icon ?? <SparklesIcon className="h-4 w-4 text-brand-accent" />}
      <span className="font-medium text-brand-accent text-sm">{children}</span>
    </div>
  );
}
