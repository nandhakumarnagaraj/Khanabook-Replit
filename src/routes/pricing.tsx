import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  X,
  HelpCircle,
  Smartphone,
  Cloud,
  Download,
  ExternalLink,
  ShieldCheck,
  Printer,
  Sparkles,
  Zap,
  ArrowRight,
  ChevronDown,
  Info,
} from "lucide-react";
import { useState } from "react";
import { BUSINESS, DISCLAIMERS, absUrl } from "@/lib/business-config";
import { EntranceReveal } from "@/components/motion/EntranceReveal";
import { BorderBeam } from "@/components/motion/primitives/BorderBeam";
import { UiVerseBadge, UiVerseGlowingButton } from "@/components/uiverse";
import { PlayStoreIcon } from "@/components/icons/PlayStoreIcon";
import { GooglePlayBadge } from "@/components/ui/GooglePlayBadge";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      {
        title:
          "Pricing — KhanaBook Offline-First Multi-Terminal Restaurant POS | Android App & Web Dashboard",
      },
      {
        name: "description",
        content:
          "KhanaBook currently has ₹0 software subscription fee. Both the offline-first Android POS App and the Cloud Web Dashboard are fully included. Up to 5 synchronized terminals per restaurant.",
      },
      {
        property: "og:title",
        content: "KhanaBook Pricing — Transparent Offline-First POS (₹0 Subscription)",
      },
      {
        property: "og:description",
        content:
          "No software subscription fees. Offline-first Android POS billing, up to 5 terminals, and real-time Cloud Web Dashboard.",
      },
      { property: "og:url", content: absUrl("/pricing") },
    ],
    links: [{ rel: "canonical", href: absUrl("/pricing") }],
  }),
  component: PricingPage,
});

const INCLUDED_GROUPS = [
  {
    category: "Billing & Front-of-House",
    items: [
      "100% Offline-first Android POS billing (zero downtime during broadband or power cuts)",
      "Up to 5 approved Android terminals per restaurant (Cashier counter + Table stewards)",
      "Table floor plan visualizer, table shifting, merging, and captain steward ordering",
      "Dine-in, quick-service takeaway, token numbering, and delivery order workflows",
      "Cash, dynamic UPI QR on printed bill, card, and multi-mode split-payment recording",
      "Paperless digital PDF invoice generation with WhatsApp and SMS sharing",
    ],
  },
  {
    category: "Kitchen & Order Routing",
    items: [
      "Dual ESC/POS thermal printing (counter receipts + kitchen KOTs via USB/BT/Wi-Fi)",
      "Multi-station kitchen routing (Tandoor, Main Kitchen, Chinese, Bar)",
      "Instant '86' sold-out item toggling across all active terminals in one tap",
    ],
  },
  {
    category: "Cloud Web Dashboard & Inventory",
    items: [
      "Full access to Cloud Web Dashboard from any laptop, tablet, or PC browser",
      "Centralized menu engineering with categories, portion sizes, add-ons and modifiers",
      "Raw material inventory tracking with Recipe Bill of Materials (BOM) auto-deduction",
      "Low-stock threshold alerts, ingredient wastage logs, and consumption auditing",
    ],
  },
  {
    category: "Finance, GST & Administration",
    items: [
      "Terminal-specific GST invoice series and isolated daily sequence counters",
      "End-of-day cash drawer float reconciliation & closing Z-Reports",
      "Daily, monthly, payment-mode, item-velocity, and hourly sales rush reports",
      "Dedicated Accountant read-only web login with GST-compliant Excel/PDF exports",
      "Role-based staff permissions and manager authorization PINs for comps and voids",
    ],
  },
];

const NOT_INCLUDED = [
  {
    item: "Integrated payment-gateway processing or verification",
    note: "Not currently available — payments are recorded in KhanaBook",
  },
  {
    item: "Automated direct Swiggy / Zomato order ingestion",
    note: "Coming soon — online orders currently recorded as an order source",
  },
  {
    item: "Customer self-ordering QR storefront",
    note: "Roadmap item — steward mobile ordering is fully available today",
  },
];

