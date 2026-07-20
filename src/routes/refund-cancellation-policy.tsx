import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { BUSINESS, absUrl } from "@/lib/business-config";

export const Route = createFileRoute("/refund-cancellation-policy")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy — KhanaBook" },
      {
        name: "description",
        content: `Refund and Cancellation Policy for KhanaBook, a product of ${BUSINESS.legalName}.`,
      },
      { property: "og:url", content: absUrl("/refund-cancellation-policy") },
    ],
    links: [{ rel: "canonical", href: absUrl("/refund-cancellation-policy") }],
  }),
  component: Refund,
});

function Refund() {
  return (
    <Section
      eyebrow="Legal"
      title={
        <>
          Refund & Cancellation <span className="hl">Policy.</span>
        </>
      }
    >
      <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
        <p>
          This policy explains how refunds and cancellations are handled for KhanaBook, a product of{" "}
          <strong className="text-foreground">{BUSINESS.legalName}</strong>.
        </p>
        <p>
          <em>
            Effective date: {BUSINESS.effectiveDate}. Last updated: {BUSINESS.lastUpdatedDate}.
          </em>
        </p>

        <Item title="KhanaBook software charges">
          KhanaBook software currently has no subscription fee, so there is no software subscription
          payment to cancel or refund. If paid plans are introduced, their cancellation and refund
          terms will be published before charges begin.
        </Item>
        <Item title="Payments recorded in KhanaBook">
          KhanaBook currently records payment modes and references entered by the restaurant; it
          does not process or verify payments through an integrated payment gateway. A payment made
          by a restaurant customer remains between the customer, the restaurant, and the payment
          provider used outside KhanaBook.
        </Item>
        <Item title="Restaurant customer refunds">
          Restaurants are responsible for deciding and issuing refunds to their customers. The
          applicable bank, UPI app, card provider, or other payment service determines its own
          process, fees, and timelines.
        </Item>
        <Item title="Optional compliance or professional services">
          Fees for optional compliance or professional services offered through{" "}
          {BUSINESS.siblingPlatform} are governed by the written service agreement accepted for that
          engagement.
        </Item>
        <Item title="Third-party hardware">
          KhanaBook does not sell hardware directly. Android devices and printers bought from third
          parties are governed by the seller's return, replacement, and warranty policies.
        </Item>
        <Item title="Contact">
          For a question about a charge made directly by {BUSINESS.legalName}, contact us at{" "}
          {BUSINESS.supportEmail} with the relevant invoice or transaction details.
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
