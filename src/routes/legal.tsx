import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/legal")({ component: LegalPage });

function LegalPage() {
  return (
    <main className="flex flex-col items-center px-6 py-24">
      <div className="flex w-full max-w-2xl flex-col gap-8">
        <div className="space-y-2 text-center">
          <h1 className="font-bold text-3xl tracking-tight lg:text-4xl">
            Legal Notice.
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Publisher information, disclaimers, and licensing details pursuant
            to applicable law.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <Section title="Publisher">
            <div className="flex gap-2">
              <span className="shrink-0 text-muted-foreground text-xs">
                Project Lead:
              </span>
              <span className="text-xs">
                <a
                  className="underline underline-offset-2 hover:text-foreground"
                  href="mailto:tobics@vomlabs.com"
                >
                  Tobics
                </a>
                ,{" "}
                <a
                  className="underline underline-offset-2 hover:text-foreground"
                  href="mailto:jakob@vomlabs.com"
                >
                  Jakob
                </a>
                {" & "}
                <a
                  className="underline underline-offset-2 hover:text-foreground"
                  href="mailto:itzzmateo@vomlabs.com"
                >
                  Mateo
                </a>
              </span>
            </div>
            <Row label="Website" href="https://vomlabs.com" external>
              vomlabs.com
            </Row>
            <Row label="Legal Contact" href="mailto:legal@vomlabs.com">
              legal@vomlabs.com
            </Row>
            <Row label="Support" href="mailto:support@vomlabs.com">
              support@vomlabs.com
            </Row>
          </Section>
          <Section title="Disclaimer">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Minecraft is a trademark of Microsoft Corporation and Mojang AB.
              This project is not endorsed by, sponsored by, or affiliated with
              Microsoft Corporation or Mojang AB.
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs software is provided on an "as-is" and "as available"
              basis without any warranty of any kind, whether express or implied,
              including but not limited to the implied warranties of
              merchantability, fitness for a particular purpose, or
              non-infringement. The user assumes all risk arising from the use
              of the software.
            </p>
          </Section>
          <Section title="Telemetry">
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs software may collect anonymous usage statistics to
              facilitate ongoing improvement and quality assurance. No
              personally identifiable information is gathered through this
              telemetry. For further information, please refer to our{" "}
              <Link
                className="underline underline-offset-2 hover:text-foreground"
                to="/privacy"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </Section>
          <Section title="Open Source">
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs projects and this website are made available as open
              source software. The source code and applicable licenses can be
              accessed on{" "}
              <a
                className="underline underline-offset-2 hover:text-foreground"
                href="https://github.com/vomlabs"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border bg-muted p-4">
      <h2 className="mb-3 font-semibold text-sm">{title}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Row({
  label,
  href,
  external,
  children,
}: {
  label: string;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const content = href ? (
    <a
      className="underline underline-offset-2 hover:text-foreground"
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      {children}
    </a>
  ) : (
    children
  );
  return (
    <div className="flex gap-2">
      <span className="shrink-0 text-muted-foreground text-xs">{label}:</span>
      <span className="text-xs">{content}</span>
    </div>
  );
}
