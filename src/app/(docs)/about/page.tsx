import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about VOMLabs - an innovative organization creating Minecraft software, modern websites, and developer tools.",
  keywords: [
    "About VOMLabs",
    "VOMLabs Team",
    "Minecraft Development",
    "Web Development",
  ],
};

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden selection:bg-brand-accent/30 selection:text-brand-accent">
      <div className="fixed inset-0 z-[-2] bg-background" />
      <div
        className="pointer-events-none fixed inset-0 z-[-1] opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none fixed top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-brand-accent/5 blur-[150px]" />

      <main className="w-full flex-1 pt-24 pb-16">
        <AboutSection />
      </main>
    </div>
  );
}
