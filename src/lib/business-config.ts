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

  // Values migrated from the previous static site. Verify legal identifiers
  // below before launch.
  registeredAddress: "2nd Floor, Sathyabama Startup Cell, Semmancheri, Chennai, Tamil Nadu 600119",
  supportPhone: "+91 94716 76935",
  supportEmail: "kbook@pcts.tech",
  // Keep unpublished identifiers empty until verified by the business.
  cin: "",
  grievanceOfficer: "",
  workingHours: "Monday - Saturday, 9:00 AM - 8:00 PM IST",

  // Verified customer access URLs.
  loginUrl: "https://kbook.iadv.cloud/login",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.piquantservices.khanabooklite",

  // Legal
  governingLawCity: "Pune, Maharashtra",
  effectiveDate: "July 1, 2026",
  lastUpdatedDate: "July 1, 2026",
} as const;

// Build an absolute URL from a site-relative path (e.g. "/features").
export function absUrl(path: string): string {
  const base = BUSINESS.siteUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export const DISCLAIMERS = {
  pricing:
    "KhanaBook software currently has no subscription fee. Payment gateway, hardware and optional service charges may apply. Pricing may change in the future.",
  formNotConnected:
    "We could not submit the form right now. Please contact us directly using the details on the right.",
  security:
    "We use appropriate technical and organisational safeguards designed to protect your data.",
  compareDisclaimer:
    "This table describes KhanaBook's approach and lists what to check in any other POS. It does not make claims about specific competing products — capabilities vary by provider, plan, hardware and configuration.",
  roi: "Results are indicative operational value based on the values you enter. KhanaBook may not eliminate all paper or operational costs, and staff time saved does not automatically translate to direct cash savings. Actual outcomes depend on your restaurant's operations, hardware, payment provider rates and optional services.",
} as const;
