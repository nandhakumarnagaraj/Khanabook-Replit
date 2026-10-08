import { createFileRoute, Link } from "@tanstack/react-router";
import {
  IndianRupee,
  Wifi,
  Smartphone,
  ReceiptText,
  Layers,
  Printer,
  WifiOff,
  UtensilsCrossed,
  BarChart3,
  MonitorSmartphone,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Terminal,
  ExternalLink,
  Cpu,
  CheckCircle2,
  Flame,
  Coffee,
  Store,
  Router,
  Cloud,
  Database,
  Download,
} from "lucide-react";
import posTerminal from "@/assets/pos-terminal.webp";
import chefHandshake from "@/assets/chef-handshake.webp";
import serverRoom from "@/assets/server-room.webp";
import appHome from "@/assets/app-home.png";
import appBilling from "@/assets/app-billing.png";
import { Section } from "@/components/site/Section";
import { FAQ } from "@/components/site/FAQ";
import { ProductTabs } from "@/components/site/ProductTabs";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { InteractivePosDashboard } from "@/components/site/InteractivePosDashboard";
import { BUSINESS, DISCLAIMERS, absUrl } from "@/lib/business-config";
import { RESTAURANT_TYPES, FAQS } from "@/lib/home-data";
import { FEATURE_GROUPS } from "@/lib/features-data";
import { PUBLISHED_POSTS } from "@/lib/blog-posts";
import { motion } from "motion/react";
import { VerticalHeroSwiper } from "@/components/motion/VerticalHeroSwiper";
import { HorizontalParallax } from "@/components/motion/HorizontalParallax";
import { Card3DTilt } from "@/components/motion/Card3DTilt";
import { EntranceReveal, StaggerGroup, StaggerItem } from "@/components/motion/EntranceReveal";
import { MagneticHover } from "@/components/motion/MagneticHover";
import { BorderBeam } from "@/components/motion/primitives/BorderBeam";
import { TextShimmer } from "@/components/motion/primitives/TextShimmer";
import { ShinyButton } from "@/components/motion/primitives/ShinyButton";
import { SpotlightCard } from "@/components/motion/primitives/SpotlightCard";
import { NumberTicker } from "@/components/motion/primitives/NumberTicker";
import { HaikeiWave } from "@/components/motion/primitives/HaikeiWave";
import { UiVerseBadge, UiVerseGlowingButton, UiVerseCard } from "@/components/uiverse";

const FEATURE_ICONS = [ReceiptText, Layers, Printer, WifiOff, UtensilsCrossed, BarChart3];

const STORY_BLOCKS = [
  {
    title: "Lightning 3-Second Counter Billing",
    body: "Punch dine-in, takeaway, and delivery orders with instant touch search, item modifiers, and customized table maps. Support pay-before or pay-after workflows, split payments across Cash, Dynamic UPI QR, and Card, and share instant digital invoices via WhatsApp or SMS.",
    image: appBilling,
    alt: "KhanaBook new-bill screen for selecting menu items and creating an order",
    icon: ReceiptText,
    reverse: false,
    portrait: true,
  },
  {
    title: "Multi-Terminal Mesh (Up to 5 Devices)",
    body: "Equip stewards with captain ordering handhelds while cashiers manage settlements at the main counter. Each terminal maintains its own GST-compliant invoice series and daily order counter, synchronizing locally over Wi-Fi without needing external broadband.",
    image: posTerminal,
    alt: "KhanaBook POS terminal on a restaurant counter",
    icon: Layers,
    reverse: true,
    portrait: false,
  },
  {
    title: "Dual ESC/POS Thermal Printing & Kitchen KOT",
    body: "Route orders automatically to up to two standard USB, Bluetooth, or Wi-Fi thermal printers. Print customer receipts at the counter while instantly firing KOTs to kitchen preparation stations (Tandoor, Chinese, Bar), complete with reprint and item void tracking.",
    image: chefHandshake,
    alt: "Restaurant kitchen staff coordinating on orders",
    icon: Printer,
    reverse: false,
    portrait: false,
  },
  {
    title: "100% Offline Resilience & Cloud Web Dashboard",
    body: "Zero counter freezes during broadband drops or power cuts thanks to local SQLite WAL storage. Silently uploads finalized receipts to the Cloud Web Dashboard for remote sales telemetry, menu edits, and GST tax reports.",
    image: serverRoom,
    alt: "Cloud infrastructure syncing restaurant data",
    icon: WifiOff,
    reverse: true,
    portrait: false,
  },
];

