import { useState } from "react";
import { ReceiptText, Printer, CreditCard, UtensilsCrossed, BarChart3 } from "lucide-react";
import chefHandshake from "@/assets/chef-handshake.webp";
import appBilling from "@/assets/app-billing.png";
import appPayment from "@/assets/app-payment.png";
import appMenu from "@/assets/app-menu.png";
import appReports from "@/assets/app-reports.png";

const TABS = [
  {
    id: "billing",
    label: "Billing",
    icon: ReceiptText,
    image: appBilling,
    alt: "KhanaBook new-bill screen for selecting menu items and creating an order",
    description:
      "Create GST bills for dine-in, takeaway and manually-recorded online orders. Tax is computed automatically.",
    portrait: true,
    illustrative: false,
  },
  {
    id: "kot",
    label: "KOT",
    icon: Printer,
    image: chefHandshake,
    alt: "Restaurant kitchen staff coordinating order preparation",
    description:
      "Generate KOTs and print them on the designated compatible Bluetooth KOT printer. Reprint and update active orders without confusion.",
    portrait: false,
    illustrative: true,
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    image: appPayment,
    alt: "KhanaBook payment screen for recording payment details on a bill",
    description:
      "Record cash, UPI, card and split payments on a single bill. Every mode shows up cleanly in reports.",
    portrait: true,
    illustrative: false,
  },
  {
    id: "menu",
    label: "Menu",
    icon: UtensilsCrossed,
    image: appMenu,
    alt: "KhanaBook menu management screen with restaurant items and categories",
    description:
      "Manage categories, items, prices and variants. Track inventory and get low-stock alerts before service.",
    portrait: true,
    illustrative: false,
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    image: appReports,
    alt: "KhanaBook restaurant reports screen",
    description:
      "Daily and monthly sales, payment-mode breakdown, item-level performance and terminal-aware views.",
    portrait: true,
    illustrative: false,
  },
] as const;

export function ProductTabs() {
  const [active, setActive] = useState(0);
  const current = TABS[active];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Tab buttons */}
      <div
        role="tablist"
        aria-label="Product features"
        className="flex flex-nowrap justify-start gap-2 mb-10 overflow-x-auto pb-2 sm:justify-center"
      >
        {TABS.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = i === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setActive((i + 1) % TABS.length);
                if (e.key === "ArrowLeft") setActive((i - 1 + TABS.length) % TABS.length);
              }}
              tabIndex={isActive ? 0 : -1}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                isActive
                  ? "bg-brand text-brand-foreground shadow-lg shadow-brand/30"
                  : "bg-surface border border-border text-muted-foreground hover:border-brand/40 hover:text-foreground"
              }`}
            >
              <Icon aria-hidden className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab panel */}
      <div
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-center"
      >
        <div className="order-2 md:order-1">
          <h3 className="text-2xl font-black mb-3">{current.label}</h3>
          <p className="text-muted-foreground leading-relaxed text-lg">{current.description}</p>
        </div>
        <div
          className={`order-1 md:order-2 rounded-2xl overflow-hidden border border-border shadow-xl ${
            current.portrait ? "flex min-h-[34rem] items-center justify-center bg-surface p-4" : ""
          }`}
        >
          <img
            src={current.image}
            alt={current.alt}
            width={current.portrait ? 720 : 800}
            height={current.portrait ? 1600 : 600}
            loading="lazy"
            className={
              current.portrait
                ? "max-h-[38rem] w-auto max-w-full rounded-xl object-contain transition-opacity duration-300"
                : "h-auto w-full transition-opacity duration-300"
            }
          />
        </div>
      </div>

      {current.illustrative && (
        <p className="text-center text-[11px] text-muted-foreground mt-6">
          KOT visual is illustrative; a dedicated in-app KOT screenshot will replace it.
        </p>
      )}
    </div>
  );
}
