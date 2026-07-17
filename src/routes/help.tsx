import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { FAQ } from "@/components/site/FAQ";
import { BUSINESS, absUrl } from "@/lib/business-config";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center — KhanaBook" },
      { name: "description", content: "Answers to common questions about setting up and running KhanaBook." },
      { property: "og:title", content: "KhanaBook Help Center" },
      { property: "og:description", content: "Setup guides and troubleshooting for the KhanaBook POS." },
      { property: "og:url", content: absUrl("/help") },
    ],
    links: [{ rel: "canonical", href: absUrl("/help") }],
  }),
  component: HelpPage,
});


const FAQS = [
  { q: "How do I install KhanaBook?", a: "Download the Android app from Google Play, open it and follow the guided setup to create your restaurant account." },
  { q: "How do I connect a Bluetooth printer?", a: "In Settings → Printers, pair a supported Bluetooth thermal printer and print a test receipt." },
  { q: "Can multiple staff use the same account?", a: "Yes. Create staff roles in Settings → Team and assign secure logins." },
  { q: "Where is my data stored?", a: "Records are stored on the device to allow offline operation and are synchronised to our cloud when connectivity is available." },
  { q: "How do I export bills for my accountant?", a: "From Reports, export sales data in the supported format. Broader accountant access is on the roadmap." },
  { q: "How do I contact support?", a: `Email ${BUSINESS.supportEmail} or call ${BUSINESS.supportPhone} during ${BUSINESS.workingHours}.` },
];

function HelpPage() {
  return (
    <Section
      eyebrow="Help Center"
      title={<>We're here to <span className="hl">help.</span></>}
      desc="Common questions from restaurant owners setting up KhanaBook."
    >
      <FAQ items={FAQS} />
    </Section>
  );
}
