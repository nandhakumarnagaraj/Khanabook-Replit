/**
 * KhanaBook POS — Home Page Logic v4 (site.js shared functions removed)
 */

/* ─── Pricing calculator ─────────────────────────────────────────────── */
function initPricingCalculator() {
  const calc = document.getElementById('pricing-calculator');
  if (!calc) return;
  const terminalsSlider = document.getElementById('calc-terminals');
  const locationsSlider = document.getElementById('calc-locations');
  const billingToggle   = document.getElementById('calc-billing');
  const totalDisplay    = document.getElementById('calc-total');
  const terminalVal     = document.getElementById('calc-terminal-val');
  const locationVal     = document.getElementById('calc-location-val');
  function updatePricing() {
    const terminals = parseInt(terminalsSlider.value) || 1;
    const locations = parseInt(locationsSlider.value) || 1;
    const isAnnual  = billingToggle.checked;
    let total = Math.max(0, terminals - 1) * 499 + Math.max(0, locations - 1) * 999;
    if (isAnnual) total = Math.round(total * 12 * 0.8);
    terminalsSlider.setAttribute('aria-valuetext', `${terminals} terminal${terminals > 1 ? 's' : ''}`);
    locationsSlider.setAttribute('aria-valuetext', `${locations} location${locations > 1 ? 's' : ''}`);
    terminalVal.textContent = terminals;
    locationVal.textContent = locations;
    totalDisplay.textContent = '₹' + total.toLocaleString('en-IN') + (isAnnual ? '/yr' : '/mo');
  }
  terminalsSlider.addEventListener('input', updatePricing);
  locationsSlider.addEventListener('input', updatePricing);
  billingToggle.addEventListener('change', updatePricing);
  updatePricing();
}

/* ─── Testimonials carousel (data-driven, 3-visible) ────────────────── */
function initTestimonialsCarousel() {
  const DATA = [
    { stars: '★★★★★', initials: 'RK', name: 'Rajesh Kumar',    role: 'Owner, Spice Garden · Bengaluru',   type: 'Fine Dine',    quote: 'We cut our billing time from 1 minute to under 10 seconds. Friday rush hour used to be chaos — now two staff handle 80 covers without breaking a sweat.' },
    { stars: '★★★★★', initials: 'PM', name: 'Priya Menon',     role: 'Owner, Kerala Kitchen · Chennai',    type: 'Casual Dine',  quote: 'The AI menu import saved us an entire day of data entry. I photographed our hand-written menu and it was digitised in minutes. Absolutely brilliant.' },
    { stars: '★★★★★', initials: 'AS', name: 'Arjun Suresh',    role: 'Owner, Madurai Mess · Madurai',      type: 'Dhaba',        quote: 'Power cuts used to kill our billing queue. Now we\'re 100% offline-capable. KhanaBook has been a true game-changer for our roadside dhaba.' },
    { stars: '★★★★★', initials: 'NK', name: 'Nandhakumar',     role: 'Founder, KhanaBook · Chennai',       type: 'Cloud Kitchen', quote: 'My billing device got lost. I logged into another Android tablet and all data was there — continued from the exact same order ID like nothing happened.' },
    { stars: '★★★★★', initials: 'SV', name: 'Suresh Venkat',   role: 'Owner, Saravana Bhavan · Pune',      type: 'QSR',          quote: 'GST auto-computation alone saved us ₹8,000/year in accountant fees. The UPI split payment feature is something no other POS in this price range offers.' },
    { stars: '★★★★★', initials: 'DN', name: 'Deepa Nair',      role: 'Owner, The Malabar Café · Kochi',    type: 'Café',         quote: 'Set up in 20 minutes flat — no technician, no training. My staff of two picked it up the same evening. The offline mode gave me real peace of mind.' },
  ];
  const track = document.getElementById('testimonials-track');
  if (!track) return;
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dotsContainer = document.getElementById('carousel-dots');
  let idx = 0, timer = null;

  function getVisible() { return window.innerWidth <= 768 ? 1 : 3; }

  function cardHTML(t) {
    return '<div class="testimonial-card">'
      + '<div class="testimonial-card-top">'
      + '<span class="testimonial-type-tag">' + t.type + '</span>'
      + '<span class="testimonial-verified" aria-label="Verified review">✔ Verified</span>'
      + '</div>'
      + '<div class="testimonial-quote">' + t.quote + '</div>'
      + '<div class="testimonial-author"><div class="testimonial-avatar" aria-hidden="true">' + t.initials + '</div>'
      + '<div><div class="testimonial-name">' + t.name + '</div><div class="testimonial-role">' + t.role + '</div></div></div>'
      + '<div class="testimonial-stars" aria-label="5 out of 5 stars" style="margin-left:0;margin-top:.75rem">' + t.stars + '</div>'
      + '</div>';
  }

  function render() {
    const v = getVisible();
    let html = '';
    for (let i = 0; i < v; i++) {
      html += cardHTML(DATA[(idx + i) % DATA.length]);
    }
    track.innerHTML = html;
    dotsContainer.querySelectorAll('.testimonial-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
      d.setAttribute('aria-current', i === idx ? 'true' : 'false');
    });
  }

  function next() { idx = (idx + 1) % DATA.length; render(); }
  function prev() { idx = (idx - 1 + DATA.length) % DATA.length; render(); }
  function start() { timer = setInterval(next, 5000); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }

  dotsContainer.innerHTML = '';
  DATA.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    if (i === 0) dot.setAttribute('aria-current', 'true');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', function () { idx = i; render(); restart(); });
    dotsContainer.appendChild(dot);
  });

  prevBtn?.addEventListener('click', function () { prev(); restart(); });
  nextBtn?.addEventListener('click', function () { next(); restart(); });
  const carousel = track.closest('.testimonials-carousel');
  carousel?.addEventListener('mouseenter', stop);
  carousel?.addEventListener('mouseleave', start);
  carousel?.addEventListener('focusin', stop);
  carousel?.addEventListener('focusout', start);

  let startX = 0;
  track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function (e) {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) { prev(); restart(); }
    else if (dx < -50) { next(); restart(); }
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 100);
  });

  render();
  start();
}

