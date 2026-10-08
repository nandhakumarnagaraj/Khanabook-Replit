import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Smartphone,
  Cloud,
  WifiOff,
  Database,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building,
  Sparkles,
  ArrowRight,
  Download,
} from "lucide-react";
import { BUSINESS, absUrl } from "@/lib/business-config";
import { EntranceReveal } from "@/components/motion/EntranceReveal";
import { BorderBeam } from "@/components/motion/primitives/BorderBeam";
import { UiVerseBadge, UiVerseGlowingButton } from "@/components/uiverse";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: `About Us — ${BUSINESS.productName} | Offline-First Multi-Terminal Restaurant POS`,
      },
      {
        name: "description",
        content: `${BUSINESS.productName} is an offline-first multi-terminal restaurant POS engineered by ${BUSINESS.legalName}. Discover why we built our Android POS App and Cloud Web Dashboard for Indian restaurants.`,
      },
      { property: "og:title", content: `About ${BUSINESS.productName} — Built for Indian Restaurants` },
      {
        property: "og:description",
        content:
          "Offline-first Android billing resilience combined with cloud Web Dashboard intelligence.",
      },
      { property: "og:url", content: absUrl("/about") },
    ],
    links: [{ rel: "canonical", href: absUrl("/about") }],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    icon: WifiOff,
    title: "Zero-Downtime Guarantee",
    desc: "A restaurant should never stop printing bills because a fiber optic cable was cut or broadband went down. KhanaBook's Android engine functions 100% offline with zero cloud dependency during service.",
  },
  {
    icon: Smartphone,
    title: "Hardware Independence",
    desc: "Restaurants shouldn't be coerced into buying proprietary ₹40,000+ PC hardware, Windows licenses, or expensive touchmonitors. Any standard Android smartphone or tablet is a complete billing terminal.",
  },
  {
    icon: Cloud,
    title: "Dual-Engine Architecture",
    desc: "Cashiers and stewards need instant sub-second native Android response times. Owners and accountants need real-time multi-terminal analytics, recipe tracking, and menu management on a Cloud Web Dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Honesty & Transparency",
    desc: "No hidden charges, zero software subscription traps, and zero lock-ins. When features are in beta or require third-party services, we state it transparently.",
  },
];