const SETUP_STRIP = [
  { icon: WifiOff, label: "100% Offline SQLite Billing" },
  { icon: Smartphone, label: "Standard Android Phones & Tablets" },
  { icon: Layers, label: "Up to 5 Synchronized Terminals" },
  { icon: Printer, label: "Dual ESC/POS Thermal Receipt & KOT Printers" },
  { icon: Cloud, label: "Cloud Web Dashboard" },
  { icon: ShieldCheck, label: "GST-Ready Registers & Staff Role Controls" },
];

const FNB_FORMATS = [
  {
    icon: UtensilsCrossed,
    title: "Dhabas & Fine-Dine",
    desc: "Table management, steward mobile ordering, captain app, split bill, and complimentary items with steward authorization PINs.",
    badge: "Steward Mode",
    color: "text-brand",
    borderHover: "hover:border-brand/40",
  },
  {
    icon: Flame,
    title: "QSRs & Fast Food",
    desc: "Lightning 5-second token billing, dual screen customer display, dynamic UPI QR on screen, and automated token call audio.",
    badge: "Token Billing",
    color: "text-amber-500",
    borderHover: "hover:border-amber-500/40",
  },
  {
    icon: Coffee,
    title: "Cafes & Bakeries",
    desc: "Barcode weighing scale integration, custom cake advance bookings, delivery date slots, and ingredient recipe batching.",
    badge: "Weigh Scale Ready",
    color: "text-emerald-400",
    borderHover: "hover:border-emerald-500/40",
  },
  {
    icon: Store,
    title: "Cloud Kitchens",
    desc: "Centralized KDS (Kitchen Display System), multi-brand dispatch on a single tablet screen, rider handoff, and prep time tracking.",
    badge: "Multi-Brand KDS",
    color: "text-blue-400",
    borderHover: "hover:border-blue-500/40",
  },
];

const ARCH_COMPARISON = [
  {
    feature: "Billing during Internet Outage",
    khanabook: "100% Full Functionality",
    cloud: "Screen Freezes / Broken",
    legacy: "PC Crash Vulnerable",
  },
  {
    feature: "Setup & Hardware Cost",
    khanabook: "Runs on any ₹6,000 Android tablet",
    cloud: "Requires constant 5G / Fiber",
    legacy: "Expensive ₹40,000 bulky PC + UPS",
  },
  {
    feature: "Speed during Peak Rush",
    khanabook: "50ms local SQLite write",
    cloud: "800ms – 3s cloud API lag",
    legacy: "Slow Windows OS disk lag",
  },
  {
    feature: "Kitchen KOT Reliability",
    khanabook: "Direct local ESC/POS broadcast",
    cloud: "Cloud print queue timeouts",
    legacy: "Spooler & driver lockups",
  },
  {
    feature: "Monthly Recurring Fees",
    khanabook: "₹0 Core POS (Zero Tax)",
    cloud: "₹1,500 – ₹5,000/mo lock-in",
    legacy: "High AMC & license renewals",
  },
];