const HARDWARE_COSTS = [
  {
    title: "Android POS Terminals",
    desc: "Runs on any standard Android phone or tablet you already own. Zero mandatory proprietary terminals.",
    cost: "₹0 Upfront",
    highlight: "Use staff or owner phones",
    icon: Smartphone,
  },
  {
    title: "Thermal Printers (ESC/POS)",
    desc: "Connect up to two standard 58mm or 80mm thermal receipt & KOT printers via USB, Bluetooth, or Wi-Fi.",
    cost: "Market Price",
    highlight: "TVS, Epson, Everycom, NGX",
    icon: Printer,
  },
  {
    title: "Local Wi-Fi Router",
    desc: "Any basic Wi-Fi router connects up to 5 terminals locally even without active internet connection.",
    cost: "Market Price",
    highlight: "One-time hardware",
    icon: Zap,
  },
  {
    title: "Optional Compliance Services",
    desc: `GST filing assistance, FSSAI licensing and statutory audits offered through ${BUSINESS.siblingPlatform}.`,
    cost: "Quoted Separately",
    highlight: "Optional engagement",
    icon: ShieldCheck,
  },
];

const PRICING_FAQS = [
  {
    q: "Will KhanaBook always be free?",
    a: "We cannot guarantee that forever. KhanaBook currently has no software subscription fee. If pricing changes in the future, the applicable pricing and terms will be communicated well in advance before any new charges apply.",
  },
  {
    q: "Is there any limit on bills or menu items?",
    a: "KhanaBook does not publish an artificial daily bill cap or a menu-item cap. Up to five approved Android terminals can be used simultaneously per restaurant.",
  },
  {
    q: "Do I need to buy expensive Windows PC hardware or servers?",
    a: "No! KhanaBook was built from the ground up to eliminate ₹35,000+ PC stations and UPS backups. You can run billing and kitchen KOTs entirely on affordable Android phones and tablets.",
  },
  {
    q: "Is the Web Dashboard also free?",
    a: "Yes! Your account includes access to the Cloud Web Dashboard for centralized menu editing, live sales telemetry, recipe management, and accountant reports.",
  },
  {
    q: "Does KhanaBook take a cut of my food sales or billing volume?",
    a: "No. KhanaBook charges 0% commission on your billing volume. All revenues collected via Cash, UPI QR, or Card belong 100% to your restaurant.",
  },
  {
    q: "Can I connect multiple printers for Kitchen KOT and Counter Receipts?",
    a: "Yes. KhanaBook supports dual-printer routing out of the box. You can connect one thermal printer for customer bills and a second thermal printer in the kitchen for KOTs via USB, Bluetooth, or Wi-Fi.",
  },
];

