import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ReceiptText,
  Layers,
  Printer,
  WifiOff,
  UtensilsCrossed,
  BarChart3,
  ShieldCheck,
  Smartphone,
  Cloud,
  Database,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  Boxes,
  Cpu,
  Router,
  ExternalLink,
  Download,
  Flame,
} from "lucide-react";
import { useState } from "react";
import { BUSINESS, absUrl } from "@/lib/business-config";
import { FEATURE_GROUPS, STATUS_LABEL } from "@/lib/features-data";
import { EntranceReveal } from "@/components/motion/EntranceReveal";
import { ShinyButton } from "@/components/motion/primitives/ShinyButton";
import { BorderBeam } from "@/components/motion/primitives/BorderBeam";
import { UiVerseBadge, UiVerseGlowingButton } from "@/components/uiverse";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      {
        title:
          "Features — KhanaBook Offline-First Multi-Terminal Restaurant POS | Android App & Web Dashboard",
      },
      {
        name: "description",
        content:
          "Explore the complete capabilities of KhanaBook: offline-first Android POS billing, up to 5 synchronized terminals, dual ESC/POS thermal printing, and a real-time Cloud Web Dashboard.",
      },
      {
        property: "og:title",
        content:
          "Features — KhanaBook Offline-First Multi-Terminal POS (Android App & Web Dashboard)",
      },
      {
        property: "og:description",
        content:
          "Zero-latency Android billing at the counter, paired with centralized menu, inventory and live reporting on the Web Dashboard.",
      },
      { property: "og:url", content: absUrl("/features") },
    ],
    links: [{ rel: "canonical", href: absUrl("/features") }],
  }),
  component: FeaturesPage,
});

const GROUP_ICONS: Record<string, typeof ReceiptText> = {
  "billing-payments": ReceiptText,
  "multi-terminal": Layers,
  kitchen: Printer,
  "offline-first": WifiOff,
  "menu-inventory": UtensilsCrossed,
  reports: BarChart3,
  compliance: ShieldCheck,
};

