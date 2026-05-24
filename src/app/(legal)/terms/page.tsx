"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col selection:bg-brand-accent/30 selection:text-brand-accent">
      <div className="fixed inset-0 z-[-2] bg-background" />
      <div
        className="fixed inset-0 z-[-1] opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <main className="flex-1 w-full pt-16">
        <section className="max-w-3xl mx-auto px-6 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms of <span className="text-brand-accent italic">Use</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              The rules and conditions for using VOMLabs software.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                content: (
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms of Use (&quot;Terms&quot;) govern your use of{" "}
                    <strong>VOMLabs</strong> software and this website. By
                    accessing or using VOMLabs software, you agree to be bound
                    by these Terms.
                  </p>
                ),
              },
              {
                title: "Eligibility",
                content: (
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-brand-accent mt-1">•</span>
                      <span>
                        VOMLabs software is for{" "}
                        <span className="font-medium text-foreground">
                          personal, non-commercial use
                        </span>{" "}
                        only. If you&apos;d like to use our for{" "}
                        <span className="font-medium text-foreground">
                          commercial use
                        </span>
                        , then you need to reach out to us to{" "}
                        <span className="font-medium text-foreground">
                          request a commercial license
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-accent mt-1">•</span>
                      <span>
                        You must comply with all applicable laws and respect the
                        intellectual property rights of others.
                      </span>
                    </li>
                  </ul>
                ),
              },
              {
                title: "Acceptable Use",
                content: (
                  <>
                    <p className="text-muted-foreground mb-4">
                      You agree NOT to:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="text-destructive mt-1">✕</span>
                        <span>
                          Use VOMLabs software for any{" "}
                          <span className="font-medium text-foreground">
                            illegal activities
                          </span>
                          .
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-destructive mt-1">✕</span>
                        <span>
                          Attempt to{" "}
                          <span className="font-medium text-foreground">
                            bypass, exploit, or compromise
                          </span>{" "}
                          Minecraft servers or systems.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-destructive mt-1">✕</span>
                        <span>
                          <span className="font-medium text-foreground">
                            Reverse engineer, decompile,
                          </span>{" "}
                          or tamper with VOMLabs software.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-destructive mt-1">✕</span>
                        <span>
                          Violate Mojang&apos;s or Microsoft&apos;s End User
                          License Agreement (EULA).
                        </span>
                      </li>
                    </ul>
                  </>
                ),
              },
              {
                title: "No Warranty",
                icon: true,
                content: (
                  <p className="text-muted-foreground leading-relaxed">
                    VOMLabs software is provided{" "}
                    <span className="font-medium text-foreground">
                      &quot;as is&quot;
                    </span>{" "}
                    and{" "}
                    <span className="font-medium text-foreground">
                      &quot;as available&quot;
                    </span>
                    .{" "}
                    <span className="text-brand-accent font-medium">
                      No warranty
                    </span>{" "}
                    of any kind is provided, express or implied, including
                    fitness for a particular purpose or non-infringement.
                  </p>
                ),
              },
              {
                title: "Limitation of Liability",
                content: (
                  <>
                    <p className="text-muted-foreground leading-relaxed">
                      In no event shall VOMLabs contributors be liable for any
                      damages arising from your use or inability to use VOMLabs
                      software. This includes, but is not limited to:
                    </p>
                    <ul className="mt-4 space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-accent">•</span>
                        <span className="text-sm">Loss of data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-accent">•</span>
                        <span className="text-sm">Business interruption</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-accent">•</span>
                        <span className="text-sm">
                          Indirect or consequential damages
                        </span>
                      </li>
                    </ul>
                  </>
                ),
              },
              {
                title: "Intellectual Property",
                content: (
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-brand-accent mt-1">•</span>
                      <span>
                        <span className="font-medium text-foreground">
                          Minecraft
                        </span>{" "}
                        is a trademark of Microsoft and Mojang. VOMLabs is
                        independent and not affiliated.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-accent mt-1">•</span>
                      <span>
                        All third-party assets and content are property of their
                        respective owners.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-accent mt-1">•</span>
                      <span>
                        VOMLabs software and this website are{" "}
                        <span className="font-medium text-foreground">
                          open source
                        </span>
                        . See{" "}
                        <a
                          href="https://github.com/VOMLabs"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-accent hover:underline"
                        >
                          GitHub
                        </a>{" "}
                        for details.
                      </span>
                    </li>
                  </ul>
                ),
              },
              {
                title: "Changes to Terms",
                content: (
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms may be updated at any time.{" "}
                    <span className="font-medium text-foreground">
                      Continued use
                    </span>{" "}
                    of VOMLabs software after changes constitutes acceptance of
                    the new Terms.
                  </p>
                ),
              },
              {
                title: "Termination",
                content: (
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to{" "}
                    <span className="font-medium text-foreground">
                      revoke access
                    </span>{" "}
                    to VOMLabs software or this website at any time for
                    violation of these Terms or for any other reason.
                  </p>
                ),
              },
              {
                title: "Contact",
                content: (
                  <>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Questions about these Terms? Contact us:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="mailto:support@vomlabs.com"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-brand-accent/50 transition-colors text-sm"
                      >
                        support@vomlabs.com
                      </a>
                      <Link
                        href="/legal"
                        className="px-4 py-2 rounded-lg bg-card border border-border hover:border-brand-accent/50 transition-colors text-sm"
                      >
                        Legal Notice
                      </Link>
                    </div>
                  </>
                ),
              },
              {
                title: "Quick Links",
                content: (
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/legal"
                      className="px-4 py-2 rounded-lg bg-card border border-border hover:border-brand-accent/50 transition-colors text-sm"
                    >
                      Legal Notice
                    </Link>
                    <Link
                      href="/privacy"
                      className="px-4 py-2 rounded-lg bg-card border border-border hover:border-brand-accent/50 transition-colors text-sm"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/tos"
                      className="px-4 py-2 rounded-lg bg-card border border-border hover:border-brand-accent/50 transition-colors text-sm"
                    >
                      Terms of Service
                    </Link>
                  </div>
                ),
              },
            ].map((section, i) => (
              <motion.section
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 sm:p-8 rounded-2xl border border-border bg-card/30"
              >
                {section.icon && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <svg
                        className="w-5 h-5 text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                )}
                {!section.icon && section.title && (
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    {section.title}
                  </h2>
                )}
                {section.content}
              </motion.section>
            ))}
          </div>

          <hr className="my-12 border-border/40" />
          <p className="text-sm text-muted-foreground text-center">
            Last updated: May 2026
          </p>
        </section>
      </main>
    </div>
  );
}
