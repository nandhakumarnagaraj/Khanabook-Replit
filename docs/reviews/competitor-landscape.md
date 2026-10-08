# KhanaBook — Competitor Landscape

> Compiled 2026-10-08 from desk research (vendor blogs, listing aggregators, Play Store) plus the
> site source. Pricing figures are **unverified vendor/listing numbers** — re-verify on vendor price
> pages before publishing anything externally.

## Positioning basis (from the site itself)

KhanaBook claims: **₹0 software · offline-first Android POS · ≤5 meshed terminals · KOT + ESC/POS
printing · GST invoices · no integrated gateway · no Zomato/Swiggy ingestion · no QR storefront.**

The last three gaps define who actually competes with us. The defensible differentiator is
**multi-terminal offline sync with per-terminal invoice series** — _not_ price (free tiers exist).

## Tier 1 — India restaurant POS leaders (paid SaaS)

| Competitor                                    | Notes                                                                                                                            | Indicative price                                              |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Petpooja (POSS)**                           | Category default; vendor claims 1,00,000–1,50,000 outlets, ~60 lakh bills/day; Swiggy/Zomato/ONDC integrations, marketplace apps | ~₹10,000/yr (Techjockey); G2 tiers $50–135 — varies by source |
| **Restroworks** (ex-Posist)                   | Enterprise / multi-location chains, deepest feature set                                                                          | Quote-based                                                   |
| **Rista (by DotPe)**                          | Cloud POS bundled with DotPe QR ordering + payments                                                                              | Quote-based                                                   |
| **Gofrugal**                                  | Retail + restaurant POS; on-premise option                                                                                       | From ~₹8,999/yr (on-prem)                                     |
| **TMBill, Marg ERP, Sapaad**                  | Mid-market Windows/cloud POS                                                                                                     | Quote-based                                                   |
| **Recaho, Indostra, Foody POS, Output Books** | Smaller Indian players; collide in local search                                                                                  | Mixed                                                         |

## Tier 2 — Offline-first / PC POS (closest functional twins)

- **ATSPOS** — explicitly "offline first, works with slow or no internet", Android.
- **Output Books** — offline restaurant billing, tables/orders/payments/inventory.
- **Hitech BillSoft** — free offline restaurant billing, established desktop base.
- **TMBill / Gofrugal on-premise** — same reliability pitch, sold with hardware.

## Tier 3 — Free & freemium billing apps (price-position threats)

| Competitor                                 | Notes                                                                                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Zobaze POS**                             | **Sharpest competitor.** Free plan: unlimited billing, single owner; paid for staff/reports. ~4.7★, ~28,700 Play reviews. Offline billing + table management. |
| **Loyverse**                               | Genuinely free core POS, no forced processor; weak on Indian GST/KOT.                                                                                         |
| **Odoo POS (Community)**                   | Free, self-hostable, floor plans + kitchen prep; cost is setup effort.                                                                                        |
| **Superbill, BillKaro**                    | Cheap Android GST billing for cafés/food trucks.                                                                                                              |
| **myBillBook, Vyapar, Khatabook/OkCredit** | Adjacent (generic billing/ledger), free or near-free; appear in the same searches.                                                                            |

## Tier 4 — Ordering & aggregator layer (we have no answer today)

- **UrbanPiper** — aggregator middleware (Swiggy/Zomato/ONDC); Zomato- and Swiggy-backed.
- **DotPe** — QR ordering + storefront + Rista POS + payments, one stack.
- **Petpooja / Restroworks add-ons** — in-POS aggregator ingestion and reconciliation.

## Tier 5 — Global reference points

Toast, Square, SpotOn, Lightspeed, Foodics, Poster POS — not India-primary; they set the feature
bar (payments, loyalty, reporting) Indian buyers now expect.

## Name-collision watch

- **khanabiz.com** — Indian restaurant POS SaaS with an adjacent name; brand-dilution / local-search
  confusion risk. ("Khana POS" is also a live Play Store app.)

## Known claim risks

- Play listing says **"India's only FREE restaurant POS"** — falsifiable (Zobaze free plan,
  Loyverse, Odoo Community). The website's hedged wording ("currently ₹0") is correct; the store
  copy is not.
- Homepage "3,400+ restaurants" has no substantiation anywhere in the repo.

## Sources

- Petpooja blog "Top 5 Restaurant POS Software in India (2026)"; Restroworks blog; G2, Capterra,
  SoftwareSuggest, Techjockey listings (2026); Play Store listings for KhanaBook Lite
  (`com.piquantservices.khanabooklite`), Zobaze POS, Khana POS; vendor sites khanabiz.com,
  zobaze.com, billkaro.shop, mysuperbill.com, indostra.com.
