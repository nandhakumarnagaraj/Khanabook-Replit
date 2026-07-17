export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
  category: string;
  readingTime: number;
  content: string[];
  // Draft articles are hidden from listings and the sitemap, and served with
  // a noindex meta tag. Only "published" posts are indexable.
  status: "draft" | "published";
};

// Draft articles. Verify factual claims against the shipped app before publishing.
// Dates left un-set until content is reviewed and dated at publish time.
export const POSTS: BlogPost[] = [
  {
    slug: "why-offline-first-billing-matters",
    title: "Why offline-first billing matters for Indian restaurants",
    description:
      "Why treating the local device as the source of truth keeps billing running when the network doesn't.",
    author: "KhanaBook Team",
    publishedDate: "",
    updatedDate: "",
    category: "Operations",
    readingTime: 5,
    status: "draft",
    content: [
      "Restaurant internet can be unreliable during peak service — routers overheat, ISPs blip, tethering plans throttle. A POS that stops working when the internet does costs the restaurant more than the subscription it saves.",
      "Offline-first billing means the app treats the local device as the source of truth for an in-progress order. Bills can be created, KOTs can be printed and payments can be recorded without a network call.",
      "When the internet returns, completed orders are synchronised in the background. The staff experience does not change — only the sync indicator does.",
    ],
  },
  {
    slug: "multi-terminal-restaurant-billing",
    title: "How multi-terminal restaurant billing should work",
    description:
      "A short guide to terminal identity, invoice series and why isolating active orders prevents chaos on a busy floor.",
    author: "KhanaBook Team",
    publishedDate: "",
    updatedDate: "",
    category: "Product",
    readingTime: 6,
    status: "draft",
    content: [
      "In a restaurant with more than one billing counter, each device should behave as its own terminal. That means a distinct terminal ID, a separate invoice series and its own set of active orders.",
      "Isolating active orders per terminal avoids two cashiers editing the same draft. Once an order is finalised, the completed data rolls up to a single restaurant-level view for reporting.",
      "Terminal-specific invoice series also make audits cleaner — every invoice can be traced back to the device that produced it.",
    ],
  },
  {
    slug: "practical-guide-to-kot-printing",
    title: "A practical guide to KOT printing",
    description:
      "How to route Kitchen Order Tickets across multiple printers without confusing the kitchen.",
    author: "KhanaBook Team",
    publishedDate: "",
    updatedDate: "",
    category: "Kitchen",
    readingTime: 4,
    status: "draft",
    content: [
      "A Kitchen Order Ticket (KOT) is a short instruction to the kitchen. Good KOTs are legible, arrive at the right station and can be reprinted without duplicating the order.",
      "For restaurants with more than one section — tandoor, curry, dessert — configure a separate printer per station and route items to the right one at menu-item level.",
      "Reprints should be marked clearly so the kitchen doesn't cook the same item twice.",
    ],
  },
  {
    slug: "cash-upi-card-split-payments",
    title: "Cash, UPI, card and split-payment workflows",
    description: "How to record mixed payments cleanly on a single bill.",
    author: "KhanaBook Team",
    publishedDate: "",
    updatedDate: "",
    category: "Payments",
    readingTime: 4,
    status: "draft",
    content: [
      "Split payments are common in Indian restaurants — one guest pays UPI, another pays cash. The POS should accept the split without forcing you to void the bill and start over.",
      "Record each portion against its method so reports reflect the real payment mix, not a rounded-off single mode.",
      "Where a payment gateway is used, keep the gateway reference on the bill for later reconciliation.",
    ],
  },
  {
    slug: "restaurant-inventory-low-stock",
    title: "Restaurant inventory and low-stock tracking",
    description: "A simple approach to inventory that doesn't slow down billing.",
    author: "KhanaBook Team",
    publishedDate: "",
    updatedDate: "",
    category: "Inventory",
    readingTime: 5,
    status: "draft",
    content: [
      "Restaurant inventory doesn't need to be enterprise-grade to be useful. Start by tracking the ingredients or items that stock out most often.",
      "Where the POS supports it, tie inventory to menu items so a sale can decrement stock. Use low-stock thresholds as reminders, not blockers.",
      "Reconcile physical stock weekly, not daily — the goal is fewer stock-outs during service, not perfect real-time counts.",
    ],
  },
  {
    slug: "terminal-specific-invoice-series",
    title: "Understanding terminal-specific invoice series",
    description:
      "Why every terminal benefits from its own invoice series and how it simplifies audits.",
    author: "KhanaBook Team",
    publishedDate: "",
    updatedDate: "",
    category: "Compliance",
    readingTime: 5,
    status: "draft",
    content: [
      "When multiple terminals share one invoice series, gaps and duplicates are easy — especially if the network drops mid-service.",
      "Assigning each terminal its own series avoids conflicts. Reports can still aggregate across terminals for restaurant-level reporting.",
      "For audits, being able to say 'this invoice came from Terminal 2' is faster and cleaner than reverse-engineering it from timestamps.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export const PUBLISHED_POSTS = POSTS.filter((p) => p.status === "published");
