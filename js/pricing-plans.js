/**
 * KhanaBook POS — Pricing Page Specific Logic
 */

function initPricingBillingToggle() {
  const toggle = document.getElementById('billing-annual-toggle');
  const labelMonthly = document.getElementById('billing-label-monthly');
  const labelAnnual = document.getElementById('billing-label-annual');
  if (!toggle) return;

  const parsePrice = val => parseInt(val.replace(/,/g, '')) || 0;

  function updatePrices(isAnnual) {
    toggle.setAttribute('aria-checked', isAnnual ? 'true' : 'false');
    if (labelMonthly) labelMonthly.setAttribute('data-active', (!isAnnual).toString());
    if (labelAnnual) labelAnnual.setAttribute('data-active', isAnnual.toString());

    document.querySelectorAll('.plan-price').forEach(el => {
      const monthly = el.getAttribute('data-monthly');
      const annual = el.getAttribute('data-annual');
      if (monthly && annual) {
        const val = isAnnual ? parsePrice(annual) : parsePrice(monthly);
        el.textContent = val.toLocaleString('en-IN');
      }
    });

    document.querySelectorAll('.billing-period').forEach(el => {
      el.textContent = isAnnual ? '/yr' : '/mo';
    });
  }

  toggle.addEventListener('click', () => {
    const isAnnual = toggle.getAttribute('aria-checked') === 'true';
    updatePrices(!isAnnual);
  });

  // Read initial toggle state from HTML attribute directly on load
  const initialAnnual = toggle.getAttribute('aria-checked') === 'true';
  updatePrices(initialAnnual);
}

// Bootstrap Pricing-Page Specific Logic on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initPricingCalculator();
  initPricingBillingToggle();
});
