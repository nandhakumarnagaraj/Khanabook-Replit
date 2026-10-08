import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  CreditCard,
  MonitorSmartphone,
  Printer,
  ReceiptText,
  Search,
  Settings2,
  WifiOff,
  Smartphone,
  Cloud,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import chefHandshakeImage from "@/assets/chef-handshake.webp";
import posPhoneImage from "@/assets/pos-phone.webp";
import posTerminalImage from "@/assets/pos-terminal.webp";
import serverRoomImage from "@/assets/server-room.webp";
import { PUBLISHED_POSTS, type BlogPost } from "@/lib/blog-posts";
import { EntranceReveal } from "@/components/motion/EntranceReveal";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      {
        title: "Blog — KhanaBook Offline-First Multi-Terminal POS | Android App & Web Dashboard",
      },
      {
        name: "description",
        content:
          "Playbooks on offline-first billing, multi-terminal management, KOT printing, and Web Dashboard management for Indian restaurants.",
      },
      { property: "og:title", content: "KhanaBook Engineering & Restaurant Guides" },
      { property: "og:description", content: "Actionable ideas for restaurant owners." },
    ],
  }),
  component: BlogPage,
});

const CATEGORY_ICON = {
  Operations: WifiOff,
  Product: MonitorSmartphone,
  Kitchen: Printer,
  Payments: CreditCard,
  Inventory: Boxes,
  Compliance: ReceiptText,
  Hardware: Settings2,
} as const;

const POST_IMAGE: Record<string, string> = {
  "why-offline-first-billing-matters": serverRoomImage,
  "multi-terminal-restaurant-billing": posTerminalImage,
  "practical-guide-to-kot-printing": chefHandshakeImage,
  "cash-upi-card-split-payments": posPhoneImage,
  "restaurant-inventory-low-stock": posTerminalImage,
  "terminal-specific-invoice-series": serverRoomImage,
  "choosing-restaurant-pos-hardware": posTerminalImage,
};

function BlogPage() {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const posts = PUBLISHED_POSTS;

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      [p.title, p.description, p.category].some((value) => value.toLowerCase().includes(q)),
    );
  }, [posts, query]);

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

  if (pathname !== "/blog") {
    return <Outlet />;
  }

  return (
    <div className="bg-[#131314] text-white min-h-screen font-['Google_Sans',_sans-serif] selection:bg-brand/30 selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16 border-b border-[#28292A]">
        {/* Subtle Ambient Light */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-brand/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"
        />

        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10 text-center">
          <EntranceReveal direction="up" delay={0.05}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1E1F20] px-4 py-1.5 text-xs font-semibold text-gray-300 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              RESTAURANT ENGINEERING & PLAYBOOKS
            </div>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.15}>
            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              KhanaBook <span className="hl">Engineering Blog.</span>
            </h1>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.25}>
            <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Technical breakdowns, offline architecture deep dives, and operational playbooks to
              run faster restaurants.
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
                  placeholder="Search articles: offline sync, KOT printers, multi-terminal..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>
          </EntranceReveal>
        </div>
      </section>

      {/* 2. BLOG POSTS GRID */}
      <section className="py-14 md:py-20 border-b border-[#28292A]">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          {posts.length === 0 ? (
            <div className="max-w-2xl mx-auto rounded-2xl border border-white/10 bg-[#1E1F20] p-8 text-center text-gray-400">
              Articles are being reviewed before publication. Please check back soon.
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-8 text-center text-gray-400">
              No articles found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          )}

          <div className="text-center mt-14">
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#1E1F20] px-6 py-3 text-xs font-bold text-white hover:bg-white/10 transition-all"
            >
              Get KhanaBook for Your Restaurant →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const Icon = CATEGORY_ICON[post.category as keyof typeof CATEGORY_ICON] ?? ReceiptText;
  const image = POST_IMAGE[post.slug];

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group rounded-2xl border border-white/10 bg-[#1E1F20] overflow-hidden hover:border-brand/40 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="relative aspect-video w-full overflow-hidden bg-[#28292A]">
          {image ? (
            <img
              src={image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-500">
              <Icon className="h-10 w-10" />
            </div>
          )}
          <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-[#131314]/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white">
            {post.category}
          </div>
        </div>

        <div className="p-6">
          <div className="text-[11px] text-gray-400 mb-2">{post.readingTime} min read</div>
          <h2 className="text-lg font-bold text-white leading-snug group-hover:text-brand transition-colors">
            {post.title}
          </h2>
          <p className="mt-2 text-xs text-gray-400 leading-relaxed line-clamp-3">
            {post.description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand group-hover:underline">
          Read Guide <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
