import { BUSINESS, DISCLAIMERS } from "./business-config";

export const FEATURES = [
  {
    title: "Billing & Payments",
    body: "Handle dine-in, takeaway and manually recorded online orders with pay-before or pay-after workflows. Record cash, UPI, card and split payments, then create and share the invoice.",
  },
  {
    title: "Multi-Terminal Operations",
    body: "Use up to five approved Android terminals, each with its own identity, invoice series and daily order counter. Finalised records appear in restaurant-level reports after synchronisation.",
  },
  {
    title: "Kitchen Operations",
    body: "Generate, update and reprint KOTs. Connect up to two compatible Bluetooth thermal printers—one for customer receipts and one for KOTs.",
  },
  {
    title: "Offline-First Reliability",
    body: "Continue billing, menu access and KOT printing during temporary connectivity interruptions, then monitor synchronisation when connectivity is available.",
  },
  {
    title: "Menu & Inventory",
    body: "Manage categories, items, prices and variants. Track inventory, review low-stock alerts and use on-device OCR to suggest menu data from a photo.",
  },
  {
    title: "Reports & Administration",
    body: "Review daily, monthly, payment-mode, item-level and terminal-aware reports, with supported PDF and CSV exports.",
  },
];

export const RESTAURANT_TYPES = [
  "Restaurants",
  "Cafés",
  "Bakeries",
  "Cloud kitchens",
  "Food courts",
  "Takeaway counters",
];

export const WORKFLOW = [
  "Create Order",
  "Print KOT",
  "Take Payment",
  "Generate Bill",
  "Sync Securely",
];

export const FAQS = [
  {
    q: "Is KhanaBook free to use?",
    a: DISCLAIMERS.pricing,
  },
  {
    q: "Does KhanaBook work without internet?",
    a: "Core operations such as billing, menu access and KOT printing can continue during temporary connectivity interruptions. Eligible pending records synchronise when connectivity is available; check the app's sync status before relying on consolidated reports.",
  },
  {
    q: "How does multi-terminal billing work?",
    a: "You can approve up to five supported Android terminals per restaurant. Each terminal has its own identity, invoice series and daily order counter. Active orders stay on the terminal handling them, while finalised records become available in restaurant-level reports after synchronisation.",
  },
  {
    q: "What hardware do I need?",
    a: "Start with a supported Android phone or tablet. For printing, you can connect up to two compatible Bluetooth thermal printers—one for customer receipts and one for KOTs. Confirm device and printer compatibility before purchasing hardware.",
  },
  {
    q: "Can I share invoices and export reports?",
    a: "Yes. KhanaBook can create PDF invoices for sharing through WhatsApp or SMS and supports PDF and CSV exports for supported reports. The sharing service you choose may apply its own terms or charges.",
  },
  {
    q: "Does KhanaBook help with GST?",
    a: "Bills calculate tax from the rates configured for menu items. Optional GST reconciliation and filing support may be offered separately through India Advocacy; the restaurant remains responsible for its tax settings and filings.",
  },
  {
    q: "Who operates KhanaBook?",
    a: `KhanaBook is developed and operated by ${BUSINESS.legalName}. ${BUSINESS.siblingPlatform} is the company's ${BUSINESS.siblingPlatformDescription}.`,
  },
];
