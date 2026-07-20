import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X, HelpCircle } from "lucide-react";
import { Section } from "@/components/site/Section";
import { FAQ } from "@/components/site/FAQ";
import { BUSINESS, absUrl } from "@/lib/business-config";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — KhanaBook Restaurant POS" },
      {
        name: "description",
        content:
          "KhanaBook currently has no software subscription fee. See what's included, terminal limits, and what costs extra.",
      },
      { property: "og:title", content: "KhanaBook Pricing — Transparent and Simple" },
      {
        property: "og:description",
        content: "No software subscription. See exactly what you get and what costs extra.",
      },
      { property: "og:url", content: absUrl("/pricing") },
    ],
    links: [{ rel: "canonical", href: absUrl("/pricing") }],
  }),
  component: PricingPage,
});

const INCLUDED = [
  "Dine-in, takeaway and manual online-order recording",
  "Pay-before and pay-after service workflows",
  "Cash, UPI, card and split-payment recording",
  "PDF invoice creation and WhatsApp/SMS sharing",
  "KOT and receipt printing with up to two compatible Bluetooth thermal printers",
  "Up to 5 approved Android terminals per restaurant",
  "Terminal-specific invoice series and daily order counters",
  "Menu management with categories, items and variants",
  "Inventory tracking and low-stock alerts",
  "Daily, monthly, payment-mode and item-level reports",
  "Supported PDF and CSV report exports",
  "Accountant web login for supported reports",
  "Offline-first operation with visible synchronisation status",
  "Staff access controls",
];

const NOT_INCLUDED = [
  {
    item: "Integrated payment-gateway processing or verification",
    note: "Not currently available — payments are recorded in KhanaBook",
  },
  { item: "Automated Zomato / Swiggy order ingestion", note: "Not currently generally available" },
  { item: "Customer storefront / QR ordering", note: "Not currently generally available" },
];

const EXTRA_COSTS = [
  {
    title: "Supported Android device",
    desc: "Use a compatible Android phone or tablet you already own, or purchase one from a third party. Confirm compatibility before purchasing hardware.",
    price: "Third-party cost",
  },
  {
    title: "Compatible Bluetooth thermal printer",
    desc: "Optional. KhanaBook supports up to two compatible printers: one for customer receipts and one for KOTs. We don't sell hardware directly.",
    price: "Third-party cost",
  },
  {
    title: "Payment-provider charges",
    desc: "KhanaBook does not currently process payments through an integrated gateway. Your bank, UPI, card or other payment provider may apply its own charges under its terms.",
    price: "Provider terms",
  },
  {
    title: "Optional compliance services",
    desc: `GST filing support, FSSAI registration and other services offered through ${BUSINESS.siblingPlatform} are separate engagements.`,
    price: "Quoted separately",
  },
];

const PRICING_FAQS = [
  {
    q: "Will KhanaBook always be free?",
    a: "We cannot guarantee that. KhanaBook currently has no software subscription fee. If pricing changes, the applicable price and terms will be communicated before new charges apply.",
  },
  {
    q: "Is there a limit on bills or menu items?",
    a: "KhanaBook does not currently publish a per-day bill cap or a menu-item cap. Practical capacity can depend on the supported device, app version and restaurant configuration. Up to five approved terminals can be used per restaurant.",
  },
  {
    q: "Do I need to buy hardware from you?",
    a: "No. Use a supported Android phone or tablet. If you need printing, confirm compatibility before buying up to two Bluetooth thermal printers—one for customer receipts and one for KOTs. KhanaBook does not sell hardware directly.",
  },
  {
    q: "Does KhanaBook charge payment-gateway fees?",
    a: "KhanaBook currently records payment modes and references; it does not process or verify payments through an integrated gateway. A bank, UPI app, card provider or other service used outside KhanaBook may apply its own fees.",
  },
  {
    q: "What costs should I consider?",
    a: "The KhanaBook software subscription is currently ₹0. Third-party Android devices, compatible printers, communications or payment services, and optional professional services may have separate costs under their providers' terms.",
  },
  {
    q: "Can I use more than 5 terminals?",
    a: "The current limit is five approved Android terminals per restaurant. Contact us if your operation requires a different setup.",
  },
];

