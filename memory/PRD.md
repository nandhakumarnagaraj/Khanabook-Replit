# KhanaBook POS — Marketing Website

## Original Problem Statement
"Review my website" — Full review (UI/UX, code quality, performance, SEO) of
https://github.com/nandhakumarnagaraj/Khanabook-Replit + implement the fixes found.

## Project Overview
- Static marketing site for KhanaBook (POS for Indian restaurants, by India Advocacy)
- Stack: plain HTML (14 pages in /html), CSS (css/home-v2.css), vanilla JS (js/site.js, home.js, pricing-plans.js, blog.js), Node.js http server (server.js, no framework)
- Serving in this env: supervisor "frontend" runs `node /app/server.js` on PORT=3000 via /app/frontend/package.json wrapper. No backend/DB needed.
- Canonical URL scheme: root-level pages (khanabook.com/features.html); files live in /html/.

## Review Findings & Fixes Implemented (Jun 11, 2026)
1. CRITICAL: nav links 404'd from `/` (relative links resolved to /features.html which didn't exist) → server now serves /*.html from /html/ and 301-redirects /html/*.html → /*.html (matches canonicals + sitemap).
2. PERF: 8 PNG assets ~7.5MB (1.4MB logo rendered at 34px; 1.4MB favicon) → generated optimized assets (khanabook_logo_small.webp 6KB, favicon-64.png 5KB, 800px webp content images, jpg social cards) + updated all HTML refs. Homepage transfer: ~4MB → ~100KB.
3. SERVER: directory request returned 500 (EISDIR) → 404; added security headers (nosniff, X-Frame-Options, Referrer-Policy); charset on text types; cache policy HTML 300s / assets 86400s; safe URL decoding; PORT from env.
4. SEO: created /robots.txt (with sitemap ref, disallow /home-modern.html); added article-offline-first.html to sitemap; canonical added to article page; home-modern.html (dead duplicate page) set to noindex.
5. SOCIAL: og:image/twitter:image were relative paths (broken for scrapers) → absolute https://khanabook.com/assets/*.jpg.
6. UI: hero "Biometric App Lock" badge overlapped "AI OCR Menu Import" badge (inline style didn't override class top/left) → new .hero-float-badge-2 class, solid green, bottom-left position.
7. COPY: "Launch Offer — Limited Time" contradicted "Free Forever" → "Free Forever — No Catch"; sticky CTA "🚀 Start Free Year" → "Start Free Forever"; hero stat "3 Core Workflow" → "3 Steps to Go Live".
8. Cache-bust bumped ?v=7 → ?v=8 on css/js refs.

## Flagged to user (not changed — needs their input/data)
- Footer social icons all link to https://khanabook.com/ placeholder (need real profile URLs)
- JSON-LD aggregateRating 5.0/50 — risky if not backed by real visible reviews (Google penalty)
- "1.5L+ Businesses Supported" claim credibility
- Dead code: home-modern.html + modern-redesign.css, lead/demo modal JS in home.js (elements don't exist on home), duplicated pricing calculator in home.js & pricing-plans.js, empty injectCalendlyBadge()
- Contact form posts to Formspree (https://formspree.io/f/mlgvyknl) — external dependency

## Backlog / Next
- P1: real social profile links; remove dead code (home-modern.html, modern-redesign.css, unused modal JS)
- P2: ETag/conditional GET on server; preload hero image; consolidate 3 Google Font families
- P2: blog has only 1 article; help-center & legal content review
- P3: lead-capture modal was designed (exit intent/30s) but markup absent — decide keep or remove
