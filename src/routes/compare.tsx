import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  Cpu,
  Smartphone,
  WifiOff,
  ArrowRight,
  ShieldCheck,
  Printer,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { DISCLAIMERS, BUSINESS, absUrl } from "@/lib/business-config";
import {
  BATTLECARD_CATEGORIES,
  HIDDEN_TRAPS,
  SWITCHING_STEPS,
  SWITCHING_FAQS,
  COMPARE_ROWS,
} from "@/lib/compare-data";
import { EntranceReveal } from "@/components/motion/EntranceReveal";
import { ShinyButton } from "@/components/motion/primitives/ShinyButton";
import { MagneticHover } from "@/components/motion/MagneticHover";
import { BorderBeam } from "@/components/motion/primitives/BorderBeam";
import { UiVerseBadge, UiVerseGlowingButton } from "@/components/uiverse";
import { PlayStoreIcon } from "@/components/icons/PlayStoreIcon";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "KhanaBook vs Alternative Architectures — Offline-First Restaurant POS Battlecard" },
      {
        name: "description",
        content:
          "Compare KhanaBook against traditional Windows desktop POS, hybrid PC bridge servers, and browser-only cloud SaaS. See why Indian restaurants choose offline-first Android billing with up to 5 synced terminals and Cloud Web Dashboard.",
      },
      {
        property: "og:title",
        content: "KhanaBook vs Alternative Architectures — Restaurant POS Battlecard",
      },
      {
        property: "og:description",
        content:
          "Offline-first resilience, zero hardware cost, USB/Wi-Fi/Bluetooth printer routing, and up to 5 synced Android terminals.",
      },
      { property: "og:url", content: absUrl("/compare") },
    ],
    links: [{ rel: "canonical", href: absUrl("/compare") }],
  }),
  component: ComparePage,
});

