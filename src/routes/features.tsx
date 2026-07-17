import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { absUrl } from "@/lib/business-config";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — KhanaBook Restaurant POS" },
      {
        name: "description",
        content:
          "Billing, KOT management, payments, multi-terminal operations, menu, inventory and reports — built offline-first for Indian restaurants.",
      },
      { property: "og:title", content: "Features — KhanaBook Restaurant POS" },
      { property: "og:description", content: "Everything KhanaBook does for your restaurant." },
      { property: "og:url", content: absUrl("/features") },
    ],
    links: [{ rel: "canonical", href: absUrl("/features") }],
  }),
  component: FeaturesPage,
});


type FeatureItem = { name: string; body: string; status?: "coming-soon" | "beta" | "optional" };

const GROUPS: { title: string; items: FeatureItem[] }[] = [
  {
    title: "Billing & Payments",
    items: [
      { name: "Dine-in, takeaway and online-order workflows", body: "Handle the three most common restaurant order types in one flow." },
      { name: "Cash, UPI, card and split-payment recording", body: "Record each payment mode on a single bill, including splits." },
      { name: "Automatic tax calculation", body: "Tax is computed automatically based on the rates you configure per item." },
      { name: "Receipt printing", body: "Print customer receipts to supported Bluetooth thermal printers." },
      { name: "Integrated payment collection", body: "Direct payment-gateway collection from within the app.", status: "coming-soon" },
    ],
  },
  {
    title: "Multi-Terminal Operations",
    items: [
      { name: "Separate terminal identity", body: "Each device operates as its own terminal with its own settings." },
      { name: "Terminal-specific invoice series", body: "Invoice numbers stay clean and non-conflicting across devices." },
      { name: "Isolated active orders and drafts", body: "Draft and active orders stay on the terminal handling them." },
      { name: "Conflict-safe background synchronisation", body: "Completed business data is safely merged into restaurant-level records." },
      { name: "Restaurant-level reporting", body: "Consolidated reports across all terminals once orders are finalised." },
    ],
  },
  {
    title: "Kitchen Operations",
    items: [
      { name: "KOT generation", body: "Send Kitchen Order Tickets straight from the order screen." },
      { name: "Bluetooth or supported printer routing", body: "Route KOTs to the right printer for each kitchen section." },
      { name: "Multiple KOT printers", body: "Configure more than one printer per restaurant." },
      { name: "KOT updates and reprints", body: "Update, cancel or reprint tickets when the order changes." },
      { name: "Active-order tracking", body: "Keep an eye on open orders in real time." },
    ],
  },
  {
    title: "Offline-First Reliability",
    items: [
      { name: "Billing without continuous internet", body: "Works even when the internet is unstable." },
      { name: "Local database storage", body: "Bills and menus are stored securely on the device." },
      { name: "Automatic synchronisation", body: "Data syncs to the cloud as soon as connectivity returns." },
      { name: "Retry and sync-status handling", body: "Clear indicators so you always know what has and hasn't synced." },
    ],
  },
  {
    title: "Menu & Inventory",
    items: [
      { name: "Categories, items, prices and variants", body: "Structure your menu the way your restaurant works." },
      { name: "Inventory tracking", body: "Track stock levels tied to menu items." },
      { name: "Low-stock alerts", body: "Get notified before you run out." },
      { name: "AI menu import from a photo or PDF", body: "Convert a paper menu into a digital menu automatically.", status: "beta" },
    ],
  },
  {
    title: "Reports & Administration",
    items: [
      { name: "Daily and monthly sales reports", body: "See how the restaurant is performing at a glance." },
      { name: "Payment-mode breakdown", body: "Understand the mix across cash, UPI and card." },
      { name: "Item-level reports", body: "Identify best-selling and slow-moving items." },
      { name: "Terminal-aware reporting", body: "Attribute sales to the terminal that handled them." },
      { name: "Restaurant settings", body: "Tax rates, printer routing, terminal identity and more." },
    ],
  },
  {
    title: "Compliance & Partner Services",
    items: [
      { name: "GST reconciliation and filing support", body: "Reconcile sales data against your GST returns.", status: "optional" },
      { name: "FSSAI and licence assistance", body: "Support with FSSAI and other applicable registrations.", status: "optional" },
      { name: "Marketplace order synchronisation (Zomato / Swiggy)", body: "Bring marketplace orders into the same order screen.", status: "coming-soon" },
      { name: "Accountant web login", body: "Give your accountant read-only access to reports.", status: "coming-soon" },
    ],
  },
];

const STATUS_LABEL: Record<NonNullable<FeatureItem["status"]>, string> = {
  "coming-soon": "Coming soon",
  beta: "Beta",
  optional: "Optional service",
};

function FeaturesPage() {
  return (
    <Section
      eyebrow="Features"
      title={<>Product-accurate <span className="hl">capabilities.</span></>}
      desc="Grouped by how a restaurant actually uses them. Roadmap items are clearly labelled."
    >
      <div className="space-y-14 max-w-5xl mx-auto">
        {GROUPS.map((g) => (
          <div key={g.title}>
            <h2 className="text-2xl font-black mb-6">{g.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {g.items.map((f) => (
                <div key={f.name} className="card-surface">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-black">{f.name}</h3>
                    {f.status && (
                      <span className="shrink-0 rounded-full border border-border bg-surface-soft px-2 py-0.5 text-[11px] font-bold text-muted-foreground">
                        {STATUS_LABEL[f.status]}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link to="/get-started" className="btn-primary">Get KhanaBook</Link>
      </div>
    </Section>
  );
}
