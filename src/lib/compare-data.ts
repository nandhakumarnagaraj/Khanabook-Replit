// Comparison datasets and battlecard intelligence for the /compare route.
// All comparisons are purely architectural and technical (no competitor brand names).

export interface BattlecardRow {
  feature: string;
  khanabook: string;
  khanabookStatus: "winner" | "neutral" | "not-available";
  hybridBridge: string;
  hybridBridgeStatus: "good" | "warning" | "bad";
  desktopPos: string;
  desktopPosStatus: "good" | "warning" | "bad";
  cloudSaas: string;
  cloudSaasStatus: "good" | "warning" | "bad";
  description?: string;
}

export interface BattlecardCategory {
  category: string;
  subtitle: string;
  rows: BattlecardRow[];
}

export const BATTLECARD_CATEGORIES: BattlecardCategory[] = [
  {
    category: "Hardware & Cost Requirements",
    subtitle: "Upfront capital investment and hardware flexibility",
    rows: [
      {
        feature: "Billing Hardware Required",
        khanabook: "Any Android phone or tablet (Zero new hardware needed)",
        khanabookStatus: "winner",
        hybridBridge: "Dedicated Windows PC (i5/i7, 8–16GB RAM) + UPS backup",
        hybridBridgeStatus: "warning",
        desktopPos: "Dedicated Windows desktop computer or server station",
        desktopPosStatus: "bad",
        cloudSaas: "Laptops, iPads or browser tablets",
        cloudSaasStatus: "warning",
        description: "Whether you need to invest ₹35,000+ in bulky Windows PC hardware and UPS backups.",
      },
      {
        feature: "Upfront Hardware Capital",
        khanabook: "₹0 — Runs on staff or owner's existing Android device",
        khanabookStatus: "winner",
        hybridBridge: "₹25,000 – ₹45,000+ for PC, monitor, UPS and wiring",
        hybridBridgeStatus: "warning",
        desktopPos: "₹30,000 – ₹50,000+ for Windows PC counter hardware",
        desktopPosStatus: "bad",
        cloudSaas: "₹15,000 – ₹30,000+ for iPads or compatible devices",
        cloudSaasStatus: "warning",
        description: "Initial equipment cost before you can bill your first customer.",
      },
      {
        feature: "Software Subscription Fee",
        khanabook: "No subscription fee currently",
        khanabookStatus: "winner",
        hybridBridge: "₹12,000 – ₹15,000+/year per outlet + paid add-ons",
        hybridBridgeStatus: "warning",
        desktopPos: "₹10,000 – ₹25,000 upfront license + annual AMC fees",
        desktopPosStatus: "bad",
        cloudSaas: "₹6,000 – ₹12,000+/year recurring SaaS subscription",
        cloudSaasStatus: "warning",
        description: "Annual recurring license burden on your restaurant's operating margins.",
      },
    ],
  },
  {
    category: "Offline Resilience & Service Continuity",
    subtitle: "How the billing counter behaves during broadband cuts and peak rush",
    rows: [
      {
        feature: "Internet Goes Down (Offline Mode)",
        khanabook: "100% Instant billing, menu access & KOT printing continue",
        khanabookStatus: "winner",
        hybridBridge: "Requires background Bridge Server process on PC to not crash",
        hybridBridgeStatus: "warning",
        desktopPos: "Works offline on that single desktop station",
        desktopPosStatus: "good",
        cloudSaas: "Freezes or buffers; orders and bill printing halt",
        cloudSaasStatus: "bad",
        description: "What happens when your broadband Wi-Fi disconnects on a crowded Saturday night.",
      },
      {
        feature: "Server Architecture",
        khanabook: "Native local SQLite database on Android with peer sync",
        khanabookStatus: "winner",
        hybridBridge: "Hybrid Cloud requiring local Windows Bridge service",
        hybridBridgeStatus: "warning",
        desktopPos: "Legacy on-premise Windows database (SQL/Access)",
        desktopPosStatus: "warning",
        cloudSaas: "Pure Cloud Web SaaS (Server round-trips required)",
        cloudSaasStatus: "bad",
        description: "How transaction records are committed to memory during service.",
      },
      {
        feature: "Counter Billing Speed",
        khanabook: "Sub-second touch response — zero network latency",
        khanabookStatus: "winner",
        hybridBridge: "Fast on high-spec PC; slows down if PC background lag",
        hybridBridgeStatus: "good",
        desktopPos: "Fast local counter, but rigid keyboard/mouse flow",
        desktopPosStatus: "good",
        cloudSaas: "Vulnerable to browser tab lags and network pings",
        cloudSaasStatus: "warning",
        description: "Punch-in to printed KOT turnaround speed during counter queues.",
      },
    ],
  },
  {
    category: "Multi-Terminal & Printer Capabilities",
    subtitle: "Flexibility to scale order stations and route kitchen tickets",
    rows: [
      {
        feature: "Multi-Terminal Sync",
        khanabook: "Up to 5 synchronized Android terminals included",
        khanabookStatus: "winner",
        hybridBridge: "Extra annual license fees per Captain App / billing node",
        hybridBridgeStatus: "warning",
        desktopPos: "Requires local LAN cabling and extra station licenses",
        desktopPosStatus: "bad",
        cloudSaas: "Multi-login supported, but requires strong Wi-Fi everywhere",
        cloudSaasStatus: "warning",
        description: "Cost and complexity to equip 2–5 staff members with handheld billing and ordering.",
      },
      {
        feature: "Thermal Printer Connectivity",
        khanabook: "Universal USB, Wi-Fi & Bluetooth (Dual Kitchen + Receipt)",
        khanabookStatus: "winner",
        hybridBridge: "USB and LAN thermal printers (No native phone Bluetooth)",
        hybridBridgeStatus: "warning",
        desktopPos: "USB, Serial & LAN thermal printers (Requires PC drivers)",
        desktopPosStatus: "warning",
        cloudSaas: "Requires separate desktop bridge agent or Bluetooth only",
        cloudSaasStatus: "warning",
        description: "How your receipt and KOT printers physically connect to your billing terminals.",
      },
      {
        feature: "Invoice Number Series Isolation",
        khanabook: "Independent series per terminal prevents collision duplicates",
        khanabookStatus: "winner",
        hybridBridge: "Centralized server sequence; requires sync to serialize",
        hybridBridgeStatus: "warning",
        desktopPos: "Single series locked to master counter PC",
        desktopPosStatus: "warning",
        cloudSaas: "Cloud sequence vulnerable to offline sequence clash",
        cloudSaasStatus: "warning",
        description: "Guarantee that 2 simultaneous offline terminals never generate the same invoice number.",
      },
    ],
  },
  {
    category: "Operational Velocity & Business Freedom",
    subtitle: "Onboarding speed, contracts, and data sovereignty",
    rows: [
      {
        feature: "Setup & Onboarding Time",
        khanabook: "< 10 minutes — Download APK, load menu, start billing",
        khanabookStatus: "winner",
        hybridBridge: "2–5 days — Remote technician setup and bridge configuration",
        hybridBridgeStatus: "warning",
        desktopPos: "3–7 days — Windows technician installation on site",
        desktopPosStatus: "bad",
        cloudSaas: "1–2 days — Cloud menu builder and payment config",
        cloudSaasStatus: "neutral",
        description: "How quickly you can switch over and start serving customers.",
      },
      {
        feature: "In-Store Transaction Commission",
        khanabook: "0% — Keep 100% of your counter revenue",
        khanabookStatus: "winner",
        hybridBridge: "0% on in-store cash/UPI bills",
        hybridBridgeStatus: "good",
        desktopPos: "0% on in-store bills",
        desktopPosStatus: "good",
        cloudSaas: "Some take 1%–2.5% cuts on online and QR orders",
        cloudSaasStatus: "warning",
        description: "Whether the POS software charges hidden percentage tolls on your customer orders.",
      },
      {
        feature: "Data Ownership & Portability",
        khanabook: "Local on-device database + automatic encrypted cloud backup",
        khanabookStatus: "winner",
        hybridBridge: "Proprietary database with limited raw export options",
        hybridBridgeStatus: "warning",
        desktopPos: "Stored on Windows drive; vulnerable to hardware disk failure",
        desktopPosStatus: "warning",
        cloudSaas: "Hosted on third-party cloud servers",
        cloudSaasStatus: "warning",
        description: "Where your customer, menu, and sales financial history lives.",
      },
    ],
  },
];

