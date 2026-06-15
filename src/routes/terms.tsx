import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <main className="flex flex-col items-center px-6 py-24">
      <div className="flex w-full max-w-2xl flex-col gap-8">
        <div className="space-y-2 text-center">
          <h1 className="font-bold text-3xl tracking-tight lg:text-4xl">
            Terms of Use.
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Rules and conditions governing the use of VOMLabs software and this
            website.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <Section title="Acceptance of Terms">
            <p className="text-muted-foreground text-xs leading-relaxed">
              These Terms of Use ("Terms") govern your access to and use of
              VOMLabs software and this website. By accessing, downloading, or
              using any VOMLabs software or this website, you acknowledge that
              you have read, understood, and agree to be bound by these Terms.
              If you do not agree with any provision of these Terms, you must
              discontinue use immediately.
            </p>
          </Section>
          <Section title="Eligibility and License">
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs software is made available for personal, non-commercial
              use only. Any commercial use requires prior written authorization
              from VOMLabs. To request a commercial license, please contact us
              by email or via a direct message on our Discord server.
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              You agree to comply with all applicable laws and regulations and
              to respect the intellectual property rights of others.
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
                Reverse engineer, decompile, disassemble, or otherwise tamper
                with VOMLabs software, except to the extent expressly permitted
                by applicable open source licenses.
              </li>
              <li>
                Violate Mojang AB&apos;s or Microsoft Corporation&apos;s End
                User License Agreement (EULA) or any applicable terms of
                service.
              </li>
            </ul>
          </Section>
          <Section title="No Warranty">
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs software is provided on an "as-is" and "as available"
              basis. To the fullest extent permitted by applicable law, VOMLabs
                disclaims all warranties, express or implied, including but not
                limited to the implied warranties of merchantability, fitness
                for a particular purpose, and non-infringement.
            </p>
          </Section>
          <Section title="Limitation of Liability">
            <p className="text-muted-foreground text-xs leading-relaxed">
              In no event shall VOMLabs or its contributors be liable for any
              damages, whether direct, indirect, incidental, special, or
              consequential, arising out of or in connection with your use of
              or inability to use VOMLabs software, including but not limited
              to:
            </p>
            <ul className="flex list-none flex-col gap-1.5 text-muted-foreground text-xs">
              <li>Loss of data or corruption of data.</li>
              <li>Business interruption.</li>
              <li>Indirect or consequential damages of any kind.</li>
            </ul>
          </Section>
          <Section title="Intellectual Property">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Minecraft is a trademark of Microsoft Corporation and Mojang AB.
              VOMLabs is an independent project and is not affiliated with,
              endorsed by, or sponsored by Microsoft Corporation or Mojang AB.
              All third-party trademarks, assets, and content are the property
              of their respective owners. Most VOMLabs software and this
              website are open source. The source code and licenses are
              available on{" "}
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
          <Section title="Changes to Terms">
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs reserves the right to modify or replace these Terms at
              any time. Any changes will be effective immediately upon posting.
              Continued use of VOMLabs software or this website after such
              modifications constitutes your acceptance of the revised Terms.
            </p>
          </Section>
          <Section title="Termination">
            <p className="text-muted-foreground text-xs leading-relaxed">
              VOMLabs reserves the right, in its sole discretion, to revoke or
              restrict your access to VOMLabs software or this website at any
              time, with or without notice, for violation of these Terms or for
              any other reason permitted by applicable law.
            </p>
          </Section>
          <Section title="Contact">
            <p className="text-muted-foreground text-xs leading-relaxed">
              For questions or concerns regarding these Terms, please contact
              us at:{" "}
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
