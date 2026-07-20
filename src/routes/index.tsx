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
} from "lucide-react";
import posTerminal from "@/assets/pos-terminal.webp";
import chefHandshake from "@/assets/chef-handshake.webp";
import serverRoom from "@/assets/server-room.webp";
import appHome from "@/assets/app-home.png";
import appBilling from "@/assets/app-billing.png";
import { Section } from "@/components/site/Section";
import { FAQ } from "@/components/site/FAQ";
import { ProductTabs } from "@/components/site/ProductTabs";
import { BUSINESS, DISCLAIMERS, absUrl } from "@/lib/business-config";
import { RESTAURANT_TYPES, FAQS } from "@/lib/home-data";
import { FEATURE_GROUPS } from "@/lib/features-data";
import { PUBLISHED_POSTS } from "@/lib/blog-posts";

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
    body: "Connect up to two compatible Bluetooth thermal printers—one for customer receipts and one for KOTs. Update, cancel or reprint KOTs when an active order changes.",
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
  { icon: Printer, label: "Up to two compatible Bluetooth printers" },
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
        <div className="container-page pt-20 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-[1.15fr_1fr] gap-12 items-center relative">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-muted-foreground">
              <Wifi aria-hidden className="h-3.5 w-3.5 text-brand" />
              Billing · KOT · Payment recording · Up to 5 terminals — offline-first
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.05] font-black max-w-2xl">
              Offline-First Restaurant POS <span className="text-brand">Built for</span>{" "}
              <span className="hl">Indian Restaurants</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Create bills, print KOTs, record cash, UPI and card payments, manage menus and keep up
              to five restaurant terminals synchronised — even when the internet is unstable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/get-started" className="btn-primary">
                Get KhanaBook
              </Link>
              <Link to="/features" className="btn-secondary">
                Explore Features →
              </Link>
            </div>

            <p className="mt-6 text-xs text-muted-foreground max-w-md">{DISCLAIMERS.pricing}</p>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -m-8 rounded-[2.5rem] bg-gradient-to-br from-brand/10 via-transparent to-gold/10 blur-2xl"
            />
            <div className="relative flex justify-center overflow-hidden rounded-3xl border border-border bg-surface-soft p-4 shadow-2xl">
              <img
                src={appHome}
                alt="KhanaBook Android app home screen"
                width={720}
                height={1600}
                loading="eager"
                className="max-h-[42rem] w-auto max-w-full rounded-2xl object-contain"
              />
            </div>
            <div
              aria-hidden
              className="hidden md:flex absolute -left-8 top-8 items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl"
            >
              <WifiOff className="h-4 w-4 text-brand" />
              <span className="text-xs font-bold">Billing stays on, network or not</span>
            </div>
            <div
              aria-hidden
              className="hidden md:flex absolute -right-6 bottom-10 items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl"
            >
              <IndianRupee className="h-4 w-4 text-gold-dark" />
              <span className="text-xs font-bold">₹0 to start</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR — compact strip */}
      <section className="py-10 border-b border-border">
        <div className="container-page">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
            Built for restaurants, cafés, cloud kitchens and more
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {RESTAURANT_TYPES.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* AN ALL-ROUNDER RESTAURANT POS — alternating story blocks */}
      <section className="py-24">
        <div className="container-page">
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

          <div className="space-y-16 md:space-y-20">
            {STORY_BLOCKS.map((block) => {
              const Icon = block.icon;
              return (
                <div
                  key={block.title}
                  className={`grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto ${
                    block.reverse ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <span className="icon-badge h-12 w-12 mb-4">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <h3 className="text-2xl font-black mb-3">{block.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{block.body}</p>
                  </div>
                  <div
                    className={`rounded-3xl overflow-hidden border border-border shadow-xl ${
                      block.portrait
                        ? "flex min-h-[34rem] items-center justify-center bg-surface-soft p-4"
                        : ""
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
                          ? "max-h-[38rem] w-auto max-w-full rounded-xl object-contain"
                          : "h-auto w-full"
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORKS WITH YOUR SETUP */}
      <section className="bg-surface-soft py-24">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="eyebrow mb-3">Quick & simple</div>
            <h2 className="text-3xl md:text-5xl font-black">
              Works with the setup <span className="hl">you already have.</span>
            </h2>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto">
            {SETUP_STRIP.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="card-surface flex flex-col items-center text-center gap-3 py-8"
              >
                <span className="icon-badge h-12 w-12 rounded-full">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <p className="text-sm font-bold">{label}</p>
              </div>
            ))}
          </div>
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
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
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
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
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

      {/* FAQ */}
      <Section
        eyebrow="FAQ"
        title={
          <>
            Common <span className="hl">questions.</span>
          </>
        }
      >
        <div id="faq">
          <FAQ items={FAQS} />
        </div>
      </Section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-page">
          <div className="rounded-3xl bg-foreground text-background p-10 md:p-16 text-center relative overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{
                background: "radial-gradient(circle at 30% 30%, var(--brand), transparent 60%)",
              }}
            />
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-black">
                Ready to run <span className="hl">smarter?</span>
              </h2>
              <p className="mt-4 text-background/70 max-w-xl mx-auto">
                Get KhanaBook set up for your restaurant — billing, KOT, payments and up to five
                terminals in one Android app.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/get-started" className="btn-primary">
                  Get KhanaBook
                </Link>
                <Link to="/blog" className="btn-secondary">
                  Read Our Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
