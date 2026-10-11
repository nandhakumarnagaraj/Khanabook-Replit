import { BUSINESS } from "./business-config";

export interface TutorialVideo {
  id: string;
  title: string;
  description: string;
  duration?: string;
  fileName: string;
  tag: string;
}

export const TUTORIAL_VIDEOS: TutorialVideo[] = [
  {
    id: "app-overview",
    title: "KhanaBook Quick Start & Complete Overview",
    description:
      "A complete walkthrough of 100% offline billing on Android, creating bills, and multi-terminal synchronization.",
    duration: "3:45",
    fileName: "app-overview.mp4",
    tag: "Core POS",
  },
  {
    id: "printer-setup",
    title: "ESC/POS Thermal Printer Configuration",
    description:
      "Step-by-step connection for 58mm and 80mm thermal receipt & KOT printers over USB OTG, Bluetooth, or LAN.",
    duration: "2:30",
    fileName: "printer-setup.mp4",
    tag: "Hardware",
  },
  {
    id: "first-bill",
    title: "Order Punching, KOT Routing & Payment Splits",
    description:
      "How to rapidly add menu items, route kitchen orders, split UPI/Cash payments, and print customer invoices.",
    duration: "4:10",
    fileName: "billing-and-kot.mp4",
    tag: "Billing",
  },
  {
    id: "terminal-sync",
    title: "Multi-Terminal Setup & Cloud Synchronization",
    description:
      "Authorizing and running up to 5 Android terminals per restaurant with automatic cloud synchronization.",
    duration: "3:15",
    fileName: "terminal-sync.mp4",
    tag: "Terminal Setup",
  },
  {
    id: "menu-import",
    title: "Menu Items, Categories & GST Configuration",
    description:
      "Setting up food items, categories, variants, and 5%/18% GST tax slabs from the POS or Cloud Web Dashboard.",
    duration: "2:50",
    fileName: "menu-setup.mp4",
    tag: "Menu & Taxes",
  },
];

export function getTutorialVideoUrl(fileName: string): string {
  const base = BUSINESS.tutorialsCdnUrl.replace(/\/$/, "");
  return `${base}/${fileName}`;
}
