import { ArrowRight, BookOpen, Code2, Users } from "lucide-react";
import Link from "next/link";
import { HeroShareApp } from "@/components/hero-new";
import { StaffGrid } from "@/components/staff-grid";
import { getDiscordServer, getStaff } from "@/lib/staff";

export default function Home() {
  const staff = getStaff();
  const discordServer = getDiscordServer();

  return (
    <>
      <main className="flex-1">
        <HeroShareApp />

        <section className="mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
              What we build at VOMLabs
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400">
              We’re a small team focused on shipping practical, well-designed
              products—often open-source—across web, infrastructure, and
              Minecraft-related tooling.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Products & tooling",
                description:
                  "Opinionated tools and experiences built for real workflows—fast, accessible, and maintainable.",
                icon: Code2,
              },
              {
                title: "Docs-first engineering",
                description:
                  "Clear docs, predictable APIs, and developer experience that makes adoption easy.",
                icon: BookOpen,
              },
              {
                title: "Community-driven",
                description:
                  "We build in public, iterate with feedback, and keep projects welcoming for contributors.",
                icon: Users,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900">
                      <Icon className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
                    </span>
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-neutral-200 bg-red-50 p-8 dark:border-neutral-800 dark:bg-neutral-950 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
                  Explore projects, docs, and ways to collaborate
                </h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  Whether you’re here to use a tool, read the docs, or
                  contribute, these links get you to the right place quickly.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://docs.vomlabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                  >
                    Read the Docs <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                  <a
                    href="https://github.com/vomlabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
                  >
                    Browse GitHub
                  </a>
                  <a
                    href={discordServer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
                  >
                    Join Discord
                  </a>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 ring-1 ring-neutral-900/10 dark:bg-neutral-900 dark:ring-neutral-50/10">
                <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                  Quick links
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  {[
                    { label: "Meet the team", href: "#staff" },
                    { label: "Privacy policy", href: "/privacy" },
                    { label: "Terms of service", href: "/tos" },
                  ].map((l) => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="flex items-center justify-between rounded-md px-2 py-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
                    >
                      <span>{l.label}</span>
                      <ArrowRight className="h-4 w-4 text-neutral-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="staff" className="mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaffGrid staff={staff} discordServer={discordServer} />
        </div>
      </main>
    </>
  );
}
