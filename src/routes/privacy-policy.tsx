import { createFileRoute } from "@tanstack/react-router";
import { BUSINESS, DISCLAIMERS, absUrl } from "@/lib/business-config";
import { EntranceReveal } from "@/components/motion/EntranceReveal";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — KhanaBook Restaurant POS" },
      {
        name: "description",
        content: `Privacy Policy for KhanaBook offline-first restaurant POS, a product of ${BUSINESS.legalName}.`,
      },
      { property: "og:url", content: absUrl("/privacy-policy") },
    ],
    links: [{ rel: "canonical", href: absUrl("/privacy-policy") }],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="bg-[#131314] text-white min-h-screen font-['Google_Sans',_sans-serif] selection:bg-brand/30 selection:text-white">
      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10">
          <EntranceReveal direction="up" delay={0.05}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1E1F20] px-4 py-1.5 text-xs font-semibold text-gray-300 shadow-sm mb-4">
              LEGAL & PRIVACY POLICIES
            </div>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.15}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Privacy <span className="hl">Policy.</span>
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
          <div className="max-w-4xl space-y-8 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p className="text-gray-400">
              This Privacy Policy describes how{" "}
              <strong className="text-white">{BUSINESS.legalName}</strong> (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;) handles personal information in relation to the KhanaBook
              offline-first restaurant POS Android app and Cloud Web Dashboard.
            </p>

            <div className="space-y-6">
              <Block title="Data We Collect">
                We collect restaurant account information such as business name, phone number, email
                address and staff login details; customer order records entered by the restaurant
                (e.g. table number, bill details); bills, invoices, menu items, inventory logs and
                payment mode references (cash, UPI, card, split); and diagnostic device information
                needed to ensure offline sync integrity.
              </Block>

              <Block title="Local Device Storage and Offline Use">
                KhanaBook stores operational billing and order records locally on the Android device
                using SQLite WAL mode so billing, menu access, and dual thermal KOT printing
                continue uninterrupted during network failures. Authorized device users have access
                to data corresponding to their assigned roles.
              </Block>

              <Block title="Cloud Synchronisation">
                When connectivity is available, completed records are synchronized to our cloud
                infrastructure for encrypted backup, account administration, and restaurant-wide
                consolidated reporting across approved terminals and the Web Dashboard.
              </Block>

              <Block title="Menu Photo Import">
                When using the on-device menu photo import feature, image text recognition is
                performed securely to recommend item names and rates. The restaurant operator
                reviews all extracted items before confirming.
              </Block>

              <Block title="Invoice Sharing and Exports">
                When sharing PDF bills via WhatsApp or SMS, recipient numbers and message content
                are handled through the installed communication application under its respective
                privacy terms. Exported CSV and Excel reports are fully controlled by the restaurant
                administrator.
              </Block>

              <Block title="Payment Data">
                KhanaBook records payment modes and reference notes entered by the cashier. It does
                not process cardholder PINs or sensitive banking credentials directly.
              </Block>

              <Block title="Data Retention & Security">
                Data is retained while the restaurant account remains active and thereafter as
                required by statutory, tax, or legal retention requirements. {DISCLAIMERS.security}
              </Block>

              <Block title="Privacy & Grievance Contact">
                Grievance Officer: {BUSINESS.grievanceOfficer}. Support Email:{" "}
                <a href={`mailto:${BUSINESS.supportEmail}`} className="text-brand underline">
                  {BUSINESS.supportEmail}
                </a>
                . Registered Address: {BUSINESS.registeredAddress}.
              </Block>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6 sm:p-7">
      <h2 className="text-base sm:text-lg font-bold text-white mb-2">{title}</h2>
      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{children}</p>
    </div>
  );
}
