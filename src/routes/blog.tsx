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
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import chefHandshakeImage from "@/assets/chef-handshake.webp";
import posPhoneImage from "@/assets/pos-phone.webp";
import posTerminalImage from "@/assets/pos-terminal.webp";
import serverRoomImage from "@/assets/server-room.webp";
import { Section } from "@/components/site/Section";
import { PUBLISHED_POSTS, type BlogPost } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — KhanaBook" },
      {
        name: "description",
        content:
          "Guides on offline-first billing, terminal management, KOT printing, payment recording and restaurant inventory.",
      },
      { property: "og:title", content: "KhanaBook Blog" },
      { property: "og:description", content: "Ideas and playbooks for Indian restaurants." },
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
    <Section
      eyebrow="Tips for restaurant owners"
      title={<>KhanaBook <span className="hl">Blog.</span></>}
      desc="Tips and guides to help you run a smarter restaurant."
    >
      <div className="search-premium-wrap">
        <label htmlFor="blog-search" className="sr-only">
          Search articles
        </label>
        <div className="search-premium-glow" aria-hidden="true" />
        <div className="search-premium-box">
          <Search aria-hidden="true" className="search-premium-icon" />
          <input
            id="blog-search"
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="search-premium-input"
          />
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="max-w-2xl mx-auto card-surface text-center text-muted-foreground">
          Articles are being reviewed before publication. Please check back soon.
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="blog-no-results">
          <div className="text-lg font-black text-foreground">No articles found</div>
          <p className="mt-2 text-muted-foreground">Try adjusting your search terms.</p>
        </div>
      ) : (
        <div className="blog-grid-premium">
          {filteredPosts.map((p) => <BlogCard key={p.slug} post={p} />)}
        </div>
      )}

      <div className="text-center mt-14">
        <Link to="/get-started" className="btn-secondary">Explore KhanaBook →</Link>
      </div>
    </Section>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const Icon = CATEGORY_ICON[post.category as keyof typeof CATEGORY_ICON] ?? ReceiptText;
  const image = POST_IMAGE[post.slug];

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="blog-card-premium group"
    >
      <div className="blog-card-media">
        {image ? (
          <img src={image} alt="" loading="lazy" />
        ) : (
          <Icon aria-hidden="true" className="h-8 w-8" />
        )}
        <div className="blog-card-icon">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
      </div>
      <div className="blog-card-body-premium">
        <div className="blog-tag-row">
          <span className="blog-tag">{post.category}</span>
          <span className="blog-read-time">{post.readingTime} min read</span>
        </div>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <div className="blog-read-link">
          Read More <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
