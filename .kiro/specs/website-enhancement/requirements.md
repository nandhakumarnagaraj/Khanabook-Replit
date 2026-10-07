# Requirements Document

## Introduction

This document specifies requirements for enhancing the KhanaBook marketing website. The enhancements cover UI polish (loading states, form UX), visual consistency (entrance animations, hover states), missing states (error boundaries, offline indicator), a social proof section, an interactive product feature section, expandable help center guides, and performance optimizations. All work uses the existing design system (Tailwind CSS 4, shadcn/ui new-york style, oklch brand tokens) and targets mobile-first, accessible, reduced-motion-respecting implementations with no large new dependencies.

## Glossary

- **Website**: The KhanaBook marketing website built with React 19, TanStack Start/Router, TypeScript, Vite, and Tailwind CSS 4.
- **Section_Component**: The reusable `Section` React component that wraps page sections with eyebrow, title, description, and children slots.
- **Get_Started_Form**: The lead-capture form on the `/get-started` route that collects restaurant owner contact details and submits to Formspree.
- **Skeleton_Screen**: A placeholder UI using the shadcn/ui Skeleton component that indicates content is loading.
- **Error_Boundary**: A React error boundary component that catches rendering errors and displays a recovery UI for a specific route.
- **Offline_Indicator**: A visual banner or notification that informs the user the browser has lost network connectivity.
- **Social_Proof_Section**: A homepage section displaying greyed-out placeholder logo shapes with an explanatory note for future customer logos.
- **Product_Tabs_Section**: A homepage section with clickable feature category tabs (Billing, KOT, Payments, etc.) that swap a static app screenshot below the active tab.
- **Help_Guide**: An expandable inline guide on the `/help` page that reveals step-by-step instructions when opened.
- **Design_System**: The existing set of CSS utilities (card-surface, btn-primary, btn-secondary, eyebrow, hl, container-page), oklch color tokens (brand red, gold), Karla font, and dark mode variables.
- **Entrance_Animation**: A fade-in-on-scroll visual transition applied as elements enter the viewport.
- **Reduced_Motion**: The `prefers-reduced-motion: reduce` media query preference that disables or minimizes animations for users who request it.

## Requirements

### Requirement 1: Loading States and Skeleton Screens

**User Story:** As a visitor, I want to see skeleton placeholders while page content loads, so that I understand the page is responding and content is on its way.

#### Acceptance Criteria

1. WHEN a route is loading data, THE Website SHALL display Skeleton_Screen placeholders in place of the content area using the shadcn/ui Skeleton component.
2. WHEN route data finishes loading, THE Website SHALL replace the Skeleton_Screen placeholders with the actual content within a single render cycle.
3. THE Website SHALL use existing Design_System tokens (surface, border, border-radius) for all Skeleton_Screen styling.

### Requirement 2: Form UX Enhancement

**User Story:** As a restaurant owner filling out the get-started form, I want inline validation feedback and a submit spinner, so that I know what to fix before submitting and can see submission is in progress.

#### Acceptance Criteria

1. WHEN a user moves focus away from a required field that is empty, THE Get_Started_Form SHALL display a field-level error message adjacent to that field within 100 milliseconds.
2. WHEN a user moves focus away from the phone field with an invalid value, THE Get_Started_Form SHALL display a field-level error message indicating the expected format.
3. WHILE the Get_Started_Form is submitting, THE Get_Started_Form SHALL display a visible spinner icon inside the submit button and disable the button to prevent duplicate submissions.
4. WHEN submission completes successfully, THE Get_Started_Form SHALL display a success notification in the form status area.
5. IF submission fails due to a network error, THEN THE Get_Started_Form SHALL display an error message advising the user to try again or contact support directly.
6. THE Get_Started_Form SHALL associate each error message with its corresponding field using `aria-describedby` so assistive technologies announce the error.

### Requirement 3: Global Entrance Animations

**User Story:** As a visitor, I want page sections to fade in smoothly as I scroll, so that the browsing experience feels polished and modern.

#### Acceptance Criteria

1. WHEN a Section_Component enters the viewport, THE Website SHALL apply a fade-in entrance animation to that section.
2. THE Website SHALL trigger the entrance animation when at least 10% of the Section_Component is visible in the viewport.
3. WHILE the user has Reduced_Motion enabled, THE Website SHALL skip all entrance animations and display sections immediately without any transition.
4. THE Website SHALL apply entrance animations to all Section_Component instances site-wide without requiring per-section configuration.

### Requirement 4: Card Hover States

**User Story:** As a visitor, I want visual feedback when hovering over cards, so that I can identify interactive or highlighted content.

#### Acceptance Criteria

1. WHEN a user hovers over an element using the card-surface utility, THE Website SHALL apply a subtle upward translation and enhanced box-shadow transition.
2. THE Website SHALL complete the hover transition within 200 milliseconds.
3. WHILE the user has Reduced_Motion enabled, THE Website SHALL apply only the box-shadow change without the translation transform.

