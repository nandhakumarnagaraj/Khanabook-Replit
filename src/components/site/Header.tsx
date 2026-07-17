import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/khanabook-logo.webp";

const NAV = [
  { to: "/features", label: "Features" },
  { to: "/blog", label: "Blog" },
  { to: "/compare", label: "Compare" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-black text-lg" aria-label="KhanaBook home">
          <img src={logo} alt="KhanaBook" width={32} height={32} className="h-8 w-8 rounded-lg" />
          <span>KhanaBook</span>
        </Link>


        <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-foreground/70 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded transition-colors"
              activeProps={{ className: "text-brand" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/get-started" className="hidden md:inline-flex btn-primary">
            Get KhanaBook
          </Link>
          <button
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block w-5 h-0.5 bg-foreground relative before:content-[''] before:absolute before:w-5 before:h-0.5 before:bg-foreground before:-top-1.5 before:left-0 after:content-[''] after:absolute after:w-5 after:h-0.5 after:bg-foreground after:top-1.5 after:left-0" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-page py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 font-semibold"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/get-started" onClick={() => setOpen(false)} className="btn-primary justify-center">
              Get KhanaBook
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
