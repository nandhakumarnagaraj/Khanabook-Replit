---
inclusion: auto
---

# KhanaBook Website Design System

## Project Brief

- **Project:** KhanaBook marketing website (separate from the Android app)
- **Target users:** Independent Indian restaurant owners, café operators, food-stall owners
- **Primary goal:** Explain the product honestly and encourage Play Store install or demo request
- **Technology:** React 19, TanStack Start/Router, TypeScript (strict), Vite 8, Tailwind CSS 4, shadcn/ui (new-york style), Lucide icons
- **Platform:** Lovable.dev connected, deployed to Cloudflare via Nitro

## Design Tokens (already defined in src/styles.css)

- **Brand red:** oklch(0.6 0.24 27) — primary actions, accents
- **Gold:** oklch(0.72 0.15 82) — gradient highlight partner
- **Font:** Karla (400–900), system-ui fallback
- **Radius:** 0.75rem base, xl for cards
- **Spacing:** Tailwind defaults + container-page (max-width 80rem, px 1.5rem)

## Design Rules

1. Use the existing utility classes: `btn-primary`, `btn-secondary`, `card-surface`, `eyebrow`, `hl`, `container-page`
2. Follow 60-30-10 color rule: 60% neutral bg, 30% surfaces/text, 10% brand red/gold
3. Keep body text ≥16px, line-height 1.5–1.7, max-width ~65ch for prose
4. Headings: 48–64px hero, 36–48px page, 28–36px section, 18–24px card
5. Mobile-first responsive: stack on mobile, 2-col tablet, 3-col desktop
6. One clear primary CTA per page section — don't show competing primary buttons
7. Animations: 150–300ms, ease-out, subtle transforms only. Respect `prefers-reduced-motion`
8. All interactive elements need hover, focus-visible, active, and disabled states
9. Touch targets: minimum 44px
10. Use semantic HTML, proper heading order (h1 → h2 → h3), aria labels on interactive elements

## Component Reuse

Always prefer existing components before creating new ones:

- `Section` — standard page section wrapper (eyebrow + title + desc + children)
- `FAQ` — accordion FAQ list
- `Header` / `Footer` — site-wide navigation
- `FloatingCtas` — sticky mobile CTA bar + WhatsApp float
- shadcn/ui components in `src/components/ui/`

## Content Rules

- No fake statistics or unverified claims
- Mark placeholders clearly (e.g., "Customer logos coming soon")
- Use "currently no subscription fee" not "free forever"
- Terminal limit: "up to 5 approved Android terminals"
- Payment wording: "record" not "accept" or "process"
- Online orders: "manual recording" not "integration"
- All data/content lives in `src/lib/` files, not inline in routes

## States to Always Implement

- Loading (skeleton or spinner)
- Empty (helpful message + CTA)
- Error (recovery path + retry)
- Success (confirmation feedback)
- Disabled (muted, cursor not-allowed)
- Mobile navigation (hamburger → drawer)
- Form validation (field-level, on blur, accessible)

## Performance

- Images: WebP, lazy-load below fold, eager-load hero
- Fonts: preconnect to Google Fonts (already done)
- Code splitting: file-based routes handle this automatically
- No large new dependencies without justification
- Prefer CSS transitions over JS animation libraries

## SEO (already implemented)

- Unique title + meta description per route
- Canonical URLs via `absUrl()`
- Structured data (Organization, SoftwareApplication, FAQPage, Article)
- Sitemap at `/sitemap.xml`
- robots.txt in public/
