import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  return (
    <main className="flex flex-col items-center px-6 py-24">
      <div className="flex w-full max-w-2xl flex-col gap-8">
        <div className="space-y-2 text-center">
          <h1 className="font-bold text-3xl tracking-tight lg:text-4xl">
            Privacy Policy.
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            How VOMLabs handles your data.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <Section title="Our Commitment">
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs is committed to protecting your privacy. We adhere to
              the principle of data minimization and collect only what is
              necessary to improve our software.
            </p>
          </Section>
          <Section title="Data Collection">
            <h3 className="font-medium text-xs">Anonymous Usage Statistics</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Certain VOMLabs plugins may transmit anonymous usage statistics
              via FastStats. This data is limited to non-personal information
              such as plugin version and server platform, and is used solely
              to understand software adoption and guide development efforts.
            </p>
            <h3 className="font-medium text-xs">No Personal Tracking</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs does not track personal data, browsing behavior on this
              website, or individual player information. We do not use cookies,
              analytics scripts, or similar tracking mechanisms on this
              website.
            </p>
            <h3 className="font-medium text-xs">Opt-Out Policy</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Anonymous usage statistics collection is enabled by default in
              plugins that implement it. Where supported, this feature may be
              disabled through the plugin&apos;s configuration files. Refer to
              the respective plugin&apos;s documentation for opt-out
              instructions.
            </p>
          </Section>
          <Section title="Your Rights">
            <p className="text-muted-foreground text-xs leading-relaxed">
              To the extent that VOMLabs processes any personal data, you
              retain the right to access, rectify, or request deletion of such
              data. Because our data collection is limited to anonymous
              statistics, these rights will typically have no practical
              application. If you contact VOMLabs directly, any personal
              information you provide will be used exclusively for the purpose
              of responding to your inquiry and will not be retained longer
              than necessary.
            </p>
          </Section>
          <Section title="Contact">
            <p className="text-muted-foreground text-xs leading-relaxed">
              For privacy-related inquiries, please contact us at:{" "}
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
