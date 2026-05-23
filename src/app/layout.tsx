import { Navigation } from "@/components/ui/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { JetBrains_Mono as FontMono, Noto_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { FooterLogo } from "@/components/ui/footer-logo";
import { Toaster } from "sonner";
import { CommandPalette } from "@/components/ui/command-palette";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { cn } from "@/lib/utils";
import { SessionProvider } from "@/components/providers/session_provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Vesper Client",
    template: "%s | Vesper Client",
  },
  description:
    "Vesper Client is a sleek, modern, and high-utility Minecraft client designed for performance, customization, and an enhanced gameplay experience.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png" },
    ],
  },
  keywords: [
    "Minecraft",
    "Vesper Client",
    "Minecraft Client",
    "High-Utility",
    "Modern",
    "Launcher",
    "Custom Minecraft",
  ],
  authors: [{ name: "DevFlare / ArexLabs", url: "https://devflare.de" }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", fontSans.variable)}
    >
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <SpeedInsights />
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            <Navigation />
            <CommandPalette />
            <main>{children}</main>
            <Toaster richColors />
            <ScrollToTop />
          </SessionProvider>
          <FooterLogo
            aRR
            aRRText="Not affiliated with Mojang or Microsoft."
            year={2025}
            links={[
              { label: "Legal Notice", href: "/legal" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use", href: "/terms" },
              { label: "Terms of Service", href: "/tos" }
            ]}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}