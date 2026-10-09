import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MessageSquare,
  Building,
  Clock,
  ShieldCheck,
  ExternalLink,
  Download,
  Cloud,
  ArrowRight,
} from "lucide-react";
import { BUSINESS, absUrl } from "@/lib/business-config";
import { EntranceReveal } from "@/components/motion/EntranceReveal";
import { UiVerseBadge, UiVerseGlowingButton } from "@/components/uiverse";
import { PlayStoreIcon } from "@/components/icons/PlayStoreIcon";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: `Contact Us — ${BUSINESS.productName} Support & Offices` },
      {
        name: "description",
        content: `Contact ${BUSINESS.legalName}, the creators of ${BUSINESS.productName} offline-first restaurant POS. Phone, WhatsApp, email, and corporate office details.`,
      },
      { property: "og:title", content: `Contact Us — ${BUSINESS.productName}` },
      { property: "og:url", content: absUrl("/contact-us") },
    ],
    links: [{ rel: "canonical", href: absUrl("/contact-us") }],
  }),
  component: ContactUsPage,
});

function ContactUsPage() {
  const whatsappNumber = BUSINESS.supportPhone.replace(/[^0-9]/g, "");

  return (
    <div className="bg-[#131314] text-white min-h-screen font-['Google_Sans',_sans-serif] selection:bg-brand/30 selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20 border-b border-[#28292A]">
        {/* Subtle Ambient Light */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-brand/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10 text-center">
          <EntranceReveal direction="up" delay={0.05}>
            <UiVerseBadge pulseColor="emerald">DIRECT SUPPORT &amp; OFFICE CONTACT</UiVerseBadge>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.15}>
            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              We&apos;re Here to Help Your <br className="hidden sm:inline" />
              <span className="hl">Restaurant Succeed.</span>
            </h1>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.25}>
            <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Reach out directly for Android app onboarding, printer compatibility checks,
              multi-terminal setups, or Web Dashboard access.
            </p>
          </EntranceReveal>
        </div>
      </section>

      {/* 2. CONTACT BENTO CHANNELS */}
      <section className="py-16 md:py-24 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6 sm:p-8 flex flex-col justify-between hover:border-brand/30 transition-all">
              <div>
                <div className="h-12 w-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-white">Call Support</h2>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Speak directly with our technical deployment and customer success team.
                </p>
                <div className="mt-4 text-base font-bold text-white">{BUSINESS.supportPhone}</div>
                <div className="mt-1 text-xs text-gray-300 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {BUSINESS.workingHours}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href={`tel:${BUSINESS.supportPhone}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand hover:underline"
                >
                  Dial Now <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-all">
              <div>
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-white">WhatsApp Chat</h2>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Instant chat for quick questions, printer setup verification, and screenshots.
                </p>
                <div className="mt-4 text-base font-bold text-emerald-400">
                  Quick Mobile Response
                </div>
                <div className="mt-1 text-xs text-gray-300">Mon - Sat active chat support</div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:underline"
                >
                  Chat on WhatsApp <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6 sm:p-8 flex flex-col justify-between hover:border-blue-500/30 transition-all">
              <div>
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-white">Email Inquiries</h2>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  For multi-outlet franchises, enterprise deployments, and legal or tax matters.
                </p>
                <div className="mt-4 text-sm font-bold text-white break-all">
                  {BUSINESS.supportEmail}
                </div>
                <div className="mt-1 text-xs text-gray-300">Average response within 4 hours</div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href={`mailto:${BUSINESS.supportEmail}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:underline"
                >
                  Send an Email <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORPORATE & STATUTORY INFORMATION */}
      <section className="py-16 md:py-24 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Building className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Registered Corporate Office</h2>
                <p className="text-xs text-gray-400">Statutory and legal address</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6 sm:p-8 space-y-4 text-sm">
              <div className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3">
                <span className="font-bold text-white">Operating Company:</span>
                <span className="text-gray-300">{BUSINESS.legalName}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3">
                <span className="font-bold text-white">Corporate Identity Number (CIN):</span>
                <span className="text-gray-300 font-mono">{BUSINESS.cin}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3">
                <span className="font-bold text-white">Registered Office:</span>
                <span className="text-gray-300 text-right">{BUSINESS.registeredAddress}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3">
                <span className="font-bold text-white">Grievance Officer:</span>
                <span className="text-gray-300">{BUSINESS.grievanceOfficer}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <span className="font-bold text-white">Web Dashboard:</span>
                <a
                  href={BUSINESS.loginUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-blue-400 hover:underline flex items-center gap-1"
                >
                  Open Web Dashboard <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-20 md:py-28 text-center">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Try <span className="hl">KhanaBook?</span>
          </h2>
          <p className="mt-4 text-base text-gray-400 max-w-xl mx-auto">
            Zero subscription fee currently. Download the Android app or get in touch for
            personalized onboarding.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={BUSINESS.playStoreUrl} target="_blank" rel="noreferrer noopener">
              <UiVerseGlowingButton variant="emerald" size="md">
                <PlayStoreIcon className="h-4 w-4 shrink-0" />
                <span>Download Android App</span>
              </UiVerseGlowingButton>
            </a>
            <Link to="/get-started">
              <UiVerseGlowingButton variant="brand" size="md">
                <span>Request a Setup Demo →</span>
              </UiVerseGlowingButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
