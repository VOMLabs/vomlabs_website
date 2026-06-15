import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex flex-col items-center px-6 py-24">
      <div className="flex min-w-0 max-w-2xl flex-col items-center gap-4 text-center">
        <div className="inline-flex items-center gap-1.5 border border-border bg-muted px-3 py-1">
          <span className="size-1.5 bg-primary" />
          <span className="font-medium text-muted-foreground text-xs">
            Now in development
          </span>
        </div>
        <div className="space-y-2">
          <h1 className="font-bold text-4xl tracking-tight lg:text-5xl xl:text-6xl">
            VOMLabs
          </h1>
          <h2 className="font-medium text-muted-foreground text-xl lg:text-2xl xl:text-3xl">
            We build for Minecraft & the web
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground text-sm leading-relaxed">
          High-performance Minecraft software, modern websites, and developer
          tools — mostly open source and built with passion.
        </p>
        <div className="flex gap-3">
          <Button>
            <FontAwesomeIcon icon={faGithub} />
            GitHub
          </Button>
          <Button variant="outline">
            <FontAwesomeIcon icon={faDiscord} />
            Join the Discord
          </Button>
        </div>
      </div>
    </section>
  );
}
