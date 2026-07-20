import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { BUSINESS, absUrl } from "@/lib/business-config";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${BUSINESS.productName}` },
      {
        name: "description",
        content: `${BUSINESS.productName} is a restaurant POS product built by ${BUSINESS.legalName} for Indian restaurant operating conditions.`,
      },
      { property: "og:title", content: `About — ${BUSINESS.productName}` },
      { property: "og:description", content: "Who operates KhanaBook and why we built it." },
      { property: "og:url", content: absUrl("/about") },
    ],
    links: [{ rel: "canonical", href: absUrl("/about") }],
  }),
  component: AboutPage,
});


function AboutPage() {
  return (
    <Section
      eyebrow="About"
      title={<>Built for Indian <span className="hl">restaurants.</span></>}
      desc="Because restaurants deserve technology that just works — even when the internet doesn't."
    >
      <div className="max-w-3xl mx-auto space-y-10 text-lg leading-relaxed text-muted-foreground">
        <div>
          <h2 className="text-xl font-black text-foreground mb-3">Why KhanaBook exists</h2>
          <p>
            Restaurants across India work in demanding conditions — patchy internet, multiple terminals, long service hours, mixed payment methods and constant menu changes. Most billing systems weren't designed for that reality. KhanaBook was.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-foreground mb-3">What KhanaBook solves</h2>
          <p>
            KhanaBook brings billing, KOT management, payment recording, menu, inventory and up to five synchronised terminals into one Android app that keeps working even when the internet is unstable, and quietly synchronises when it isn't.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-foreground mb-3">Who operates KhanaBook</h2>
          <p>
            <strong className="text-foreground">{BUSINESS.legalName}</strong> is the legal entity that develops and operates KhanaBook. KhanaBook is its restaurant POS and restaurant-management product. <strong className="text-foreground">{BUSINESS.siblingPlatform}</strong> is the company's {BUSINESS.siblingPlatformDescription}, offered as optional services to KhanaBook customers.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-foreground mb-3">Our approach to restaurant technology</h2>
          <p>
            Offline-first reliability and multi-terminal correctness are central product principles. Features ship when they genuinely work in a busy service, not before. Where partner services are involved, we say so clearly.
          </p>
        </div>
      </div>
    </Section>
  );
}