export const HIDDEN_TRAPS = [
  {
    title: "The 'PC Bridge Server' Trap",
    competitor: "Hybrid Server Systems",
    icon: "Cpu",
    problem:
      "Some sales reps promise 'our POS works offline'. What they don't emphasize is that it requires an expensive Windows PC (Intel i5/i7, 8–16GB RAM) running a local background 'Bridge Server' 24/7.",
    impact:
      "When Windows auto-updates, freezes, catches malware, or power trips the desktop, the bridge server crashes. Your billing halts, and waiters are forced to write paper bills.",
    khanabookEdge:
      "KhanaBook runs natively on the Android phone or tablet right in your hands. There is no PC, no bridge server, and no Windows crashes.",
  },
  {
    title: "The 'Per-Terminal License' Trap",
    competitor: "Legacy Desktop & Multi-Station Suites",
    icon: "Smartphone",
    problem:
      "Need a second billing counter for takeaway queues during rush hour? Want your floor captain to take orders tableside on a tablet? Most legacy systems charge an extra ₹3,000 to ₹6,000 per device every single year.",
    impact:
      "A 3-terminal restaurant ends up paying ₹25,000+ every year just in device subscription renewals.",
    khanabookEdge:
      "KhanaBook supports up to 5 synchronized Android terminals included out of the box with separate order counters and sequence isolation.",
  },
  {
    title: "The 'Cloud-Only Web App' Trap",
    competitor: "Browser-Only Cloud Apps",
    icon: "WifiOff",
    problem:
      "Web browser apps look sleek in product demos, but rely on constant round-trip network pings for every menu click, modifier choice, and bill print.",
    impact:
      "During crowded dinner hours when 4G/5G towers saturate or fiber cables get cut, browser tabs hang. Waiters wait on spinning loading icons while hungry customers get impatient.",
    khanabookEdge:
      "KhanaBook is engineered with an offline-first SQLite database. Every tap commits locally in milliseconds, and syncs silently in the background.",
  },
];

