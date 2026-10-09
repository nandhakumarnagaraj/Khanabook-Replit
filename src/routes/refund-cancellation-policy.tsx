import { createFileRoute } from "@tanstack/react-router";
import { BUSINESS, absUrl } from "@/lib/business-config";
import { EntranceReveal } from "@/components/motion/EntranceReveal";

export const Route = createFileRoute("/refund-cancellation-policy")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy — KhanaBook Restaurant POS" },
      {
        name: "description",
        content: `Refund and Cancellation Policy for KhanaBook offline-first restaurant POS, a product of ${BUSINESS.legalName}.`,
      },
      { property: "og:url", content: absUrl("/refund-cancellation-policy") },
    ],
    links: [{ rel: "canonical", href: absUrl("/refund-cancellation-policy") }],
  }),
  component: Refund,
});

function Refund() {
  return (
    <div className="bg-[#131314] text-white min-h-screen font-['Google_Sans',_sans-serif] selection:bg-brand/30 selection:text-white">
      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10">
          <EntranceReveal direction="up" delay={0.05}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1E1F20] px-4 py-1.5 text-xs font-semibold text-gray-300 shadow-sm mb-4">
              COMMERCIAL POLICIES
            </div>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.15}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Refund & Cancellation <span className="hl">Policy.</span>
            </h1>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.25}>
            <p className="mt-4 text-sm text-gray-400">
              Effective date: {BUSINESS.effectiveDate} · Last updated: {BUSINESS.lastUpdatedDate}
            </p>
          </EntranceReveal>
        </div>
      </section>

      {/* 2. BODY CONTENT */}
      <section className="py-12 md:py-16">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="max-w-4xl space-y-6 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p className="text-gray-400">
              This policy explains how refunds and cancellations are handled for KhanaBook, a
              product of <strong className="text-white">{BUSINESS.legalName}</strong>.
            </p>

            <div className="space-y-4">
              <Item title="KhanaBook Software Charges">
                KhanaBook software currently has ₹0 subscription fee, so there is no software
                subscription payment to cancel or refund. If paid plans are introduced in the
                future, clear cancellation and refund terms will be published prior to charges
                taking effect.
              </Item>

              <Item title="Payments Recorded in KhanaBook">
                KhanaBook records payment modes (Cash, UPI QR, Card, Split) and reference IDs
                entered by the cashier; it does not process or settle payments through an integrated
                in-app banking gateway. Any transaction between the restaurant and a diner remains
                between the diner, the restaurant, and their payment provider.
              </Item>

              <Item title="Restaurant Diner Refunds">
                Restaurants retain full discretion over customer refunds and bill cancellations.
                Settlement reversals are handled directly through the merchant&apos;s UPI or card
                machine provider.
              </Item>

              <Item title="Optional Compliance or Professional Services">
                Fees for optional compliance or professional services offered through{" "}
                {BUSINESS.siblingPlatform} are governed by the specific written service agreement
                accepted for that engagement.
              </Item>

              <Item title="Third-Party Hardware & Printers">
                KhanaBook does not sell proprietary hardware. Android smartphones, tablets, and
                thermal ESC/POS printers purchased from third-party vendors or marketplaces are
                governed by the respective seller&apos;s return and warranty policies.
              </Item>

              <Item title="Billing Queries & Support Contact">
                For questions regarding any charge made directly by {BUSINESS.legalName}, contact us
                at{" "}
                <a href={`mailto:${BUSINESS.supportEmail}`} className="text-brand underline">
                  {BUSINESS.supportEmail}
                </a>{" "}
                with your transaction details.
              </Item>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Item({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6">
      <h2 className="text-base sm:text-lg font-bold text-white mb-2">{title}</h2>
      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{children}</p>
    </div>
  );
}
