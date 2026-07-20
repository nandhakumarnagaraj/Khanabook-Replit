export type FeatureItem = {
  name: string;
  body: string;
  status?: "coming-soon" | "beta" | "optional";
};

export const FEATURE_GROUPS: { id: string; title: string; items: FeatureItem[] }[] = [
  {
    id: "billing-payments",
    title: "Billing & Payments",
    items: [
      {
        name: "Dine-in, takeaway and manual online-order recording",
        body: "Handle common restaurant order types in one flow. Online orders are recorded manually as an order source.",
      },
      {
        name: "Pay-before and pay-after workflows",
        body: "Use the service flow that fits your counter or table operation.",
      },
      {
        name: "Cash, UPI, card and split-payment recording",
        body: "Record each payment mode on a bill, including split payments.",
      },
      {
        name: "Automatic tax calculation",
        body: "Tax is computed automatically from the rates configured for each item.",
      },
      {
        name: "Invoice sharing",
        body: "Create a PDF invoice and share it through WhatsApp or SMS using services available on the device.",
      },
      {
        name: "Integrated payment collection",
        body: "Direct payment-gateway processing and verification from within the app.",
        status: "coming-soon",
      },
    ],
  },
  {
    id: "multi-terminal",
    title: "Multi-Terminal Operations",
    items: [
      {
        name: "Up to five approved Android terminals",
        body: "Each approved device operates as its own terminal with its own settings.",
      },
      {
        name: "Terminal-specific invoice series",
        body: "Invoice numbers remain separate across terminals.",
      },
      {
        name: "Per-terminal daily order counters",
        body: "Each terminal maintains its own daily order sequence.",
      },
      {
        name: "Isolated active orders and drafts",
        body: "Draft and active orders stay on the terminal handling them.",
      },
      {
        name: "Background synchronisation with visible status",
        body: "Eligible completed records sync when connectivity is available, with status shown in the app.",
      },
      {
        name: "Restaurant-level reporting",
        body: "Consolidated reports include finalised records after terminals synchronise.",
      },
    ],
  },
  {
    id: "kitchen",
    title: "Kitchen Operations",
    items: [
      { name: "KOT generation", body: "Create Kitchen Order Tickets from the order screen." },
      {
        name: "Dedicated KOT printer",
        body: "Print KOTs on a configured compatible Bluetooth thermal printer.",
      },
      {
        name: "Dual-printer support",
        body: "Connect up to two compatible Bluetooth thermal printers: one for customer receipts and one for KOTs.",
      },
      {
        name: "KOT updates and reprints",
        body: "Update, cancel or reprint tickets when an active order changes.",
      },
      { name: "Active-order tracking", body: "Review open orders during service." },
    ],
  },
  {
    id: "offline-first",
    title: "Offline-First Reliability",
    items: [
      {
        name: "Billing during connectivity interruptions",
        body: "Continue core counter operations when the internet is temporarily unavailable.",
      },
      {
        name: "Local database storage",
        body: "Bills, menus and related operational records are stored on the Android device.",
      },
      {
        name: "Automatic synchronisation",
        body: "Eligible pending data synchronises when connectivity is available.",
      },
      {
        name: "Retry and sync-status handling",
        body: "Use the visible status to identify pending or failed synchronisation.",
      },
    ],
  },
  {
    id: "menu-inventory",
    title: "Menu & Inventory",
    items: [
      {
        name: "Categories, items, prices and variants",
        body: "Structure the menu around the restaurant's categories and item options.",
      },
      { name: "Inventory tracking", body: "Track stock levels tied to menu items." },
      {
        name: "Low-stock alerts",
        body: "Identify items that have reached configured low-stock levels.",
      },
      {
        name: "On-device menu photo import",
        body: "Use Android on-device OCR to suggest item names and prices from a menu photo, then review them before saving.",
        status: "beta",
      },
    ],
  },
  {
    id: "reports",
    title: "Reports & Administration",
    items: [
      {
        name: "Daily and monthly sales reports",
        body: "Review restaurant performance by supported reporting period.",
      },
      {
        name: "Payment-mode breakdown",
        body: "Review the recorded mix across cash, UPI and card.",
      },
      { name: "Item-level reports", body: "Compare sales performance across menu items." },
      {
        name: "Terminal-aware reporting",
        body: "Attribute finalised sales to the terminal that handled them after synchronisation.",
      },
      {
        name: "PDF and CSV exports",
        body: "Export supported report data for sharing or further analysis.",
      },
      {
        name: "Restaurant settings",
        body: "Manage tax rates, printer assignments, terminal identity and related configuration.",
      },
    ],
  },
  {
    id: "compliance",
    title: "Compliance & Partner Services",
    items: [
      {
        name: "GST reconciliation and filing support",
        body: "Optional assistance with reconciling sales data and GST returns.",
        status: "optional",
      },
      {
        name: "FSSAI and licence assistance",
        body: "Optional support with FSSAI and other applicable registrations.",
        status: "optional",
      },
      {
        name: "Accountant web login",
        body: "Give an accountant read-only web access to supported restaurant reports through the KhanaBook web portal at kbook.iadv.cloud.",
      },
    ],
  },
];

export const STATUS_LABEL: Record<NonNullable<FeatureItem["status"]>, string> = {
  "coming-soon": "Coming soon",
  beta: "Beta",
  optional: "Optional service",
};
