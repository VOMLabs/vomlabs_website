import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({ component: CookiesPage });

function CookiesPage() {
  return (
    <main className="flex flex-col items-center px-6 py-24">
      <div className="flex w-full max-w-2xl flex-col gap-8">
        <div className="space-y-2 text-center">
          <h1 className="font-bold text-3xl tracking-tight lg:text-4xl">
            Cookie Policy.
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            How VOMLabs uses cookies and similar technologies.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <Section title="Our Approach">
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs is committed to a privacy-first experience. This website
              does not use cookies, tracking scripts, or similar technologies
              for analytics, advertising, or any other purpose.
            </p>
          </Section>
          <Section title="What Are Cookies">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Cookies are small text files stored on your device by a website.
              They are commonly used for session management, personalization,
              and tracking. VOMLabs does not employ any of these practices on
              this website.
            </p>
          </Section>
          <Section title="Third-Party Services">
            <p className="text-muted-foreground text-xs leading-relaxed">
              This website does not embed third-party services that would set
              cookies. Our software may use FastStats for anonymous usage
              statistics, which does not rely on cookies and collects no
              personally identifiable information. Refer to our{" "}
              <a
                className="underline underline-offset-2 hover:text-foreground"
                href="/privacy"
              >
                Privacy Policy
              </a>{" "}
              for details.
            </p>
          </Section>
          <Section title="Updates">
            <p className="text-muted-foreground text-xs leading-relaxed">
              This Cookie Policy may be updated if our data practices change.
              Any revisions will be posted on this page.
            </p>
          </Section>
          <Section title="Contact">
            <p className="text-muted-foreground text-xs leading-relaxed">
              For questions about this Cookie Policy, contact us at:{" "}
              <a
                className="underline underline-offset-2 hover:text-foreground"
                href="mailto:privacy@vomlabs.com"
              >
                privacy@vomlabs.com
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
    <div className="border border-border bg-muted p-4 transition-colors duration-150 hover:border-foreground/20">
      <h2 className="mb-3 font-semibold text-sm">{title}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
