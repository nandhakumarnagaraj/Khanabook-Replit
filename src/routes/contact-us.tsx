import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { BUSINESS, absUrl } from "@/lib/business-config";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us — KhanaBook" },
      { name: "description", content: `Contact ${BUSINESS.legalName}, the company that develops and operates KhanaBook.` },
      { property: "og:url", content: absUrl("/contact-us") },
    ],
    links: [{ rel: "canonical", href: absUrl("/contact-us") }],
  }),
  component: ContactUs,
});


function ContactUs() {
  return (
    <Section eyebrow="Contact" title={<>Contact <span className="hl">Us.</span></>}>
      <div className="max-w-2xl mx-auto card-surface space-y-4 text-muted-foreground">
        <Row label="Legal company" value={BUSINESS.legalName} />
        <Row label="Product" value={BUSINESS.productName} />
        <Row label="Registered office" value={BUSINESS.registeredAddress} />
        <Row label="Support email" value={BUSINESS.supportEmail} />
        <Row label="Support phone" value={BUSINESS.supportPhone} />
        <Row label="Working hours" value={BUSINESS.workingHours} />
        <Row label="Grievance officer" value={BUSINESS.grievanceOfficer} />
        <Row label="CIN" value={BUSINESS.cin} />
      </div>
    </Section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-2 border-b border-border pb-3 last:border-0">
      <span className="font-bold text-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
