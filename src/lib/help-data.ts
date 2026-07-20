import { BarChart3, Printer, Rocket, Smartphone, Sparkles } from "lucide-react";
import { BUSINESS } from "./business-config";

export const HELP_TOPICS = [
  {
    title: "Getting Started",
    desc: "Set up your restaurant and start taking orders in a short first session.",
    icon: Rocket,
    items: ["First-time login guide", "Managing your menu items", "Setting up staff permissions"],
    cta: { label: "View guides", to: "/get-started" },
    wide: true,
  },
  {
    title: "Hardware Setup",
    desc: "Connect up to two compatible Bluetooth thermal printers: one for receipts and one for KOTs.",
    icon: Printer,
    items: ["Printer compatibility", "Receipt and KOT tests", "Paper and battery checks"],
    cta: { label: "View guides", to: "/get-started" },
  },
  {
    title: "Payment Recording",
    desc: "Record cash, UPI, card and split payments so each mode remains clear in reports.",
    icon: Smartphone,
    items: ["Payment-mode recording", "Split payment flow", "Reference entry"],
    cta: { label: "Manage billing", to: "/get-started" },
  },
  {
    title: "Menu Photo Import",
    desc: "Use Android on-device OCR to suggest item names and prices from a menu photo, then review the suggestions before saving.",
    icon: Sparkles,
    items: ["Photo capture tips", "Reviewing extracted text", "Category mapping"],
    cta: { label: "Read guide", to: "/get-started" },
  },
  {
    title: "Reports & Exports",
    desc: "Review supported sales, payment and item reports, then export available data as PDF or CSV.",
    icon: BarChart3,
    items: ["Daily and monthly sales", "Payment mix", "PDF and CSV exports"],
    cta: { label: "Explore reports", to: "/get-started" },
    wide: true,
  },
];

export const HELP_FAQS = [
  {
    q: "How do I install KhanaBook?",
    a: "Download the Android app from Google Play, open it and follow the guided setup to create your restaurant account.",
  },
  {
    q: "How do I connect Bluetooth printers?",
    a: "KhanaBook supports up to two compatible Bluetooth thermal printers: one assigned to customer receipts and one assigned to KOTs. Pair each printer with Android, assign its role in KhanaBook and run the relevant test print.",
  },
  {
    q: "Can multiple staff use the same account?",
    a: "Create the staff access available to your restaurant and use approved terminals within the current five-terminal limit.",
  },
  {
    q: "Where is my data stored?",
    a: "Operational records are stored on the Android device for offline use. Eligible records synchronise to our cloud when connectivity is available; use the app's status before relying on consolidated reports.",
  },
  {
    q: "How can my accountant access bills or reports?",
    a: `Use the Accountant web login at ${BUSINESS.loginUrl} for read-only access to supported restaurant reports. You can also export supported invoices or reports as PDF or CSV when a file is needed.`,
  },
  {
    q: "Does KhanaBook process customer payments?",
    a: "No. KhanaBook currently records payment modes and references entered by the restaurant; integrated payment-gateway processing and verification are not currently available.",
  },
  {
    q: "How do I contact support?",
    a: `Email ${BUSINESS.supportEmail} or call ${BUSINESS.supportPhone} during ${BUSINESS.workingHours}.`,
  },
];
