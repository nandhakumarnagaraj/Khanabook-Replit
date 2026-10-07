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
    <header className="sticky top-0 z-50 border-b border-[#28292A] bg-[#131314]/90 backdrop-blur-md shadow-sm transition-colors">
      <div className="w-[92vw] md:w-[75vw] mx-auto flex h-20 items-center justify-between gap-4 font-['Google_Sans',_sans-serif]">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 rounded-2xl focus-visible:ring-2 focus-visible:ring-white/50 group"
          aria-label="KhanaBook home"
        >
          <img
            src={logo}
            alt="KhanaBook Logo"
            width={56}
            height={56}
            className="h-11 w-11 md:h-12 md:w-12 rounded-2xl border border-white/10 shadow-sm transition-transform duration-200 group-hover:scale-105"
          />
          <span className="leading-tight">
            <span className="block text-xl md:text-2xl font-bold tracking-tight text-white">
              KhanaBook
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Restaurant POS
            </span>
          </span>
        </Link>

        {/* Primary Navigation Pills — Google Stitch Dock Style */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-[#1E1F20] px-2 py-1.5 shadow-inner lg:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-normal text-gray-300 transition-all hover:bg-[#28292A] hover:text-white"
              activeProps={{ className: "bg-[#28292A] text-white font-medium shadow-sm border border-white/10" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/get-started"
            className="hidden text-sm font-medium text-gray-300 transition-colors hover:text-white md:inline-flex px-3 py-1.5"
          >
            Get Started
          </Link>
          <a
            href={BUSINESS.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[#131314] shadow-sm transition-all duration-200 hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] lg:inline-flex"
          >
            Login
          </a>
          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#28292A] text-gray-100 shadow-sm transition-colors hover:bg-[#333538] hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div id="mobile-navigation" className="border-t border-[#28292A] bg-[#131314] shadow-2xl lg:hidden">
          <div className="w-[92vw] md:w-[75vw] mx-auto py-5 space-y-2 font-['Google_Sans',_sans-serif]">
            <nav aria-label="Mobile navigation" className="grid gap-1.5">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center rounded-xl px-4 text-base font-normal text-gray-200 transition-colors hover:bg-[#28292A] hover:text-white"
                  activeProps={{ className: "bg-[#28292A] text-white font-medium" }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/get-started"
                onClick={() => setOpen(false)}
                className="flex h-11 items-center rounded-xl px-4 text-base font-normal text-gray-200 transition-colors hover:bg-[#28292A] hover:text-white"
              >
                Get Started
              </Link>
            </nav>
            <a
              href={BUSINESS.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-[#131314] shadow-sm hover:bg-gray-200"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
