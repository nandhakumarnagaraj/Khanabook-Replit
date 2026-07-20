import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/khanabook-logo.webp";
import { BUSINESS } from "@/lib/business-config";

const NAV = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/compare", label: "Compare" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand/15 bg-gradient-to-r from-brand/5 via-background to-gold/10 shadow-sm">
      <div className="container-page grid h-20 grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Link
          to="/"
          className="flex w-fit items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-brand"
          aria-label="KhanaBook home"
        >
          <img
            src={logo}
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 rounded-2xl shadow-sm"
          />
          <span className="leading-none">
            <span className="block text-2xl font-black tracking-tight text-foreground">KhanaBook</span>
            <span className="mt-1 hidden text-[10px] font-black uppercase tracking-[0.18em] text-brand sm:block">
              Restaurant POS
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-bold text-foreground transition-colors hover:bg-surface-soft hover:text-brand focus-visible:ring-2 focus-visible:ring-brand"
              activeProps={{ className: "bg-surface-soft text-brand" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end">
          <a
            href={BUSINESS.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center justify-center rounded-xl border border-brand bg-brand px-5 text-sm font-black text-brand-foreground shadow-sm transition-transform hover:-translate-y-0.5 lg:inline-flex"
          >
            Login
          </a>
          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground shadow-sm transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-brand lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="border-t border-border bg-background shadow-lg lg:hidden">
          <div className="container-page py-4">
            <nav aria-label="Mobile navigation" className="grid gap-2">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center rounded-xl px-4 text-sm font-bold text-foreground transition-colors hover:bg-surface-soft hover:text-brand"
                  activeProps={{ className: "bg-surface-soft text-brand" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <a
              href={BUSINESS.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-xl border border-brand bg-brand px-4 text-sm font-black text-brand-foreground shadow-sm"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
