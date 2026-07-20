// [Capability, KhanaBook approach, What to check in another POS]
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
    "Up to two compatible Bluetooth thermal printers: one for customer receipts and one for KOTs",
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
