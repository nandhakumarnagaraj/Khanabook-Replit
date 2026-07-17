import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { DISCLAIMERS, absUrl } from "@/lib/business-config";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "KhanaBook Capabilities and What to Compare" },
      {
        name: "description",
        content:
          "How KhanaBook approaches offline billing, multi-terminal operations, invoice series, KOT printing and payments — and what to check in any other restaurant POS.",
      },
      { property: "og:title", content: "KhanaBook Capabilities and What to Compare" },
      { property: "og:description", content: "KhanaBook's approach and what to check in any other POS." },
      { property: "og:url", content: absUrl("/compare") },
    ],
    links: [{ rel: "canonical", href: absUrl("/compare") }],
  }),
  component: ComparePage,
});

const ROWS: [string, string, string][] = [
  [
    "Offline operation",
    "Local offline billing; completed orders sync when the network returns",
    "Whether billing, KOT and payment recording continue during network outages",
  ],
  [
    "Multi-terminal identity",
    "Each device has a separate terminal identity",
    "How devices and their active drafts are isolated from each other",
  ],
  [
    "Invoice sequence",
    "Terminal-specific invoice series",
    "How the system prevents duplicate or conflicting invoice numbers across devices",
  ],
  [
    "KOT printing",
    "Bluetooth or supported printers with per-item routing",
    "Supported printers, routing options and reprint handling",
  ],
  [
    "Payment recording",
    "Cash, UPI, card and splits recorded on a single bill",
    "How split payments and gateway references are recorded",
  ],
  [
    "Inventory",
    "Included; low-stock alerts tied to menu items",
    "Whether inventory is included, an add-on, or a separate module",
  ],
  [
    "Synchronisation",
    "Automatic background sync with visible sync status",
    "Whether sync is manual, on-demand or automatic, and how status is surfaced",
  ],
  [
    "Hardware",
    "Runs on Android phones and tablets",
    "Whether specific POS hardware is required",
  ],
];

function ComparePage() {
  return (
    <Section
      eyebrow="Compare"
      title={<>KhanaBook's approach — and what to <span className="hl">check elsewhere.</span></>}
      desc="This table describes how KhanaBook approaches each capability, and lists what to verify in any other POS you are considering."
    >
      <div className="overflow-x-auto rounded-2xl border border-border max-w-5xl mx-auto">
        <table className="w-full min-w-[720px]">
          <thead className="bg-surface-soft">
            <tr className="text-left">
              <th className="p-4 font-black">Capability</th>
              <th className="p-4 font-black text-brand">KhanaBook approach</th>
              <th className="p-4 font-black">What to check in another POS</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r[0]} className="border-t border-border align-top">
                <td className="p-4 font-semibold">{r[0]}</td>
                <td className="p-4 text-muted-foreground">{r[1]}</td>
                <td className="p-4 text-muted-foreground">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-8 text-sm text-muted-foreground max-w-3xl mx-auto text-center">
        {DISCLAIMERS.compareDisclaimer}
      </p>
    </Section>
  );
}
