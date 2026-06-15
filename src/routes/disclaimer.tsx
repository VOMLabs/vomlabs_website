import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/disclaimer")({ component: DisclaimerPage });

function DisclaimerPage() {
  return (
    <main className="flex flex-col items-center px-6 py-24">
      <div className="flex w-full max-w-2xl flex-col gap-8">
        <div className="space-y-2 text-center">
          <h1 className="font-bold text-3xl tracking-tight lg:text-4xl">
            Disclaimer.
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Important notices regarding VOMLabs software and this website.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <Section title="General Information">
            <p className="text-muted-foreground text-xs leading-relaxed">
              The information provided by VOMLabs on this website and through
              its software is for general informational and educational purposes
              only. All information is provided in good faith, but VOMLabs
              makes no representation or warranty of any kind regarding its
              accuracy, adequacy, or completeness.
            </p>
          </Section>
          <Section title="No Warranty">
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs software is distributed on an "as-is" and "as available"
              basis without any warranty of any kind, whether express or
              implied. This includes, but is not limited to, the implied
              warranties of merchantability, fitness for a particular purpose,
              and non-infringement. The entire risk arising from the use of
              the software rests with the user.
            </p>
          </Section>
          <Section title="Minecraft Disclaimer">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Minecraft is a trademark of Microsoft Corporation and Mojang AB.
              VOMLabs is an independent project and is not affiliated with,
              endorsed by, sponsored by, or otherwise associated with Microsoft
              Corporation or Mojang AB. Any references to Minecraft on this
              website or within VOMLabs software are purely descriptive and
              imply no official association.
            </p>
          </Section>
          <Section title="External Links">
            <p className="text-muted-foreground text-xs leading-relaxed">
              This website may contain links to external websites or services
              that are not provided or maintained by VOMLabs. VOMLabs does not
              control and assumes no responsibility for the content, privacy
              policies, or practices of any third-party websites.
            </p>
          </Section>
          <Section title="Limitation of Liability">
            <p className="text-muted-foreground text-xs leading-relaxed">
              To the fullest extent permitted by applicable law, VOMLabs and
              its contributors shall not be liable for any direct, indirect,
              incidental, special, consequential, or exemplary damages arising
              from your use of VOMLabs software or this website, including but
              not limited to data loss, server downtime, or business
              interruption.
            </p>
          </Section>
          <Section title="Contact">
            <p className="text-muted-foreground text-xs leading-relaxed">
              For questions about this Disclaimer, contact us at:{" "}
              <a
                className="underline underline-offset-2 hover:text-foreground"
                href="mailto:legal@vomlabs.com"
              >
                legal@vomlabs.com
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
