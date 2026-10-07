import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wifi,
  WifiOff,
  Printer,
  ReceiptText,
  CreditCard,
  IndianRupee,
  Layers,
  Sparkles,
  Check,
  Plus,
  Minus,
  Trash2,
  Activity,
  Smartphone,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Card3DTilt } from "@/components/motion/Card3DTilt";
import { MagneticHover } from "@/components/motion/MagneticHover";
import { BorderBeam } from "@/components/motion/primitives/BorderBeam";
import { NumberTicker } from "@/components/motion/primitives/NumberTicker";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  veg: boolean;
}

const MENU_CATALOG: MenuItem[] = [
  { id: "1", name: "Paneer Butter Masala", category: "Curries", price: 260, veg: true },
  { id: "2", name: "Butter Garlic Naan", category: "Breads", price: 65, veg: true },
  { id: "3", name: "Hyderabadi Chicken Biryani", category: "Rice", price: 320, veg: false },
  { id: "4", name: "Masala Dosa (Ghee)", category: "South Indian", price: 120, veg: true },
  { id: "5", name: "South Indian Filter Coffee", category: "Beverages", price: 45, veg: true },
  { id: "6", name: "Tandoori Chicken (Half)", category: "Starters", price: 280, veg: false },
  { id: "7", name: "Dal Makhani Slow-Cooked", category: "Curries", price: 220, veg: true },
  { id: "8", name: "Gulab Jamun (2 Pcs)", category: "Desserts", price: 90, veg: true },
];

const TABLES = [
  { id: "T1", label: "Table 01", guests: "4 Guests", occupied: true },
  { id: "T2", label: "Table 02", guests: "2 Guests", occupied: true },
  { id: "T3", label: "Table 03", guests: "6 Guests", occupied: false },
  { id: "T4", label: "Takeaway #14", guests: "Walk-in", occupied: true },
  { id: "T5", label: "Swiggy #902", guests: "Delivery", occupied: true },
];

