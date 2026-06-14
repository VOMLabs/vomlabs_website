import { IconUser } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface Author {
  avatar?: string | null;
  name: string;
}

interface AuthorAvatarsProps {
  authors?: Author[] | null;
  className?: string;
  maxDisplay?: number;
  size?: "sm" | "md";
}

const sizeClasses = {
  sm: {
    avatar: "size-4",
    icon: "size-2.5",
    ring: "ring-1",
    overlap: "-space-x-1",
  },
  md: {
    avatar: "size-5",
    icon: "size-3",
    ring: "ring-1",
    overlap: "-space-x-1.5",
  },
};

export function AuthorAvatars({
  authors,
  size = "sm",
  maxDisplay = 3,
  className,
}: AuthorAvatarsProps) {
  if (!authors?.length) {
    return <IconUser className={size === "sm" ? "size-3.5" : "size-4"} />;
  }

  const s = sizeClasses[size];

  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      <span className={cn("flex", s.overlap)}>
        {authors.slice(0, maxDisplay).map((a, i) =>
          a.avatar ? (
            <img
              alt=""
              className={cn(
                s.avatar,
                "rounded-full object-cover ring-background",
                s.ring
              )}
              key={i}
              src={a.avatar}
            />
          ) : (
            <span
              className={cn(
                s.avatar,
                "flex items-center justify-center rounded-full bg-muted ring-background",
                s.ring
              )}
              key={i}
            >
              <IconUser className={s.icon} />
            </span>
          )
        )}
      </span>
      <span>{authors.map((a) => a.name).join(", ")}</span>
    </span>
  );
}
