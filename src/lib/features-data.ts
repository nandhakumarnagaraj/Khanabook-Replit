export type FeatureItem = {
  name: string;
  body: string;
  status?: "coming-soon" | "beta" | "optional";
};

export const FEATURE_GROUPS: { id: string; title: string; items: FeatureItem[] }[] = [
  {
    id: "billing-payments",
    title: "High-Speed Billing & Payment Operations",
    items: [
      {
        name: "3-Second Fast Billing & Smart Search",
        body: "Punch orders in seconds with rapid touch search, category grids, barcode scanning, and customizable item modifier groups.",
      },
      {
        name: "Dine-In, Takeaway & Delivery Workflows",
        body: "Handle dine-in table mapping, quick-service counter tokens, and delivery orders with customized pay-before or pay-after workflows.",
      },
      {
        name: "Table Operations & Bill Splitting",
        body: "Shift tables, merge running bills, apply customer discounts, and split payments by item, seat, or custom amounts right at the counter.",
      },
      {
        name: "Dynamic UPI QR & Split Payments",
        body: "Print dynamic UPI payment QR codes on customer bills and record split payments across Cash, UPI, Card, and Customer Credit with zero manual math.",
      },
      {
        name: "Automated GST Calculation (CGST/SGST)",
        body: "Configurable tax slabs compute GST automatically for food, beverages, and AC dining, complete with HSN/SAC code compliance.",
      },
      {
        name: "Paperless WhatsApp & SMS Invoice Sharing",
        body: "Generate professional digital PDF invoices and share them instantly via WhatsApp or SMS, saving expensive thermal paper rolls.",
      },
      {
        name: "Integrated Payment Gateway Collection",
        body: "Direct in-app bank gateway processing and real-time payment status verification from within the POS terminal.",
        status: "coming-soon",
      },
    ],
  },
  {
    id: "multi-terminal",
    title: "Multi-Terminal Wi-Fi Mesh Synchronization",
    items: [
      {
        name: "Up to 5 Synchronized Android Terminals",
        body: "Connect up to 5 Android phones or tablets per restaurant simultaneously—allowing stewards to take orders table-side while the cashier bills at the counter.",
      },
      {
        name: "Local Wi-Fi Mesh (Zero Broadband Dependency)",
        body: "Terminals synchronize orders locally over your Wi-Fi router in real time, even if the external broadband internet connection is completely down.",
      },
      {
        name: "Independent GST Invoice Series per Terminal",
        body: "Each terminal maintains its own sequence of invoice numbers and daily order counters, eliminating duplicate bill numbers and tax audit issues.",
      },
      {
        name: "Isolated Draft Orders & Collision Prevention",
        body: "Running drafts and active table orders stay isolated on the handling terminal until committed, preventing cashier and steward order overwrites.",
      },
      {
        name: "Background Cloud Sync with Live Telemetry",
        body: "Settled orders silently upload to the cloud infrastructure when internet connectivity is active, displaying visible sync telemetry in the app.",
      },
      {
        name: "Outlet-Level Consolidated Reporting",
        body: "The Web Dashboard consolidates sales, taxes, and item velocities across all terminals into unified management summaries.",
      },
    ],
  },
  {
    id: "kitchen",
    title: "Kitchen Management & Dual ESC/POS Routing",
    items: [
      {
        name: "Instant Kitchen Order Ticket (KOT) Generation",
        body: "Generate and fire KOTs to the kitchen in under a second from the billing screen or captain steward handheld terminal.",
      },
      {
        name: "Dual Thermal Printer Routing",
        body: "Connect up to two standard 58mm or 80mm ESC/POS thermal printers via USB, Bluetooth, or Wi-Fi—one for counter receipts and one for kitchen KOTs.",
      },
      {
        name: "Multi-Station Kitchen Routing",
        body: "Route food items automatically to designated preparation stations (e.g. Tandoor vs Main Kitchen vs Chinese vs Bar) without waiter confusion.",
      },
      {
        name: "KOT Updates, Reprints & Item Voids",
        body: "Modify active orders, print add-on running KOTs, or void items with mandatory steward PIN authorization to eliminate kitchen theft.",
      },
      {
        name: "Active Order & Pipeline Visualizer",
        body: "Track live orders currently being prepared in the kitchen, monitor elapsed preparation times, and maintain table turn speed.",
      },
    ],
  },
  {
    id: "offline-first",
    title: "100% Offline-First Architecture (SQLite WAL)",
    items: [
      {
        name: "Zero-Downtime Billing Counter",
        body: "Continue billing, searching menus, opening tables, and printing thermal KOTs without a single glitch during fiber cuts or power drops.",
      },
      {
        name: "Embedded Local SQLite WAL Storage",
        body: "All transactions and operational data commit directly to the Android device's native database instantly with zero network dependency.",
      },
      {
        name: "Resilient Conflict-Free Peer Mesh",
        body: "Terminals queue updates safely and resolve local sync states gracefully without race conditions or data loss during peak dinner rushes.",
      },
      {
        name: "Automatic Cloud Sync & Retry Mechanism",
        body: "The app monitors network health continuously and automatically uploads backlogged transaction batches as soon as broadband returns.",
      },
    ],
  },
  {
    id: "menu-inventory",
    title: "Centralized Menu Engineering & Inventory Control",
    items: [
      {
        name: "Remote Menu Management via Web Dashboard",
        body: "Create, edit, and organize categories, items, prices, and tax rates from any browser on the Web Dashboard; updates push to all terminals.",
      },
      {
        name: "Custom Modifiers, Variants & Add-ons",
        body: "Configure portion sizes (Half/Full), crust options, spice levels, toppings, and combo selections with dynamic price adjustments.",
      },
      {
        name: "Instant '86' Out-of-Stock Toggle",
        body: "Mark sold-out dishes out of stock with one tap from the counter or Web Dashboard to stop stewards from punching unavailable items.",
      },
      {
        name: "Raw Material Recipe Bill of Materials (BOM)",
        body: "Tie dishes to ingredient recipes (e.g. flour, cheese, paneer) to automatically deduct raw inventory upon billing and track true food costs.",
      },
      {
        name: "Low-Stock Alerts & Wastage Tracking",
        body: "Receive automatic notifications when critical inventory reaches minimum thresholds and log spoilage or kitchen wastage for auditing.",
      },
      {
        name: "On-Device Menu Photo OCR Import",
        body: "Snap a photo of any physical printed menu and let Android on-device OCR suggest item names and prices for quick onboarding.",
        status: "beta",
      },
    ],
  },
  {
    id: "reports",
    title: "Real-Time Reports & Web Dashboard Telemetry",
    items: [
      {
        name: "Live Owner Telemetry on Web Dashboard",
        body: "Check live daily sales, settled receipts, average order values, and table occupancy remotely from anywhere on your phone or laptop.",
      },
      {
        name: "End-of-Day Register Reconciliation (Z-Report)",
        body: "Audit opening cash float, total cash collected, UPI settlements, card transactions, and cash withdrawals at daily closing.",
      },
      {
        name: "Payment-Mode Settlement Breakdown",
        body: "Review exact collections across Cash, UPI QR, Card, and Split payments to simplify bank account matching and cashier audits.",
      },
      {
        name: "Item-Level Velocity & Margin Analysis",
        body: "Identify bestsellers, high-margin signature dishes, and slow-moving items to engineer more profitable seasonal menus.",
      },
      {
        name: "Terminal & Steward Sales Attribution",
        body: "Review sales volume generated by each approved terminal and steward to monitor staff productivity and tipping distributions.",
      },
      {
        name: "One-Click Excel, CSV & PDF Exports",
        body: "Export comprehensive daily and monthly sales registers, item breakdowns, and tax summaries in format-ready spreadsheet files.",
      },
    ],
  },
  {
    id: "compliance",
    title: "Tax Compliance, Accountant Access & Partner Services",
    items: [
      {
        name: "Accountant Read-Only Web Portal",
        body: "Grant your chartered accountant or tax consultant dedicated read-only access to download tax reports via the Web Dashboard.",
      },
      {
        name: "GST-Ready B2B & B2C Sales Registers",
        body: "Generate tax-compliant sales reports structured for GSTR-1 and GSTR-3B filings with accurate HSN/SAC classification.",
      },
      {
        name: "GST Reconciliation & Filing Support",
        body: "Optional assistance with reconciling sales books with GST returns through India Advocacy professional services.",
        status: "optional",
      },
      {
        name: "FSSAI Registration & Licensing Assistance",
        body: "Optional professional guidance on FSSAI license procurement, renewal compliance, and food safety standards documentation.",
        status: "optional",
      },
    ],
  },
];

export const STATUS_LABEL: Record<NonNullable<FeatureItem["status"]>, string> = {
  "coming-soon": "Coming soon",
  beta: "Beta feature",
  optional: "Optional service",
};