### Requirement 5: Per-Route Error Boundaries

**User Story:** As a visitor, I want route-specific error recovery so that a failure on one page does not break the entire application.

#### Acceptance Criteria

1. WHEN a rendering error occurs within a route component, THE Error_Boundary for that route SHALL catch the error and display a user-friendly recovery UI.
2. THE Error_Boundary SHALL provide a retry action that attempts to re-render the failed route without a full page reload.
3. THE Error_Boundary SHALL provide a navigation link back to the homepage as a fallback recovery path.
4. THE Website SHALL wrap each route with its own Error_Boundary independent of the root-level error boundary.

### Requirement 6: Offline Indicator

**User Story:** As a visitor on an unreliable connection, I want to see a clear notification when I lose connectivity, so that I understand why content may not load.

#### Acceptance Criteria

1. WHEN the browser loses network connectivity, THE Offline_Indicator SHALL appear within 2 seconds of the connectivity change event.
2. WHEN the browser regains network connectivity, THE Offline_Indicator SHALL dismiss automatically within 2 seconds of the connectivity restoration event.
3. THE Offline_Indicator SHALL be announced to screen readers using an appropriate ARIA live region.
4. THE Offline_Indicator SHALL use existing Design_System tokens for styling and be positioned so it does not obstruct primary page content.

### Requirement 7: Social Proof Section

**User Story:** As a visitor, I want to see that other businesses use KhanaBook, so that I gain confidence in the product (placeholder until real logos are available).

#### Acceptance Criteria

1. THE Social_Proof_Section SHALL display on the homepage between existing sections.
2. THE Social_Proof_Section SHALL render a horizontal strip of greyed-out rectangular placeholder shapes representing future customer logos.
3. THE Social_Proof_Section SHALL include a visible text note stating "Customer logos coming soon" to indicate placeholder status.
4. THE Social_Proof_Section SHALL be responsive, wrapping placeholder shapes on smaller viewports.
5. THE Social_Proof_Section SHALL use existing Design_System tokens for colors, spacing, and border-radius.

### Requirement 8: Interactive Product Feature Tabs

**User Story:** As a visitor, I want to browse product features by category with a visual preview, so that I can quickly understand what KhanaBook offers.

#### Acceptance Criteria

1. THE Product_Tabs_Section SHALL display on the homepage with clickable tabs for feature categories including Billing, KOT, Payments, Menu Management, and Reports.
2. WHEN a user clicks a feature tab, THE Product_Tabs_Section SHALL swap the displayed static screenshot to match the selected feature category.
3. THE Product_Tabs_Section SHALL indicate the currently active tab with a distinct visual style using Design_System brand tokens.
4. THE Product_Tabs_Section SHALL be keyboard-navigable, allowing users to switch tabs using arrow keys and activate tabs with Enter or Space.
5. THE Product_Tabs_Section SHALL use appropriate ARIA roles (tablist, tab, tabpanel) for accessibility.
6. THE Product_Tabs_Section SHALL not use a carousel or auto-advancing behavior.

### Requirement 9: Help Center Expandable Guides

**User Story:** As a restaurant owner setting up KhanaBook, I want inline expandable setup guides on the help page, so that I can follow step-by-step instructions without leaving the page.

#### Acceptance Criteria

1. THE Website SHALL display expandable Help_Guide sections on the `/help` route for the following topics: Printer Pairing, First Bill, Menu Import, Offline Sync, and Reports.
2. WHEN a user activates a Help_Guide heading, THE Website SHALL expand that guide to reveal step-by-step instructions.
3. WHEN a user activates an already-expanded Help_Guide heading, THE Website SHALL collapse that guide to hide the instructions.
4. THE Help_Guide sections SHALL be keyboard accessible, allowing expansion and collapse via Enter or Space keys.
5. THE Help_Guide sections SHALL use appropriate ARIA attributes (aria-expanded, aria-controls) to communicate state to assistive technologies.
6. THE Help_Guide sections SHALL use existing Design_System tokens and match the visual style of the existing FAQ accordion on the help page.

### Requirement 10: Performance — Critical Asset Preloading

**User Story:** As a visitor, I want the homepage to load quickly with no layout shift from fonts or hero images, so that my first impression of the site is fast and smooth.

#### Acceptance Criteria

1. THE Website SHALL preload the hero image on the homepage using a `<link rel="preload">` tag with the appropriate `as` attribute.
2. THE Website SHALL preload the Karla font files using `<link rel="preload">` tags with `as="font"` and `crossorigin` attributes.
3. THE Website SHALL apply `loading="lazy"` to all images below the initial viewport fold.
4. THE Website SHALL verify code splitting by route so that each route loads only its own JavaScript bundle and shared vendor chunks.

