import { createFileRoute, Link } from "@tanstack/react-router";
import posPhone from "@/assets/pos-phone.webp";
import posTerminal from "@/assets/pos-terminal.webp";
import chefHandshake from "@/assets/chef-handshake.webp";
import serverRoom from "@/assets/server-room.webp";
import { Section } from "@/components/site/Section";
import { FAQ } from "@/components/site/FAQ";
import { BUSINESS, DISCLAIMERS, absUrl } from "@/lib/business-config";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KhanaBook — Offline-First Restaurant POS" },
      {
        name: "description",
        content:
          "KhanaBook is an Android restaurant POS for billing, KOT management, payments, menus, inventory, multi-terminal operations and offline-first synchronisation.",
      },
      { property: "og:title", content: "KhanaBook — Offline-First Restaurant POS" },
      {
        property: "og:description",
        content:
          "Billing, KOT, payments and multi-terminal operations that work even when the internet is unstable.",
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
            "Offline-first Android restaurant POS for billing, KOT, payments, menus, inventory and multi-terminal operations.",
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


const FEATURES = [
  {
    title: "Billing & Payments",
    body: "Dine-in, takeaway and online-order workflows. Record cash, UPI, card and split payments. Automatic tax calculation on every bill.",
  },
  {
    title: "Multi-Terminal Operations",
    body: "Each terminal has its own identity and invoice series. Active orders stay isolated; completed data rolls up to restaurant-level reports.",
  },
  {
    title: "Kitchen Operations",
    body: "Generate and print KOTs to Bluetooth or supported printers. Route KOTs across multiple printers. Reprint and update active orders.",
  },
  {
    title: "Offline-First Reliability",
    body: "Billing continues even when the internet is unstable. Data is stored on the device and synchronised automatically when connectivity returns.",
  },
  {
    title: "Menu & Inventory",
    body: "Manage categories, items, prices and variants. Track inventory and get low-stock alerts.",
  },
  {
    title: "Reports & Administration",
    body: "Daily and monthly sales reports, payment-mode breakdown, item-level reports and terminal-aware views.",
  },
];

const RESTAURANT_TYPES = ["Restaurants", "Cafés", "Bakeries", "Cloud kitchens", "Food courts", "Takeaway counters"];

const WORKFLOW = ["Create Order", "Print KOT", "Take Payment", "Generate Bill", "Sync Securely"];

const FAQS = [
  {
    q: "Is KhanaBook free to use?",
    a: DISCLAIMERS.pricing,
  },
  {
    q: "Does KhanaBook work without internet?",
    a: "Yes. Billing, menu access and KOT printing work even when the internet is unstable. Your data is saved locally and synchronises automatically when connectivity returns.",
  },
  {
    q: "How does multi-terminal billing work?",
    a: "Each terminal has its own identity and invoice series. Active orders stay isolated to the terminal handling them, while completed business data becomes available in restaurant-level reports.",
  },
  {
    q: "What hardware do I need?",
    a: "An Android phone or tablet is enough to start. You can optionally pair a supported Bluetooth thermal printer for KOTs and receipts.",
  },
  {
    q: "Does KhanaBook help with GST?",
    a: "Every bill computes tax based on your configured rates. Advanced GST filing and reconciliation are on our roadmap and may be offered as optional services through India Advocacy.",
  },
  {
    q: "Who operates KhanaBook?",
    a: `KhanaBook is developed and operated by ${BUSINESS.legalName}. ${BUSINESS.siblingPlatform} is the company's ${BUSINESS.siblingPlatformDescription}.`,
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
        />
        <div className="container-page pt-20 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-[1.15fr_1fr] gap-12 items-center relative">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-brand" />
              Billing · KOT · Payments · Multi-terminal — offline-first
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.05] font-black max-w-2xl">
              Offline-First Restaurant POS{" "}
              <span className="text-brand">Built for</span>{" "}
              <span className="hl whitespace-nowrap">Multi-Terminal</span> Billing
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Create bills, print KOTs, accept cash, UPI and card payments, manage menus and keep every restaurant terminal synchronised — even when the internet is unstable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/get-started" className="btn-primary">
                Get KhanaBook
              </Link>
              <Link to="/features" className="btn-secondary">
                Explore Features →
              </Link>
            </div>

            <p className="mt-6 text-xs text-muted-foreground max-w-md">
              {DISCLAIMERS.pricing}
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -m-8 rounded-[2.5rem] bg-gradient-to-br from-brand/10 via-transparent to-gold/10 blur-2xl"
            />
            <div className="relative rounded-3xl border border-border bg-surface p-3 shadow-2xl overflow-hidden">
              <img
                src={posPhone}
                alt="KhanaBook billing screen shown on an Android phone in a busy Indian restaurant"
                width={800}
                height={800}
                loading="eager"
                className="w-full h-auto rounded-2xl"
              />
              <div className="mt-3 mb-1 text-[11px] text-muted-foreground text-center">
                Illustrative product mockup — final in-app screenshots coming soon.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RESTAURANT TYPES */}
      <Section
        eyebrow="Who it's for"
        title={<>Built for Indian <span className="hl">food businesses.</span></>}
        desc="Designed for restaurants, cafés, bakeries, cloud kitchens, food courts and takeaway businesses across India."
      >
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {RESTAURANT_TYPES.map((t) => (
            <span key={t} className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold">
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* WORKFLOW */}
      <section className="bg-surface-soft py-24">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="eyebrow mb-3">Workflow</div>
            <h2 className="text-3xl md:text-5xl font-black">
              From order to <span className="hl">sync.</span>
            </h2>
            <p className="mt-3 text-muted-foreground">Fast restaurant billing, from the first tap to the final sync.</p>
          </div>
          <ol className="grid gap-4 md:grid-cols-5">
            {WORKFLOW.map((step, i) => (
              <li key={step} className="card-surface text-center">
                <div className="text-xs font-black text-brand">Step {i + 1}</div>
                <div className="mt-2 font-black">{step}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MULTI-TERMINAL */}
      <Section
        eyebrow="Multi-Terminal"
        title={<>One restaurant. <span className="hl">Many terminals.</span></>}
      >
        <div className="grid gap-10 md:grid-cols-2 items-center max-w-5xl mx-auto">
          <div className="text-lg text-muted-foreground leading-relaxed">
            Each terminal has its own identity and invoice series. Active orders remain isolated to the terminal handling them, while completed business data becomes available in restaurant-level reports.
          </div>
          <div className="rounded-3xl overflow-hidden border border-border shadow-xl">
            <img
              src={posTerminal}
              alt="Branded KhanaBook POS terminal on a restaurant counter"
              width={800}
              height={800}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        </div>
      </Section>

      {/* IN THE RESTAURANT */}
      <section className="py-24">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="eyebrow mb-3">In the restaurant</div>
            <h2 className="text-3xl md:text-5xl font-black">
              Built for real <span className="hl">service floors.</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            <figure className="rounded-3xl overflow-hidden border border-border">
              <img src={chefHandshake} alt="Restaurant staff and chef partnering on service" width={800} height={800} loading="lazy" className="w-full h-auto" />
              <figcaption className="p-4 text-sm text-muted-foreground">Designed with restaurant teams, for restaurant teams.</figcaption>
            </figure>
            <figure className="rounded-3xl overflow-hidden border border-border">
              <img src={serverRoom} alt="Cloud infrastructure that quietly synchronises when connectivity returns" width={800} height={800} loading="lazy" className="w-full h-auto" />
              <figcaption className="p-4 text-sm text-muted-foreground">Offline-first at the counter, cloud-backed for reports.</figcaption>
            </figure>
          </div>
        </div>
      </section>


      {/* FEATURES */}
      <section className="bg-surface-soft py-24">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="eyebrow mb-3">Core Features</div>
            <h2 className="text-3xl md:text-5xl font-black">
              Everything to run a <span className="hl">modern restaurant.</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card-surface hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-lg font-black mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/features" className="btn-secondary">View all features →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Section
        eyebrow="FAQ"
        title={<>Common <span className="hl">questions.</span></>}
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
              style={{ background: "radial-gradient(circle at 30% 30%, var(--brand), transparent 60%)" }}
            />
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-black">
                Ready to run <span className="hl">smarter?</span>
              </h2>
              <p className="mt-4 text-background/70 max-w-xl mx-auto">
                Get KhanaBook set up for your restaurant — billing, KOT, payments and multi-terminal operations in one Android app.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/get-started" className="btn-primary">Get KhanaBook</Link>
                <Link to="/blog" className="btn-secondary">Read Our Blog</Link>
              </div>
              <p className="mt-6 text-xs text-background/60 max-w-lg mx-auto">
                KhanaBook is a product of {BUSINESS.legalName}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
