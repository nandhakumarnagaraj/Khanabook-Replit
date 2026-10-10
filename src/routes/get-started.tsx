import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import {
  Loader2,
  Smartphone,
  Cloud,
  Download,
  ExternalLink,
  Phone,
  MessageSquare,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { BUSINESS, DISCLAIMERS, absUrl } from "@/lib/business-config";
import { EntranceReveal } from "@/components/motion/EntranceReveal";
import { BorderBeam } from "@/components/motion/primitives/BorderBeam";
import { UiVerseBadge, UiVerseGlowingButton } from "@/components/uiverse";
import { PlayStoreIcon } from "@/components/icons/PlayStoreIcon";
import { GooglePlayBadge } from "@/components/ui/GooglePlayBadge";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      {
        title:
          "Get KhanaBook — Offline-First Multi-Terminal Restaurant POS | Android App & Web Dashboard",
      },
      {
        name: "description",
        content:
          "Request a demo or download the KhanaBook offline-first Android POS app. Pair with the real-time Cloud Web Dashboard for complete restaurant operations.",
      },
      { property: "og:title", content: "Get Started with KhanaBook Restaurant POS" },
      {
        property: "og:description",
        content: "Download the Android app or request a customized onboarding call.",
      },
      { property: "og:url", content: absUrl("/get-started") },
    ],
    links: [{ rel: "canonical", href: absUrl("/get-started") }],
  }),
  component: GetStartedPage,
});

const RESTAURANT_TYPES = [
  "Dhaba / Fine Dine Restaurant",
  "QSR / Fast Food Counter",
  "Café / Bakery",
  "Cloud Kitchen / Delivery",
  "Food Court / Kiosk",
  "Bar / Restro-Pub",
  "Other Food & Beverage",
];

type Errors = Partial<
  Record<"name" | "restaurant" | "phone" | "city" | "terminals" | "type" | "consent", string>
>;

const INDIAN_PHONE = /^(\+?91[\s-]?)?[6-9]\d{9}$/;
const FORMSPREE_URL = "https://formspree.io/f/mlgvyknl";

async function submitLead(payload: Record<string, unknown>): Promise<{ ok: boolean }> {
  try {
    const response = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "khanabook.com/get-started",
        product: BUSINESS.productName,
        ...payload,
      }),
    });
    return { ok: response.ok };
  } catch {
    return { ok: false };
  }
}

function GetStartedPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [submittedOnce, setSubmittedOnce] = useState(false);

  const validateField = useCallback((name: string, value: string) => {
    const trimmed = value.trim();
    setErrors((prev) => {
      const next = { ...prev };
      if (name === "name" && !trimmed) next.name = "Please enter your name.";
      else if (name === "name") delete next.name;

      if (name === "restaurant" && !trimmed) next.restaurant = "Please enter your restaurant name.";
      else if (name === "restaurant") delete next.restaurant;

      if (name === "phone") {
        if (!trimmed) next.phone = "Please enter your phone number.";
        else if (!INDIAN_PHONE.test(trimmed))
          next.phone = "Please enter a valid 10-digit Indian mobile number.";
        else delete next.phone;
      }
      return next;
    });
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || submittedOnce) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      restaurant: String(fd.get("restaurant") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
      terminals: String(fd.get("terminals") ?? "").trim(),
      type: String(fd.get("type") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      consent: fd.get("consent") === "on",
      honeypot: String(fd.get("website") ?? "").trim(),
    };

    const next: Errors = {};
    if (!payload.name) next.name = "Please enter your name.";
    if (!payload.restaurant) next.restaurant = "Please enter your restaurant name.";
    if (!payload.phone) next.phone = "Please enter your phone number.";
    else if (!INDIAN_PHONE.test(payload.phone))
      next.phone = "Please enter a valid Indian mobile number.";
    if (!payload.type) next.type = "Please select your restaurant format.";
    if (!payload.consent) next.consent = "Please agree to be contacted.";

    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    setSubmitting(true);
    setNotice(null);

    const res = await submitLead(payload);
    setSubmitting(false);

    if (res.ok) {
      setSubmittedOnce(true);
      setNotice(
        "Thank you! Your request has been received. Our team will contact you shortly to configure your restaurant.",
      );
    } else {
      setNotice(
        "We couldn't submit your form directly. Please call or WhatsApp us directly at " +
          BUSINESS.supportPhone,
      );
    }
  }

  const whatsappNumber = BUSINESS.supportPhone.replace(/[^0-9]/g, "");

  return (
    <div className="bg-[#131314] text-white min-h-screen font-['Google_Sans',_sans-serif] selection:bg-brand/30 selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16 border-b border-[#28292A]">
        {/* Subtle Ambient Light */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-brand/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
        />

        <div className="w-[92vw] md:w-[75vw] mx-auto relative z-10 text-center">
          <EntranceReveal direction="up" delay={0.05}>
            <UiVerseBadge pulseColor="emerald">
              ONBOARDING &amp; DIRECT ACCESS • ANDROID APP &amp; WEB DASHBOARD
            </UiVerseBadge>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.15}>
            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Get Started with <span className="hl">KhanaBook POS.</span>
            </h1>
          </EntranceReveal>

          <EntranceReveal direction="up" delay={0.25}>
            <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Fill in your details for a personalized onboarding call, or download the Android app
              and launch the Web Dashboard directly.
            </p>
          </EntranceReveal>
        </div>
      </section>

      {/* 2. FORM & DIRECT ACCESS GRID */}
      <section className="py-14 md:py-20">
        <div className="w-[92vw] md:w-[75vw] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT: ONBOARDING FORM (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6 sm:p-8 shadow-xl">
                <div className="mb-6 pb-4 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white">Request Onboarding Assistance</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Our team will assist with menu import, ESC/POS printer setup, and multi-terminal
                    sync.
                  </p>
                </div>

                <form onSubmit={onSubmit} noValidate className="space-y-4">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      name="name"
                      label="Your Full Name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      error={errors.name}
                      onBlurValidate={validateField}
                    />
                    <Field
                      name="restaurant"
                      label="Restaurant Name"
                      required
                      placeholder="e.g. Spice Route Bistro"
                      error={errors.restaurant}
                      onBlurValidate={validateField}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      name="phone"
                      label="Mobile Number (WhatsApp)"
                      type="tel"
                      required
                      placeholder="10-digit Indian mobile"
                      error={errors.phone}
                      onBlurValidate={validateField}
                    />
                    <Field
                      name="city"
                      label="City / Location"
                      placeholder="e.g. Bengaluru, Pune, Delhi"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="field-type"
                        className="block text-xs font-bold text-gray-300 mb-1.5"
                      >
                        Restaurant Format <span className="text-brand">*</span>
                      </label>
                      <select
                        id="field-type"
                        name="type"
                        aria-invalid={Boolean(errors.type)}
                        aria-describedby={errors.type ? "error-type" : undefined}
                        className="w-full rounded-xl border border-white/10 bg-[#28292A] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand"
                        defaultValue=""
                      >
                        <option value="" disabled className="text-gray-300">
                          Select format
                        </option>
                        {RESTAURANT_TYPES.map((t) => (
                          <option key={t} value={t} className="bg-[#28292A] text-white">
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors.type && (
                        <p id="error-type" className="mt-1 text-xs text-brand">
                          {errors.type}
                        </p>
                      )}
                    </div>

                    <Field
                      name="terminals"
                      label="Estimated Terminals (Up to 5)"
                      type="number"
                      placeholder="e.g. 2 (Counter + Kitchen)"
                      min={1}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                      Printers or Specific Requirements (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="e.g. Need help connecting TVS thermal printer via USB or Wi-Fi"
                      className="w-full rounded-xl border border-white/10 bg-[#28292A] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </div>

                  <label className="flex items-start gap-3 text-xs text-gray-300 pt-1">
                    <input
                      type="checkbox"
                      name="consent"
                      defaultChecked
                      className="mt-0.5 accent-brand"
                    />
                    <span>
                      I agree to be contacted via WhatsApp/Phone by KhanaBook for restaurant POS
                      onboarding under the{" "}
                      <a href="/privacy-policy" className="text-brand underline">
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>
                  {errors.consent && <p className="text-xs text-brand">{errors.consent}</p>}

                  <div className="w-full">
                    <UiVerseGlowingButton
                      variant="brand"
                      size="lg"
                      type="submit"
                      disabled={submitting || submittedOnce}
                      className="w-full disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                      <span>
                        {submitting
                          ? "Submitting Details…"
                          : submittedOnce
                            ? "✓ Request Received!"
                            : "Submit Onboarding Request →"}
                      </span>
                    </UiVerseGlowingButton>
                  </div>

                  {notice && (
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-300 leading-relaxed">
                      {notice}
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* RIGHT: SELF-SERVE LAUNCH CARDS (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* CARD 1: ANDROID APP */}
              <div className="relative rounded-2xl border border-emerald-500/30 bg-[#1E1F20] p-6 shadow-xl overflow-hidden hover:border-emerald-500/50 transition-all">
                <BorderBeam
                  size={180}
                  duration={12}
                  delay={0}
                  colorFrom="#10b981"
                  colorTo="#059669"
                />
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Step 1 • Billing Counter
                    </span>
                    <h3 className="text-base font-bold text-white">Download Android POS App</h3>
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  Install directly on your Android phone or tablet from the Google Play Store.
                  Create your account and start billing offline immediately.
                </p>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-gray-300">Android 8.0+ supported</span>
                  <GooglePlayBadge size="sm" />
                </div>
              </div>

              {/* CARD 2: WEB DASHBOARD */}
              <div className="relative rounded-2xl border border-blue-500/30 bg-[#1E1F20] p-6 shadow-xl overflow-hidden hover:border-blue-500/50 transition-all">
                <BorderBeam
                  size={180}
                  duration={12}
                  delay={6}
                  colorFrom="#3b82f6"
                  colorTo="#1d4ed8"
                />
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Cloud className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                      Step 2 • Cloud Back-Office
                    </span>
                    <h3 className="text-base font-bold text-white">Launch Web Dashboard</h3>
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  Open in your browser on PC, laptop, or iPad. Edit categories, upload dish photos,
                  inspect live sales telemetry, and manage inventory BOM.
                </p>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-blue-300 font-semibold">
                    Instant Zero-Install Access
                  </span>
                  <a
                    href={BUSINESS.loginUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 text-xs font-bold transition-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Web Dashboard Login
                  </a>
                </div>
              </div>

              {/* CARD 3: DIRECT CONTACT */}
              <div className="rounded-2xl border border-white/10 bg-[#1E1F20] p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-brand mb-3">
                  Instant Support Channels
                </div>
                <div className="space-y-3 text-xs">
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#28292A] hover:bg-[#323334] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-gray-200">
                      <MessageSquare className="h-4 w-4 text-emerald-400" />
                      <span>WhatsApp Support</span>
                    </div>
                    <span className="text-emerald-400 font-bold">Chat Now →</span>
                  </a>

                  <a
                    href={`tel:${BUSINESS.supportPhone}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#28292A] hover:bg-[#323334] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-gray-200">
                      <Phone className="h-4 w-4 text-brand" />
                      <span>Call {BUSINESS.supportPhone}</span>
                    </div>
                    <span className="text-brand font-bold">Call →</span>
                  </a>

                  <a
                    href={`mailto:${BUSINESS.supportEmail}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#28292A] hover:bg-[#323334] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-gray-200">
                      <Mail className="h-4 w-4 text-blue-400" />
                      <span>{BUSINESS.supportEmail}</span>
                    </div>
                    <span className="text-blue-400 font-bold">Email →</span>
                  </a>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-gray-300">
                  Support hours: {BUSINESS.workingHours}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  error,
  placeholder,
  min,
  onBlurValidate,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  min?: number;
  onBlurValidate?: (name: string, value: string) => void;
}) {
  const errorId = error ? `error-${name}` : undefined;
  return (
    <div>
      <label htmlFor={`field-${name}`} className="block text-xs font-bold text-gray-300 mb-1.5">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      <input
        id={`field-${name}`}
        name={name}
        type={type}
        placeholder={placeholder}
        min={min}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={`w-full rounded-xl border bg-[#28292A] px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand transition-colors ${
          error ? "border-brand bg-brand/5" : "border-white/10"
        }`}
        onBlur={(e) => onBlurValidate?.(name, e.target.value)}
      />
      {error && (
        <p id={errorId} className="mt-1 text-xs text-brand">
          {error}
        </p>
      )}
    </div>
  );
}
