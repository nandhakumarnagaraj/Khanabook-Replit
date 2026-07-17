import { Link } from "@tanstack/react-router";
import { BUSINESS } from "@/lib/business-config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface-soft mt-24">
      <div className="container-page py-16 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-black text-lg">
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-brand text-brand-foreground">K</span>
            KhanaBook
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            KhanaBook is a restaurant POS product developed and operated by {BUSINESS.legalName}.
            {" "}
            {BUSINESS.siblingPlatform} is the company's {BUSINESS.siblingPlatformDescription}.
          </p>
        </div>

        <FooterCol
          title="Product"
          links={[
            { to: "/features", label: "Features" },
            { to: "/compare", label: "Compare" },
            { to: "/get-started", label: "Get Started" },
          ]}
        />
        <FooterCol
          title="Resources"
          links={[
            { to: "/blog", label: "Blog" },
            { to: "/help", label: "Help Center" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { to: "/about", label: "About" },
            { to: "/contact-us", label: "Contact Us" },
            { to: "/privacy-policy", label: "Privacy Policy" },
            { to: "/terms-and-conditions", label: "Terms & Conditions" },
            { to: "/refund-cancellation-policy", label: "Refund & Cancellation" },
          ]}
        />
      </div>
      <div className="border-t border-border">
        <div className="container-page py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {year} {BUSINESS.legalName}. All rights reserved.</span>
          <span>Made in India</span>
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
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <div className="text-sm font-black mb-3">{title}</div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="hover:text-foreground transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
