import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Mail,
  MessageSquare,
  Phone,
  Rocket,
  Search,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import posTerminalImage from "@/assets/pos-terminal.webp";
import { Section } from "@/components/site/Section";
import { HelpGuides } from "@/components/site/HelpGuides";
import { BUSINESS, absUrl } from "@/lib/business-config";
import { HELP_TOPICS, HELP_FAQS } from "@/lib/help-data";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center — KhanaBook" },
      { name: "description", content: "Answers to common questions about setting up and running KhanaBook." },
      { property: "og:title", content: "KhanaBook Help Center" },
      { property: "og:description", content: "Setup guides and troubleshooting for the KhanaBook POS." },
      { property: "og:url", content: absUrl("/help") },
    ],
    links: [{ rel: "canonical", href: absUrl("/help") }],
  }),
  component: HelpPage,
});

function HelpPage() {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HELP_FAQS;
    return HELP_FAQS.filter((item) => [item.q, item.a].some((value) => value.toLowerCase().includes(q)));
  }, [query]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <>
      <Section
        eyebrow="We're here to help"
        title={<>How can we <span className="hl">help?</span></>}
        desc="Setup guides, troubleshooting, and anything else you need to get the most out of KhanaBook."
      >
        <div className="search-premium-wrap" role="search">
          <div className="search-premium-glow" aria-hidden="true" />
          <div className="search-premium-box">
            <Search aria-hidden="true" className="search-premium-icon" />
            <input
              ref={searchRef}
              id="help-search"
              className="search-premium-input"
              type="search"
              placeholder="Search: printer setup, payments, reports..."
              aria-label="Search help articles"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <kbd className="search-premium-kbd" aria-hidden="true">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </div>
        </div>

        <div className="help-bento">
          {HELP_TOPICS.map((topic) => {
            const Icon = topic.icon;
            return (
              <section key={topic.title} className={`help-card${topic.wide ? " wide" : ""}`}>
                <div className="help-card-copy">
                  <div className="help-icon">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3>{topic.title}</h3>
                  <p>{topic.desc}</p>
                  <ul className="help-list">
                    {topic.items.map((item) => (
                      <li key={item}>
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to={topic.cta.to} className="help-link">
                    {topic.cta.label} <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
                {topic.wide ? (
                  <img
                    src={posTerminalImage}
                    alt=""
                    loading="lazy"
                    className="help-card-image"
                  />
                ) : null}
              </section>
            );
          })}
        </div>
      </Section>

      {/* SETUP GUIDES */}
      <Section
        eyebrow="Step-by-step"
        title={<>Setup <span className="hl">guides.</span></>}
        desc="Follow these guides to get your restaurant running on KhanaBook."
      >
        <HelpGuides />
      </Section>

      <section className="help-support-band">
        <div className="container-page">
          <div className="contact-section">
            <div className="contact-card">
              <h2>Still need help?</h2>
              <p>Our support team is ready to assist with technical issues or billing questions.</p>

              <a href="/get-started" className="contact-row">
                <div className="contact-row-left">
                  <div className="contact-row-icon green">
                    <MessageSquare aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div>
                    <h4>Request a Demo</h4>
                    <p>Speak with our sales team</p>
                  </div>
                </div>
                <ArrowRight aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
              </a>

              <a href={`mailto:${BUSINESS.supportEmail}`} className="contact-row">
                <div className="contact-row-left">
                  <div className="contact-row-icon violet">
                    <Mail aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div>
                    <h4>Email Support</h4>
                    <p>{BUSINESS.supportEmail}</p>
                  </div>
                </div>
                <ArrowRight aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
              </a>

              <a href={`tel:${BUSINESS.supportPhone}`} className="contact-row">
                <div className="contact-row-left">
                  <div className="contact-row-icon violet">
                    <Phone aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div>
                    <h4>Phone Support</h4>
                    <p>{BUSINESS.supportPhone} · {BUSINESS.workingHours}</p>
                  </div>
                </div>
                <ArrowRight aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
              </a>
            </div>

            <div className="community-card">
              <h2>Join the KhanaBook community</h2>
              <p>Share tips, request features, and stay in the loop on what is coming next.</p>
              <Link to="/get-started" className="btn-primary w-full justify-center">
                <Users aria-hidden="true" className="h-4 w-4" />
                Join the community
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Frequently asked"
        title={<>Common <span className="hl">questions.</span></>}
        desc="Search the most common setup and support questions below."
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item) => (
              <details key={item.q} className="rounded-xl border border-border bg-surface">
                <summary className="cursor-pointer list-none px-5 py-4 font-bold flex items-center justify-between gap-4">
                  <span>{item.q}</span>
                  <span aria-hidden="true" className="text-brand">+</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{item.a}</div>
              </details>
            ))
          ) : (
            <div className="blog-no-results">
              <div className="text-lg font-black text-foreground">No articles found</div>
              <p className="mt-2 text-muted-foreground">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </Section>

      <section className="cta-banner">
        <div className="cta-banner-inner">
          <div className="cta-banner-eyebrow">Still have questions?</div>
          <h2 className="cta-banner-title">
            We&apos;ll get back to you<br />
            <span className="hl">as soon as we can.</span>
          </h2>
          <p className="cta-banner-sub">Or just download the app and explore — currently no software subscription.</p>
          <div className="cta-banner-actions">
            <a href={`mailto:${BUSINESS.supportEmail}`} className="cta-btn-light">
              Contact Support
            </a>
            <Link to="/get-started" className="cta-btn-ghost">
              <Rocket aria-hidden="true" className="h-4 w-4" />
              Get Started — No Subscription
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
