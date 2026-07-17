import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { BUSINESS, absUrl } from "@/lib/business-config";

export const Route = createFileRoute("/refund-cancellation-policy")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy — KhanaBook" },
      { name: "description", content: `Refund and Cancellation Policy for KhanaBook, a product of ${BUSINESS.legalName}.` },
      { property: "og:url", content: absUrl("/refund-cancellation-policy") },
    ],
    links: [{ rel: "canonical", href: absUrl("/refund-cancellation-policy") }],
  }),
  component: Refund,
});


function Refund() {
  return (
    <Section eyebrow="Legal" title={<>Refund & Cancellation <span className="hl">Policy.</span></>}>
      <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
        <p>
          This policy explains how refunds and cancellations are handled for KhanaBook, a product of <strong className="text-foreground">{BUSINESS.legalName}</strong>.
        </p>
        <p><em>Effective date: {BUSINESS.effectiveDate}. Last updated: {BUSINESS.lastUpdatedDate}.</em></p>

        <Item title="KhanaBook software subscription charges">
          KhanaBook software is currently available without a subscription fee. If paid plans are introduced in the future, refund terms for those plans will be published before charges begin.
        </Item>
        <Item title="Payment gateway transaction charges">
          Transaction charges levied by the payment gateway on digital payments are governed by the gateway's own terms and are not refundable by us.
        </Item>
        <Item title="Optional compliance or professional services">
          Fees for optional compliance or professional services offered through {BUSINESS.siblingPlatform} are subject to the service agreement signed at the time of engagement.
        </Item>
        <Item title="Hardware purchases">
          Hardware such as tablets and printers, when purchased through a partner, is subject to the partner's return and warranty policy.
        </Item>
        <Item title="Duplicate or failed transactions">
          Duplicate or failed transactions initiated through the payment gateway are refunded per the gateway's timelines. Please contact us with the transaction reference for assistance.
        </Item>
        <Item title="Merchant and customer refunds">
          Refunds initiated by a restaurant to its customer are the restaurant's responsibility and follow the payment gateway's refund workflow.
        </Item>
        <Item title="Refund timelines">
          Refund timelines depend on the payment method and the payment gateway. Exact timelines will be shared at the time of the refund request. [TIMELINES_TO_BE_CONFIRMED]
        </Item>
      </div>
    </Section>
  );
}

function Item({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-black text-foreground mb-2">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
