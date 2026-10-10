import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/khanabook-logo.webp";
import { BUSINESS } from "@/lib/business-config";
import { PlayStoreIcon } from "@/components/icons/PlayStoreIcon";
import { GooglePlayBadge } from "@/components/ui/GooglePlayBadge";

const FOOTER_GROUPS = [
  {
    title: "Product",
    links: [
      { to: "/features", label: "Features" },
      { to: "/pricing", label: "Pricing" },
      { to: "/compare", label: "Compare Architectures" },
      { to: "/get-started", label: "Get Started" },
      { href: BUSINESS.playStoreUrl, label: "Android POS App (Play Store)" },
      { href: BUSINESS.loginUrl, label: "Web Dashboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/blog", label: "Blog" },
      { to: "/help", label: "Help Center" },
      { to: "/contact-us", label: "Contact Support" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/privacy-policy", label: "Privacy Policy" },
      { to: "/terms-and-conditions", label: "Terms & Conditions" },
      { to: "/refund-cancellation-policy", label: "Refund & Cancellation" },
    ],
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-background text-foreground border-t border-border/70">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-gold/5 blur-3xl"
      />

      <div className="w-[92vw] md:w-[75vw] mx-auto relative pt-16 pb-12 font-['Google_Sans',_sans-serif]">
        {/* Google Stitch Elevated Brand & Contact Card */}
        <div className="bg-surface rounded-2xl border border-border/70 p-6 sm:p-8 lg:p-10 mb-12 shadow-xl">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12 items-center">
            <div>
              <div className="flex items-center gap-3.5">
                <img
                  src={logo}
                  alt="KhanaBook Logo"
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-2xl border border-border/60 shadow-sm"
                />
                <div>
                  <div className="text-2xl font-bold tracking-tight text-foreground">KhanaBook</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand/15 border border-brand/30 text-[10px] font-semibold text-brand uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      Offline-First Multi-Terminal POS • Android App &amp; Web Dashboard
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl">
                Engineered for high-tempo Indian restaurants, cafes, cloud kitchens and QSRs. 100%
                offline multi-terminal Android POS app for high-speed counter billing and dual KOT
                printing, paired with a powerful Web Dashboard for remote sales, inventory, and menu
                analytics.
              </p>
              <div className="mt-4 pt-1">
                <GooglePlayBadge size="sm" />
              </div>
            </div>

            {/* Quick Contact Chips */}
            <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-2 lg:flex lg:flex-col">
              <a
                href={`mailto:${BUSINESS.supportEmail}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-soft hover:bg-surface border border-border/60 text-foreground transition-all text-xs sm:text-sm group shadow-sm"
              >
                <Mail
                  aria-hidden="true"
                  className="h-4 w-4 text-brand group-hover:scale-110 transition-transform shrink-0"
                />
                <span className="truncate">{BUSINESS.supportEmail}</span>
              </a>
              <a
                href={`tel:${BUSINESS.supportPhone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-soft hover:bg-surface border border-border/60 text-foreground transition-all text-xs sm:text-sm group shadow-sm"
              >
                <Phone
                  aria-hidden="true"
                  className="h-4 w-4 text-brand group-hover:scale-110 transition-transform shrink-0"
                />
                <span>{BUSINESS.supportPhone}</span>
              </a>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-soft border border-border/60 text-muted-foreground text-xs sm:text-sm sm:col-span-2 lg:col-span-1 shadow-sm">
                <MapPin aria-hidden="true" className="h-4 w-4 text-brand shrink-0" />
                <span className="line-clamp-1">{BUSINESS.registeredAddress}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {FOOTER_GROUPS.map((group) => (
            <FooterCol key={group.title} title={group.title} links={group.links} />
          ))}
        </div>

        {/* Stitch Bottom Status Bar */}
        <div className="border-t border-border/70 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-muted-foreground">
          <span>
            © {year} {BUSINESS.legalName}. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-soft border border-border/60 text-[11px] text-foreground font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Offline-First Sync Engine Active
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground font-medium">
              Made with pride in India 🇮🇳
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ readonly to?: string; readonly href?: string; readonly label: string }>;
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-4">
        {title}
      </h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.href ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 py-1 min-h-6 text-sm font-normal text-muted-foreground transition-all hover:text-foreground hover:translate-x-0.5"
              >
                {link.href === BUSINESS.playStoreUrl && (
                  <PlayStoreIcon className="h-3.5 w-3.5 shrink-0" />
                )}
                <span>{link.label}</span>
                <span className="opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground text-xs">
                  ↗
                </span>
              </a>
            ) : (
              <Link
                to={link.to!}
                className="group inline-flex items-center gap-1 py-1 min-h-6 text-sm font-normal text-muted-foreground transition-all hover:text-foreground hover:translate-x-0.5"
              >
                <span>{link.label}</span>
                <span className="opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground text-xs">
                  →
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
