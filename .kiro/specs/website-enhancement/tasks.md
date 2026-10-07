# Implementation Plan: Website Enhancement

## Overview

Enhance the KhanaBook marketing website with scroll-based entrance animations, form UX improvements, error boundaries, offline indicator, social proof section, interactive product tabs, expandable help guides, and performance optimizations. All work uses existing dependencies (React 19, TanStack Router, Tailwind CSS 4, shadcn/ui, Lucide icons) with no new npm packages.

## Tasks

- [ ] 1. Create custom hooks
  - [ ] 1.1 Create `useInView` hook in `src/hooks/use-in-view.ts`
    - Implement IntersectionObserver-based hook with `threshold` and `once` options
    - Return `{ ref, isInView }` tuple
    - Respect `prefers-reduced-motion: reduce` by immediately setting `isInView = true`
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ] 1.2 Create `useOnlineStatus` hook in `src/hooks/use-online-status.ts`
    - Use `useSyncExternalStore` with `online`/`offline` window events
    - Provide SSR-safe `getServerSnapshot` returning `true`
    - _Requirements: 6.1, 6.2_

- [ ] 2. Add data structures for new sections
  - [ ] 2.1 Add `ProductTab` interface and `PRODUCT_TABS` array to `src/lib/home-data.ts`
    - Define interface with `id`, `label`, `description`, `imageSrc`, `imageAlt` fields
    - Add entries for Billing, KOT, Payments, Menu Management, and Reports
    - _Requirements: 8.1_

  - [ ] 2.2 Add `HelpGuide` interface and `HELP_GUIDES` array to `src/lib/help-data.ts`
    - Define interface with `id`, `title`, `steps` fields
    - Add entries for Printer Pairing, First Bill, Menu Import, Offline Sync, and Reports
    - _Requirements: 9.1_

- [ ] 3. Implement new site components
  - [ ] 3.1 Create `ProductTabs` component in `src/components/site/ProductTabs.tsx`
    - Use existing shadcn/ui `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` components
    - Render each tab from `PRODUCT_TABS` data with screenshot image and description
    - Apply brand styling on active tab via `data-[state=active]:bg-brand`
    - Use `defaultValue` for uncontrolled tab state (no auto-advance)
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ] 3.2 Create `SocialProof` component in `src/components/site/SocialProof.tsx`
    - Render 6 greyed-out rectangular placeholders using `bg-muted/50 border border-border`
    - Include "Customer logos coming soon" text note
    - Use `flex-wrap` for responsive wrapping, `aria-hidden` on placeholder shapes
    - Wrap in `Section` component
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ] 3.3 Create `HelpGuides` component in `src/components/site/HelpGuides.tsx`
    - Use existing shadcn/ui `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`
    - Implement accordion behavior (one-at-a-time) via controlled `openId` state
    - Render ordered list of steps inside each guide
    - Add `ChevronDown` icon with rotation animation on expand
    - Match visual style of existing FAQ accordion (border-border, bg-surface, rounded-xl)
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [ ] 3.4 Create `OfflineIndicator` component in `src/components/site/OfflineIndicator.tsx`
    - Consume `useOnlineStatus` hook, return `null` when online
    - Render fixed-position banner with `WifiOff` icon and message text
    - Use `role="alert"` and `aria-live="assertive"` for screen reader announcement
    - Style with `bg-destructive text-destructive-foreground`
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ] 3.5 Create `RouteError` component in `src/components/site/RouteError.tsx`
    - Accept `error` and `reset` props
    - Render "Something went wrong" UI with retry button and home link
    - Retry calls `router.invalidate()` then `reset()`
    - _Requirements: 5.1, 5.2, 5.3_

- [ ] 4. Checkpoint - Verify new components compile
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Modify existing Section component for entrance animations
  - [ ] 5.1 Integrate `useInView` into `src/components/site/Section.tsx`
    - Import and call `useInView({ threshold: 0.1, once: true })`
    - Apply `ref` to the `<section>` element
    - Add conditional classes: `opacity-100 translate-y-0` when in view, `opacity-0 translate-y-4` when not
    - Add `transition-opacity duration-500 ease-out` and transition for transform
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 6. Add card hover states to styles.css
  - [ ] 6.1 Add hover styles for `.card-surface` in `src/styles.css`
    - Add `.card-surface:hover` with `translateY(-2px)`, enhanced `box-shadow`, and `border-color` mix
    - Add `@media (prefers-reduced-motion: reduce)` override that removes transform
    - Ensure existing `transition` property on `@utility card-surface` covers transform, box-shadow, border-color at 200ms
    - _Requirements: 4.1, 4.2, 4.3_

