import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import {
  JetBrains_Mono as FontMono,
  Noto_Sans as FontSans,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navigation } from "@/components/ui/navigation";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SessionProvider } from "@/components/providers/session_provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { CommandPalette } from "@/components/ui/command-palette";
import { FooterLogo } from "@/components/ui/footer-logo";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ThemeShortcut } from "@/components/ui/theme-shortcut";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vomlabs.com"),
  title: {
    default: "VOMLabs — Minecraft Software & Developer Tools",
    template: "%s | VOMLabs",
  },
  description:
    "VOMLabs creates innovative Minecraft software, modern websites, and developer tools. Building the future of gaming experiences.",
  keywords: [
    "Minecraft",
    "VOMLabs",
    "Minecraft Software",
    "Web Development",
    "Developer Tools",
    "Gaming",
    "Open Source",
  ],
  authors: [{ name: "VOMLabs", url: "https://vomlabs.com" }],
  creator: "VOMLabs",
  publisher: "VOMLabs",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "VOMLabs",
    title: "VOMLabs — Minecraft Software & Developer Tools",
    description:
      "VOMLabs creates innovative Minecraft software, modern websites, and developer tools.",
    url: "https://vomlabs.com",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "VOMLabs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VOMLabs — Minecraft Software & Developer Tools",
    description:
      "VOMLabs creates innovative Minecraft software, modern websites, and developer tools.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={cn("font-mono", fontMono.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${fontSans.variable} ${fontMono.variable} min-h-screen bg-background font-mono text-foreground antialiased`}
      >
        <SpeedInsights />
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            <NuqsAdapter>
              <Navigation />
              <CommandPalette />
              <main>{children}</main>
              <ToastProvider />
              <ThemeShortcut />
              <ScrollToTop />
            </NuqsAdapter>
          </SessionProvider>
          <FooterLogo
            aRR
            aRRText="Not affiliated with Mojang or Microsoft."
            links={[
              { label: "Legal Notice", href: "/legal" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use", href: "/terms" },
              { label: "Terms of Service", href: "/tos" },
            ]}
            year={2025}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
