"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicy() {
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
              Privacy <span className="text-brand-accent italic">Policy</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              How we handle your data and protect your privacy.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                title: "Our Commitment",
                content: (
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>VOMLabs</strong> is committed to protecting your
                    privacy. We believe in{" "}
                    <span className="text-brand-accent font-medium">
                      minimal data collection
                    </span>{" "}
                    — your data stays on your machine.
                  </p>
                ),
                icon: "shield",
                iconColor: "bg-emerald-500/10 text-emerald-500",
              },
              {
                title: "Data We Don't Collect",
                items: [
                  {
                    title: "No Telemetry",
                    desc: "We do not collect any analytics, usage data, or telemetry from the launcher or website.",
                  },
                  {
                    title: "No Cookies",
                    desc: "We don't use cookies or any tracking technologies on this website.",
                  },
                  {
                    title: "No Custom Accounts",
                    desc: "No registration required. We don't have our own user accounts — you use your Microsoft account.",
                  },
                ],
              },
              // {
              //     title: "Authentication",
              //     content: (
              //         <>
              //             <p className="text-muted-foreground leading-relaxed mb-4">
              //                  Our Minecraft tools use <span className="text-brand-accent font-medium">Microsoft OAuth2</span> authentication. You only need your Microsoft account — no custom account registration required.
              //             </p>
              //             <p className="text-muted-foreground leading-relaxed mb-4">
              //                 Your credentials are handled securely by Microsoft's services — we never see or store your password.
              //             </p>
              //             <p className="text-sm text-muted-foreground">
              //                 Only an access token is stored locally on your device to keep you logged in. This is your login session — nothing else.
              //             </p>
              //         </>
              //     )
              // },
              // {
              //   title: "Third-Party Services",
              //   content: (
              //     <>
              //       <p className="text-muted-foreground leading-relaxed mb-4">
              //         VOMLabs software may interact with third-party services to
              //         provide mod and resource features:
              //       </p>
              //       <div className="flex flex-wrap gap-2">
              //         <a
              //           href="https://modrinth.com"
              //           target="_blank"
              //           rel="noopener noreferrer"
              //           className="px-3 py-1.5 rounded-lg bg-card border border-border hover:border-brand-accent/50 transition-colors text-sm"
              //         >
              //           Modrinth
              //         </a>
              //         <a
              //           href="https://curseforge.com"
              //           target="_blank"
              //           rel="noopener noreferrer"
              //           className="px-3 py-1.5 rounded-lg bg-card border border-border hover:border-brand-accent/50 transition-colors text-sm"
              //         >
              //           CurseForge
              //         </a>
              //         <a
              //           href="https://minecraft.net"
              //           target="_blank"
              //           rel="noopener noreferrer"
              //           className="px-3 py-1.5 rounded-lg bg-card border border-border hover:border-brand-accent/50 transition-colors text-sm"
              //         >
              //           Minecraft.net
              //         </a>
              //       </div>
              //       <p className="mt-4 text-sm text-muted-foreground">
              //         These services have their own privacy policies when you
              //         use them through VOMLabs software.
              //       </p>
              //     </>
              //   ),
              // },
              // {
              //   title: "Discord Integration",
              //   content: (
              //     <p className="text-muted-foreground leading-relaxed">
              //       If you enable Discord Rich Presence in our tools, we only
              //       communicate with your local Discord client.{" "}
              //       <span className="text-brand-accent font-medium">
              //         No data is sent to our servers
              //       </span>
              //       .
              //     </p>
              //   ),
              // },
              {
                title: "Your Rights",
                content: (
                  <p className="text-muted-foreground leading-relaxed">
                    Since we don't collect or store personal data, there's
                    minimal data subject rights concerns. If you contact us, any
                    information provided will be used{" "}
                    <span className="font-medium text-foreground">
                      solely for communication
                    </span>{" "}
                    regarding your inquiry.
                  </p>
                ),
              },
              {
                title: "Contact",
                content: (
                  <>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      For privacy-related questions, contact us at:
                    </p>
                    <a
                      href="mailto:support@vomlabs.com"
                      className="inline-flex items-center gap-2 text-brand-accent hover:underline"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      support@vomlabs.com
                    </a>
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
                      href="/terms"
                      className="px-4 py-2 rounded-lg bg-card border border-border hover:border-brand-accent/50 transition-colors text-sm"
                    >
                      Terms of Use
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
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 sm:p-8 rounded-2xl border border-border bg-card/30"
              >
                {section.icon && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${section.iconColor}`}>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                )}
                {!section.icon && (
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    {section.title}
                  </h2>
                )}
                {"items" in section && section.items ? (
                  <div className="space-y-4">
                    {section.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold shrink-0">
                          ✓
                        </span>
                        <div>
                          <span className="font-medium text-foreground">
                            {item.title}
                          </span>
                          <p className="text-sm text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  section.content
                )}
              </motion.section>
            ))}
          </div>

          <hr className="my-12 border-border/40" />
          <p className="text-sm text-muted-foreground text-center">
            Last updated: April 2026
          </p>
        </section>
      </main>
    </div>
  );
}
