import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroShareApp } from "@/components/hero-new";
import { StaffGrid } from "@/components/staff-grid";
import { getDiscordServer, getStaff } from "@/lib/staff";

export default function Home() {
  const staff = getStaff();
  const discordServer = getDiscordServer();

  return (
    <>
      <main className="flex-1 bg-red-50 dark:bg-neutral-950">
        <HeroShareApp />

        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full border border-neutral-100 shadow-sm mb-6 text-sm font-bold text-neutral-600">
              What We Do
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-neutral-800 dark:text-neutral-50 leading-[0.9]">
              Building for the
              <br />
              Minecraft Community
            </h2>
            <p className="mt-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              We’re a small team focused on shipping practical, well-designed
              products—often open-source—across web, infrastructure, and
              Minecraft-related tooling.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "Minecraft Plugins",
                description:
                  "Custom plugins that bring your server to life—from minigames to economy systems, we build what your community needs.",
                emoji: "⚡",
              },
              {
                title: "Websites & Apps",
                description:
                  "Modern, performant websites and web applications built with the latest technologies for studios, servers, and brands.",
                emoji: "🌐",
              },
              {
                title: "Open Source",
                description:
                  "We believe in building in public. Our tools and libraries are free, documented, and welcoming to contributors.",
                emoji: "📖",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group bg-white rounded-3xl shadow-xl p-8 border-4 border-white dark:bg-neutral-900 dark:border-neutral-900"
              >
                <span className="text-5xl">{item.emoji}</span>
                <h3 className="mt-6 text-2xl font-bold text-neutral-800 dark:text-neutral-50">
                  {item.title}
                </h3>
                <p className="mt-3 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-10 shadow-xl border-4 border-white dark:bg-neutral-900 dark:border-neutral-900 sm:p-14">
            <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full border border-neutral-100 shadow-sm mb-6 text-sm font-bold text-neutral-600">
                  Get Started
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-800 dark:text-neutral-50 leading-[0.9]">
                  Explore projects,
                  <br />
                  docs &amp; ways to contribute
                </h2>
                <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-xl">
                  Whether you’re here to use a tool, read the docs, or
                  contribute, these links get you to the right place quickly.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://docs.vomlabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-linear-to-t from-red-400 to-red-500 text-white px-6 py-3.5 rounded-xl font-semibold shadow-2xl flex items-center gap-2 transition hover:scale-105"
                  >
                    Read the Docs <ArrowRight className="h-5 w-5" />
                  </a>
                  <a
                    href="https://github.com/vomlabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-6 py-3.5 rounded-xl font-semibold shadow-2xl flex items-center gap-2 transition hover:scale-105"
                  >
                    Browse GitHub
                  </a>
                  <a
                    href={discordServer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-6 py-3.5 rounded-xl font-semibold shadow-2xl flex items-center gap-2 transition hover:scale-105"
                  >
                    Join Discord
                  </a>
                </div>
              </div>

              <div className="rounded-2xl bg-red-50 p-6 dark:bg-neutral-950">
                <div className="text-sm font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  Quick links
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  {[
                    { label: "Meet the team", href: "#staff" },
                    { label: "Privacy policy", href: "/privacy" },
                    { label: "Terms of service", href: "/tos" },
                  ].map((l) => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-neutral-700 hover:bg-red-100 dark:text-neutral-300 dark:hover:bg-neutral-800 font-semibold transition"
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

        <div id="staff" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full border border-neutral-100 shadow-sm text-sm font-bold text-neutral-600">
              The Team
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl font-black tracking-tighter text-neutral-800 dark:text-neutral-50 leading-[0.9]">
              Meet the people
              <br />
              behind VOMLabs
            </h2>
          </div>
          <StaffGrid staff={staff} discordServer={discordServer} />
        </div>
      </main>
    </>
  );
}
