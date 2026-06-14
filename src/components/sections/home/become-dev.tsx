import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GitFork, Handshake, type LucideIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const items: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Users,
    title: "Join Our Community",
    description: "Connect with developers and contributors on Discord.",
  },
  {
    icon: GitFork,
    title: "Open Source",
    description:
      "Contribute to our projects on GitHub. All skill levels welcome.",
  },
  {
    icon: Handshake,
    title: "Build with Us",
    description:
      "Work on Java, Rust, Go, and web projects alongside experienced devs.",
  },
];

export function BecomeDev() {
  return (
    <section className="flex justify-center px-6 py-16 lg:py-24">
      <div className="flex min-w-0 max-w-4xl flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <h2 className="font-bold text-2xl tracking-tight lg:text-3xl">
            Become a Developer
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Join our community and help build the future of Minecraft tooling.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                className="flex flex-col items-center gap-2 border border-border bg-muted p-4 text-center"
                key={item.title}
              >
                <Icon className="size-5 text-foreground" />
                <div className="space-y-0.5">
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          onClick={() => window.open("https://discord.vomlabs.com", "_blank")}
        >
          <FontAwesomeIcon icon={faDiscord} />
          Join Discord to Apply
        </Button>
      </div>
    </section>
  );
}
