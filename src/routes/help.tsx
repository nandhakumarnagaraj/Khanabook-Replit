import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Mail,
  MessageSquare,
  Phone,
  Rocket,
  Search,
  Users,
  Smartphone,
  Cloud,
  Printer,
  WifiOff,
  ChevronDown,
  ExternalLink,
  Download,
  BookOpen,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import posTerminalImage from "@/assets/pos-terminal.webp";
import { HelpGuides } from "@/components/site/HelpGuides";
import { BUSINESS, absUrl } from "@/lib/business-config";
import { HELP_TOPICS, HELP_FAQS } from "@/lib/help-data";
import { EntranceReveal } from "@/components/motion/EntranceReveal";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      {
        title:
          "Help Center — KhanaBook Offline-First Multi-Terminal POS | Android App & Web Dashboard",
      },
      {
        name: "description",
        content:
          "Setup guides and troubleshooting for KhanaBook offline-first restaurant POS. Learn how to configure Android terminals, connect ESC/POS thermal printers, and use the Cloud Web Dashboard.",
      },
      { property: "og:title", content: "KhanaBook Help Center & Setup Guides" },
      { property: "og:url", content: absUrl("/help") },
    ],
    links: [{ rel: "canonical", href: absUrl("/help") }],
  }),
  component: HelpPage,
});

function HelpPage() {
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HELP_FAQS;
    return HELP_FAQS.filter((item) =>
      [item.q, item.a].some((value) => value.toLowerCase().includes(q)),
    );
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

  const whatsappNumber = BUSINESS.supportPhone.replace(/[^0-9]/g, "");

  return (
    <div className="bg-[#131314] text-white min-h-screen font-['Google_Sans',_sans-serif] selection:bg-brand/30 selection:text-white">
      {/* 1. HERO SECTION & SEARCH */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16 border-b border-[#28292A]">
        {/* Subtle Ambient Light */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-brand/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10 text-center">
          <EntranceReveal direction="up" delay={0.05}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1E1F20] px-4 py-1.5 text-xs font-semibold text-gray-300 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              DOCUMENTATION & KNOWLEDGE BASE • ANDROID APP & WEB DASHBOARD
            </div>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.15}>
            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              How Can We <span className="hl">Help You Today?</span>
            </h1>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.25}>
            <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Step-by-step guides for Android POS terminal setup, ESC/POS printer routing, multi-terminal peer sync, and Cloud Web Dashboard management.
            </p>
          </EntranceReveal>

          {/* SEARCH BAR */}
          <EntranceReveal direction="up" delay={0.35}>
            <div className="mt-8 max-w-2xl mx-auto relative">
              <div className="relative flex items-center rounded-2xl border border-white/20 bg-[#1E1F20] shadow-xl overflow-hidden focus-within:border-brand transition-all">
                <Search className="h-5 w-5 text-gray-400 ml-4 shrink-0" />
                <input
                  ref={searchRef}
                  type="search"
                  placeholder="Search articles: ESC/POS printer setup, Web Dashboard login, multi-terminal sync..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 mr-4 rounded-lg border border-white/10 bg-[#28292A] px-2 py-1 text-[10px] text-gray-400">
                  <span>⌘</span>K
                </kbd>
              </div>
            </div>
          </EntranceReveal>
        </div>
      </section>

      {/* 2. CORE SETUP PILLARS BENTO */}
      <section className="py-14 md:py-20 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand">
              Essential Topics
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Browse Guides by <span className="hl">Operational Area.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HELP_TOPICS.map((topic) => {
              const Icon = topic.icon;
              return (
                <div
                  key={topic.title}
                  className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6 flex flex-col justify-between hover:border-brand/40 transition-all"
                >
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{topic.title}</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">{topic.desc}</p>

                    <ul className="mt-4 space-y-2 border-t border-white/5 pt-3">
                      {topic.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-gray-300">
                          <ArrowRight className="h-3 w-3 text-brand shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/10">
                    <Link
                      to={topic.cta.to}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                    >
                      {topic.cta.label} →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP SETUP GUIDES */}
      <section className="py-14 md:py-20 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand">
              Interactive Walkthroughs
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Step-by-Step <span className="hl">Installation Guides.</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Follow these verified walkthroughs to get your Android terminals and thermal printers running.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6 sm:p-8">
            <HelpGuides />
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-14 md:py-20 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Troubleshooting & <span className="hl">Setup FAQs.</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={item.q}
                    className="rounded-xl border border-white/10 bg-[#1E1F20] overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full px-5 py-4 text-left font-bold text-white flex items-center justify-between gap-4 hover:bg-white/[0.02]"
                    >
                      <span className="text-sm">{item.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-brand shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-8 text-center text-gray-400">
                <p>No results found for &ldquo;{query}&rdquo;. Try another search term or contact our support team.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. DIRECT SUPPORT CHANNELS */}
      <section className="py-16 md:py-24 text-center">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Still Have Questions? <span className="hl">Talk with Engineers.</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
            Our deployment team is available via Phone, WhatsApp, and Email during operating hours.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 text-xs font-bold transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp Support
            </a>
            <a
              href={`tel:${BUSINESS.supportPhone}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#1E1F20] hover:bg-white/10 text-white px-6 py-3 text-xs font-bold transition-all"
            >
              <Phone className="h-4 w-4 text-brand" />
              Call {BUSINESS.supportPhone}
            </a>
            <a
              href={`mailto:${BUSINESS.supportEmail}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#1E1F20] hover:bg-white/10 text-white px-6 py-3 text-xs font-bold transition-all"
            >
              <Mail className="h-4 w-4 text-blue-400" />
              Email {BUSINESS.supportEmail}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