/* ─── Billing toggle ─────────────────────────────────────────────────── */
function initBillingToggle() {
  const toggle = document.getElementById('billing-toggle');
  if (!toggle) return;
  const thumb   = document.getElementById('toggle-thumb');
  const prices  = document.querySelectorAll('.plan-price');
  const periods = document.querySelectorAll('.plan-period');
  toggle.addEventListener('click', () => {
    const isAnnual = toggle.getAttribute('aria-checked') === 'true';
    const next = !isAnnual;
    toggle.setAttribute('aria-checked', String(next));
    if (next) { thumb.classList.remove('left-1'); thumb.classList.add('right-1', 'translate-x-6'); toggle.classList.replace('bg-outline-variant', 'bg-primary'); }
    else       { thumb.classList.remove('right-1', 'translate-x-6'); thumb.classList.add('left-1'); toggle.classList.replace('bg-primary', 'bg-outline-variant'); }
    prices.forEach(el => {
      const m = el.getAttribute('data-monthly'), a = el.getAttribute('data-annual');
      if (m && a) el.textContent = '₹' + parseInt(next ? a : m).toLocaleString('en-IN');
    });
    periods.forEach(el => {
      const at = el.getAttribute('data-annual-text');
      if (at) el.textContent = next ? at : '/mo';
    });
  });
}

