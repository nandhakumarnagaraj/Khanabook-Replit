# Design Document

## Overview

This document specifies the architecture and component design for the KhanaBook marketing website enhancement. It covers scroll-based entrance animations, form UX improvements, error boundaries, offline indicators, a social proof section, interactive product tabs, expandable help guides, and performance optimizations. All implementations use the existing design system (Tailwind CSS 4, shadcn/ui new-york style, oklch tokens, Karla font) with no new large dependencies.

## Architecture

The enhancements are layered onto the existing TanStack Start/Router application with file-based routing. New logic is organized as:

1. **Hooks** (`src/hooks/`) — Reusable React hooks for cross-cutting concerns (viewport observation, online status, reduced motion detection)
2. **Site Components** (`src/components/site/`) — Existing Section, FAQ, Header, Footer enhanced in-place; new components added alongside
3. **UI Components** (`src/components/ui/`) — Existing shadcn/ui primitives (Skeleton, Tabs, Collapsible) used as-is
4. **Data** (`src/lib/`) — New data arrays for product tabs and help guides added to existing data files
5. **Routes** (`src/routes/`) — Route-level error boundaries added via TanStack Router's `errorComponent` export; skeleton fallbacks via `pendingComponent`

No new npm dependencies are introduced. All animation, intersection observation, and online/offline detection use browser APIs directly.


## Components and Interfaces

### 1. `useInView` Hook — Scroll-Based Entrance Animations

**Location:** `src/hooks/use-in-view.ts`

**Decision:** IntersectionObserver hook (not CSS-only) — provides programmatic control over threshold, respects reduced motion via `useReducedMotion`, and avoids polluting CSS with animation keyframes that fire unconditionally.

```typescript
import { useEffect, useRef, useState } from "react";

export function useInView(options?: { threshold?: number; once?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setIsInView(true); // Skip animation, show immediately
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options?.once !== false) observer.unobserve(el);
        }
      },
      { threshold: options?.threshold ?? 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.once]);

  return { ref, isInView };
}
```


### 2. Section Component Enhancement — Animation Logic Placement

**Decision:** Animation logic lives inside the `Section` component itself (not a wrapper). This satisfies requirement 3.4 — all Section instances get animations without per-section configuration.

**Location:** Modify existing `src/components/site/Section.tsx`