function AboutPage() {
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
          className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"
        />

        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10 text-center">
          <EntranceReveal direction="up" delay={0.05}>
            <UiVerseBadge pulseColor="emerald">
              OUR MISSION &amp; ENGINEERING PHILOSOPHY
            </UiVerseBadge>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.15}>
            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Built for the High-Pressure Reality of{" "}
              <br className="hidden sm:inline" />
              <span className="hl">Indian Food & Beverage.</span>
            </h1>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.25}>
            <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Why Indian restaurants deserve an offline-first multi-terminal POS with a native Android app at the counter and a cloud Web Dashboard in the back office.
            </p>
          </EntranceReveal>
        </div>
      </section>

      {/* 2. THE PROBLEM & SOLUTION */}
      <section className="py-16 md:py-24 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-brand">
                The Ground Reality
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
                Why Traditional Systems <span className="hl">Fail During Peak Rush.</span>
              </h2>
              <div className="mt-6 space-y-4 text-sm sm:text-base text-gray-400 leading-relaxed">
                <p>
                  Restaurants across India operate in demanding, unpredictable environments: unexpected power cuts, fluctuating 4G/broadband links, multi-waiter simultaneous tables, and non-stop kitchen ticket queues on Friday and Saturday nights.
                </p>
                <p>
                  Most modern cloud POS systems run inside web browser tabs. The second the internet lags or drops, the entire billing counter halts, screens spin with buffering wheels, and kitchen orders are lost.
                </p>
                <p>
                  On the other side, legacy Windows desktop systems require dedicated bulky PCs, expensive uninterrupted power supplies (UPS), and costly annual maintenance contracts (AMCs).
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-brand/30 bg-[#1E1F20] p-8 shadow-xl relative overflow-hidden">
              <BorderBeam size={220} duration={12} delay={0} colorFrom="#c026d3" colorTo="#dc2626" />
              <h3 className="text-xl font-bold text-white mb-4">
                The KhanaBook Dual-Engine Breakthrough
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                We engineered KhanaBook with two specialized, tightly synchronized halves:
              </p>

              <div className="space-y-4 text-sm">
                <div className="rounded-xl border border-white/10 bg-[#28292A] p-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                    <Smartphone className="h-4 w-4" />
                    Android POS App (Counter & Kitchen)
                  </div>
                  <p className="text-xs text-gray-400">
                    Runs natively on Android with local SQLite WAL storage. 0ms latency, zero reliance on external internet for billing, table management, or dual ESC/POS thermal printing.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#28292A] p-4">
                  <div className="flex items-center gap-2 text-blue-400 font-bold mb-1">
                    <Cloud className="h-4 w-4" />
                    Web Dashboard
                  </div>
                  <p className="text-xs text-gray-400">
                    Runs in any browser on PC, laptop, or tablet. Provides owners and accountants with centralized menu engineering, raw material recipe tracking, staff controls, and live GST sales telemetry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE PRINCIPLES */}
      <section className="py-16 md:py-24 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              Engineering Principles We <span className="hl">Never Compromise.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRINCIPLES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6 sm:p-8 hover:border-brand/30 transition-all"
                >
                  <div className="h-12 w-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-2.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. COMPANY & STATUTORY TRANSPARENCY */}
      <section className="py-16 md:py-24 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand">
              Corporate Governance
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              Who Operates <span className="hl">KhanaBook.</span>
            </h2>
            <p className="text-gray-400 mt-3 text-sm">
              KhanaBook is engineered and operated by a registered Indian private limited entity committed to transparent business practices.
            </p>
          </div>

          <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-[#1E1F20] p-6 sm:p-8 space-y-4 text-sm text-gray-300">
            <div className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3">
              <span className="font-bold text-white">Operating Entity:</span>
              <span className="text-gray-300">{BUSINESS.legalName}</span>
            </div>
            <div className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3">
              <span className="font-bold text-white">Product Name:</span>
              <span className="text-gray-300">{BUSINESS.productName}</span>
            </div>
            <div className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3">
              <span className="font-bold text-white">Registered Address:</span>
              <span className="text-gray-300 text-right">{BUSINESS.registeredAddress}</span>
            </div>
            <div className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3">
              <span className="font-bold text-white">Corporate Identity Number (CIN):</span>
              <span className="text-gray-300 font-mono">{BUSINESS.cin}</span>
            </div>
            <div className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3">
              <span className="font-bold text-white">Support Email:</span>
              <a href={`mailto:${BUSINESS.supportEmail}`} className="text-brand hover:underline">
                {BUSINESS.supportEmail}
              </a>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <span className="font-bold text-white">Partner Services:</span>
              <span className="text-gray-300 text-right">
                {BUSINESS.siblingPlatform} ({BUSINESS.siblingPlatformDescription})
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-brand/15 blur-3xl"
        />

        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Experience the <span className="hl">KhanaBook Difference.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Get started with zero software subscription fees. Download the Android app or request a personalized onboarding demo.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={BUSINESS.playStoreUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <UiVerseGlowingButton variant="emerald" size="md">
                <Download className="h-4 w-4" />
                <span>Download Android App</span>
              </UiVerseGlowingButton>
            </a>
            <a
              href={BUSINESS.loginUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <UiVerseGlowingButton variant="white" size="md">
                <Cloud className="h-4 w-4" />
                <span>Web Dashboard</span>
              </UiVerseGlowingButton>
            </a>
            <Link to="/get-started">
              <UiVerseGlowingButton variant="brand" size="md">
                <span>Get Started Now →</span>
              </UiVerseGlowingButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
