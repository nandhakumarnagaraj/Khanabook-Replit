import { createFileRoute } from "@tanstack/react-router";
import { BUSINESS, absUrl } from "@/lib/business-config";
import { EntranceReveal } from "@/components/motion/EntranceReveal";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — KhanaBook Restaurant POS" },
      {
        name: "description",
        content: `Terms and Conditions for KhanaBook offline-first restaurant POS, a product of ${BUSINESS.legalName}.`,
      },
      { property: "og:url", content: absUrl("/terms-and-conditions") },
    ],
    links: [{ rel: "canonical", href: absUrl("/terms-and-conditions") }],
  }),
  component: Terms,
});

const SECTIONS = [
  [
    "Eligibility",
    "You must be legally competent to enter into a contract and operate a food and beverage business in India to use KhanaBook.",
  ],
  [
    "Account Responsibility",
    "You are responsible for maintaining the confidentiality of your account credentials and for all billing activity under your account.",
  ],
  [
    "Restaurant Data Ownership",
    "You retain complete ownership of all restaurant data, menus, customer records, and bills created inside KhanaBook.",
  ],
  [
    "Billing and Tax Responsibility",
    "You are solely responsible for configuring accurate tax rates (GST, VAT, Service Charge) and filing statutory returns for your restaurant.",
  ],
  [
    "Offline Operation & Data Sync",
    "KhanaBook is designed to support core counter billing, menu access, and dual thermal KOT printing during temporary connectivity interruptions. Cloud synchronisation to the Web Dashboard requires periodic internet access.",
  ],
  [
    "Supported Hardware",
    "KhanaBook operates on supported Android phones and tablets (Android 8.0+) and connects with up to two standard ESC/POS USB, Wi-Fi, or Bluetooth thermal printers.",
  ],
  [
    "Third-Party Services",
    "Optional third-party integrations and services are subject to the third party's respective terms and conditions.",
  ],
  [
    "Payment Mode Recording",
    "KhanaBook records payment modes (Cash, UPI QR, Card, Split) and reference identifiers. Direct integrated in-app bank settlement is currently under development.",
  ],
  [
    "Acceptable Use",
    "You agree not to reverse engineer, disrupt, or utilize the software for unlawful restaurant billing practices.",
  ],
  [
    "Intellectual Property",
    `All KhanaBook software, logos, trademarks, and design systems are the intellectual property of ${BUSINESS.legalName}.`,
  ],
  [
    "Limitation of Liability",
    "To the maximum extent permitted by applicable Indian law, liability is governed by these terms.",
  ],
  [
    "Governing Law & Jurisdiction",
    `These terms are governed by the laws of India. Courts at ${BUSINESS.governingLawCity} will have exclusive jurisdiction over any disputes.`,
  ],
];

function Terms() {
  return (
    <div className="bg-[#131314] text-white min-h-screen font-['Google_Sans',_sans-serif] selection:bg-brand/30 selection:text-white">
      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10">
          <EntranceReveal direction="up" delay={0.05}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1E1F20] px-4 py-1.5 text-xs font-semibold text-gray-300 shadow-sm mb-4">
              STATUTORY AGREEMENT
            </div>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.15}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Terms & <span className="hl">Conditions.</span>
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
              These Terms and Conditions govern the use of the KhanaBook offline-first restaurant
              POS Android app and Cloud Web Dashboard provided by{" "}
              <strong className="text-white">{BUSINESS.legalName}</strong>.
            </p>

            <div className="space-y-4">
              {SECTIONS.map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6">
                  <h2 className="text-base sm:text-lg font-bold text-white mb-2">{title}</h2>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