- [ ] 7. Wire components into route files
  - [ ] 7.1 Modify `src/routes/__root.tsx` — Add OfflineIndicator and font preload
    - Import and render `<OfflineIndicator />` after `<SiteHeader />` in `RootComponent`
    - Add font preload `<link>` to head config: Karla woff2 with `as="font"`, `crossOrigin="anonymous"`
    - _Requirements: 6.1, 6.4, 10.2_

  - [ ] 7.2 Modify `src/routes/index.tsx` — Add ProductTabs, SocialProof, and hero preload
    - Import and render `<ProductTabs />` after the "Restaurant Types" section
    - Import and render `<SocialProof />` between "Restaurant Types" and "Workflow" sections
    - Add `posPhone` hero image preload link in route head config
    - Add `errorComponent: RouteError` to the route config
    - _Requirements: 7.1, 8.1, 10.1, 5.4_

  - [ ] 7.3 Modify `src/routes/help.tsx` — Add HelpGuides, errorComponent, pendingComponent
    - Import and render `<HelpGuides />` in a new Section on the help page (before the FAQ section)
    - Add `errorComponent: RouteError` to the route config
    - Create and add `pendingComponent: HelpPageSkeleton` using shadcn/ui `Skeleton`
    - _Requirements: 9.1, 5.4, 1.1, 1.2, 1.3_

  - [ ] 7.4 Modify `src/routes/get-started.tsx` — Add onBlur validation, spinner, errorComponent
    - Add `onBlur` prop to `Field` component that validates the individual field on blur
    - Add `Loader2` spinner icon with `animate-spin` to submit button during submission
    - Add `aria-describedby` linkage (already partially present, ensure all fields connected)
    - Add `errorComponent: RouteError` to the route config
    - _Requirements: 2.1, 2.2, 2.3, 2.6, 5.4_

  - [ ] 7.5 Add errorComponent and pendingComponent to remaining routes
    - Add `errorComponent: RouteError` and `pendingComponent` skeleton to `features.tsx`
    - Add `errorComponent: RouteError` and `pendingComponent` skeleton to `compare.tsx`
    - Add `errorComponent: RouteError` and `pendingComponent` skeleton to `blog.tsx`
    - _Requirements: 5.4, 1.1, 1.2, 1.3_

- [ ] 8. Checkpoint - Full build and visual check
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Performance audit and lazy loading
  - [ ] 9.1 Verify lazy loading and code splitting
    - Audit all `<img>` elements below the fold to confirm `loading="lazy"` is set
    - Verify that the hero image on index uses `loading="eager"` (already present)
    - Confirm route-level code splitting via Vite build output
    - _Requirements: 10.3, 10.4_

- [ ]* 10. Write property tests for form validation
  - [ ]* 10.1 Write property test for required field validation on blur
    - **Property 1: Required field validation on blur**
    - **Validates: Requirements 2.1**

  - [ ]* 10.2 Write property test for phone format validation
    - **Property 2: Phone format validation on blur**
    - **Validates: Requirements 2.2**

  - [ ]* 10.3 Write property test for error-field ARIA association
    - **Property 3: Error-field ARIA association**
    - **Validates: Requirements 2.6**

- [ ]* 11. Write property tests for animations and UI components
  - [ ]* 11.1 Write property test for section entrance animation
    - **Property 4: Section entrance animation on viewport intersection**
    - **Validates: Requirements 3.1, 3.2**

  - [ ]* 11.2 Write property test for reduced motion bypass
    - **Property 5: Reduced motion bypasses animation**
    - **Validates: Requirements 3.3**

  - [ ]* 11.3 Write property test for tab selection
    - **Property 6: Tab selection displays corresponding content**
    - **Validates: Requirements 8.2**

  - [ ]* 11.4 Write property test for help guide expand/collapse
    - **Property 8: Help guide expand/collapse toggle with ARIA state**
    - **Validates: Requirements 9.2, 9.3, 9.5**

- [ ] 12. Final checkpoint - All tests pass and build succeeds
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- No new npm dependencies are needed — all features use existing React 19, shadcn/ui, Radix UI, and Lucide icons
- The design uses TypeScript/React throughout
- Property tests validate universal correctness properties from the design document
- All animations respect `prefers-reduced-motion: reduce`

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "2.1", "2.2"] },
    { "id": 1, "tasks": ["3.1", "3.2", "3.3", "3.4", "3.5"] },
    { "id": 2, "tasks": ["5.1", "6.1"] },
    { "id": 3, "tasks": ["7.1", "7.2", "7.3", "7.4", "7.5"] },
    { "id": 4, "tasks": ["9.1"] },
    { "id": 5, "tasks": ["10.1", "10.2", "10.3", "11.1", "11.2", "11.3", "11.4"] }
  ]
}
```