```typescript
import { type ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

export function Section({
  eyebrow, title, desc, children, className = "", center = true, id,
}: {
  eyebrow?: string;
  title?: ReactNode;
  desc?: ReactNode;
  children?: ReactNode;
  className?: string;
  center?: boolean;
  id?: string;
}) {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true });

  return (
    <section
      ref={ref}
      id={id}
      className={`py-20 md:py-28 transition-opacity duration-500 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "500ms",
      }}
    >
      <div className="container-page">
        {(eyebrow || title || desc) && (
          <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-14`}>
            {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
            {title && <h2 className="text-3xl md:text-5xl font-black leading-tight">{title}</h2>}
            {desc && <p className="mt-4 text-lg text-muted-foreground">{desc}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
```

When `prefers-reduced-motion: reduce` is active, `useInView` immediately sets `isInView = true`, so the section renders fully visible with no transition.


### 3. Product Tabs Section — Homepage Feature Showcase

**Decision:** Use the existing shadcn/ui `Tabs` component (backed by Radix UI `@radix-ui/react-tabs`) which already handles keyboard navigation (arrow keys), ARIA roles (`tablist`, `tab`, `tabpanel`), and focus management. No carousel, no auto-advance.

**Location:** `src/components/site/ProductTabs.tsx`

**Data structure** (added to `src/lib/home-data.ts`):

```typescript
export interface ProductTab {
  id: string;
  label: string;
  description: string;
  imageSrc: string;       // Static screenshot path from src/assets/
  imageAlt: string;
}

export const PRODUCT_TABS: ProductTab[] = [
  { id: "billing", label: "Billing", description: "...", imageSrc: "...", imageAlt: "..." },
  { id: "kot", label: "KOT", description: "...", imageSrc: "...", imageAlt: "..." },
  { id: "payments", label: "Payments", description: "...", imageSrc: "...", imageAlt: "..." },
  { id: "menu", label: "Menu Management", description: "...", imageSrc: "...", imageAlt: "..." },
  { id: "reports", label: "Reports", description: "...", imageSrc: "...", imageAlt: "..." },
];
```

**Component structure:**

```typescript
import { Section } from "@/components/site/Section";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PRODUCT_TABS } from "@/lib/home-data";

export function ProductTabs() {
  return (
    <Section
      eyebrow="Product"
      title={<>See KhanaBook <span className="hl">in action.</span></>}
      desc="Browse features by category."
    >
      <Tabs defaultValue={PRODUCT_TABS[0].id} className="max-w-5xl mx-auto">
        <TabsList className="flex flex-wrap justify-center gap-1 h-auto bg-surface-soft p-2 rounded-2xl">
          {PRODUCT_TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-brand data-[state=active]:text-brand-foreground rounded-xl px-4 py-2 font-bold"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {PRODUCT_TABS.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-8">
            <div className="rounded-3xl border border-border overflow-hidden shadow-xl">
              <img
                src={tab.imageSrc}
                alt={tab.imageAlt}
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
            <p className="mt-4 text-center text-muted-foreground">{tab.description}</p>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  );
}
```

Tab state is managed internally by Radix Tabs (uncontrolled with `defaultValue`). No external state management needed.


### 4. Help Guides — Expandable Step-by-Step Instructions

**Decision:** Use the existing shadcn/ui `Collapsible` component (Radix `@radix-ui/react-collapsible`) which provides `aria-expanded`, `aria-controls`, and keyboard activation (Enter/Space) out of the box.

**Data structure** (added to `src/lib/help-data.ts`):

```typescript
export interface HelpGuide {
  id: string;
  title: string;
  steps: string[];
}

export const HELP_GUIDES: HelpGuide[] = [
  {
    id: "printer-pairing",
    title: "Printer Pairing",
    steps: [
      "Turn on your Bluetooth thermal printer and enable pairing mode.",
      "Open KhanaBook → Settings → Printers.",
      "Tap 'Add Printer' and select your printer from the list.",
      "Print a test receipt to confirm the connection.",
    ],
  },
  {
    id: "first-bill",
    title: "First Bill",
    steps: [
      "Tap 'New Order' on the home screen.",
      "Select items from your menu and set quantities.",
      "Choose a payment method (Cash, UPI, or Card).",
      "Tap 'Generate Bill' to print or share the receipt.",
    ],
  },
  {
    id: "menu-import",
    title: "Menu Import",
    steps: [
      "Go to Settings → Menu → Import.",
      "Take a photo of your paper menu or upload a PDF.",
      "Review the AI-detected items and categories.",
      "Confirm mapping and save to your digital menu.",
    ],
  },
  {
    id: "offline-sync",
    title: "Offline Sync",
    steps: [
      "KhanaBook works offline by default — no setup needed.",
      "Bills created offline are stored locally on the device.",
      "When internet returns, data syncs automatically in the background.",
      "Check sync status in Settings → Sync.",
    ],
  },
  {
    id: "reports",
    title: "Reports",
    steps: [
      "Open the Reports tab from the main navigation.",
      "Select a date range (today, this week, custom).",
      "View sales totals, payment breakdown, and item performance.",
      "Export data for your accountant using the share button.",
    ],
  },
];
```

**Component** (`src/components/site/HelpGuides.tsx`):

```typescript
import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { HELP_GUIDES } from "@/lib/help-data";

export function HelpGuides() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {HELP_GUIDES.map((guide) => {
        const isOpen = openId === guide.id;
        return (
          <Collapsible
            key={guide.id}
            open={isOpen}
            onOpenChange={(open) => setOpenId(open ? guide.id : null)}
          >
            <CollapsibleTrigger className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-border bg-surface font-bold cursor-pointer">
              <span>{guide.title}</span>
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 text-brand transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-5 pb-5 pt-2">
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground leading-relaxed">
                {guide.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
}
```

Accordion behavior (one-at-a-time) is achieved by controlled state (`openId`). The visual style matches the existing FAQ `<details>` pattern with `border-border bg-surface rounded-xl`.


### 5. Per-Route Error Boundaries

**Decision:** Use TanStack Router's built-in `errorComponent` export on each route file. This is the idiomatic approach — no custom React class-based error boundaries needed. The router catches render errors within the route and displays the exported error component.

**Location:** Each route file exports an `errorComponent`. A shared `RouteError` component is created for reuse.

**Shared component** (`src/components/site/RouteError.tsx`):

```typescript
import { Link, useRouter } from "@tanstack/react-router";

export function RouteError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This section couldn't load. You can try again or head back to the homepage.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Try again
          </button>
          <Link to="/" className="btn-secondary">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**Usage in each route:**

```typescript
import { RouteError } from "@/components/site/RouteError";

export const Route = createFileRoute("/help")({
  // ... existing config
  errorComponent: RouteError,
  component: HelpPage,
});
```

This is independent of the root-level `ErrorComponent` already in `__root.tsx`, which acts as the final fallback.


### 6. Offline Indicator

**Decision:** A top-of-page banner positioned below the site header, using a fixed position so it overlays content without pushing layout. Uses `navigator.onLine` + `online`/`offline` events. Placed in `RootComponent` (in `__root.tsx`) so it's available on all routes.

**Hook** (`src/hooks/use-online-status.ts`):

```typescript
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return true; // Assume online during SSR
}

export function useOnlineStatus(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
```

**Component** (`src/components/site/OfflineIndicator.tsx`):

```typescript
import { useOnlineStatus } from "@/hooks/use-online-status";
import { WifiOff } from "lucide-react";

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-16 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 text-sm font-bold shadow-lg"
    >
      <WifiOff aria-hidden="true" className="h-4 w-4" />
      You are offline. Some content may not load.
    </div>
  );
}
```

The indicator appears immediately when `navigator.onLine` becomes `false` (well within the 2-second requirement). It auto-dismisses when connectivity returns because the component re-renders with `isOnline = true` and returns `null`. The `role="alert"` and `aria-live="assertive"` ensure screen readers announce it.

**Placement:** Rendered inside `RootComponent` in `__root.tsx`, after `<SiteHeader />`.


### 7. Form Enhancement — Get Started Page

**Decision:** Controlled form with `onBlur` validation (not `onChange` — less noisy). The existing form already uses controlled error state (`useState<Errors>`). Enhancements add:
- `onBlur` handlers on each field for inline validation
- Spinner using Lucide `Loader2` icon with `animate-spin`
- `aria-describedby` linking each field to its error message (already partially implemented via `Field` component)

**Validation timing:** On blur for individual fields. Full re-validation on submit.

The existing `Field` component already renders `aria-describedby={error ? \`${id}-err\` : undefined}` and error `<p id={\`${id}-err\`}>`. The enhancement adds an `onBlur` prop to trigger validation for that specific field.

```typescript
function Field({
  name, label, type = "text", required, error, placeholder, min, onBlur,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  min?: number;
  onBlur?: () => void;
}) {
  const id = `field-${name}`;
  return (
    <label htmlFor={id} className="block">
      <div className="text-sm font-bold mb-2">
        {label}{required && <span className="text-brand"> *</span>}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        min={min}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        onBlur={onBlur}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
      />
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1 text-xs text-brand">
          {error}
        </p>
      )}
    </label>
  );
}
```

**Submit button with spinner:**

```typescript
import { Loader2 } from "lucide-react";

<button
  type="submit"
  disabled={submitting || submittedOnce}
  className="btn-primary w-full justify-center disabled:opacity-60"
>
  {submitting ? (
    <>
      <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
      Submitting…
    </>
  ) : submittedOnce ? "Submitted" : "Request a call →"}
</button>
```

No new form library is introduced — the existing `useState`-based approach is sufficient for this single form.


### 8. Loading States / Skeleton Screens

**Decision:** Use TanStack Router's `pendingComponent` export on each route. The pending component renders shadcn/ui `Skeleton` elements matching the expected layout of that page.

**Example** (for the help route):

```typescript
import { Skeleton } from "@/components/ui/skeleton";

function HelpPageSkeleton() {
  return (
    <div className="py-20 md:py-28">
      <div className="container-page">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <Skeleton className="h-4 w-24 mx-auto mb-4" />
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-5xl mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/help")({
  pendingComponent: HelpPageSkeleton,
  // ...
});
```

The `Skeleton` component uses `animate-pulse` with `bg-primary/10` which respects the existing design tokens.


### 9. Social Proof Section

**Location:** `src/components/site/SocialProof.tsx`, rendered on homepage between the "Restaurant Types" section and the "Workflow" section.

```typescript
import { Section } from "@/components/site/Section";

const PLACEHOLDER_COUNT = 6;

export function SocialProof() {
  return (
    <Section className="py-12 md:py-16">
      <div className="flex flex-wrap items-center justify-center gap-6">
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-28 rounded-lg bg-muted/50 border border-border"
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Customer logos coming soon
      </p>
    </Section>
  );
}
```

Uses `bg-muted/50` and `border-border` from design tokens. `flex-wrap` handles responsive wrapping. `aria-hidden` on placeholders since they carry no semantic content.

### 10. Card Hover States

**Location:** Added to `src/styles.css` within the existing `@utility card-surface` block or as a new CSS rule.

```css
@utility card-surface {
  /* existing styles... */
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

/* Add hover via standard CSS targeting the utility class output */
.card-surface:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -16px rgba(0, 0, 0, 0.15);
  border-color: color-mix(in oklch, var(--brand) 20%, var(--border));
}

@media (prefers-reduced-motion: reduce) {
  .card-surface:hover {
    transform: none;
  }
}
```

Transition duration is 200ms. Under reduced motion, only box-shadow and border-color change (no transform).


### 11. Performance — Critical Asset Preloading

**Location:** `src/routes/__root.tsx` head configuration and `src/routes/index.tsx` head configuration.

**Hero image preload** (in homepage route head):

```typescript
links: [
  { rel: "preload", href: posPhone, as: "image" },
  // existing links...
]
```

**Font preload** (in root route head — already uses preconnect, add preload for the font file):

```typescript
links: [
  // existing preconnect links...
  {
    rel: "preload",
    href: "https://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQ.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
]
```

**Lazy loading:** All images already use `loading="lazy"` except the hero image (`loading="eager"`). Audit remaining images to confirm compliance.

**Code splitting:** TanStack Router with Vite file-based routing already produces per-route chunks. No additional configuration needed — verified by the existing `.output/public/assets/` structure showing separate JS files per route.

## Data Models

### ProductTab

| Field       | Type   | Description                                      |
|-------------|--------|--------------------------------------------------|
| id          | string | Unique tab identifier (kebab-case)               |
| label       | string | Tab button display text                          |
| description | string | Caption shown below the screenshot               |
| imageSrc    | string | Import path to static screenshot                 |
| imageAlt    | string | Alt text describing the screenshot               |

### HelpGuide

| Field  | Type     | Description                                    |
|--------|----------|------------------------------------------------|
| id     | string   | Unique guide identifier (kebab-case)           |
| title  | string   | Guide heading displayed on the trigger         |
| steps  | string[] | Ordered list of step-by-step instructions      |

### Form Errors (existing, enhanced)

| Field     | Type              | Description                           |
|-----------|-------------------|---------------------------------------|
| name      | string \| undefined | Error for the name field             |
| restaurant| string \| undefined | Error for the restaurant field       |
| phone     | string \| undefined | Error for the phone field            |
| city      | string \| undefined | Error for the city field             |
| terminals | string \| undefined | Error for the terminals field        |
| type      | string \| undefined | Error for the type select            |
| consent   | string \| undefined | Error for the consent checkbox       |


## Error Handling

### Route-Level Errors
- Each route exports `errorComponent: RouteError` — catches render errors and shows retry/home UI
- Root-level `ErrorComponent` in `__root.tsx` remains as the final fallback

### Form Submission Errors
- Network failures: caught in `try/catch`, display user-friendly message with fallback contact info
- Validation errors: displayed inline per-field via `aria-describedby`-linked error elements
- Duplicate submission prevention: button disabled during submission and after success

### Offline State
- Detected via `useSyncExternalStore` subscribing to `online`/`offline` events
- Renders a dismissible (auto-dismissing) banner — does not block user interaction
- SSR-safe: `getServerSnapshot` returns `true` (assume online during server render)

### Animation Failures
- IntersectionObserver not supported (very old browsers): `useInView` returns `isInView = true` by default, so content is always visible
- Reduced motion: bypasses animation entirely, content shown immediately

## File Structure (New/Modified Files)

```
src/
├── hooks/
│   ├── use-in-view.ts              (NEW)
│   └── use-online-status.ts        (NEW)
├── components/
│   └── site/
│       ├── Section.tsx             (MODIFIED — add useInView)
│       ├── ProductTabs.tsx         (NEW)
│       ├── SocialProof.tsx         (NEW)
│       ├── HelpGuides.tsx          (NEW)
│       ├── OfflineIndicator.tsx    (NEW)
│       └── RouteError.tsx          (NEW)
├── lib/
│   ├── home-data.ts               (MODIFIED — add PRODUCT_TABS)
│   └── help-data.ts               (MODIFIED — add HELP_GUIDES)
├── routes/
│   ├── __root.tsx                  (MODIFIED — add OfflineIndicator, font preload)
│   ├── index.tsx                   (MODIFIED — add ProductTabs, SocialProof, hero preload)
│   ├── help.tsx                    (MODIFIED — add HelpGuides, errorComponent, pendingComponent)
│   ├── get-started.tsx             (MODIFIED — add onBlur validation, spinner, errorComponent)
│   ├── features.tsx                (MODIFIED — add errorComponent, pendingComponent)
│   ├── compare.tsx                 (MODIFIED — add errorComponent, pendingComponent)
│   └── blog.tsx                    (MODIFIED — add errorComponent, pendingComponent)
└── styles.css                      (MODIFIED — add card hover states)
```


## Testing Strategy

- **Unit tests:** Verify specific examples — skeleton renders during loading, error boundary catches errors, offline indicator appears on offline event, social proof renders placeholder text, keyboard activation of help guides.
- **Property tests:** Verify universal properties — form validation behavior across all field/input combinations, IntersectionObserver hook behavior, tab state management, ARIA attribute correctness.
- **Integration tests:** Verify route-level behavior — error boundaries per route, preload tags in rendered HTML, code splitting output.
- **Visual/Snapshot tests:** Card hover states, skeleton styling, offline indicator positioning.

Property-based tests target the pure logic hooks (`useInView`, `useOnlineStatus`) and form validation logic. UI integration is tested with example-based tests using a testing-library approach.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Required field validation on blur

*For any* required form field in the Get Started form that is left empty (value is empty string or only whitespace), blurring that field SHALL produce a non-empty error message adjacent to that field.

**Validates: Requirements 2.1**

### Property 2: Phone format validation on blur

*For any* string value in the phone field that does not match the Indian mobile number pattern (`/^(\+?91[\s-]?)?[6-9]\d{9}$/`), blurring the phone field SHALL produce a format-specific error message.

**Validates: Requirements 2.2**

### Property 3: Error-field ARIA association

*For any* form field in the Get Started form that has a visible error message, the field element's `aria-describedby` attribute SHALL reference the `id` of the error message element.

**Validates: Requirements 2.6**

### Property 4: Section entrance animation on viewport intersection

*For any* Section component that enters the viewport (intersection ratio ≥ 0.1) while the user does NOT have reduced motion enabled, the section SHALL transition from `opacity: 0` to `opacity: 1`.

**Validates: Requirements 3.1, 3.2**

### Property 5: Reduced motion bypasses animation

*For any* Section component, when `prefers-reduced-motion: reduce` is active, the section SHALL be rendered with full opacity and no transform offset immediately (isInView = true from initialization).

**Validates: Requirements 3.3**

### Property 6: Tab selection displays corresponding content

*For any* tab in the Product Tabs section, clicking that tab SHALL cause the tab panel with the matching `value` to become visible, and all other tab panels to be hidden.

**Validates: Requirements 8.2**

### Property 7: Active tab visual distinction

*For any* tab in the Product Tabs section that has `data-state="active"`, it SHALL have the brand background color applied (via `data-[state=active]:bg-brand` class).

**Validates: Requirements 8.3**

### Property 8: Help guide expand/collapse toggle with ARIA state

*For any* Help Guide section, activating its trigger toggles visibility: if collapsed, it expands to show steps; if expanded, it collapses to hide steps. In both cases, the trigger's `aria-expanded` attribute SHALL reflect the current open/closed state (`"true"` when open, `"false"` when closed).

**Validates: Requirements 9.2, 9.3, 9.5**

### Property 9: Below-fold images use lazy loading

*For any* `<img>` element rendered below the initial viewport fold (i.e., not the hero image), the element SHALL have `loading="lazy"` attribute set.

**Validates: Requirements 10.3**
