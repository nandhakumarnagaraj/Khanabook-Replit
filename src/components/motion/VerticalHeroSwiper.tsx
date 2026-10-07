import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp, ChevronDown, Sparkles, WifiOff, Printer, IndianRupee } from "lucide-react";
import appHome from "@/assets/app-home.png";
import appBilling from "@/assets/app-billing.png";
import appPayment from "@/assets/app-payment.png";
import appReports from "@/assets/app-reports.png";
import appMenu from "@/assets/app-menu.png";
import { Card3DTilt } from "./Card3DTilt";

const SLIDES = [
  {
    id: "home",
    title: "Live Counter & Tables",
    subtitle: "Real-time overview of active tables and orders",
    image: appHome,
    badge: "100% Offline Ready",
    badgeIcon: WifiOff,
    badgeColor: "text-brand",
    accent: "from-brand/10 to-transparent",
  },
  {
    id: "billing",
    title: "High-Speed Billing",
    subtitle: "Tap-to-add items, rapid category search & discounts",
    image: appBilling,
    badge: "Instant KOT Generation",
    badgeIcon: Printer,
    badgeColor: "text-amber-500",
    accent: "from-amber-500/10 to-transparent",
  },
  {
    id: "payment",
    title: "Multi-Mode Settlement",
    subtitle: "UPI QR, Cash, Cards & split payments in one click",
    image: appPayment,
    badge: "Seamless Payment",
    badgeIcon: IndianRupee,
    badgeColor: "text-emerald-500",
    accent: "from-emerald-500/10 to-transparent",
  },
  {
    id: "reports",
    title: "Shift & Sales Reports",
    subtitle: "Terminal analytics, tax breakdown and day closing",
    image: appReports,
    badge: "Zero Data Loss",
    badgeIcon: Sparkles,
    badgeColor: "text-blue-500",
    accent: "from-blue-500/10 to-transparent",
  },
  {
    id: "menu",
    title: "Live Menu Control",
    subtitle: "Adjust prices, combos, taxes and item availability instantly",
    image: appMenu,
    badge: "Multi-Terminal Sync",
    badgeIcon: Sparkles,
    badgeColor: "text-purple-500",
    accent: "from-purple-500/10 to-transparent",
  },
];

export function VerticalHeroSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const activeSlide = SLIDES[currentIndex];
  const BadgeIcon = activeSlide.badgeIcon;

  const slideVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        y: { type: "spring", stiffness: 320, damping: 28 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.94,
      transition: {
        y: { type: "spring", stiffness: 320, damping: 28 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    }),
  };

  return (
    <div
      className="relative w-full max-w-xl mx-auto lg:max-w-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="absolute inset-0 -m-8 rounded-[3rem] bg-gradient-to-br from-brand/15 via-transparent to-gold/15 blur-3xl pointer-events-none"
      />

      <Card3DTilt intensity={10} glare={true} className="relative z-10">
        <div className="relative rounded-3xl border border-border bg-surface-soft/90 backdrop-blur-md p-4 sm:p-5 shadow-2xl overflow-hidden">
          {/* Header pill strip of active slide */}
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-brand animate-ping" />
              <span className="text-xs font-bold text-foreground tracking-tight">
                {activeSlide.title}
              </span>
            </div>
            <span className="text-[11px] font-mono font-semibold text-muted-foreground">
              0{currentIndex + 1} / 0{SLIDES.length}
            </span>
          </div>

          {/* Vertical Slide Window */}
          <div className="relative my-3 h-[380px] sm:h-[450px] md:h-[500px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-surface/50">
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.div
                key={activeSlide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex flex-col items-center justify-center p-2"
              >
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-lg transition-transform duration-300"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom active feature info + controls */}
          <div className="pt-2 flex items-center justify-between">
            <div className="text-left">
              <p className="text-xs font-semibold text-foreground line-clamp-1">
                {activeSlide.subtitle}
              </p>
            </div>

            {/* Vertical Arrow Navigators */}
            <div className="flex items-center gap-1.5 ml-2 shrink-0">
              <button
                onClick={handlePrev}
                aria-label="Previous screen"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface hover:bg-surface-soft text-foreground transition-colors hover:scale-105 active:scale-95"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next screen"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface hover:bg-surface-soft text-foreground transition-colors hover:scale-105 active:scale-95"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Card3DTilt>

      {/* Vertical Navigation Indicator Dots on Right Side */}
      <div className="hidden sm:flex absolute -right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-20">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${slide.title}`}
              className="group relative flex items-center justify-center p-1"
            >
              <motion.span
                animate={{
                  height: isActive ? 24 : 8,
                  backgroundColor: isActive ? "#b91c1c" : "rgba(156, 163, 175, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="w-2 rounded-full transition-colors"
              />
              {/* Tooltip on hover */}
              <span className="pointer-events-none absolute left-6 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-semibold text-background opacity-0 transition-opacity group-hover:opacity-100 shadow-md">
                {slide.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating Micro-Interaction Badges with gentle floating physics */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:flex absolute -left-8 top-12 items-center gap-2 rounded-2xl border border-border bg-surface/95 backdrop-blur-md px-4 py-2.5 shadow-xl z-20"
      >
        <BadgeIcon className={`h-4 w-4 ${activeSlide.badgeColor}`} />
        <span className="text-xs font-bold text-foreground">{activeSlide.badge}</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="hidden md:flex absolute -right-4 bottom-14 items-center gap-2 rounded-2xl border border-border bg-surface/95 backdrop-blur-md px-4 py-2.5 shadow-xl z-20"
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-bold text-foreground">5 Terminals in Sync</span>
      </motion.div>
    </div>
  );
}
