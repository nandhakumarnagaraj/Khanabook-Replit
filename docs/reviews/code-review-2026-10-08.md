# KhanaBook Website — Code Review

> 2026-10-08 · Review only — **no `src/` changes made** (standing rule one). Grounded in source reads;
> nothing was run in a browser, so CSS-level items need live verification.

## Bugs / correctness

| #   | Severity | Where                                         | Issue                                                                                                                                                                                                                                  |
| --- | -------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | High     | `src/routes/index.tsx:771`                    | `flex items-center` applied directly to a `<td>` in the architecture table. `display:flex` overrides `table-cell` → misaligned rows/cells across browsers. Fix: wrap contents in a `<span className="flex …">`, keep the `<td>` plain. |
| 2   | High     | `src/routes/index.tsx:177` vs everything else | Homepage says "Android 9.0+"; terms, FAQ, compare, get-started all say **8.0+**. Terms and marketing must match for a compliance-adjacent product.                                                                                     |
| 3   | High     | `src/routes/pricing.tsx` (INCLUDED)           | Says printers are "Bluetooth" only; terms/help/compare say **"USB, Wi-Fi or Bluetooth"**. Pricing is the page buyers screenshot.                                                                                                       |
| 4   | High     | `src/components/site/FloatingCtas.tsx:51`     | Sticky CTA bar sets `aria-hidden={!visible}` but its links stay keyboard-focusable while invisible (WCAG 2.4.7). Add `visibility:hidden` or `inert`.                                                                                   |
| 5   | Low      | `src/components/motion/CustomCursor.tsx`      | `isVisible` in the effect dep array re-subscribes listeners on every toggle; handlers close over stale state. Also never hides the native cursor → two cursors; ignores `prefers-reduced-motion`.                                      |

## SEO / sharing

- **No `og:image` on any route** while `twitter:card summary_large_image` is declared
  (`src/routes/__root.tsx`). WhatsApp/Twitter shares render imageless — highest-ROI fix for a
  WhatsApp-driven market.
- Hardcoded Google Fonts `woff2` preload URL in `__root.tsx` will 404 silently if Google reshuffles
  the subset; `preconnect` alone suffices.

## Trust / legal exposure

- **Testimonials appear fabricated** (`src/lib/testimonials.ts`): four hand-written quotes shown
  with a "Verified Restaurant Partner" badge and green check. If not real, this is a Consumer
  Protection Act / ASCI issue in India. One quote praises an "AI menu import" feature that exists
  nowhere else on the site.
- **"Join over 3,400+ restaurants"** (`index.tsx:902`) — unsubstantiated; coexists with the Play
  listing's falsifiable "India's only FREE restaurant POS".
- **Fake progress loader** (`src/components/motion/SmoothLoader.tsx`): random-increment bar labeled
  "Loading core engine…", blocks first paint ~1–2 s per session, loads nothing. A deceptive pattern
  that contradicts the site's own "Honesty & Transparency" principle.

## Things done well

- Semantic HTML, per-route meta/canonical/JSON-LD (SoftwareApplication, FAQPage, Organization).
- Real `aria-*` usage: hamburger `aria-expanded/controls`, offline banner `role="alert"`,
  carousel labels.
- `prefers-reduced-motion` honored in `use-in-view.tsx` and one `styles.css` block (partial).
- Lazy-loaded story images, webp assets, rAF-throttled scroll listener.
- Root error boundary with retry + external error reporting; honest "not currently available"
  pricing disclosures.

## Priority order (recommended)

1. og:image + share asset (conversion ROI).
2. `<td>` flex bug + the two factual contradictions (Android version, printer support).
3. Testimonial/claims decision — real quotes or remove "Verified" framing.
4. Unfocusable hidden CTA bar (`inert`/`visibility`).
5. Remove or make-honest the loader; move architecture/hardware content off the homepage.
