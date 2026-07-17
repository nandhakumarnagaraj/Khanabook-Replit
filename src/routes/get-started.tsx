import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/site/Section";
import { BUSINESS, DISCLAIMERS, absUrl } from "@/lib/business-config";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Get KhanaBook — Restaurant POS" },
      {
        name: "description",
        content: "Talk to our team about setting up KhanaBook for your restaurant, or download the Android app.",
      },
      { property: "og:title", content: "Get KhanaBook" },
      { property: "og:description", content: "Talk to our team or download the Android app." },
      { property: "og:url", content: absUrl("/get-started") },
    ],
    links: [{ rel: "canonical", href: absUrl("/get-started") }],
  }),
  component: GetStartedPage,
});


const RESTAURANT_TYPES = ["Restaurant", "Café", "Bakery", "Cloud kitchen", "Food court", "Takeaway", "Other"];

type Errors = Partial<Record<
  "name" | "restaurant" | "phone" | "city" | "terminals" | "type" | "consent",
  string
>>;

const INDIAN_PHONE = /^(\+?91[\s-]?)?[6-9]\d{9}$/;

// TODO: Wire this to an actual backend endpoint or CRM integration before launch.
// Until then, submissions are NOT stored anywhere.
async function submitLead(_payload: Record<string, unknown>): Promise<{ ok: false; reason: "not-connected" }> {
  return { ok: false, reason: "not-connected" };
}

function GetStartedPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [submittedOnce, setSubmittedOnce] = useState(false);

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
    if (!payload.type) next.type = "Please select a restaurant type.";
    if (!payload.consent) next.consent = "Please accept the consent to continue.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Simple spam guard: honeypot must be empty.
    if (payload.honeypot) {
      setNotice("Submission blocked.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitLead(payload);
      if (res.ok) {
        // Only mark as submitted on a genuine successful backend response.
        setSubmittedOnce(true);
      } else {
        setNotice(DISCLAIMERS.formNotConnected);
      }
    } catch {
      setNotice("Something went wrong. Please contact us directly using the details on the right.");
    } finally {
      setSubmitting(false);
    }
  }



  return (
    <Section
      eyebrow="Get Started"
      title={<>Get KhanaBook for your <span className="hl">restaurant.</span></>}
      desc="Tell us a bit about your restaurant and our team will reach out. Or download the Android app directly."
    >
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] max-w-5xl mx-auto">
        <form onSubmit={onSubmit} noValidate className="card-surface space-y-4" aria-describedby="form-status">
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <Field name="name" label="Your name" required error={errors.name} />
          <Field name="restaurant" label="Restaurant name" required error={errors.restaurant} />
          <Field name="phone" label="Phone number" type="tel" required error={errors.phone} placeholder="10-digit Indian mobile" />
          <Field name="city" label="City" error={errors.city} />
          <Field name="terminals" label="Number of terminals" type="number" error={errors.terminals} min={1} />

          <label className="block">
            <div className="text-sm font-bold mb-2">
              Restaurant type <span className="text-brand">*</span>
            </div>
            <select
              name="type"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
              aria-invalid={!!errors.type}
              defaultValue=""
            >
              <option value="" disabled>Select a type</option>
              {RESTAURANT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.type && <p role="alert" className="mt-1 text-xs text-brand">{errors.type}</p>}
          </label>

          <label className="block">
            <div className="text-sm font-bold mb-2">Anything we should know?</div>
            <textarea
              name="message"
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </label>

          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" name="consent" className="mt-1 accent-brand" aria-invalid={!!errors.consent} />
            <span className="text-muted-foreground">
              I agree to be contacted about KhanaBook. I have read the{" "}
              <a href="/privacy-policy" className="underline">Privacy Policy</a>.
            </span>
          </label>
          {errors.consent && <p role="alert" className="text-xs text-brand -mt-2">{errors.consent}</p>}

          <button
            type="submit"
            disabled={submitting || submittedOnce}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            {submitting ? "Submitting…" : submittedOnce ? "Submitted" : "Request a call →"}
          </button>

          {notice && (
            <div id="form-status" role="status" className="rounded-xl border border-border bg-surface-soft p-4 text-sm text-muted-foreground">
              {notice}
            </div>
          )}
        </form>

        <aside className="space-y-6">
          <div className="card-surface">
            <div className="eyebrow mb-2">Download the app</div>
            <h2 className="text-xl font-black">Get KhanaBook on Android</h2>
            <p className="mt-2 text-muted-foreground">
              Download the Android app, create your restaurant account and complete the guided setup.
            </p>
            <a
              href={BUSINESS.playStoreUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary mt-4"
            >
              Get it on Google Play
            </a>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Play Store link pending final verification.
            </p>
          </div>

          <div className="card-surface">
            <div className="eyebrow mb-2">Contact us directly</div>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-bold">Call:</span>{" "}
                <a href={`tel:${BUSINESS.supportPhone}`} className="text-brand">{BUSINESS.supportPhone}</a>
              </li>
              <li>
                <span className="font-bold">Email:</span>{" "}
                <a href={`mailto:${BUSINESS.supportEmail}`} className="text-brand">{BUSINESS.supportEmail}</a>
              </li>
              <li>
                <span className="font-bold">WhatsApp:</span>{" "}
                <a
                  href={`https://wa.me/${BUSINESS.supportPhone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-brand"
                >
                  Message us
                </a>
              </li>
              <li className="text-muted-foreground">{BUSINESS.workingHours}</li>
            </ul>
          </div>
        </aside>
      </div>
    </Section>
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
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  min?: number;
}) {
  const id = `field-${name}`;
  return (
    <label htmlFor={id} className="block">
      <div className="text-sm font-bold mb-2">
        {label}
        {required && <span className="text-brand"> *</span>}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        min={min}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
      />

      {error && <p id={`${id}-err`} role="alert" className="mt-1 text-xs text-brand">{error}</p>}
    </label>
  );
}
