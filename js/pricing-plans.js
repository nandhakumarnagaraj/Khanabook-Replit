/**
 * KhanaBook POS — Pricing Page Specific Logic
 */

function initPricingCalculator() {
  const calc = document.getElementById('pricing-calculator');
  if (!calc) return;
  const terminalsSlider = document.getElementById('calc-terminals');
  const locationsSlider = document.getElementById('calc-locations');
  const billingToggle = document.getElementById('calc-billing');
  const totalDisplay = document.getElementById('calc-total');
  const terminalVal = document.getElementById('calc-terminal-val');
  const locationVal = document.getElementById('calc-location-val');
  
  if (!terminalsSlider || !locationsSlider || !billingToggle || !totalDisplay || !terminalVal || !locationVal) {
    console.warn('Pricing calculator elements are missing from the DOM.');
    return;
  }

  function updatePricing() {
    const terminals = parseInt(terminalsSlider.value) || 1;
    const locations = parseInt(locationsSlider.value) || 1;
    const isAnnual = billingToggle.checked;
    
    const basePrice = 0;
    const paidTerminals = Math.max(0, terminals - 1);
    const paidLocations = Math.max(0, locations - 1);
    const terminalPrice = paidTerminals * 499;
    const locationPrice = paidLocations * 999;
    let total = basePrice + terminalPrice + locationPrice;
    
    if (isAnnual) {
      total = Math.round(total * 12 * 0.8);
    }
    
    // Accessibility: Set screen reader labels
    terminalsSlider.setAttribute('aria-valuetext', `${terminals} terminal${terminals > 1 ? 's' : ''}`);
    locationsSlider.setAttribute('aria-valuetext', `${locations} location${locations > 1 ? 's' : ''}`);

    terminalVal.textContent = terminals;
    locationVal.textContent = locations;
    totalDisplay.textContent = isAnnual ? '₹' + total.toLocaleString('en-IN') + '/yr' : '₹' + total.toLocaleString('en-IN') + '/mo';
  }

  terminalsSlider.addEventListener('input', updatePricing);
  locationsSlider.addEventListener('input', updatePricing);
  billingToggle.addEventListener('change', updatePricing);
  updatePricing();
}

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
