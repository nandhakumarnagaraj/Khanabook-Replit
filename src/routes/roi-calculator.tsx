import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Section } from "@/components/site/Section";
import { DISCLAIMERS, absUrl } from "@/lib/business-config";

export const Route = createFileRoute("/roi-calculator")({
  head: () => ({
    meta: [
      { title: "Savings Estimator — KhanaBook" },
      {
        name: "description",
        content:
          "An indicative estimate of operational value based on the values you enter. Not a guarantee of savings.",
      },
      { property: "og:title", content: "Savings Estimator — KhanaBook" },
      { property: "og:description", content: "Indicative operational value based on your inputs." },
      { property: "og:url", content: absUrl("/roi-calculator") },
      // Kept out of the sitemap and de-indexed until inputs and copy are finalised.
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: absUrl("/roi-calculator") }],
  }),
  component: ROIPage,
});

function ROIPage() {
  const [posCost, setPosCost] = useState(0);
  const [billsPerDay, setBillsPerDay] = useState(120);
  const [minutesSavedPerBill, setMinutesSavedPerBill] = useState(0);
  const [staffHourlyRate, setStaffHourlyRate] = useState(0);
  const [paperCostMonthly, setPaperCostMonthly] = useState(0);

  const result = useMemo(() => {
    const monthlyBills = billsPerDay * 30;
    const hoursSaved = (monthlyBills * minutesSavedPerBill) / 60;
    const timeValue = hoursSaved * staffHourlyRate;
    // Operational value (not guaranteed cash savings).
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
    <Section
      eyebrow="Savings Estimator"
      title={<>Estimate operational <span className="hl">value.</span></>}
      desc="An indicative estimate based on the values you enter. Optional inputs default to zero — set only the ones you want to model."
    >
      <div className="grid gap-8 md:grid-cols-[1fr_1fr] max-w-4xl mx-auto">
        <div className="card-surface space-y-5">
          <Field label={`Current POS monthly subscription (₹): ${posCost}`}>
            <input type="range" min={0} max={10000} step={100} value={posCost} onChange={(e) => setPosCost(+e.target.value)} className="w-full accent-brand" />
          </Field>
          <Field label={`Bills per day: ${billsPerDay}`}>
            <input type="range" min={10} max={1000} value={billsPerDay} onChange={(e) => setBillsPerDay(+e.target.value)} className="w-full accent-brand" />
          </Field>
          <Field label={`Minutes saved per bill vs manual (optional): ${minutesSavedPerBill}`}>
            <input type="range" min={0} max={5} step={0.5} value={minutesSavedPerBill} onChange={(e) => setMinutesSavedPerBill(+e.target.value)} className="w-full accent-brand" />
          </Field>
          <Field label={`Staff cost per hour (optional, ₹): ${staffHourlyRate}`}>
            <input type="range" min={0} max={500} step={10} value={staffHourlyRate} onChange={(e) => setStaffHourlyRate(+e.target.value)} className="w-full accent-brand" />
          </Field>
          <Field label={`Monthly paper / operational cost (optional, ₹): ${paperCostMonthly}`}>
            <input type="range" min={0} max={5000} step={50} value={paperCostMonthly} onChange={(e) => setPaperCostMonthly(+e.target.value)} className="w-full accent-brand" />
          </Field>
        </div>

        <div className="rounded-3xl bg-foreground text-background p-8">
          <div className="text-xs uppercase tracking-widest text-background/60">Estimated operational value</div>
          <div className="mt-2 text-6xl font-black text-brand">
            ₹{result.monthly.toLocaleString("en-IN")}
          </div>
          <div className="mt-4 text-background/70">
            Roughly <strong className="text-background">₹{result.yearly.toLocaleString("en-IN")}</strong> per year, based on the inputs above.
          </div>
          <div className="mt-6 border-t border-background/10 pt-6 text-sm text-background/70 space-y-1">
            <div>Current POS subscription: ₹{result.posCost.toLocaleString("en-IN")}</div>
            <div>Staff time value: ~{result.hoursSaved} hours (₹{result.timeValue.toLocaleString("en-IN")})</div>
            <div>Paper / operational: ₹{result.paperCostMonthly.toLocaleString("en-IN")}</div>
          </div>
          <div className="mt-6 text-[11px] text-background/60 leading-relaxed">
            Assumptions: monthly = current POS subscription + (bills/day × 30 × minutes saved ÷ 60 × staff hourly rate) + paper / operational cost. Staff time value is not the same as direct cash savings, and KhanaBook may not fully eliminate paper or operational costs.
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground max-w-3xl mx-auto text-center">
        {DISCLAIMERS.roi}
      </p>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-sm font-bold mb-2">{label}</div>
      {children}
    </label>
  );
}