function PricingPage() {
  return (
    <>
      {/* HERO */}
      <Section
        eyebrow="Pricing"
        title={
          <>
            Simple, transparent <span className="hl">pricing.</span>
          </>
        }
        desc="The KhanaBook software subscription is currently ₹0. Supported hardware, communications, payment services and optional professional services may have separate costs."
      >
        {/* Main pricing card */}
        <div className="max-w-lg mx-auto">
          <div className="rounded-3xl border-2 border-brand bg-surface p-8 md:p-10 text-center shadow-2xl relative overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-5"
              style={{
                background: "radial-gradient(circle at 50% 0%, var(--brand), transparent 60%)",
              }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand mb-4">
                Current plan
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-6xl md:text-7xl font-black">₹0</span>
                <span className="text-muted-foreground font-bold">/month</span>
              </div>
              <p className="mt-3 text-muted-foreground">No software subscription fee — for now.</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Pricing may change in the future. We'll give advance notice.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <Link to="/get-started" className="btn-primary justify-center w-full">
                  Get KhanaBook
                </Link>
                <a
                  href={BUSINESS.playStoreUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-secondary justify-center w-full"
                >
                  Download from Play Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* WHAT'S INCLUDED */}
      <section className="bg-surface-soft py-24">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="eyebrow mb-3">What's included</div>
            <h2 className="text-3xl md:text-5xl font-black">
              Included in the <span className="hl">current software access.</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              These capabilities are currently available without a KhanaBook software subscription
              fee, subject to supported devices and configuration.
            </p>
          </div>

          <div className="max-w-2xl mx-auto card-surface">
            <ul className="space-y-4">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check aria-hidden className="h-5 w-5 mt-0.5 text-green-600 shrink-0" />
                  <span className="font-semibold">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-2xl mx-auto mt-8 card-surface">
            <h3 className="font-black text-lg mb-4 flex items-center gap-2">
              <HelpCircle aria-hidden className="h-5 w-5 text-muted-foreground" />
              Not yet available
            </h3>
            <ul className="space-y-4">
              {NOT_INCLUDED.map((row) => (
                <li key={row.item} className="flex items-start gap-3">
                  <X aria-hidden className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <span className="font-semibold">{row.item}</span>
                    <p className="text-sm text-muted-foreground mt-0.5">{row.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* EXTRA COSTS */}
      <Section
        eyebrow="Other costs"
        title={
          <>
            What might cost <span className="hl">extra.</span>
          </>
        }
        desc="These are not KhanaBook charges — they're third-party costs you should budget for."
      >
        <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
          {EXTRA_COSTS.map((item) => (
            <div key={item.title} className="card-surface">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-black">{item.title}</h3>
                <span className="shrink-0 rounded-full border border-border bg-surface-soft px-3 py-1 text-xs font-bold text-muted-foreground whitespace-nowrap">
                  {item.price}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* LIMITS */}
      <section className="bg-surface-soft py-24">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="eyebrow mb-3">Current limits</div>
            <h2 className="text-3xl md:text-5xl font-black">
              What you should <span className="hl">know.</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto overflow-x-auto rounded-2xl border border-border">
            <table className="w-full">
              <thead className="bg-surface">
                <tr className="text-left">
                  <th className="p-4 font-black">Limit</th>
                  <th className="p-4 font-black">Current value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-4 font-semibold">Terminals per restaurant</td>
                  <td className="p-4 text-muted-foreground">
                    Up to 5 approved supported Android devices
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4 font-semibold">Bills / orders per day</td>
                  <td className="p-4 text-muted-foreground">
                    No published application cap; practical capacity depends on device and
                    configuration
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4 font-semibold">Menu items</td>
                  <td className="p-4 text-muted-foreground">
                    No published application cap; practical capacity depends on device and
                    configuration
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4 font-semibold">Staff access</td>
                  <td className="p-4 text-muted-foreground">
                    Depends on the restaurant account and available role configuration
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4 font-semibold">Data retention</td>
                  <td className="p-4 text-muted-foreground">
                    Described in the Privacy Policy; legal, security and backup requirements may
                    apply
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4 font-semibold">Platform</td>
                  <td className="p-4 text-muted-foreground">
                    Supported Android devices (no iOS or web POS)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Section
        eyebrow="Pricing FAQ"
        title={
          <>
            Common <span className="hl">questions.</span>
          </>
        }
      >
        <div id="pricing-faq">
          <FAQ items={PRICING_FAQS} />
        </div>
      </Section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-page">
          <div className="rounded-3xl bg-foreground text-background p-10 md:p-16 text-center relative overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{
                background: "radial-gradient(circle at 30% 30%, var(--brand), transparent 60%)",
              }}
            />
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-black">
                No software subscription <span className="hl">today.</span>
              </h2>
              <p className="mt-4 text-background/70 max-w-xl mx-auto">
                Install KhanaBook on a supported Android device and start setting up your
                restaurant. Current software pricing and separate third-party costs are described
                above.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/get-started" className="btn-primary">
                  Get KhanaBook
                </Link>
                <Link to="/features" className="btn-secondary">
                  See All Features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
