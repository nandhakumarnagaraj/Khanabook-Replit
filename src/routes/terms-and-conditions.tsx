import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { BUSINESS, absUrl } from "@/lib/business-config";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — KhanaBook" },
      { name: "description", content: `Terms and Conditions for KhanaBook, a product of ${BUSINESS.legalName}.` },
      { property: "og:url", content: absUrl("/terms-and-conditions") },
    ],
    links: [{ rel: "canonical", href: absUrl("/terms-and-conditions") }],
  }),
  component: Terms,
});


const SECTIONS = [
  ["Eligibility", "You must be legally competent to enter into a contract and operate a restaurant business in India to use KhanaBook."],
  ["Account responsibility", "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account."],
  ["Restaurant data", "You retain ownership of the restaurant data you enter into KhanaBook."],
  ["Billing and tax responsibility", "You are responsible for the accuracy of the bills, tax rates and returns filed by your restaurant."],
  ["Offline operation", "KhanaBook is designed to work offline. Some features require an active internet connection."],
  ["Synchronisation", "Data is synchronised to our cloud when connectivity is available."],
  ["Supported hardware", "KhanaBook runs on Android phones and tablets and integrates with supported Bluetooth thermal printers."],
  ["Third-party services", "Some features rely on third-party services. Your use of those services is subject to the third party's own terms."],
  ["Payment gateways", "Digital payments are processed through the applicable payment gateway. Gateway charges may apply."],
  ["Marketplace integrations", "Integrations with marketplaces such as Zomato and Swiggy, where available, are subject to activation and marketplace terms."],
  ["Acceptable use", "You will not misuse the service, attempt to reverse engineer it, or use it for unlawful activity."],
  ["Intellectual property", `All KhanaBook software and content is owned by ${BUSINESS.legalName} or its licensors.`],
  ["Service availability", "We do our best to keep the service available but do not guarantee uninterrupted operation."],
  ["Limitation of liability", "To the maximum extent permitted by law, our liability is limited to the fees paid by you in the twelve months preceding the claim."],
  ["Termination", "We may suspend or terminate access for material breach of these terms."],
  ["Governing law", "These terms are governed by the laws of India."],
  ["Jurisdiction", `Courts at ${BUSINESS.governingLawCity} will have exclusive jurisdiction over any disputes.`],
];

function Terms() {
  return (
    <Section eyebrow="Legal" title={<>Terms & <span className="hl">Conditions.</span></>}>
      <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
        <p>
          These Terms and Conditions govern the use of the KhanaBook restaurant POS product provided by <strong className="text-foreground">{BUSINESS.legalName}</strong>.
        </p>
        <p><em>Effective date: {BUSINESS.effectiveDate}. Last updated: {BUSINESS.lastUpdatedDate}.</em></p>
        {SECTIONS.map(([title, body]) => (
          <div key={title}>
            <h2 className="text-lg font-black text-foreground mb-2">{title}</h2>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
