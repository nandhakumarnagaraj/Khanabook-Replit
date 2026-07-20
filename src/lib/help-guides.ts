export type HelpGuide = {
  id: string;
  title: string;
  description: string;
  steps: string[];
};

export const SETUP_GUIDES: HelpGuide[] = [
  {
    id: "printer-pairing",
    title: "Pair Bluetooth Printers",
    description: "Connect compatible thermal printers for customer receipts and KOTs.",
    steps: [
      "Confirm that each printer is compatible with KhanaBook before purchasing or configuring hardware.",
      "Turn on the Bluetooth thermal printer and place it in pairing mode.",
      "In Android Settings → Bluetooth, pair the printer with the device.",
      "Open KhanaBook, go to Settings → Printers, and select the paired device.",
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
    title: "Import Your Menu from a Photo",
    description: "Use Android on-device OCR to reduce manual menu entry.",
    steps: [
      "Open menu management and choose the menu-photo import option (Beta).",
      "Take or select a clear, well-lit photo with item names and prices visible.",
      "KhanaBook processes the image on the Android device and suggests detected menu text.",
      "Review every suggested name and price, correct OCR errors, and assign the appropriate categories and tax rates.",
      "Add variants or other details that were not available in the source image.",
      "Save only after reviewing the result. Other approved terminals receive the saved menu data after synchronisation.",
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
