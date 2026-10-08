# UI/UX Theory Checklist — KhanaBook Site Reviews

> Working set of theories applied in the 2026-10-08 reviews, each with the live site example.
> Reusable as a design-review checklist. No `src/` changes proposed by this document.

## 1. Cognitive laws

- [ ] **Hick's Law** — decision time grows with choice count. _Site:_ ~18 homepage sections dilute
      the single install decision.
- [ ] **Fitts's Law** — bigger/closer targets are faster. _Site:_ sticky bottom CTA ✔; mobile
      "Get Started" text link hidden ✖.
- [ ] **Miller's Law / chunking** — ~4–7 items per group. _Site:_ feature groups of 6 ✔; 14-item
      unchunked pricing list ✖.
- [ ] **Jakob's Law** — match existing web conventions. _Site:_ external dashboard login ✔;
      double-cursor ✖.
- [ ] **Doherty Threshold** — <400 ms feels instant. _Site:_ "50ms SQLite" pitch ✔; fake loader ✖.
- [ ] **Von Restorff effect** — the distinct item is remembered. _Site:_ TextShimmer hero phrase ✔.
- [ ] **Serial Position Effect** — first and last positions stick. _Site:_ hero + closing CTA carry
      the message; middle 16 sections waste prime slots.
- [ ] **Cognitive Load Theory** — cut extraneous load. _Site:_ cursor ring, parallax, waves, 3D tilt
      serve no comprehension.

## 2. Nielsen heuristics

- [ ] Visibility of system status — loader simulates instead of reports.
- [ ] Match with real world — KOT/dhaba/steward/GST/WhatsApp language ✔ (strongest heuristic).
- [ ] User control & freedom — carousel lacks touch pause (WCAG 2.2.2).
- [ ] Consistency & standards — three card languages; Android 8-vs-9 and printer-copy contradictions.
- [ ] Recognition over recall — icon+label pairs ✔.
- [ ] Error prevention — honest "not currently available" disclosures ✔.
- [ ] Aesthetic & minimalist design — decoration outruns information.
- [ ] Help recognize/recover errors — root error boundary + OfflineIndicator ✔.

## 3. Gestalt

- [ ] Proximity — bento grids group correctly ✔.
- [ ] Similarity — broken by mixed card styles; equal items look unequal.
- [ ] Common region — architecture table groups the comparison ✔.
- [ ] Figure/ground — ambient glows + blur risk mud on low-end Android screens.

## 4. Accessibility (WCAG 2.2 + ARIA)

- [ ] 2.2.2 Pause/Stop/Hide — auto-advancing carousel, no touch pause.
- [ ] 2.4.7 Focus Visible — hidden sticky CTA links remain focusable (`aria-hidden` alone is not
      enough; use `inert`/`visibility`).
- [ ] 4.1.2 Name/Role/Value — hamburger `aria-expanded/controls` ✔.
- [ ] Reduced motion — partial coverage only; cursor/parallax/loader ignore it.
- [ ] Contrast — gray-400 on near-black passes; 10–11 px metadata text is the legibility risk.

## 5. Persuasion & conversion

- [ ] Social proof (Cialdini) — "3,400+ restaurants" and "Verified Partner" badges unsubstantiated;
      doubted proof converts worse than none.
- [ ] Loss aversion — "Never Let Internet Failure Stop Your Dinner Rush" ✔ (best line on the site).
- [ ] AIDA funnel — Attention/Interest/Action solid; Desire layer (proof) is the thin one.
- [ ] Progressive disclosure — home → `/features#hash` pattern ✔; underused for the architecture
      table and hardware checklist.
- [ ] Thumb-zone ergonomics — bottom CTA + WhatsApp float sit in the natural thumb arc ✔; verify
      iOS safe-area padding in `styles.css` sticky-cta block.

## 6. Visual design fundamentals

- [ ] Visual hierarchy — 62px/900 hero vs 10–11 px metadata: scale floor is too low.
- [ ] Spacing rhythm — hardcoded `w-[92vw]/75vw` wrappers break the Tailwind grid between sections.
- [ ] Color 60-30-10 — dark neutrals / brand red / gold roughly correct; hardcoded hexes
      (`#1E1F20`, `#131314`) defeat the theme tokens.
- [ ] Theme commitment — day/night toggle exists, but sections hardcode dark values → light mode is
      a patchwork. Either dark-only (drop the toggle) or finish the theme.
- [ ] Affordance & signifiers — glowing buttons/lifts ✔; decorative cursor ring is a signifier
      without function.