const HARDWARE_CHECKLIST = [
  {
    title: "Android Tablet or Phone",
    desc: "Any Android 8.0+ device (Samsung Galaxy Tab, Lenovo, or Redmi phones). Zero proprietary POS terminal lock-in.",
    icon: Smartphone,
  },
  {
    title: "Thermal Receipt Printers",
    desc: "Standard 58mm or 80mm ESC/POS thermal printers via USB, Bluetooth, or LAN (TVS, NGX, Epson, Everycom).",
    icon: Printer,
  },
  {
    title: "Local Mesh Wi-Fi Router",
    desc: "Any standard ₹1,200 TP-Link or D-Link router for multi-terminal sync without active internet connection required.",
    icon: Router,
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KhanaBook — Offline-First Restaurant POS" },
      {
        name: "description",
        content:
          "KhanaBook is an offline-first Android restaurant POS for billing, KOT management, payment recording, menus, inventory and up to five synchronised terminals.",
      },
      { property: "og:title", content: "KhanaBook — Offline-First Restaurant POS" },
      {
        property: "og:description",
        content:
          "Billing, KOT, payment recording and up to five terminals that work even when the internet is unstable.",
      },
      { property: "og:url", content: absUrl("/") },
    ],
    links: [{ rel: "canonical", href: absUrl("/") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "KhanaBook",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Android",
          description:
            "Offline-first Android restaurant POS for billing, KOT, payment recording, menus, inventory and up to five synchronised terminals.",
          publisher: {
            "@type": "Organization",
            name: BUSINESS.legalName,
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const latestPosts = PUBLISHED_POSTS.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }}
        />
        <div className="w-[92vw] lg:w-[88vw] xl:w-[80vw] max-w-7xl mx-auto pt-16 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center relative">
          <EntranceReveal direction="up" delay={0.1}>
            <div className="max-w-2xl space-y-4">
              <UiVerseBadge pulseColor="emerald">
                ⚡ ₹0 Core POS • 100% Offline Mesh • Up to 5 Terminals
              </UiVerseBadge>

              {/* Headline with natural wrapping and zero clipping */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
                Never Let Internet Failure Stop Your{" "}
                <span className="bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 rounded-lg inline-block font-black">
                  Dinner Rush.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                High-speed offline billing on standard Android phones and tablets. Synchronize up to
                5 terminals locally over Wi-Fi when broadband drops, paired with a real-time Cloud
                Web Dashboard.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <a href={BUSINESS.playStoreUrl} target="_blank" rel="noopener noreferrer">
                  <UiVerseGlowingButton variant="brand" size="lg">
                    <Download className="h-4 w-4" />
                    <span>Download Android App</span>
                  </UiVerseGlowingButton>
                </a>

                <Link to="/get-started">
                  <UiVerseGlowingButton variant="emerald" size="lg">
                    <span>Request Setup Help</span>
                    <ArrowRight className="h-4 w-4" />
                  </UiVerseGlowingButton>
                </Link>

                <a href={BUSINESS.loginUrl} target="_blank" rel="noopener noreferrer">
                  <UiVerseGlowingButton variant="white" size="lg">
                    <span>Web Dashboard</span>
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  </UiVerseGlowingButton>
                </a>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                  Instant Offline SQLite Billing
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                  Up to 5 Wi-Fi Synced Terminals
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                  Dual ESC/POS Thermal Printing
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                  ₹0 Software Subscription Fee
                </span>
              </div>
            </div>
          </EntranceReveal>

          {/* Interactive Vertical Swiper Hero Slider with 3D Tilt */}
          <EntranceReveal direction="up" delay={0.25}>
            <VerticalHeroSwiper />
          </EntranceReveal>
        </div>
      </section>

      {/* REALTIME SAAS METRICS STRIP — Godly, Realtime Colors & Motion Primitives */}
      <section className="py-6 border-y border-border/80 bg-surface/60 backdrop-blur-md">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-surface/80 border border-border/60 shadow-sm">
              <div className="text-2xl md:text-3xl font-black text-brand font-mono flex items-center">
                <NumberTicker value={50} />
                <span>ms</span>
              </div>
              <div className="text-xs font-bold text-foreground mt-1">Local Transaction Write</div>
              <div className="text-[11px] text-muted-foreground font-mono">SQLite WAL mode</div>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-surface/80 border border-border/60 shadow-sm">
              <div className="text-2xl md:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono flex items-center">
                <NumberTicker value={100} />
                <span>%</span>
              </div>
              <div className="text-xs font-bold text-foreground mt-1">Offline Reliability</div>
              <div className="text-[11px] text-muted-foreground font-mono">Zero cloud lockouts</div>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-surface/80 border border-border/60 shadow-sm">
              <div className="text-2xl md:text-3xl font-black text-amber-500 font-mono flex items-center">
                <span>≤</span>
                <NumberTicker value={5} />
              </div>
              <div className="text-xs font-bold text-foreground mt-1">Mesh Terminals</div>
              <div className="text-[11px] text-muted-foreground font-mono">Independent series</div>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-surface/80 border border-border/60 shadow-sm">
              <div className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono flex items-center">
                <span>₹</span>
                <NumberTicker value={0} />
              </div>
              <div className="text-xs font-bold text-foreground mt-1">Mandatory Cloud Tax</div>
              <div className="text-[11px] text-muted-foreground font-mono">
                Direct device control
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR & CORE CAPABILITIES — Horizontal Parallax Marquee */}
      <HorizontalParallax />

      {/* DUAL-ENGINE ARCHITECTURE — ANDROID APP + WEB DASHBOARD */}
      <section
        className="py-20 md:py-28 bg-[#1E1F20]/30 border-y border-white/[0.06]"
        id="dual-engine"
      >
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <EntranceReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="eyebrow mb-3">Two Powerful Sides of One System</div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground">
                Offline-First Android App + <span className="hl">Web Dashboard</span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                Floor staff run high-speed counter billing and kitchen KOTs offline on Android,
                while restaurant owners control menus, inventory, and analytics from any web
                browser.
              </p>
            </div>
          </EntranceReveal>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Engine 1: Android POS App */}
            <EntranceReveal direction="left" delay={0.1}>
              <div className="h-full rounded-3xl bg-surface border border-border/70 p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-brand/40 transition-colors">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl group-hover:bg-brand/20 transition-colors"
                />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="h-14 w-14 rounded-2xl bg-surface-soft border border-border/60 flex items-center justify-center text-brand shadow-sm">
                      <Smartphone className="h-7 w-7" />
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-xs font-bold font-mono">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      100% OFFLINE SQLITE
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
                    Android POS App
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground mb-6 leading-relaxed">
                    Designed for rapid floor service, billing counters, and kitchen coordination on
                    any supported Android tablet or phone.
                  </p>

                  <ul className="space-y-3.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>50ms Local Transaction Writes:</strong> Zero spinner delay during
                        peak lunch and dinner rushes.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Up to 5 Mesh Terminals:</strong> Synchronize active tables across
                        multiple handhelds over local Wi-Fi without internet.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Dual Thermal Printers:</strong> Direct ESC/POS printing for customer
                        bills and kitchen KOTs via USB, Bluetooth, or LAN.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>India Payment Split:</strong> Instant dynamic UPI QR display, cash,
                        and card split handling with GST computing.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center gap-3">
                  <a href={BUSINESS.playStoreUrl} target="_blank" rel="noopener noreferrer">
                    <UiVerseGlowingButton variant="emerald" size="md">
                      <span>Download Android App</span>
                      <Download className="h-4 w-4" />
                    </UiVerseGlowingButton>
                  </a>
                  <Link to="/features" className="btn-secondary">
                    App Features →
                  </Link>
                </div>
              </div>
            </EntranceReveal>

            {/* Engine 2: Web Dashboard */}
            <EntranceReveal direction="right" delay={0.2}>
              <div className="h-full rounded-3xl bg-surface border border-border/70 p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-amber-500/40 transition-colors">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl group-hover:bg-gold/20 transition-colors"
                />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="h-14 w-14 rounded-2xl bg-surface-soft border border-border/60 flex items-center justify-center text-amber-500 shadow-sm">
                      <MonitorSmartphone className="h-7 w-7" />
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-400 text-xs font-bold font-mono">
                      <Cloud className="h-3.5 w-3.5" />
                      CLOUD WEB DASHBOARD
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
                    Web Dashboard
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground mb-6 leading-relaxed">
                    Accessible from any web browser on Mac, Windows PC, iPad, iPhone, or laptop with
                    instant zero-install cloud access.
                  </p>

                  <ul className="space-y-3.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Live Remote Sales Telemetry:</strong> Monitor daily revenue, hourly
                        order spikes, and settled bills from anywhere in the world.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Centralized Menu &amp; Pricing:</strong> Update dishes, category
                        layouts, item variants, and tax rates pushed to all terminals.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Inventory &amp; Recipe BOM:</strong> Track stock decrements, portion
                        recipes, and receive automatic low-stock replenishment alerts.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Financial Reports &amp; GST:</strong> Export audit-ready GST sales
                        summaries, accountant CSV sheets, and PDF tax returns in one click.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center gap-3">
                  <a href={BUSINESS.loginUrl} target="_blank" rel="noopener noreferrer">
                    <UiVerseGlowingButton variant="brand" size="md">
                      <span>Launch Web Dashboard</span>
                      <ExternalLink className="h-4 w-4" />
                    </UiVerseGlowingButton>
                  </a>
                  <Link to="/about" className="btn-secondary">
                    Learn Architecture →
                  </Link>
                </div>
              </div>
            </EntranceReveal>
          </div>
        </div>
      </section>

      {/* AN ALL-ROUNDER RESTAURANT POS — alternating story blocks */}
      <section className="py-24">
        <div className="container-page">
          <EntranceReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="eyebrow mb-3">What it does</div>
              <h2 className="text-3xl md:text-5xl font-black">
                An all-rounder <span className="hl">restaurant POS.</span>
              </h2>
              <p className="mt-3 text-muted-foreground">
                Everything that happens between an order landing and the bill closing — handled in
                one app.
              </p>
            </div>
          </EntranceReveal>

          <div className="space-y-20 md:space-y-24">
            {STORY_BLOCKS.map((block) => {
              const Icon = block.icon;
              return (
                <div
                  key={block.title}
                  className={`grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto w-full ${
                    block.reverse ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <EntranceReveal direction={block.reverse ? "right" : "left"}>
                    <span className="icon-badge h-12 w-12 mb-4 shadow-sm hover:scale-110 transition-transform">
                      <Icon aria-hidden className="h-5 w-5 text-brand" />
                    </span>
                    <h3 className="text-2xl font-black mb-3">{block.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{block.body}</p>
                  </EntranceReveal>

                  <EntranceReveal direction={block.reverse ? "left" : "right"} delay={0.15}>
                    <Card3DTilt intensity={10} glare={true}>
                      <div
                        className={`rounded-3xl overflow-hidden border border-border shadow-2xl bg-surface-soft/80 backdrop-blur-sm transition-shadow hover:shadow-brand/10 ${
                          block.portrait
                            ? "flex min-h-[34rem] items-center justify-center p-4"
                            : "p-2"
                        }`}
                      >
                        <img
                          src={block.image}
                          alt={block.alt}
                          width={block.portrait ? 720 : 800}
                          height={block.portrait ? 1600 : 800}
                          loading="lazy"
                          className={
                            block.portrait
                              ? "max-h-[38rem] w-auto max-w-full rounded-2xl object-contain shadow-md"
                              : "h-auto w-full rounded-2xl"
                          }
                        />
                      </div>
                    </Card3DTilt>
                  </EntranceReveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORKS WITH YOUR SETUP */}
      <section className="bg-surface-soft/60 backdrop-blur-sm py-24 border-y border-border/80">
        <div className="container-page">
          <EntranceReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="eyebrow mb-3">Quick & simple</div>
              <h2 className="text-3xl md:text-5xl font-black">
                Works with the setup <span className="hl">you already have.</span>
              </h2>
            </div>
          </EntranceReveal>

          <StaggerGroup className="grid gap-4 grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto w-full">
            {SETUP_STRIP.map(({ icon: Icon, label }) => (
              <StaggerItem key={label}>
                <SpotlightCard className="h-full">
                  <div className="flex flex-col items-center text-center gap-3 py-8 px-4 cursor-default h-full">
                    <span className="icon-badge h-12 w-12 rounded-full">
                      <Icon aria-hidden className="h-5 w-5 text-brand" />
                    </span>
                    <p className="text-sm font-bold">{label}</p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* DO MORE WITH KHANABOOK — links into /features */}
      <Section
        eyebrow="Do more"
        title={
          <>
            Do more with <span className="hl">one restaurant app.</span>
          </>
        }
        desc="Every area of KhanaBook, in one place. Click through for the full capability list."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto w-full">
          {FEATURE_GROUPS.filter((group) => group.id !== "compliance").map((g, i) => {
            const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
            return (
              <Link
                key={g.id}
                to="/features"
                hash={g.id}
                className="card-surface group flex flex-col"
              >
                <span className="icon-badge h-12 w-12 mb-4">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-black mb-2">{g.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {g.items[0]?.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                  Explore all features
                  <ArrowRight
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* INDIAN F&B FORMAT SUPPORT — Google Stitch Bento */}
      <section className="py-20 md:py-28 bg-surface-soft/60 border-y border-border/60" id="formats">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <EntranceReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="eyebrow mb-3">Versatile Formats</div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground">
                Engineered for <span className="hl">Every Format</span> of Indian Food &amp;
                Beverage
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                Switch effortlessly between rapid 5-second counter billing and multi-steward
                fine-dine table operations.
              </p>
            </div>
          </EntranceReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FNB_FORMATS.map((fmt) => {
              const Icon = fmt.icon;
              return (
                <UiVerseCard
                  key={fmt.title}
                  className={`p-6 flex flex-col justify-between shadow-lg transition-all ${fmt.borderHover} hover:translate-y-[-2px]`}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="h-12 w-12 rounded-xl bg-surface-soft border border-border/60 flex items-center justify-center">
                          <Icon className={`h-6 w-6 ${fmt.color}`} />
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface-soft border border-border/60 text-muted-foreground">
                          {fmt.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{fmt.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{fmt.desc}</p>
                    </div>
                    <div className="pt-4 mt-6 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-foreground">
                      <span className={fmt.color}>Active Support</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                    </div>
                  </div>
                </UiVerseCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCT TABS */}
      <Section
        eyebrow="See it in action"
        title={
          <>
            What KhanaBook <span className="hl">looks like.</span>
          </>
        }
        desc="Click a feature to see how it works in the app."
        className="bg-surface-soft"
      >
        <ProductTabs />
      </Section>

      {/* HAIKEI ORGANIC WAVE ACCENT — TOP */}
      <HaikeiWave className="-mb-1" opacity={0.8} />

      {/* INTERACTIVE RESTAURANT POS OPERATIONS DASHBOARD */}
      <section className="py-20 bg-gradient-to-b from-surface/60 via-background to-surface/60 relative overflow-hidden">
        <div className="container-page">
          <EntranceReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3.5 py-1 text-xs font-bold text-brand shadow-sm mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                Live Interactive Operations Command Center
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground">
                Experience the{" "}
                <TextShimmer className="text-brand font-black">Offline POS Engine</TextShimmer> Live
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Test table billing, rapid menu item selection, instant GST calculation, and thermal
                KOT dispatching right now — engineered with instant local response.
              </p>
            </div>
          </EntranceReveal>

          {/* INTERACTIVE HELPER CUE BANNER */}
          <EntranceReveal direction="up" delay={0.1}>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 max-w-4xl mx-auto mb-8 flex items-center gap-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 font-bold text-base">
                💡
              </div>
              <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                <strong className="font-bold text-amber-500">Interactive Demo:</strong> Tap menu
                items on the simulated terminal below to add dishes, test instant GST splitting,
                switch tables, and simulate offline network cuts in real time!
              </p>
            </div>
          </EntranceReveal>

          <div className="max-w-7xl mx-auto w-full">
            <InteractivePosDashboard />
          </div>
        </div>
      </section>

      {/* HAIKEI ORGANIC WAVE ACCENT — BOTTOM */}
      <HaikeiWave reverse className="-mt-1" opacity={0.8} />

      {/* TECHNICAL ARCHITECTURE COMPARISON — Google Stitch Matrix */}
      <section className="py-20 md:py-28" id="architecture">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <EntranceReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="eyebrow mb-3">Architectural Superiority</div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground">
                Technical Architecture <span className="hl">Comparison</span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                Why local SQLite edge architecture destroys legacy Windows machines and fragile
                browser-only cloud SaaS.
              </p>
            </div>
          </EntranceReveal>

          <div className="overflow-x-auto rounded-2xl border border-border/70 bg-surface shadow-2xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border/70 bg-surface-soft text-foreground font-bold">
                  <th className="p-4 sm:p-5">Capability</th>
                  <th className="p-4 sm:p-5 bg-brand/10 dark:bg-brand/15 text-brand font-black border-x border-brand/25">
                    <div className="flex items-center gap-2">
                      <span>KhanaBook (Offline Mesh)</span>
                      <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-brand text-white font-extrabold tracking-wider shadow-sm">
                        Winner
                      </span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 text-muted-foreground font-medium">
                    Fragile Cloud-Only SaaS
                  </th>
                  <th className="p-4 sm:p-5 text-muted-foreground font-medium">
                    Legacy Windows PC
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-muted-foreground">
                {ARCH_COMPARISON.map((row) => (
                  <tr key={row.feature} className="hover:bg-surface-soft/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-foreground">{row.feature}</td>
                    <td className="p-4 sm:p-5 bg-brand/5 dark:bg-brand/10 border-x border-brand/25 text-emerald-500 dark:text-emerald-400 font-bold">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
                        <span>{row.khanabook}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-muted-foreground">{row.cloud}</td>
                    <td className="p-4 sm:p-5 text-muted-foreground">{row.legacy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Zero-Lockin Hardware Recommendation Box */}
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-surface border border-border/70 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <Smartphone className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Recommended Zero-Lockin Hardware Setup
                </h3>
                <p className="text-xs text-muted-foreground">
                  Standard non-proprietary hardware you can buy anywhere at competitive retail
                  prices.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HARDWARE_CHECKLIST.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-surface-soft border border-border/50"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <Icon className="h-4 w-4 text-brand" />
                      <span className="font-bold text-foreground text-sm">{item.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      {latestPosts.length > 0 && (
        <Section
          eyebrow="Grow your restaurant"
          title={
            <>
              From the <span className="hl">KhanaBook blog.</span>
            </>
          }
        >
          <div className="grid gap-6 md:grid-cols-3 max-w-7xl mx-auto w-full">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="card-surface flex flex-col"
              >
                <span className="eyebrow mb-3">{post.category}</span>
                <h3 className="font-black text-lg mb-2 leading-snug">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {post.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                  Read more
                  <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/blog" className="btn-secondary">
              Visit the blog →
            </Link>
          </div>
        </Section>
      )}

      {/* CUSTOMER STORIES & TESTIMONIALS */}
      <Section
        eyebrow="Loved by restaurants"
        title={
          <>
            Real feedback from <span className="hl">busy restaurant owners.</span>
          </>
        }
        desc="From roadside dhabas to multi-table restaurants across India."
      >
        <EntranceReveal direction="up">
          <TestimonialCarousel />
        </EntranceReveal>
      </Section>

      {/* FAQ — GOOGLE STITCH TYPOGRAPHY & 75vw SCREEN WIDTH */}
      <section className="py-20 md:py-28" id="faq">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <EntranceReveal direction="up" className="w-full">
            <div className="mb-8 text-center md:text-left">
              <div className="eyebrow mb-3">FAQ</div>
              <h2 className="m-0 text-[clamp(40px,8vw,57px)] font-bold tracking-tight text-foreground md:text-[57px] md:leading-[64px]">
                Common <span className="hl">questions.</span>
              </h2>
            </div>
            <div className="w-full">
              <FAQ items={FAQS} className="w-full" />
            </div>
          </EntranceReveal>
        </div>
      </section>

      {/* CTA — 75% SCREEN WIDTH ABOVE FOOTER */}
      <section className="pb-20 md:pb-28">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <EntranceReveal direction="up" className="w-full">
            <Card3DTilt intensity={5} glare={false} className="w-full">
              <div className="w-full rounded-3xl bg-surface text-foreground p-10 md:p-16 lg:p-20 text-center relative overflow-hidden shadow-2xl border border-border/80">
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
                    background: "radial-gradient(circle at 30% 30%, var(--brand), transparent 65%)",
                  }}
                />
                <div className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">
                    Never Let Internet Failure Stop Your <span className="hl">Dinner Rush.</span>
                  </h2>
                  <p className="mt-4 text-muted-foreground max-w-4xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
                    Built for restaurants across India operating zero-downtime counters with
                    KhanaBook. Billing, KOT, payments, and up to 5 synchronized terminals in one
                    Android app.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
                    <a href={BUSINESS.playStoreUrl} target="_blank" rel="noopener noreferrer">
                      <UiVerseGlowingButton variant="brand" size="lg">
                        <Download className="h-4 w-4" />
                        <span>Download Android App</span>
                      </UiVerseGlowingButton>
                    </a>

                    <Link to="/get-started">
                      <UiVerseGlowingButton variant="emerald" size="lg">
                        <span>Request Setup Help</span>
                        <ArrowRight className="h-4 w-4" />
                      </UiVerseGlowingButton>
                    </Link>

                    <Link to="/features">
                      <UiVerseGlowingButton variant="white" size="lg">
                        <span>Explore All Features</span>
                      </UiVerseGlowingButton>
                    </Link>
                  </div>
                </div>
              </div>
            </Card3DTilt>
          </EntranceReveal>
        </div>
      </section>
    </>
  );
}
