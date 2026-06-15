import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Footer } from "@/components/sections/home/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "VOMLabs Website",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="flex max-w-sm flex-col items-center gap-4">
        <div className="space-y-2">
          <h1 className="font-bold text-5xl tracking-tight">404</h1>
          <p className="font-medium text-muted-foreground text-xl">
            Page not found
          </p>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          className="inline-flex h-8 shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap border border-transparent bg-primary px-2.5 font-medium text-primary-foreground text-xs outline-none transition-all hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50"
          href="/"
        >
          Go home
        </a>
      </div>
    </main>
  ),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <TooltipProvider>
            <div className="flex min-h-dvh flex-col">
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </TooltipProvider>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
