import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ReceiptText,
  Layers,
  Printer,
  WifiOff,
  UtensilsCrossed,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { Section } from "@/components/site/Section";
import { absUrl } from "@/lib/business-config";
import { FEATURE_GROUPS, STATUS_LABEL } from "@/lib/features-data";

const GROUP_ICONS: Record<string, typeof ReceiptText> = {
  "billing-payments": ReceiptText,
  "multi-terminal": Layers,
  kitchen: Printer,
  "offline-first": WifiOff,
  "menu-inventory": UtensilsCrossed,
  reports: BarChart3,
  compliance: ShieldCheck,
};

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — KhanaBook Restaurant POS" },
      {
        name: "description",
        content:
          "Billing, KOT management, payment recording, up to five terminals, menu, inventory and reports — built offline-first for Indian restaurants.",
      },
      { property: "og:title", content: "Features — KhanaBook Restaurant POS" },
      { property: "og:description", content: "Everything KhanaBook does for your restaurant." },
      { property: "og:url", content: absUrl("/features") },
    ],
    links: [{ rel: "canonical", href: absUrl("/features") }],
  }),
  component: FeaturesPage,
});


function FeaturesPage() {
  return (
    <Section
      eyebrow="Features"
      title={<>Product-accurate <span className="hl">capabilities.</span></>}
      desc="Grouped by how a restaurant actually uses them. Roadmap items are clearly labelled."
    >
      <div className="space-y-14 max-w-5xl mx-auto">
        {FEATURE_GROUPS.map((g) => {
          const Icon = GROUP_ICONS[g.id] ?? ReceiptText;
          return (
            <div key={g.title} id={g.id} className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <span className="icon-badge h-11 w-11">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <h2 className="text-2xl font-black">{g.title}</h2>
              </div>
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
          );
        })}
      </div>

      <div className="text-center mt-16">
        <Link to="/get-started" className="btn-primary">Get KhanaBook</Link>
      </div>
    </Section>
  );
}