export function InteractivePosDashboard() {
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);
  const [selectedTable, setSelectedTable] = useState("T1");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState<"UPI" | "CASH" | "CARD">("UPI");
  const [isKotPrinted, setIsKotPrinted] = useState(false);

  // Live bill state
  const [cart, setCart] = useState<{ item: MenuItem; qty: number }[]>([
    { item: MENU_CATALOG[0], qty: 1 },
    { item: MENU_CATALOG[1], qty: 3 },
    { item: MENU_CATALOG[2], qty: 1 },
  ]);

  const categories = ["All", "Curries", "Breads", "Rice", "South Indian", "Starters", "Beverages"];

  const filteredMenu =
    selectedCategory === "All"
      ? MENU_CATALOG
      : MENU_CATALOG.filter((item) => item.category === selectedCategory);

  const addItem = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) => (i.item.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { item, qty: 1 }];
    });
    setIsKotPrinted(false);
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.item.id === id) {
            const newQty = i.qty + delta;
            return newQty > 0 ? { ...i, qty: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as { item: MenuItem; qty: number }[]
    );
    setIsKotPrinted(false);
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.item.id !== id));
    setIsKotPrinted(false);
  };

  // Calculations
  const subtotal = cart.reduce((sum, i) => sum + i.item.price * i.qty, 0);
  const cgst = Math.round(subtotal * 0.025);
  const sgst = Math.round(subtotal * 0.025);
  const total = subtotal + cgst + sgst;

  const handlePrintKot = () => {
    setIsKotPrinted(true);
  };

  return (
    <div className="relative rounded-3xl border border-border/80 bg-surface/80 backdrop-blur-xl p-6 sm:p-10 shadow-2xl overflow-hidden">
      {/* Motion Primitives Animated Border Beam */}
      <BorderBeam size={280} duration={12} colorFrom="#dc2626" colorTo="#f59e0b" borderWidth={2} />

      {/* Background ambient decorative spotlights */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-gold/10 blur-[120px]"
      />

      {/* TOP DASHBOARD BAR — StringTune & MCPMarket telemetry style */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono font-bold text-foreground shadow-sm">
            <span
              className={`flex h-2 w-2 rounded-full ${
                isOfflineSimulated ? "bg-amber-500 animate-pulse" : "bg-emerald-500 animate-ping"
              }`}
            />
            {isOfflineSimulated ? "OFFLINE MODE ACTIVE" : "LOCAL MESH ONLINE"}
          </div>

          <span className="hidden sm:inline-block h-3.5 w-px bg-border" />

          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Activity className="h-3.5 w-3.5 text-brand" />
            <span>Terminal #01 (Master Counter)</span>
          </div>

          <span className="hidden sm:inline-block h-3.5 w-px bg-border" />

          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
            <span>0ms Local Latency</span>
          </div>
        </div>

        {/* Interactive Internet Cut Simulator Toggle */}
        <button
          onClick={() => setIsOfflineSimulated((prev) => !prev)}
          className={`flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-bold transition-all ${
            isOfflineSimulated
              ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-md"
              : "border-border bg-surface hover:bg-surface-soft text-foreground shadow-sm"
          }`}
          title="Toggle network connectivity simulation"
        >
          {isOfflineSimulated ? (
            <>
              <WifiOff className="h-3.5 w-3.5 text-amber-500" />
              <span>Internet Disconnected (Simulated)</span>
            </>
          ) : (
            <>
              <Wifi className="h-3.5 w-3.5 text-emerald-500" />
              <span>Simulate Internet Cut</span>
            </>
          )}
        </button>
      </div>

      {/* OFFLINE RESILIENCE BANNER */}
      <AnimatePresence>
        {isOfflineSimulated && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-4"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-700 dark:text-amber-300 font-semibold shadow-sm">
              <WifiOff className="h-4 w-4 shrink-0 text-amber-500" />
              <span>
                <strong>Zero Outage Impact:</strong> Broadband or cellular is down, but your POS
                continues creating bills, printing KOTs via Bluetooth, and syncing with up to 5 local
                terminals with zero delay.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* METRIC TILES STRIP — High-density SaaS KPI styling */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="rounded-2xl border border-border bg-surface/90 backdrop-blur-md p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider font-mono">
            <span>Today's Sales</span>
            <IndianRupee className="h-3.5 w-3.5 text-brand" />
          </div>
          <p className="mt-2 text-2xl font-black text-foreground tracking-tight flex items-center">
            ₹<NumberTicker value={48250} />
          </p>
          <p className="mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            +18.4% vs last week
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface/90 backdrop-blur-md p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider font-mono">
            <span>Bills Settled</span>
            <ReceiptText className="h-3.5 w-3.5 text-blue-500" />
          </div>
          <p className="mt-2 text-2xl font-black text-foreground tracking-tight">
            <NumberTicker value={142} />
          </p>
          <p className="mt-1 text-[11px] font-semibold text-muted-foreground">0 pending syncs</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface/90 backdrop-blur-md p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider font-mono">
            <span>Active Tables</span>
            <Layers className="h-3.5 w-3.5 text-amber-500" />
          </div>
          <p className="mt-2 text-2xl font-black text-foreground tracking-tight">8 / 12</p>
          <p className="mt-1 text-[11px] font-semibold text-muted-foreground">Avg turn: 28 min</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface/90 backdrop-blur-md p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider font-mono">
            <span>Connected Hardware</span>
            <Printer className="h-3.5 w-3.5 text-purple-500" />
          </div>
          <p className="mt-2 text-2xl font-black text-foreground tracking-tight">2 Printers</p>
          <p className="mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            Bluetooth ESC/POS ready
          </p>
        </div>
      </div>

      {/* MAIN INTERACTIVE POS TERMINAL GRID */}
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-6 mt-6 items-start">
        {/* LEFT COLUMN: TABLE SELECTOR & MENU CATALOG */}
        <div className="space-y-5">
          {/* Table / Order Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {TABLES.map((table) => {
              const isSelected = selectedTable === table.id;
              return (
                <button
                  key={table.id}
                  onClick={() => setSelectedTable(table.id)}
                  className={`flex flex-col items-start rounded-xl border px-3.5 py-2 text-xs transition-all shrink-0 ${
                    isSelected
                      ? "border-brand bg-brand text-brand-foreground shadow-sm"
                      : "border-border bg-surface hover:bg-surface-soft text-foreground"
                  }`}
                >
                  <span className="font-bold">{table.label}</span>
                  <span
                    className={`text-[10px] ${
                      isSelected ? "text-brand-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    {table.guests}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Category Rail inspired by MCPMarket */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? "bg-foreground text-background shadow-sm"
                      : "border border-border bg-surface text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Tap-to-Add Menu Grid */}
          <div className="grid sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
            {filteredMenu.map((item) => {
              const inCart = cart.find((i) => i.item.id === item.id);
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addItem(item)}
                  className={`group relative flex items-center justify-between rounded-xl border p-3.5 transition-all cursor-pointer select-none ${
                    inCart
                      ? "border-brand/40 bg-brand/5 shadow-sm"
                      : "border-border bg-surface hover:border-border hover:bg-surface-soft"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border text-[9px] font-black mt-0.5 ${
                        item.veg
                          ? "border-emerald-600 text-emerald-600"
                          : "border-red-600 text-red-600"
                      }`}
                    >
                      ●
                    </span>
                    <div>
                      <p className="text-xs font-bold text-foreground leading-snug group-hover:text-brand transition-colors">
                        {item.name}
                      </p>
                      <p className="text-xs font-mono font-semibold text-muted-foreground mt-0.5">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    {inCart ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand text-brand-foreground font-mono font-bold text-xs shadow-sm">
                        {inCart.qty}
                      </span>
                    ) : (
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground group-hover:border-brand group-hover:text-brand transition-colors">
                        <Plus className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: DIGITAL INVOICE & THERMAL TICKET PREVIEW */}
        <Card3DTilt intensity={6} glare={false}>
          <div className="rounded-2xl border border-border bg-surface-soft/90 backdrop-blur-md p-5 shadow-lg flex flex-col justify-between h-full">
            <div>
              {/* Receipt Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border text-xs font-mono">
                <div>
                  <span className="font-bold text-foreground">KHANABOOK TERMINAL</span>
                  <p className="text-[11px] text-muted-foreground">Order #{selectedTable}-042</p>
                </div>
                <button
                  onClick={() => setCart([])}
                  className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-red-500 transition-colors"
                  title="Clear order"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Order Items List */}
              <div className="py-3 max-h-[190px] overflow-y-auto space-y-2">
                {cart.length === 0 ? (
                  <p className="text-center text-xs text-muted-foreground py-8">
                    Tap any menu item on the left to add to bill
                  </p>
                ) : (
                  cart.map(({ item, qty }) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs font-mono py-1 border-b border-border/40"
                    >
                      <div className="flex items-center gap-2 truncate max-w-[170px]">
                        <span className="font-bold text-foreground truncate">{item.name}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center rounded-md border border-border bg-surface">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="p-1 hover:text-brand transition-colors"
                          >
                            <Minus className="h-2.5 w-2.5" />
                          </button>
                          <span className="px-1.5 font-bold text-[11px]">{qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="p-1 hover:text-brand transition-colors"
                          >
                            <Plus className="h-2.5 w-2.5" />
                          </button>
                        </div>
                        <span className="w-12 text-right font-bold text-foreground">
                          ₹{item.price * qty}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors ml-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Calculations Breakup */}
              <div className="pt-3 border-t border-border space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>CGST (2.5%)</span>
                  <span>₹{cgst}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>SGST (2.5%)</span>
                  <span>₹{sgst}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-foreground pt-2 border-t border-border">
                  <span>Grand Total</span>
                  <span className="text-brand">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Payment Mode Selector & KOT Print Action */}
            <div className="mt-5 pt-4 border-t border-border space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {(["UPI", "CASH", "CARD"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSelectedPayment(mode)}
                    className={`rounded-lg py-1.5 text-xs font-bold font-mono transition-all ${
                      selectedPayment === mode
                        ? "border border-brand bg-brand/10 text-brand shadow-sm"
                        : "border border-border bg-surface text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {mode === "UPI" && "⚡ UPI QR"}
                    {mode === "CASH" && "💵 Cash"}
                    {mode === "CARD" && "💳 Card"}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePrintKot}
                  disabled={cart.length === 0}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${
                    isKotPrinted
                      ? "bg-emerald-600 text-white"
                      : "btn-primary w-full"
                  }`}
                >
                  {isKotPrinted ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>KOT #42 Sent to Kitchen!</span>
                    </>
                  ) : (
                    <>
                      <Printer className="h-3.5 w-3.5" />
                      <span>Print KOT & Settle Bill</span>
                    </>
                  )}
                </button>
              </div>

              {/* Hardware Status Indicator */}
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Thermal KOT: 80mm ESC/POS
                </span>
                <span>GST B2C Invoice Ready</span>
              </div>
            </div>
          </div>
        </Card3DTilt>
      </div>
    </div>
  );
}
