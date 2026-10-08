export type HelpGuide = {
  id: string;
  title: string;
  description: string;
  steps: string[];
};

export const SETUP_GUIDES: HelpGuide[] = [
  {
    id: "printer-pairing",
    title: "Connect Printers (USB, Wi-Fi & Bluetooth)",
    description:
      "Connect compatible thermal printers via USB cable, Wi-Fi network, or Bluetooth for customer receipts and KOTs.",
    steps: [
      "Confirm that each printer is compatible with KhanaBook before purchasing or configuring hardware.",
      "Connect your thermal printer via USB OTG cable, connect it to your local Wi-Fi router, or place it in Bluetooth pairing mode.",
      "In Android Settings or your local network, ensure the printer is connected or paired with the device.",
      "Open KhanaBook, go to Settings → Printers, and select the connected USB, Wi-Fi, or Bluetooth device.",
      "Assign the printer as either the customer-receipt printer or the KOT printer. KhanaBook supports up to one printer for each role.",
      "Run the relevant test print and confirm that text, paper width and feed are correct.",
    ],
  },
  {
    id: "first-bill",
    title: "Create Your First Bill",
    description: "Create an order, record payment and generate the customer invoice.",
    steps: [
      "Start a new order and choose the appropriate order type, such as dine-in, takeaway or a manually recorded online order.",
      "Select menu items and review quantities, variants and configured taxes.",
      "Generate or update the KOT when the order should be sent to the kitchen.",
      "Follow the restaurant's pay-before or pay-after workflow, then record Cash, UPI, Card or a split across supported modes.",
      "Finalise the bill after reviewing its totals and payment record.",
      "Print the customer receipt on the assigned printer or create a PDF invoice for sharing through WhatsApp or SMS.",
      "The record remains available locally and becomes part of consolidated reporting after successful synchronisation.",
    ],
  },
  {
    id: "menu-import",
    title: "Create and Import Your Menu",
    description: "Set up categories, items, prices and GST tax slabs quickly.",
    steps: [
      "Open the Web Dashboard or POS menu editor to add categories (e.g. Starters, Curries, Beverages).",
      "Add items with base pricing, food types (Veg/Non-Veg), and applicable GST tax slabs (e.g. 5% or 18%).",
      "Upload existing menu items in bulk using the standard CSV template on the Web Dashboard.",
      "Configure portion sizes, item variants, and kitchen modifier add-ons.",
      "Assign KOT printer routing so food and beverage items route to their designated kitchen stations.",
      "Save the menu. All active Android terminals synchronize changes automatically when connected.",
    ],
  },
  {
    id: "offline-sync",
    title: "Understand Offline Sync",
    description: "How local operation and cloud synchronisation work together.",
    steps: [
      "KhanaBook stores operational records locally so core billing, menu access and KOT printing can continue during temporary connectivity interruptions.",
      "Use the app's synchronisation indicator to check whether records are synced, pending or offline.",
      "When connectivity is available, eligible pending records synchronise automatically in the background.",
      "If a synchronisation attempt fails, the app can retry; continue checking the status until the pending record is confirmed as synced.",
      "Consolidated restaurant reports include a terminal's recent records only after successful synchronisation.",
      "Verify the sync status on every terminal regularly, especially before relying on end-of-day consolidated reports.",
    ],
  },
  {
    id: "reports",
    title: "Read and Export Sales Reports",
    description: "Review sales, payment mix, item performance and available exports.",
    steps: [
      "Open Reports from the app navigation.",
      "Use the daily or monthly report for the supported date period you need.",
      "Review recorded payment modes such as Cash, UPI and Card for reconciliation.",
      "Use item-level reporting to compare menu-item sales.",
      "Use terminal-aware views to identify which terminal handled finalised sales after synchronisation.",
      "Export supported reports as PDF or CSV when you need to share or analyse the data outside KhanaBook.",
      "Confirm that all relevant terminals have synced before relying on consolidated totals.",
    ],
  },
];