function ComparePage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredCategories =
    activeCategory === "All"
      ? BATTLECARD_CATEGORIES
      : BATTLECARD_CATEGORIES.filter((c) => c.category === activeCategory);

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
          className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        />

        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10 text-center">
          <EntranceReveal direction="up" delay={0.05}>
            <UiVerseBadge pulseColor="emerald">
              TRANSPARENT RESTAURANT POS ARCHITECTURE COMPARISON
            </UiVerseBadge>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.15}>
            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Built for restaurants that refuse to pay{" "}
              <span className="hl">₹15,000/yr for desktop crashes.</span>
            </h1>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.25}>
            <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Compare KhanaBook's offline-first Android architecture against hybrid PC bridge
              servers, legacy Windows desktop software, and cloud SaaS web apps.
            </p>
          </EntranceReveal>

          {/* Quick Highlight Stats */}
          <EntranceReveal direction="up" delay={0.35}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="bg-[#28292A] rounded-2xl border border-white/5 p-5 shadow-lg">
                <div className="text-2xl sm:text-3xl font-black text-white">₹0 Hardware</div>
                <div className="mt-1 text-xs text-gray-400 leading-snug">
                  Runs on any Android phone or tablet. Save ₹35,000 on Windows PC setups.
                </div>
              </div>
              <div className="bg-[#28292A] rounded-2xl border border-white/5 p-5 shadow-lg">
                <div className="text-2xl sm:text-3xl font-black text-white">100% Offline</div>
                <div className="mt-1 text-xs text-gray-400 leading-snug">
                  Sub-second billing & KOT printing. No local PC bridge server that can crash.
                </div>
              </div>
              <div className="bg-[#28292A] rounded-2xl border border-white/5 p-5 shadow-lg">
                <div className="text-2xl sm:text-3xl font-black text-white">5 Terminals</div>
                <div className="mt-1 text-xs text-gray-400 leading-snug">
                  Up to 5 synchronized Android terminals included with isolated invoice counters.
                </div>
              </div>
              <div className="bg-[#28292A] rounded-2xl border border-white/5 p-5 shadow-lg">
                <div className="text-2xl sm:text-3xl font-black text-white">3 Printers</div>
                <div className="mt-1 text-xs text-gray-400 leading-snug">
                  Universal USB, Wi-Fi & Bluetooth thermal printer routing (Kitchen & Receipt).
                </div>
              </div>
            </div>
          </EntranceReveal>
        </div>
      </section>

      {/* 2. THE 4-WAY BATTLECARD MATRIX */}
      <section className="py-16 md:py-24 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400 mb-2">
                HEAD-TO-HEAD BATTLECARD
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                How KhanaBook stacks up across every layer
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                "All",
                "Hardware & Cost Requirements",
                "Offline Resilience & Service Continuity",
                "Multi-Terminal & Printer Capabilities",
              ].map((tab) => {
                const label =
                  tab === "All"
                    ? "All Specs"
                    : tab.includes("Hardware")
                      ? "Hardware & Cost"
                      : tab.includes("Offline")
                        ? "Offline Tech"
                        : "Terminals & Print";
                const active = activeCategory === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveCategory(tab)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                      active
                        ? "bg-white text-[#131314] shadow-md scale-105"
                        : "bg-[#28292A] text-gray-300 hover:text-white hover:bg-[#333538] border border-white/5"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Matrix Container */}
          <div className="space-y-12">
            {filteredCategories.map((catGroup) => (
              <div key={catGroup.category} className="space-y-4">
                <div className="border-b border-[#28292A] pb-3">
                  <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand" />
                    {catGroup.category}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 mt-1">{catGroup.subtitle}</p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#1E1F20]/50 shadow-2xl">
                  <table className="w-full min-w-[840px] text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#28292A] text-xs uppercase tracking-wider font-bold text-gray-400 bg-[#28292A]">
                        <th className="p-4 sm:p-5 w-[24%]">Capability</th>
                        <th className="p-4 sm:p-5 w-[28%] bg-brand/10 border-x border-brand/20 text-white font-black">
                          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-red-200">
                            <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
                            KhanaBook (Offline-First)
                          </div>
                        </th>
                        <th className="p-4 sm:p-5 w-[16%]">Hybrid PC Bridge POS</th>
                        <th className="p-4 sm:p-5 w-[16%]">Desktop Windows POS</th>
                        <th className="p-4 sm:p-5 w-[16%]">Pure Cloud SaaS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm">
                      {catGroup.rows.map((row) => (
                        <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                          {/* Feature Name & Description */}
                          <td className="p-4 sm:p-5 align-top">
                            <div className="font-semibold text-white">{row.feature}</div>
                            {row.description && (
                              <div className="mt-1 text-[11px] text-gray-400 leading-snug">
                                {row.description}
                              </div>
                            )}
                          </td>

                          {/* KhanaBook (Winner Column) */}
                          <td className="p-4 sm:p-5 align-top bg-brand/5 border-x border-brand/20 font-medium text-gray-100">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="font-semibold text-white">{row.khanabook}</span>
                            </div>
                          </td>

                          {/* Hybrid PC Bridge POS */}
                          <td className="p-4 sm:p-5 align-top text-gray-300">
                            <div className="flex items-start gap-1.5">
                              {row.hybridBridgeStatus === "good" ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5" />
                              ) : row.hybridBridgeStatus === "warning" ? (
                                <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                              )}
                              <span>{row.hybridBridge}</span>
                            </div>
                          </td>

                          {/* Desktop Windows POS */}
                          <td className="p-4 sm:p-5 align-top text-gray-300">
                            <div className="flex items-start gap-1.5">
                              {row.desktopPosStatus === "good" ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5" />
                              ) : row.desktopPosStatus === "warning" ? (
                                <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                              )}
                              <span>{row.desktopPos}</span>
                            </div>
                          </td>

                          {/* Pure Cloud SaaS */}
                          <td className="p-4 sm:p-5 align-top text-gray-300">
                            <div className="flex items-start gap-1.5">
                              {row.cloudSaasStatus === "good" ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5" />
                              ) : row.cloudSaasStatus === "warning" ? (
                                <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                              )}
                              <span>{row.cloudSaas}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE 3 HIDDEN COMPETITOR TRAPS */}
      <section className="py-16 md:py-24 border-b border-[#28292A] bg-[#161718]/40">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-red-400 mb-2">
              AVOID EXPENSIVE SURPRISES
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              The 3 hidden traps legacy POS sales reps don't tell you
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-400">
              Thousands of Indian restaurant owners sign contracts only to discover these painful
              bottlenecks during actual dinner service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {HIDDEN_TRAPS.map((trap) => {
              const Icon =
                trap.icon === "Cpu" ? Cpu : trap.icon === "Smartphone" ? Smartphone : WifiOff;
              return (
                <div
                  key={trap.title}
                  className="bg-[#28292A] rounded-2xl border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between hover:border-brand/40 transition-all duration-300 shadow-xl group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="flex items-center justify-center h-12 w-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                        {trap.competitor}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-white">{trap.title}</h3>

                    <div className="mt-4 space-y-3 text-xs md:text-sm text-gray-300 leading-relaxed">
                      <p>
                        <strong className="text-gray-100">The Problem:</strong> {trap.problem}
                      </p>
                      <p className="text-amber-300/90 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                        <strong>The Breakdown:</strong> {trap.impact}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/[0.08]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      KhanaBook Solution
                    </div>
                    <p className="text-xs md:text-sm text-gray-200">{trap.khanabookEdge}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. THE 3-STEP SEAMLESS SWITCHING GUIDE */}
      <section className="py-16 md:py-24 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400 mb-2">
              ZERO DOWNTIME MIGRATION
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Switch from your legacy POS in under 10 minutes
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-400">
              No technician visits. No server cables. Test KhanaBook alongside your current system
              until you are 100% satisfied.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SWITCHING_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-[#28292A] rounded-2xl border border-white/[0.06] p-6 sm:p-8 relative overflow-hidden shadow-lg"
              >
                <div className="text-4xl font-black text-brand mb-4" aria-hidden="true">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VERIFICATION CHECKLIST (PRESERVED DATA IN STITCH ACCORDION) */}
      <section className="py-16 md:py-24 border-b border-[#28292A] bg-[#161718]/40">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400 mb-2">
              BUYER'S DUE DILIGENCE
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              What to check in any POS contract before signing
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-400">
              Use this checklist to verify fine print, add-on costs, and technical boundaries with
              any software vendor.
            </p>
          </div>

          <div className="bg-[#28292A] rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#28292A] bg-[#1E1F20] text-xs uppercase tracking-wider text-gray-400">
                  <th className="p-4 sm:p-5 w-[25%] font-bold">Capability</th>
                  <th className="p-4 sm:p-5 w-[40%] font-bold text-white">KhanaBook Standard</th>
                  <th className="p-4 sm:p-5 w-[35%] font-bold text-gray-300">
                    What to verify elsewhere
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm">
                {COMPARE_ROWS.map((row) => (
                  <tr key={row[0]} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">{row[0]}</td>
                    <td className="p-4 sm:p-5 text-gray-200">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{row[1]}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-gray-400">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. SWITCHING FAQS (GOOGLE STITCH STYLE) */}
      <section className="py-16 md:py-24 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Frequently asked switching questions
            </h2>
          </div>

          <div className="flex flex-col gap-3 max-w-4xl mx-auto">
            {SWITCHING_FAQS.map((faq, idx) => (
              <details
                key={faq.q}
                id={`compare-faq-${idx}`}
                className="group bg-[#28292A] rounded-2xl overflow-hidden border border-white/[0.06] transition-colors hover:border-white/10"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 min-h-14 md:min-h-16 px-5 md:px-7 py-3 text-base md:text-lg leading-snug font-normal text-gray-100 [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 font-medium">{faq.q}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 text-gray-300 transition-transform duration-300 ease-in-out group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <path
                      d="M8.325 9.675H4.5V8.325H8.325V4.5H9.675V8.325H13.5V9.675H9.675V13.5H8.325V9.675Z"
                      fill="currentColor"
                    />
                  </svg>
                </summary>
                <div className="m-0 text-sm md:text-base leading-relaxed text-gray-400 px-5 md:px-7 pb-5 pt-2">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA CARD (GOOGLE STITCH 75% WIDTH) */}
      <section className="py-20 md:py-28">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="w-full rounded-3xl bg-[#28292A] border border-white/10 p-10 md:p-16 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            <BorderBeam
              size={340}
              duration={12}
              colorFrom="#dc2626"
              colorTo="#f59e0b"
              borderWidth={2}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 50%, var(--brand), transparent 70%)",
              }}
            />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                Ready to leave <span className="hl">desktop crashes behind?</span>
              </h2>
              <p className="mt-4 text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
                Install KhanaBook in minutes on any Android device. No subscriptions, no hardware
                lock-in, and 100% offline billing that never stops — paired with live Web Dashboard
                control.
              </p>

              <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
                <a href={BUSINESS.playStoreUrl} target="_blank" rel="noreferrer noopener">
                  <UiVerseGlowingButton variant="brand" size="md">
                    <PlayStoreIcon className="h-4 w-4 shrink-0" />
                    <span>Download Android App</span>
                  </UiVerseGlowingButton>
                </a>

                <a
                  href={BUSINESS.loginUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/80 px-6 py-3.5 text-sm font-bold text-foreground hover:border-brand hover:text-brand transition-all"
                >
                  <span>Launch Web Dashboard</span>
                </a>

                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-1.5 px-2 py-3.5 text-sm font-bold text-muted-foreground hover:text-brand transition-colors"
                >
                  <span>Request a Demo</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <p className="mt-8 text-xs text-gray-500 max-w-4xl mx-auto text-center leading-relaxed">
            {DISCLAIMERS.compareDisclaimer}
          </p>
        </div>
      </section>
    </div>
  );
}
