import { createFileRoute, Link } from "@tanstack/react-router";
import { isValidElement, cloneElement, useMemo, useState } from "react";
import type { ReactElement } from "react";
import {
  IndianRupee,
  Clock,
  Printer,
  Sparkles,
  ArrowRight,
  Download,
  Cloud,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { DISCLAIMERS, BUSINESS, absUrl } from "@/lib/business-config";
import { EntranceReveal } from "@/components/motion/EntranceReveal";
import { BorderBeam } from "@/components/motion/primitives/BorderBeam";
import { UiVerseBadge, UiVerseGlowingButton } from "@/components/uiverse";

export const Route = createFileRoute("/roi-calculator")({
  head: () => ({
    meta: [
      {
        title: "Savings Estimator — KhanaBook Offline-First POS | Android App & Web Dashboard",
      },
      {
        name: "description",
        content:
          "Calculate how much your restaurant can save by eliminating annual desktop software subscriptions and bulky PC hardware with KhanaBook's offline-first Android POS and Web Dashboard.",
      },
      { property: "og:title", content: "Restaurant POS Savings Estimator — KhanaBook" },
      { property: "og:url", content: absUrl("/roi-calculator") },
    ],
    links: [{ rel: "canonical", href: absUrl("/roi-calculator") }],
  }),
  component: ROIPage,
});

function ROIPage() {
  const [posCost, setPosCost] = useState(1200);
  const [billsPerDay, setBillsPerDay] = useState(150);
  const [minutesSavedPerBill, setMinutesSavedPerBill] = useState(1.5);
  const [staffHourlyRate, setStaffHourlyRate] = useState(80);
  const [paperCostMonthly, setPaperCostMonthly] = useState(500);

  const result = useMemo(() => {
    const monthlyBills = billsPerDay * 30;
    const hoursSaved = (monthlyBills * minutesSavedPerBill) / 60;
    const timeValue = hoursSaved * staffHourlyRate;
    const monthly = posCost + timeValue + paperCostMonthly;
    return {
      posCost,
      timeValue: Math.max(0, Math.round(timeValue)),
      paperCostMonthly,
      monthly: Math.max(0, Math.round(monthly)),
      yearly: Math.max(0, Math.round(monthly * 12)),
      hoursSaved: Math.round(hoursSaved),
    };
  }, [posCost, billsPerDay, minutesSavedPerBill, staffHourlyRate, paperCostMonthly]);

  return (
    <div className="bg-[#131314] text-white min-h-screen font-['Google_Sans',_sans-serif] selection:bg-brand/30 selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16 border-b border-[#28292A]">
        {/* Subtle Ambient Light */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-brand/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
        />

        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10 text-center">
          <EntranceReveal direction="up" delay={0.05}>
            <UiVerseBadge pulseColor="emerald">
              FINANCIAL &amp; OPERATIONAL VALUE ESTIMATOR
            </UiVerseBadge>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.15}>
            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Calculate What You Save with <span className="hl">KhanaBook.</span>
            </h1>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.25}>
            <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Estimate the operational value gained by eliminating expensive recurring software
              subscriptions and avoiding bulky Windows PC hardware setups.
            </p>
          </EntranceReveal>
        </div>
      </section>

      {/* 2. CALCULATOR INTERFACE */}
      <section className="py-14 md:py-20 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* SLIDERS CARD (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#1E1F20] p-6 sm:p-8 shadow-xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white">Your Restaurant Parameters</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Adjust the sliders below to model your restaurant&apos;s current operating costs.
                </p>
              </div>

              <SliderField
                id="pos-cost-slider"
                label="Current POS Monthly Subscription"
                value={`₹${posCost.toLocaleString("en-IN")}`}
                sublabel="What you currently pay for recurring POS licenses"
              >
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={100}
                  value={posCost}
                  onChange={(e) => setPosCost(+e.target.value)}
                  className="w-full accent-brand h-2 bg-[#28292A] rounded-lg cursor-pointer"
                />
              </SliderField>

              <SliderField
                id="bills-per-day-slider"
                label="Average Bills per Day"
                value={`${billsPerDay} orders`}
                sublabel="Daily volume across Dine-in, Takeaway & Delivery"
              >
                <input
                  type="range"
                  min={10}
                  max={800}
                  step={10}
                  value={billsPerDay}
                  onChange={(e) => setBillsPerDay(+e.target.value)}
                  className="w-full accent-brand h-2 bg-[#28292A] rounded-lg cursor-pointer"
                />
              </SliderField>

              <SliderField
                id="minutes-saved-slider"
                label="Counter Minutes Saved per Bill"
                value={`${minutesSavedPerBill} min`}
                sublabel="Sub-second offline Android touch search vs slow web browser buffering"
              >
                <input
                  type="range"
                  min={0}
                  max={4}
                  step={0.5}
                  value={minutesSavedPerBill}
                  onChange={(e) => setMinutesSavedPerBill(+e.target.value)}
                  className="w-full accent-brand h-2 bg-[#28292A] rounded-lg cursor-pointer"
                />
              </SliderField>

              <SliderField
                id="staff-cost-slider"
                label="Staff Cost per Hour"
                value={`₹${staffHourlyRate}/hr`}
                sublabel="Hourly wage of cashier / steward staff handling billing"
              >
                <input
                  type="range"
                  min={0}
                  max={300}
                  step={10}
                  value={staffHourlyRate}
                  onChange={(e) => setStaffHourlyRate(+e.target.value)}
                  className="w-full accent-brand h-2 bg-[#28292A] rounded-lg cursor-pointer"
                />
              </SliderField>

              <SliderField
                id="paper-cost-slider"
                label="Monthly Thermal Paper & Hardware Waste"
                value={`₹${paperCostMonthly}`}
                sublabel="Paper rolls, printer maintenance, ink/ribbon costs"
              >
                <input
                  type="range"
                  min={0}
                  max={3000}
                  step={100}
                  value={paperCostMonthly}
                  onChange={(e) => setPaperCostMonthly(+e.target.value)}
                  className="w-full accent-brand h-2 bg-[#28292A] rounded-lg cursor-pointer"
                />
              </SliderField>
            </div>

            {/* RESULTS CARD (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-brand/40 bg-[#1E1F20] p-6 sm:p-8 shadow-2xl overflow-hidden">
                <BorderBeam
                  size={220}
                  duration={12}
                  delay={0}
                  colorFrom="#c026d3"
                  colorTo="#dc2626"
                />

                <div className="text-xs uppercase tracking-widest font-extrabold text-brand mb-1">
                  Estimated Operational Value
                </div>
                <div className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mt-2">
                  ₹{result.monthly.toLocaleString("en-IN")}
                  <span className="text-xs font-semibold text-gray-400 block sm:inline sm:ml-2">
                    / month
                  </span>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-[#28292A] p-4 text-sm text-gray-300">
                  Total annual operational value:{" "}
                  <strong className="text-emerald-400 text-base font-bold">
                    ₹{result.yearly.toLocaleString("en-IN")} / year
                  </strong>
                </div>

                <div className="mt-6 space-y-3 pt-4 border-t border-white/10 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Direct Software Subscription Saved:</span>
                    <span className="text-white font-bold">
                      ₹{result.posCost.toLocaleString("en-IN")}/mo
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Staff Productivity (~{result.hoursSaved} hrs):</span>
                    <span className="text-white font-bold">
                      ₹{result.timeValue.toLocaleString("en-IN")}/mo
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Paper & Operational Efficiency:</span>
                    <span className="text-white font-bold">
                      ₹{result.paperCostMonthly.toLocaleString("en-IN")}/mo
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex justify-center">
                  <Link to="/get-started" className="w-full flex justify-center">
                    <UiVerseGlowingButton variant="brand" size="md" className="w-full">
                      <span>Get Started with KhanaBook Free →</span>
                    </UiVerseGlowingButton>
                  </Link>
                </div>
              </div>

              <p className="mt-4 text-[11px] text-gray-300 leading-relaxed text-center px-2">
                {DISCLAIMERS.roi}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SliderField({
  id,
  label,
  value,
  sublabel,
  children,
}: {
  id: string;
  label: string;
  value: string;
  sublabel: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <label htmlFor={id} className="text-sm font-bold text-white">
          {label}
        </label>
        <span className="text-sm font-bold text-brand">{value}</span>
      </div>
      <p className="text-[11px] text-gray-300 mb-2">{sublabel}</p>
      {isValidElement(children)
        ? cloneElement(children as ReactElement<{ id?: string }>, { id })
        : children}
    </div>
  );
}
