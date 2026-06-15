import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tos")({ component: TosPage });

function TosPage() {
  return (
    <main className="flex flex-col items-center px-6 py-24">
      <div className="flex w-full max-w-2xl flex-col gap-8">
        <div className="space-y-2 text-center">
          <h1 className="font-bold text-3xl tracking-tight lg:text-4xl">
            Terms of Service.
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Rules and expectations for using VOMLabs software and this website.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <Section title="Acceptance of Terms">
            <p className="text-muted-foreground text-xs leading-relaxed">
              These Terms of Service ("TOS") explain the rules and expectations
              for using VOMLabs software and this website. By accessing or using
              VOMLabs software, you agree to abide by these Terms of Service.
            </p>
          </Section>
          <Section title="Eligibility">
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs software is made available for personal, non-commercial
              use. Commercial use requires prior written authorization from
              VOMLabs. To request a commercial license, please contact us by
              email or via Discord.
            </p>
          </Section>
          <Section title="Acceptable Use">
            <p className="text-muted-foreground text-xs leading-relaxed">
              You agree not to:
            </p>
            <ul className="flex list-none flex-col gap-1.5 text-muted-foreground text-xs">
              <li>
                Use VOMLabs software for any illegal or unauthorized purpose.
              </li>
              <li>
                Attempt to bypass, exploit, or compromise Minecraft servers,
                systems, or networks.
              </li>
              <li>
                Reverse engineer, decompile, or tamper with VOMLabs software
                beyond what open source licenses expressly permit.
              </li>
              <li>
                Violate Mojang AB&apos;s or Microsoft Corporation&apos;s End
                User License Agreement (EULA).
              </li>
            </ul>
          </Section>
          <Section title="No Warranty">
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs software is provided on an "as-is" and "as available"
              basis. To the fullest extent permitted by law, VOMLabs disclaims
              all warranties, express or implied, including merchantability,
              fitness for a particular purpose, and non-infringement.
            </p>
          </Section>
          <Section title="Limitation of Liability">
            <p className="text-muted-foreground text-xs leading-relaxed">
              In no event shall VOMLabs or its contributors be liable for any
              damages arising from your use or inability to use VOMLabs
              software, including loss of data, business interruption, or
              indirect or consequential damages.
            </p>
          </Section>
          <Section title="Intellectual Property">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Minecraft is a trademark of Microsoft Corporation and Mojang AB.
              VOMLabs is an independent project and is not affiliated with,
              endorsed by, or sponsored by Microsoft or Mojang. Most VOMLabs
              software and this website are open source.
            </p>
          </Section>
          <Section title="Changes to TOS">
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs may update these Terms of Service at any time. Continued
              use after changes constitutes acceptance of the revised TOS.
            </p>
          </Section>
          <Section title="Termination">
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs reserves the right to revoke or restrict access to its
              software or website at any time for violation of these TOS or any
              other reason.
            </p>
          </Section>
          <Section title="Contact">
            <p className="text-muted-foreground text-xs leading-relaxed">
              For questions about these Terms of Service, contact us at:{" "}
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