function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "android" | "web">("all");

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
              OFFLINE-FIRST ARCHITECTURE • ANDROID APP & WEB DASHBOARD
            </UiVerseBadge>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.15}>
            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              High-Speed Android POS at the Counter.{" "}
              <br className="hidden sm:inline" />
              <span className="hl">Intelligent Cloud Web Dashboard</span> in the Office.
            </h1>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.25}>
            <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              KhanaBook combines the unmatched zero-latency speed of a native Android offline POS app with the centralized command of a real-time Cloud Web Dashboard.
            </p>
          </EntranceReveal>

          {/* Quick Engine Switcher / Highlights */}
          <EntranceReveal direction="up" delay={0.35}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setActiveTab("all")}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  activeTab === "all"
                    ? "bg-white text-[#131314] shadow-md"
                    : "bg-[#1E1F20] text-gray-300 border border-white/10 hover:border-white/20"
                }`}
              >
                All Capabilities
              </button>
              <button
                onClick={() => setActiveTab("android")}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  activeTab === "android"
                    ? "bg-emerald-500 text-black shadow-md font-extrabold"
                    : "bg-[#1E1F20] text-gray-300 border border-white/10 hover:border-white/20"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                Android POS App (Counter & Kitchen)
              </button>
              <button
                onClick={() => setActiveTab("web")}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  activeTab === "web"
                    ? "bg-blue-500 text-white shadow-md font-extrabold"
                    : "bg-[#1E1F20] text-gray-300 border border-white/10 hover:border-white/20"
                }`}
              >
                <Cloud className="h-3.5 w-3.5" />
                Web Dashboard (Cloud Management)
              </button>
            </div>
          </EntranceReveal>
        </div>
      </section>

      {/* 2. DUAL-ENGINE ARCHITECTURE BENTO */}
      <section className="py-16 md:py-24 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand">
              Dual-Engine Synchronization
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              Two Synchronized Systems. <span className="hl">Zero Weak Points.</span>
            </h2>
            <p className="text-gray-400 mt-3 text-sm sm:text-base">
              The counter operates entirely locally on Android devices without depending on internet uptime. All settled bills silently synchronize to the Web Dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* ENGINE 1: ANDROID APP */}
            <div className="relative rounded-2xl border border-emerald-500/30 bg-[#1E1F20] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl hover:border-emerald-500/60 transition-all">
              <BorderBeam size={220} duration={12} delay={0} colorFrom="#10b981" colorTo="#059669" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    Counter & Kitchen Operations
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Android POS Application
                </h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Runs natively on any standard Android phone or tablet. Uses local SQLite WAL storage so your counter never halts, buffers, or loses an order during broadband outages.
                </p>

                <div className="mt-6 space-y-3 pt-4 border-t border-white/5 text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">
                      <strong className="text-white">100% Offline Resilience:</strong> Instant 0ms bill generation even with Wi-Fi cable unplugged.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">
                      <strong className="text-white">Multi-Terminal Mesh:</strong> Connect up to 5 Android terminals simultaneously (Cashier + Stewards).
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">
                      <strong className="text-white">Dual Thermal Printing:</strong> Direct USB, Bluetooth & Wi-Fi ESC/POS routing for receipts & KOTs.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">
                      <strong className="text-white">Fast Payment Recording:</strong> Cash, Dynamic UPI QR, Card, and Split-payment workflows.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">
                      <strong className="text-white">Steward Ordering & Tables:</strong> Floor plan visualizer, captain ordering & KOT updates.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Target Device: Android 8.0+ Phones/Tabs</span>
                <a
                  href={BUSINESS.playStoreUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  <Download className="h-3.5 w-3.5" />
                  Get Android App →
                </a>
              </div>
            </div>

            {/* ENGINE 2: WEB DASHBOARD */}
            <div className="relative rounded-2xl border border-blue-500/30 bg-[#1E1F20] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl hover:border-blue-500/60 transition-all">
              <BorderBeam size={220} duration={12} delay={6} colorFrom="#3b82f6" colorTo="#1d4ed8" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Cloud className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                    Management & Analytics
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Web Dashboard
                </h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Accessible from any browser on laptop, PC, iPad or smartphone via the Cloud Web Dashboard. Gives owners and accountants live cloud visibility without disrupting the counter.
                </p>

                <div className="mt-6 space-y-3 pt-4 border-t border-white/5 text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">
                      <strong className="text-white">Live Telemetry & Auditing:</strong> View daily sales, settlement summaries, and payment breakdowns in real time.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">
                      <strong className="text-white">Centralized Menu Engineering:</strong> Edit categories, prices, variants & taxes centrally; pushes to all terminals.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">
                      <strong className="text-white">Inventory & Recipe BOM:</strong> Track raw materials, stock depletion per dish, and low-inventory warnings.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">
                      <strong className="text-white">Staff Roles & Authorization PINs:</strong> Control discounts, cancellations, and steward access permissions.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">
                      <strong className="text-white">Accountant & GST Reports:</strong> Read-only login for CA/tax consultant with one-click Excel & PDF export.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Target Device: Any Web Browser</span>
                <a
                  href={BUSINESS.loginUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Launch Web Dashboard →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DETAILED OPERATIONAL CAPABILITIES */}
      <section className="py-16 md:py-24 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand">
              Comprehensive Feature Breakdown
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              Every Tool You Need to <span className="hl">Operate at Full Speed.</span>
            </h2>
            <p className="text-gray-400 mt-3 text-base">
              Built specifically around how Indian restaurants, cafes, dhabas and QSRs serve during their busiest hours.
            </p>
          </div>

          <div className="space-y-16">
            {FEATURE_GROUPS.map((group) => {
              const Icon = GROUP_ICONS[group.id] ?? ReceiptText;

              return (
                <div key={group.title} id={group.id} className="scroll-mt-24">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
                    <div className="h-10 w-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {group.title}
                      </h3>
                    </div>
                  </div>

                  {/* Feature Cards Grid */}
                  <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-xl border border-white/10 bg-[#1E1F20] p-5 sm:p-6 hover:border-brand/30 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2.5">
                            <h4 className="font-bold text-white text-base leading-snug">
                              {item.name}
                            </h4>
                            {item.status && (
                              <span className="shrink-0 rounded-full border border-white/10 bg-[#28292A] px-2.5 py-0.5 text-[10px] font-semibold text-gray-300">
                                {STATUS_LABEL[item.status]}
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                            {item.body}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-gray-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span>Fully verified in production</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HARDWARE COMPATIBILITY MATRIX */}
      <section className="py-16 md:py-24 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand">
              Zero Vendor Lock-In
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              Runs on Open Hardware. <span className="hl">Zero Mandatory Bundles.</span>
            </h2>
            <p className="text-gray-400 mt-3 text-sm sm:text-base">
              Use phones and thermal printers you already own, or buy standard commercial units from any vendor at fair market prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-4">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Android Devices</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Any phone, tablet, or handheld POS terminal running Android 8.0 or newer. Minimum 3GB RAM recommended.
              </p>
              <div className="mt-4 text-xs font-semibold text-emerald-400">
                ₹0 Upfront (Use Existing Devices)
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-4">
                <Printer className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">ESC/POS Thermal Printers</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Standard 58mm (2-inch) or 80mm (3-inch) thermal receipt and KOT printers connecting via USB, Bluetooth, or Wi-Fi LAN.
              </p>
              <div className="mt-4 text-xs font-semibold text-gray-300">
                TVS, Epson, Everycom, NGX, POSIFLEX, etc.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-4">
                <Router className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Local Wi-Fi Mesh</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Any basic ₹1,200 home/office Wi-Fi router. Synchronizes up to 5 terminals locally even if broadband WAN link is disconnected.
              </p>
              <div className="mt-4 text-xs font-semibold text-gray-300">
                TP-Link, D-Link, Mercusys, etc.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-20 md:py-28 relative overflow-hidden text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-brand/15 blur-3xl"
        />

        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Ready to Upgrade to <span className="hl">Offline-First Reliability?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Experience zero counter latency, up to 5 synced Android terminals, and full Web Dashboard control. Zero software subscription fee currently.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={BUSINESS.playStoreUrl} target="_blank" rel="noreferrer noopener">
              <UiVerseGlowingButton variant="emerald">
                <Download className="h-4 w-4" />
                Download Android POS App
              </UiVerseGlowingButton>
            </a>
            <a href={BUSINESS.loginUrl} target="_blank" rel="noreferrer noopener">
              <UiVerseGlowingButton variant="blue">
                <Cloud className="h-4 w-4 text-blue-400" />
                Launch Web Dashboard
              </UiVerseGlowingButton>
            </a>
            <Link to="/get-started">
              <UiVerseGlowingButton variant="brand">
                Request a Setup Demo →
              </UiVerseGlowingButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
