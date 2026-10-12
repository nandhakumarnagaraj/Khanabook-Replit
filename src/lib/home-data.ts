import { BUSINESS, DISCLAIMERS } from "./business-config";

export const FEATURES = [
  {
    title: "High-Speed Counter Billing",
    body: "Generate bills in under 3 seconds with instant touch search, barcode scanning, item modifiers, and customized table maps. Support dine-in, takeaway, and delivery orders with pay-before or pay-after workflows. Record cash, dynamic UPI QR, card, and split payments with automated GST computation.",
  },
  {
    title: "Multi-Terminal Independent Operations (Up to 5 Terminals)",
    body: "Run your entire outlet smoothly with up to 5 authorized Android terminals: empower stewards to punch orders table-side while the cashier settles bills at the counter. Each terminal maintains its own GST-compliant invoice series and daily order counter, operating with zero broadband dependency and syncing seamlessly to your unified Web Dashboard.",
  },
  {
    title: "Dual ESC/POS Thermal Printing & Kitchen KOT",
    body: "Eliminate kitchen communication errors by routing orders to up to two compatible USB, Bluetooth, or Wi-Fi thermal printers. Print customer receipts at the counter while sending instant Kitchen Order Tickets (KOT) directly to the chef. Handle reprints, table shifts, and voided items with mandatory steward PIN tracking.",
  },
  {
    title: "100% Offline-First SQLite WAL Architecture",
    body: "Engineered specifically for Indian restaurant realities. Local SQLite WAL database on your Android devices guarantees instant local billing that never halts, buffers, or loses an order when internet cuts or power fluctuates. Records silently synchronize to the Cloud Web Dashboard when connectivity returns.",
  },
  {
    title: "Centralized Cloud Web Dashboard",
    body: "Manage your entire restaurant back-office from any web browser on laptop, iPad, or smartphone. Create and edit menu categories, item prices, and tax slabs in real time. Track live outlet sales telemetry, hourly rush graphs, and staff settlement summaries from anywhere in the world.",
  },
  {
    title: "Raw Material Inventory & Recipe BOM",
    body: "Track raw ingredients with precision using automated Recipe Bills of Materials (BOM). Deduct ingredients from stock automatically as dishes are billed, configure low-stock reorder thresholds, and eliminate food wastage and theft with detailed consumption audit trails.",
  },
  {
    title: "CA-Ready Exports & GST Tax Compliance",
    body: "Easily download GST-compliant B2B and B2C sales registers, payment mode summaries, and HSN/SAC reports in Excel and PDF formats from the Web Dashboard, simplifying monthly tax reconciliations for you and your CA.",
  },
];

export const RESTAURANT_TYPES = [
  "Dhabas & Fine-Dine Restaurants",
  "QSR & Fast Food Counters",
  "Cafés & Bakeries",
  "Cloud Kitchens & Dark Kitchens",
  "Food Courts & Mall Kiosks",
  "Bars & Restro-Pubs",
];

export const WORKFLOW = [
  "Table / Counter Order",
  "Instant Kitchen KOT",
  "Split / Dynamic Payment",
  "Thermal Receipt Print",
  "Cloud Dashboard Sync",
];

export const FAQS = [
  {
    q: "Is KhanaBook really free to use with zero software subscription?",
    a: "Yes! Currently, KhanaBook has ₹0 software subscription fee. You get full access to the offline-first Android POS App and the Cloud Web Dashboard for up to 5 synchronized terminals without any per-order cuts or monthly license fees.",
  },
  {
    q: "How does KhanaBook continue billing when the internet goes down?",
    a: "Unlike fragile browser-based POS systems that buffer and crash when broadband disconnects, KhanaBook runs natively on Android with an embedded SQLite database. All billing, table management, item search, and thermal KOT printing happen 100% locally without cloud lag. When your internet reconnects, settled records sync to the cloud automatically.",
  },
  {
    q: "How does multi-terminal synchronization work without a central server PC?",
    a: "You can authorize up to 5 Android smartphones or tablets per restaurant with secure owner challenge approval. Each terminal operates independently with its own local offline database and invoice numbering, so your billing counters never halt. When internet is active, all terminal sales automatically aggregate on your Cloud Web Dashboard for outlet-wide oversight.",
  },
  {
    q: "What hardware and printers does KhanaBook support?",
    a: "Zero vendor lock-in! KhanaBook runs on standard Android 8.0+ phones and tablets (minimum 3GB RAM recommended). For printing, it connects with standard 58mm (2-inch) and 80mm (3-inch) ESC/POS thermal printers via USB, Bluetooth, or Wi-Fi LAN from trusted brands like TVS, Epson, NGX, Everycom, and POSIFLEX.",
  },
  {
    q: "What is the difference between the Android App and the Web Dashboard?",
    a: "The Android POS App is built for fast frontline operations: billing, captain ordering, table shifts, and instant KOT printing at the counter and kitchen. The Cloud Web Dashboard is built for owners, allowing remote menu pricing edits, recipe BOM inventory control, staff management, terminal device approvals, and live sales telemetry from any browser.",
  },
  {
    q: "Can I share digital bills on WhatsApp and export GST reports?",
    a: "Yes! You can generate professional PDF invoices and share them directly with customers via WhatsApp or SMS, saving expensive thermal paper rolls. The Web Dashboard also offers one-click exports of daily sales registers, payment summaries, and GST tax breakdowns in CSV and PDF formats.",
  },
  {
    q: "Does KhanaBook charge fees on customer UPI or Card payments?",
    a: "No. KhanaBook is 100% commission-free. It records payment modes (Cash, UPI QR, Card, Split) and transaction references accurately for accounting. Any fees associated with your third-party payment gateway, bank QR, or card swipe machine belong entirely to your own merchant agreement.",
  },
  {
    q: "Who operates KhanaBook?",
    a: `KhanaBook is engineered and operated by ${BUSINESS.legalName}, a registered Indian private limited corporation. ${BUSINESS.siblingPlatform} is the company's ${BUSINESS.siblingPlatformDescription}, available for optional tax and statutory licensing services.`,
  },
];
