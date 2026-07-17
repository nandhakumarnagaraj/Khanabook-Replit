// Central business identity configuration.
// Replace placeholders with verified values once approved by the business.

export const BUSINESS = {
  legalName: "PIQUANT CONSULTANCY SERVICES PRIVATE LIMITED",
  productName: "KhanaBook",
  productTagline: "Offline-First Restaurant POS",
  siblingPlatform: "India Advocacy",
  siblingPlatformDescription: "legal-tech and business-compliance platform",

  // Canonical site URL used for SEO tags and sitemap. Update to the final
  // production domain once confirmed by the business.
  siteUrl: "https://khanabook.com",

  // TODO: replace with verified values before launch.
  registeredAddress: "[REGISTERED_BUSINESS_ADDRESS]",
  supportPhone: "[SUPPORT_PHONE]",
  supportEmail: "[SUPPORT_EMAIL]",
  cin: "[CIN]",
  grievanceOfficer: "[GRIEVANCE_OFFICER]",
  workingHours: "Mon–Sat, 10:00–19:00 IST",

  // TODO: confirm before enabling. Kept in config until verified.
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.piquantservices.khanabooklite",

  // Legal
  governingLawCity: "[GOVERNING_LAW_CITY]",
  effectiveDate: "[EFFECTIVE_DATE]",
  lastUpdatedDate: "[LAST_UPDATED_DATE]",
} as const;

// Build an absolute URL from a site-relative path (e.g. "/features").
export function absUrl(path: string): string {
  const base = BUSINESS.siteUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export const DISCLAIMERS = {
  pricing:
    "KhanaBook software is currently available without a subscription fee. Payment gateway, hardware and optional service charges may apply.",
  formNotConnected:
    "Form submission is not yet connected. Please contact us directly using the details on the right.",
  security:
    "We use appropriate technical and organisational safeguards designed to protect your data.",
  compareDisclaimer:
    "This table describes KhanaBook's approach and lists what to check in any other POS. It does not make claims about specific competing products — capabilities vary by provider, plan, hardware and configuration.",
  roi:
    "Results are indicative operational value based on the values you enter. KhanaBook may not eliminate all paper or operational costs, and staff time saved does not automatically translate to direct cash savings. Actual outcomes depend on your restaurant's operations, hardware, payment provider rates and optional services.",
} as const;