export const SWITCHING_STEPS = [
  {
    step: "01",
    title: "Install the Android APK",
    desc: "Download KhanaBook on any Android phone or tablet running Android 8.0+. No technician visit, no server installation.",
  },
  {
    step: "02",
    title: "Import Your Menu & Pair Printers",
    desc: "Set up categories, menu items, and rates in minutes. Pair your USB, Wi-Fi or Bluetooth 58mm/80mm thermal printers with a single tap.",
  },
  {
    step: "03",
    title: "Start Billing & Link Terminals",
    desc: "Start punching KOTs and bills instantly. Link up to 4 additional staff Android devices for tableside captain ordering.",
  },
];

export const SWITCHING_FAQS = [
  {
    q: "Can I switch to KhanaBook without disrupting my restaurant service?",
    a: "Yes. Because KhanaBook installs as an independent Android app on your mobile device or tablet, you can set up your menu and test printing parallelly without touching your existing billing counter. Once you verify your menu and thermal printers, you can switch counters in seconds.",
  },
  {
    q: "Will my existing thermal printers work with KhanaBook?",
    a: "Yes. KhanaBook supports industry-standard ESC/POS thermal printers in 58mm (2-inch) and 80mm (3-inch) paper widths across USB, Wi-Fi, and Bluetooth connections. You do not need to purchase expensive proprietary printers.",
  },
  {
    q: "How does KhanaBook keep up to 5 terminals in sync without the internet?",
    a: "KhanaBook uses a peer-aware local architecture. Each approved Android terminal maintains its own independent order counter and invoice series prefix. When terminals are on the same local network, records synchronize automatically. When connectivity drops, each terminal continues billing independently without invoice number collisions.",
  },
  {
    q: "Can I export reports for my accountant and GST filing?",
    a: "Yes. KhanaBook generates comprehensive daily, monthly, item-level, and payment-mode summaries that can be exported instantly as formatted PDFs or CSV files for Tally, Excel, or GST returns.",
  },
];

// Preserved capability matrix rows for detailed verification
export const COMPARE_ROWS: [string, string, string][] = [
  [
    "Offline operation",
    "Local billing, menu access and KOT printing during temporary network interruptions; eligible records sync when connectivity returns",
    "Which operations continue offline and which require connectivity",
  ],
  [
    "Multi-terminal identity",
    "Up to five approved Android terminals, each with a separate identity and daily order counter",
    "How devices, counters and active drafts are isolated from each other",
  ],
  [
    "Invoice sequence",
    "Terminal-specific invoice series",
    "How the system prevents duplicate or conflicting invoice numbers across devices",
  ],
  [
    "KOT and receipt printing",
    "Up to two compatible USB, Wi-Fi or Bluetooth thermal printers: one for customer receipts and one for KOTs",
    "Supported printer models, printer roles and reprint handling",
  ],
  [
    "Payment recording",
    "Cash, UPI, card and splits recorded on a single bill; integrated gateway processing is not currently available",
    "How payment modes, split payments and references are recorded or verified",
  ],
  [
    "Inventory",
    "Inventory tracking and low-stock alerts tied to menu items",
    "Whether inventory is included, an add-on, or a separate module",
  ],
  [
    "Reports and exports",
    "Daily, monthly, item-level and payment-mode reports with PDF and CSV export",
    "Which report periods, filters and export formats are supported",
  ],
  [
    "Synchronisation",
    "Automatic background synchronisation with visible status",
    "Whether sync is manual or automatic and how pending or failed records are surfaced",
  ],
  [
    "Hardware",
    "Runs on supported Android phones and tablets",
    "Supported Android versions, device requirements and printer compatibility",
  ],
];
