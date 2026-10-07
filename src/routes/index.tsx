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

const FEATURE_ICONS = [ReceiptText, Layers, Printer, WifiOff, UtensilsCrossed, BarChart3];

const STORY_BLOCKS = [
  {
    title: "Billing that keeps up with service",
    body: "Create dine-in, takeaway and manually recorded online orders in a few taps. Use pay-before or pay-after workflows, record cash, UPI, card or split payments, and create a PDF invoice for sharing through WhatsApp or SMS.",
    image: appBilling,
    alt: "KhanaBook new-bill screen for selecting menu items and creating an order",
    icon: ReceiptText,
    reverse: false,
    portrait: true,
  },
  {
    title: "One restaurant, up to five terminals",
    body: "Every approved terminal gets its own identity, invoice series and daily order counter. Active orders stay on the device handling them, while finalised records become available in restaurant-level reports after synchronisation.",
    image: posTerminal,
    alt: "KhanaBook POS terminal on a restaurant counter",
    icon: Layers,
    reverse: true,
    portrait: false,
  },
  {
    title: "A dedicated printer for each job",
    body: "Connect up to two compatible USB, Wi-Fi or Bluetooth thermal printers—one for customer receipts and one for KOTs. Update, cancel or reprint KOTs when an active order changes.",
    image: chefHandshake,
    alt: "Restaurant kitchen staff coordinating on orders",
    icon: Printer,
    reverse: false,
    portrait: false,
  },
  {
    title: "Offline at the counter, synced when connected",
    body: "Billing, menu access and KOT printing continue during temporary connectivity interruptions. Eligible pending records synchronise when connectivity is available, and the app shows their status.",
    image: serverRoom,
    alt: "Cloud infrastructure syncing restaurant data",
    icon: WifiOff,
    reverse: true,
    portrait: false,
  },
];

const SETUP_STRIP = [
  { icon: WifiOff, label: "Core operations during connectivity interruptions" },
  { icon: Smartphone, label: "Supported Android phones & tablets" },
  { icon: MonitorSmartphone, label: "Touchscreen or keyboard billing" },
  { icon: Printer, label: "Up to two compatible USB, Wi-Fi & Bluetooth printers" },
  { icon: ReceiptText, label: "Tax-computed bills and invoice sharing" },
  { icon: ShieldCheck, label: "Terminal-level access control" },
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
        <div className="container-page pt-20 pb-20 md:pt-28 md:pb-28 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center relative">
          <EntranceReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 backdrop-blur-sm px-3.5 py-1.5 text-xs font-bold text-muted-foreground shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Billing · KOT · Payment recording · Up to 5 terminals — offline-first
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.05] font-black max-w-2xl lg:max-w-3xl">
              Offline-First Restaurant POS <span className="text-brand">Built for</span>{" "}
              <TextShimmer className="hl font-black">Indian Restaurants</TextShimmer>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl lg:max-w-2xl leading-relaxed">
              Create bills, print KOTs, record cash, UPI and card payments, manage menus and keep up
              to five restaurant terminals synchronised — even when the internet is unstable.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticHover strength={0.25}>
                <Link to="/get-started">
                  <ShinyButton variant="brand">
                    Get KhanaBook <ArrowRight className="h-4 w-4" />
                  </ShinyButton>
                </Link>
              </MagneticHover>

              <MagneticHover strength={0.25}>
                <Link to="/features" className="btn-secondary">
                  Explore Features →
                </Link>
              </MagneticHover>
            </div>

            <p className="mt-6 text-xs text-muted-foreground max-w-md">{DISCLAIMERS.pricing}</p>
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
                <NumberTicker value={0} />
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
              <div className="text-[11px] text-muted-foreground font-mono">Direct device control</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR & CORE CAPABILITIES — Horizontal Parallax Marquee */}
      <HorizontalParallax />

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
                Everything that happens between an order landing and the bill closing — handled in one
                app.
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
                Experience the <TextShimmer className="text-brand font-black">Offline POS Engine</TextShimmer> Live
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Test table billing, rapid menu item selection, instant GST calculation, and thermal
                KOT dispatching right now — engineered with 0ms local response.
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
              <div className="w-full rounded-3xl bg-foreground text-background p-10 md:p-16 lg:p-20 text-center relative overflow-hidden shadow-2xl border border-neutral-800">
                <BorderBeam size={340} duration={12} colorFrom="#dc2626" colorTo="#f59e0b" borderWidth={2} />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, var(--brand), transparent 60%)",
                  }}
                />
                <div className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">
                    Ready to run <span className="hl">smarter?</span>
                  </h2>
                  <p className="mt-4 text-background/70 max-w-4xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
                    Get KhanaBook set up for your restaurant — billing, KOT, payments and up to five
                    terminals in one Android app.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
                    <MagneticHover strength={0.3}>
                      <Link to="/get-started">
                        <ShinyButton variant="brand">
                          Get KhanaBook <ArrowRight className="h-4 w-4" />
                        </ShinyButton>
                      </Link>
                    </MagneticHover>

                    <MagneticHover strength={0.3}>
                      <Link to="/blog" className="btn-secondary">
                        Read Our Blog
                      </Link>
                    </MagneticHover>
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
