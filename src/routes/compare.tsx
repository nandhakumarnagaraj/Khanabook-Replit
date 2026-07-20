import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/site/Section";
import { DISCLAIMERS, absUrl } from "@/lib/business-config";
import { COMPARE_ROWS } from "@/lib/compare-data";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "KhanaBook Capabilities and What to Compare" },
      {
        name: "description",
        content:
          "How KhanaBook approaches offline billing, terminal management, invoice series, KOT printing and payment recording — and what to check in any other restaurant POS.",
      },
      { property: "og:title", content: "KhanaBook Capabilities and What to Compare" },
      { property: "og:description", content: "KhanaBook's approach and what to check in any other POS." },
      { property: "og:url", content: absUrl("/compare") },
    ],
    links: [{ rel: "canonical", href: absUrl("/compare") }],
  }),
  component: ComparePage,
});

function ComparePage() {
  return (
    <Section
      eyebrow="Compare"
      title={<>KhanaBook's approach — and what to <span className="hl">check elsewhere.</span></>}
      desc="This table describes how KhanaBook approaches each capability, and lists what to verify in any other POS you are considering."
    >
      <div className="overflow-x-auto rounded-2xl border border-border shadow-sm max-w-5xl mx-auto">
        <table className="w-full min-w-[720px]">
          <thead className="bg-surface-soft">
            <tr className="text-left">
              <th className="p-4 font-black">Capability</th>
              <th className="p-4 font-black text-brand">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 aria-hidden className="h-4 w-4" />
                  KhanaBook approach
                </span>
              </th>
              <th className="p-4 font-black">What to check in another POS</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((r) => (
              <tr key={r[0]} className="border-t border-border align-top transition-colors hover:bg-surface-soft/60">
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