function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#131314] text-white min-h-screen font-['Google_Sans',_sans-serif] selection:bg-brand/30 selection:text-white">
      {/* 1. HERO & PLAN CARD */}
      <section className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20 border-b border-[#28292A]">
        {/* Subtle Ambient Light */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-brand/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
        />

        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10 text-center">
          <EntranceReveal direction="up" delay={0.05}>
            <UiVerseBadge pulseColor="emerald">
              TRANSPARENT RESTAURANT PRICING • ZERO SOFTWARE SUBSCRIPTION
            </UiVerseBadge>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.15}>
            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Enterprise POS Power. <br className="hidden sm:inline" />
              <span className="hl">₹0 Software Subscription.</span>
            </h1>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.25}>
            <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              No software subscription fees for the offline-first Android POS App or the Cloud Web
              Dashboard. Keep 100% of your restaurant margins.
            </p>
          </EntranceReveal>

          {/* MAIN PRICING HERO CARD */}
          <EntranceReveal direction="up" delay={0.35}>
            <div className="mt-12 max-w-xl mx-auto">
              <div className="relative rounded-3xl border border-brand/40 bg-[#1E1F20] p-8 md:p-10 text-center shadow-2xl overflow-hidden">
                <BorderBeam
                  size={260}
                  duration={12}
                  delay={0}
                  colorFrom="#c026d3"
                  colorTo="#dc2626"
                />

                <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/30 px-3.5 py-1 text-xs font-bold text-brand mb-6">
                  <Sparkles className="h-3.5 w-3.5" />
                  Full Community Access Plan
                </div>

                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight">
                    ₹0
                  </span>
                  <span className="text-gray-400 font-semibold text-lg">/month</span>
                </div>

                <p className="mt-3 text-sm text-gray-300 font-medium">
                  Includes both Android POS App &amp; Cloud Web Dashboard
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Up to 5 approved Android terminals per restaurant. No credit card required.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <GooglePlayBadge size="md" />
                  <a
                    href={BUSINESS.loginUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/80 px-6 py-3.5 text-sm font-bold text-foreground hover:border-brand hover:text-brand transition-all"
                  >
                    <Cloud className="h-4 w-4" />
                    <span>Launch Web Dashboard</span>
                  </a>
                </div>

                <div className="mt-4">
                  <Link
                    to="/get-started"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Need an onboarding call or multi-terminal setup? Request a demo →
                  </Link>
                </div>
              </div>
            </div>
          </EntranceReveal>
        </div>
      </section>

      {/* 2. WHAT'S INCLUDED VS ROADMAP */}
      <section className="py-16 md:py-24 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand">
              Feature Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              Everything Included in <span className="hl">Current Software Access.</span>
            </h2>
            <p className="text-gray-400 mt-3 text-sm sm:text-base">
              Zero tier locks, zero per-terminal penalty, and zero artificial limits on daily
              orders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* INCLUDED CARD */}
            <div className="rounded-2xl border border-emerald-500/30 bg-[#1E1F20] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Included at ₹0 Subscription</h3>
                  <p className="text-xs text-emerald-400">Active & production-ready today</p>
                </div>
              </div>

              <div className="space-y-6">
                {INCLUDED_GROUPS.map((group) => (
                  <div key={group.category} className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      {group.category}
                    </h4>
                    <ul className="space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-gray-300 leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* NOT INCLUDED / ROADMAP CARD */}
            <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Not Currently Available</h3>
                  <p className="text-xs text-gray-300">Clear roadmap transparency</p>
                </div>
              </div>

              <ul className="space-y-4">
                {NOT_INCLUDED.map((row) => (
                  <li key={row.item} className="flex items-start gap-3 text-sm">
                    <X className="h-4 w-4 text-gray-300 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-300">{row.item}</span>
                      <p className="text-xs text-gray-300 mt-1">{row.note}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-white/10 bg-[#28292A] p-4 text-xs text-gray-300 leading-relaxed">
                <strong className="text-white">Note on Payment Gateways:</strong> KhanaBook records
                payment modes (Cash, UPI, Card, Split) and reference IDs accurately for accounting
                and GST. Direct in-app bank gateway settlement is currently under development.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HARDWARE & THIRD-PARTY COSTS BREAKDOWN */}
      <section className="py-16 md:py-24 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand">
              Zero Forced Hardware Bundles
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              Transparent Hardware & <span className="hl">Operational Costs.</span>
            </h2>
            <p className="text-gray-400 mt-3 text-sm sm:text-base">
              KhanaBook does not sell locked proprietary hardware. You have 100% freedom to use
              existing devices or purchase hardware from any marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HARDWARE_COSTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6 flex flex-col justify-between hover:border-brand/40 transition-all"
                >
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      {item.highlight}
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-gray-300">Estimated Cost:</span>
                    <span className="text-sm font-bold text-white">{item.cost}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 md:py-24 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              Everything You Need to Know About <span className="hl">Pricing.</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {PRICING_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-white/10 bg-[#1E1F20] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left font-bold text-white flex items-center justify-between gap-4 hover:bg-white/[0.02]"
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-brand shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-20 md:py-28 relative overflow-hidden text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-brand/15 blur-3xl"
        />

        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Start Billing with <span className="hl">KhanaBook Today.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Install the Android app, connect your thermal printer, and manage your menu from the Web
            Dashboard.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <GooglePlayBadge size="md" />
            <a href={BUSINESS.loginUrl} target="_blank" rel="noreferrer noopener">
              <UiVerseGlowingButton variant="white" size="md">
                <Cloud className="h-4 w-4" />
                <span>Web Dashboard Login</span>
              </UiVerseGlowingButton>
            </a>
            <Link to="/get-started">
              <UiVerseGlowingButton variant="brand" size="md">
                <span>Request a Setup Demo →</span>
              </UiVerseGlowingButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
