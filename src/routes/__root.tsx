import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import khanabookLogo from "../assets/khanabook-logo.webp";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header as SiteHeader } from "../components/site/Header";
import { Footer as SiteFooter } from "../components/site/Footer";
import { FloatingCtas } from "../components/site/FloatingCtas";
import { OfflineIndicator } from "../components/site/OfflineIndicator";
import { ParallaxBackground } from "../components/motion/ParallaxBackground";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KhanaBook — Offline-First Multi-Terminal Restaurant POS | Android App & Web Dashboard" },
      {
        name: "description",
        content:
          "KhanaBook is an offline-first multi-terminal restaurant POS. 100% offline billing on Android phones & tablets with up to 5 synchronized terminals, paired with a powerful cloud Web Dashboard for centralized menus, inventory, staff, and live sales.",
      },
      { property: "og:title", content: "KhanaBook — Offline-First Multi-Terminal Restaurant POS | Android App & Web Dashboard" },
      {
        property: "og:description",
        content:
          "Zero-lag offline billing on Android with local SQLite, up to 5 synced terminals, dual ESC/POS thermal printing, and a real-time cloud Web Dashboard.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "KhanaBook" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preload", href: "https://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQ.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "icon", type: "image/webp", href: khanabookLogo },
      { rel: "shortcut icon", type: "image/webp", href: khanabookLogo },
      { rel: "apple-touch-icon", href: khanabookLogo },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Karla:wght@400;500;600;700;800;900&display=swap",
      },
    ],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "PIQUANT CONSULTANCY SERVICES PRIVATE LIMITED",
          brand: "KhanaBook",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

import { ThemeProvider } from "../lib/theme-provider";

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('khanabook-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}else{document.documentElement.classList.remove('light');document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <HeadContent />
      </head>
      <body className="min-h-screen selection:bg-brand/30 selection:text-white transition-colors duration-200 overflow-x-hidden w-full">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ParallaxBackground />
        <div className="min-h-screen flex flex-col transition-colors duration-200 overflow-x-hidden w-full">
          <SiteHeader />
          <OfflineIndicator />
          <main className="flex-1 w-full overflow-x-hidden">
            <Outlet />
          </main>
          <SiteFooter />
          <FloatingCtas />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