/* ══════════════════════════════════════════════════════════════════════
   Home-specific DOMContentLoaded bootstrap
   ══════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initPricingCalculator();
  initTestimonialsCarousel();
  initBillingToggle();

  /* ── Hero gradient via CSS custom props ── */
  const heroGradient = document.querySelector('.hero-gradient');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroGradient && !prefersReducedMotion) {
    let rafHero = false;
    document.addEventListener('mousemove', e => {
      if (rafHero) return;
      rafHero = true;
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        heroGradient.style.setProperty('--gx', x + '%');
        heroGradient.style.setProperty('--gy', y + '%');
        rafHero = false;
      });
    });
  }

  /* ── Modal handlers ── */
  const demoModal = document.getElementById('demo-modal');
  const leadModal = document.getElementById('lead-modal');
  const demoBtn   = document.getElementById('watch-demo-btn');
  let demoOpener  = null;

  window.closeDemoModal = function () {
    if (demoModal) {
      demoModal.classList.add('hidden');
      demoModal.setAttribute('inert', '');
      demoModal.setAttribute('aria-hidden', 'true');
      demoOpener?.focus();
    }
  };
  window.closeLead = function () {
    if (leadModal) {
      leadModal.classList.add('hidden');
      leadModal.setAttribute('inert', '');
      leadModal.setAttribute('aria-hidden', 'true');
      safeStorage.session.set('lead-dismissed', '1');
    }
  };

  if (demoBtn && demoModal) {
    demoBtn.addEventListener('click', () => {
      demoOpener = demoBtn;
      demoModal.classList.remove('hidden');
      demoModal.removeAttribute('inert');
      demoModal.setAttribute('aria-hidden', 'false');
      const closeBtn = demoModal.querySelector('button');
      closeBtn?.focus();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { window.closeDemoModal(); window.closeLead(); }
  });

  demoModal?.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      const focusables = Array.from(demoModal.querySelectorAll('a[href], button, input, textarea, select'));
      if (focusables.length < 2) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });

  leadModal?.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      const focusables = Array.from(leadModal.querySelectorAll('a[href], button, input, textarea, select'));
      if (focusables.length < 2) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });

  /* ── Lead modal validation & submission ── */
  const leadPhone = document.getElementById('lead-phone');
  const leadSubmit = document.getElementById('lead-submit-btn');
  if (leadPhone && leadSubmit) {
    leadSubmit.addEventListener('click', async () => {
      const parent = leadPhone.parentNode;
      parent.querySelector('.lead-error')?.remove();
      leadPhone.classList.remove('border-error', 'error-border');

      const value = leadPhone.value.trim();
      if (!value) {
        showLeadError('This field is required');
        return;
      }
      if (!PHONE_RE.test(value)) {
        showLeadError('Please enter a valid phone number');
        return;
      }

      leadSubmit.disabled = true;
      const originalText = leadSubmit.textContent;
      leadSubmit.textContent = 'Joining...';
      try {
        const response = await fetch('https://formspree.io/f/mlgvyknl', {
          method: 'POST',
          body: JSON.stringify({ phone: value }),
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          leadSubmit.innerHTML = 'Success! Joined 🚀';
          leadPhone.value = '';
          setTimeout(() => { window.closeLead(); }, 1500);
        } else {
          leadSubmit.textContent = 'Failed to Join';
        }
      } catch {
        leadSubmit.textContent = 'Error Joining';
      } finally {
        setTimeout(() => {
          leadSubmit.disabled = false;
          leadSubmit.textContent = originalText;
        }, 4000);
      }
    });

    function showLeadError(msg) {
      leadPhone.classList.add('border-error', 'error-border');
      const err = document.createElement('p');
      err.className = 'lead-error text-error text-label-sm mt-1 flex items-center gap-1';
      err.innerHTML = '<span class="material-symbols-outlined text-xs">error</span> ' + msg;
      leadPhone.parentNode.insertBefore(err, leadSubmit);
    }

    leadPhone.addEventListener('input', () => {
      leadPhone.classList.remove('border-error', 'error-border');
      leadPhone.parentNode.querySelector('.lead-error')?.remove();
    });
  }

  /* ── Lead modal: Exit Intent (Desktop) + 30 s timer (Mobile) ── */
  let leadShown = false;
  function showLead() {
    if (leadShown) return;
    if (safeStorage.session.get('lead-dismissed')) return;
    leadShown = true;
    if (leadModal) {
      leadModal.classList.remove('hidden');
      leadModal.removeAttribute('inert');
      leadModal.setAttribute('aria-hidden', 'false');
      const telInput = leadModal.querySelector('input[type="tel"]');
      if (telInput) telInput.focus();
      else leadModal.querySelector('button')?.focus();
    }
  }

  setTimeout(showLead, 30000);

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (!isMobile) {
    document.addEventListener('mouseleave', e => {
      if (e.clientY < 20) showLead();
    });
  }
});
