import {
  UtensilsCrossed,
  Coffee,
  Pizza,
  Store,
  Beer,
  Cake,
  Truck,
  Zap,
  Printer,
  WifiOff,
  Layers,
  ShieldCheck,
  ReceiptText,
  IndianRupee,
} from "lucide-react";

const ROW_ONE = [
  {
    label: "Fine Dining",
    icon: UtensilsCrossed,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-500/10",
    border: "hover:border-violet-500/50",
  },
  {
    label: "Cloud Kitchens",
    icon: Store,
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500/10",
    border: "hover:border-sky-500/50",
  },
  {
    label: "Cafés & Coffee Shops",
    icon: Coffee,
    color: "text-amber-700 dark:text-amber-500",
    bg: "bg-amber-500/10",
    border: "hover:border-amber-500/50",
  },
  {
    label: "QSR & Quick Service",
    icon: Pizza,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
    border: "hover:border-orange-500/50",
  },
  {
    label: "Bakeries & Desserts",
    icon: Cake,
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-500/10",
    border: "hover:border-pink-500/50",
  },
  {
    label: "Food Trucks & Popups",
    icon: Truck,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/50",
  },
  {
    label: "Pubs & Breweries",
    icon: Beer,
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "hover:border-yellow-500/50",
  },
  {
    label: "Sweet Shops & Chaat",
    icon: UtensilsCrossed,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/10",
    border: "hover:border-rose-500/50",
  },
];

const ROW_TWO = [
  {
    label: "50ms Local Transaction Writes",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    label: "USB, Wi-Fi & Bluetooth Printers",
    icon: Printer,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "100% Offline Resilience",
    icon: WifiOff,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Up to 5 Terminals in Sync",
    icon: Layers,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    label: "Zero Cloud Outage Risk",
    icon: ShieldCheck,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
  {
    label: "GST & Custom Tax Invoices",
    icon: ReceiptText,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  { label: "UPI & Cash Split Payment", icon: IndianRupee, color: "text-brand", bg: "bg-brand/10" },
];

interface MarqueeItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  border?: string;
}

function MarqueeRow({
  items,
  direction = "left",
}: {
  items: MarqueeItem[];
  direction?: "left" | "right";
}) {
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  // Repeat items to fill wide displays
  const repeated = [...items, ...items];

  return (
    <div
      className="marquee-group flex overflow-hidden select-none py-1"
      aria-label={
        direction === "left" ? "Supported dining formats" : "Core operational capabilities"
      }
    >
      <div className={`flex shrink-0 items-center gap-4 ${animClass} pr-4`}>
        {repeated.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={`track-a-${item.label}-${index}`}
              className={`group flex items-center gap-3 rounded-full border border-border bg-surface px-6 py-3.5 md:py-4 min-h-[52px] md:min-h-[56px] text-sm md:text-base font-semibold text-foreground shadow-sm hover:scale-105 transition-all duration-200 cursor-default select-none ${
                item.border || "hover:border-brand/40 hover:bg-surface-soft"
              }`}
            >
              <span className={`flex items-center justify-center rounded-full p-1.5 ${item.bg}`}>
                <Icon
                  className={`h-4.5 w-4.5 md:h-5 md:w-5 shrink-0 ${item.color} group-hover:rotate-12 transition-transform duration-200`}
                />
              </span>
              <span className="whitespace-nowrap">{item.label}</span>
            </div>
          );
        })}
      </div>
      <div aria-hidden className={`flex shrink-0 items-center gap-4 ${animClass} pr-4`}>
        {repeated.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={`track-b-${item.label}-${index}`}
              className={`group flex items-center gap-3 rounded-full border border-border bg-surface px-6 py-3.5 md:py-4 min-h-[52px] md:min-h-[56px] text-sm md:text-base font-semibold text-foreground shadow-sm hover:scale-105 transition-all duration-200 cursor-default select-none ${
                item.border || "hover:border-brand/40 hover:bg-surface-soft"
              }`}
            >
              <span className={`flex items-center justify-center rounded-full p-1.5 ${item.bg}`}>
                <Icon
                  className={`h-4.5 w-4.5 md:h-5 md:w-5 shrink-0 ${item.color} group-hover:rotate-12 transition-transform duration-200`}
                />
              </span>
              <span className="whitespace-nowrap">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function HorizontalParallax() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 border-y border-border/80 bg-surface/30 backdrop-blur-sm">
      <style>{`
        @keyframes marquee-scroll-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        @keyframes marquee-scroll-right {
          0% { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marquee-scroll-left 28s linear infinite !important;
          will-change: transform;
        }
        .animate-marquee-right {
          animation: marquee-scroll-right 32s linear infinite !important;
          will-change: transform;
        }
      `}</style>

      {/* Background subtle gradient masks on edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-background to-transparent z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-background to-transparent z-10"
      />

      <div className="container-page mb-8 md:mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-foreground leading-tight">
          Engineered for every format of <span className="hl">Indian Food & Beverage</span>
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        {/* Row 1 — Gliding Left */}
        <MarqueeRow items={ROW_ONE} direction="left" />

        {/* Row 2 — Gliding Right */}
        <MarqueeRow items={ROW_TWO} direction="right" />
      </div>
    </section>
  );
}
