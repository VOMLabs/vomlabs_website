import {
  type LinkComponentProps,
  Link as RouterLink,
} from "@tanstack/react-router";

export function Link({
  className,
  activeProps: userActiveProps,
  ...props
}: LinkComponentProps) {
  return (
    <RouterLink
      className={className}
      activeProps={() => {
        const base = {
          className: [className, "text-foreground"].filter(Boolean).join(" "),
        };
        if (typeof userActiveProps === "function") {
          return { ...base, ...userActiveProps() };
        }
        return { ...base, ...userActiveProps };
      }}
      {...props}
    />
  );
}
