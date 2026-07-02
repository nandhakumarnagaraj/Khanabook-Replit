/**
 * KhanaBook — Company Configuration
 * ====================================
 * All company information is defined here in a single source of truth.
 * Edit this file to update company details across all pages.
 *
 * This is used by privacy-policy.html, terms-and-conditions.html,
 * refund-policy.html, contact-us.html, and the footer.
 *
 * To update: change the values below. No HTML changes needed.
 * For dynamic/backend-driven data, replace the values with API calls.
 */
window.COMPANY_CONFIG = {
  // ── Business Identity ──
  legalName: 'India Advocacy',
  brandName: 'KhanaBook',
  tradeName: 'KhanaBook POS',
  ownerName: '',  // optional — fill if required by Easebuzz
  businessType: 'Software Services & Restaurant Technology',

  // ── Address ──
  registeredOffice: 'Pune, Maharashtra, India',
  addressLine1: '',
  addressLine2: '',
  city: 'Pune',
  state: 'Maharashtra',
  pincode: '',
  country: 'India',

  // ── Contact ──
  supportPhone: '+91 94716 76935',
  supportEmail: 'kbook@pcts.tech',
  workingHours: 'Monday - Saturday, 9:00 AM - 8:00 PM IST',
  whatsappNumber: '+91 94716 76935',

  // ── Legal / Tax IDs (optional — set to '' if not applicable) ──
  gstNumber: '',
  panNumber: '',
  fssaiNumber: '',
  cin: '',

  // ── Bank Details (for Easebuzz sub-merchant onboarding) ──
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  accountHolderName: '',

  // ── Jurisdiction (for Terms & Conditions) ──
  jurisdictionCity: 'Pune',
  jurisdictionState: 'Maharashtra',
  jurisdictionCountry: 'India',

  // ── Google Maps ──
  googleMapsEmbedUrl: '',  // optional: full embed URL from Google Maps

  // ── Social / App Links ──
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.piquantservices.khanabooklite',
  websiteUrl: 'https://khanabook.com',

  // ── Policy Versioning ──
  policyVersion: '3.0.0',
  lastUpdated: 'July 1, 2026',

  // ── Admin / Dashboard ──
  dashboardUrl: 'https://kbook.iadv.cloud/login',

  /**
   * Returns the full jurisdiction string for Terms & Conditions.
   * Change this format if needed.
   */
  getJurisdictionText: function () {
    return 'These Terms shall be governed and interpreted in accordance with the laws of ' +
      this.jurisdictionCountry +
      '. Any disputes arising from the use of this platform shall be subject to the exclusive jurisdiction of the courts located in ' +
      this.jurisdictionCity + ', ' + this.jurisdictionState + ', ' + this.jurisdictionCountry + '.';
  }
};
