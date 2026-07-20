import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/khanabook-logo.webp";
import { BUSINESS } from "@/lib/business-config";

const FOOTER_GROUPS = [
  {
    title: "Product",
    links: [
      { to: "/features", label: "Features" },
      { to: "/pricing", label: "Pricing" },
      { to: "/compare", label: "Compare" },
      { to: "/get-started", label: "Get Started" },
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
    <footer className="relative overflow-hidden bg-[#111318] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="container-page relative pt-16 pb-6 lg:pt-20 lg:pb-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))] lg:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="" width={56} height={56} className="h-14 w-14 rounded-2xl" />
              <div>
                <div className="text-2xl font-black tracking-tight text-white">KhanaBook</div>
                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-red-300">
                  Restaurant POS
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-200">
              <a
                href={`mailto:${BUSINESS.supportEmail}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail aria-hidden="true" className="h-4 w-4 text-red-300" />
                {BUSINESS.supportEmail}
              </a>
              <a
                href={`tel:${BUSINESS.supportPhone.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone aria-hidden="true" className="h-4 w-4 text-red-300" />
                {BUSINESS.supportPhone}
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin aria-hidden="true" className="h-4 w-4 text-red-300" />
                {BUSINESS.registeredAddress}
              </div>
            </div>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <FooterCol key={group.title} title={group.title} links={group.links} />
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs font-semibold text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {BUSINESS.legalName}. All rights reserved.
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
            Made in India
          </span>
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
  links: ReadonlyArray<{ readonly to: string; readonly label: string }>;
}) {
  return (
    <div>
      <h2 className="text-sm font-black uppercase tracking-[0.14em] text-white">{title}</h2>
      <ul className="mt-5 space-y-3.5">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-sm font-semibold text-slate-200 transition-colors hover:text-red-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
