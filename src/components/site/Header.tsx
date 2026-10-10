import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/khanabook-logo.webp";
import { BUSINESS } from "@/lib/business-config";
import { PlayStoreIcon } from "@/components/icons/PlayStoreIcon";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/compare", label: "Compare" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md shadow-sm transition-colors w-full">
      <div className="w-[94vw] md:w-[86vw] lg:w-[84vw] xl:w-[80vw] max-w-7xl mx-auto flex h-20 items-center justify-between gap-4 font-['Google_Sans',_sans-serif]">
        {/* Brand / Logo Block - Vertical Stack & Shrink Guard */}
        <Link
          to="/"
          className="flex items-center gap-1.5 sm:gap-2 rounded-2xl focus-visible:ring-2 focus-visible:ring-ring group shrink-0"
        >
          <img
            src={logo}
            alt="KhanaBook Logo"
            width={60}
            height={60}
            className="h-13 w-13 sm:h-14 sm:w-14 md:h-[60px] md:w-[60px] object-contain transition-transform duration-200 group-hover:scale-105 shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tight text-[#000000] leading-none">
              Khana<span className="text-[#4B26D4]">Book</span>
            </span>
            <span className="hidden sm:inline-block text-xs md:text-[13px] font-normal tracking-wide text-[#000000] mt-1">
              Fast &nbsp;|&nbsp; Simple &nbsp;|&nbsp; Reliable
            </span>
          </div>
        </Link>

        {/* Primary Navigation Pills — Google Stitch Dock Style */}
        <nav
          aria-label="Primary"
          className="hidden xl:flex items-center gap-1 rounded-full border border-border/70 bg-surface-soft/80 p-1.5 shadow-inner"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="inline-flex h-9 items-center justify-center rounded-full px-4 text-sm transition-all duration-200 select-none cursor-pointer"
              inactiveProps={{
                className:
                  "font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5",
              }}
              activeProps={{
                className: "bg-brand text-white font-bold shadow-sm shadow-brand/25",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={BUSINESS.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-brand text-white hover:bg-brand/90 h-11 px-6 text-sm font-bold shadow-md shadow-brand/25 transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            title="Log in to KhanaBook Web Dashboard"
          >
            <span>Login</span>
          </a>
          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-surface-soft text-foreground shadow-sm transition-colors hover:bg-surface xl:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-border/70 bg-background/95 backdrop-blur-xl shadow-2xl xl:hidden"
        >
          <div className="w-[94vw] md:w-[86vw] lg:w-[84vw] xl:w-[80vw] max-w-7xl mx-auto py-5 space-y-3 font-['Google_Sans',_sans-serif]">
            <nav aria-label="Mobile navigation" className="grid gap-1.5">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center rounded-xl px-4 text-base transition-colors"
                  inactiveProps={{
                    className:
                      "font-medium text-muted-foreground hover:bg-surface-soft hover:text-foreground",
                  }}
                  activeProps={{
                    className: "bg-brand text-white font-bold shadow-sm shadow-brand/20",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-2 grid gap-2">
              <a
                href={BUSINESS.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand text-white px-4 text-sm font-bold shadow-md hover:bg-brand/90"
              >
                <PlayStoreIcon className="h-4 w-4 shrink-0" />
                <span>Download App</span>
              </a>
              <a
                href={BUSINESS.loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full items-center justify-center rounded-full border border-border/70 bg-surface-soft text-foreground px-4 text-sm font-bold shadow-sm hover:bg-surface"
              >
                <span>Login</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
