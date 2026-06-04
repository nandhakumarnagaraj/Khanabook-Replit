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
    const terminals = parseInt(terminalsSlider.value);
    const locations = parseInt(locationsSlider.value);
    const isAnnual  = billingToggle.checked;
    let total = Math.max(0, terminals - 1) * 499 + Math.max(0, locations - 1) * 999;
    if (isAnnual) total = Math.round(total * 12 * 0.8);
    terminalVal.textContent = terminals;
    locationVal.textContent = locations;
    totalDisplay.textContent = '₹' + total.toLocaleString('en-IN') + (isAnnual ? '/yr' : '/mo');
  }
  terminalsSlider.addEventListener('input', updatePricing);
  locationsSlider.addEventListener('input', updatePricing);
  billingToggle.addEventListener('change', updatePricing);
  updatePricing();
}

/* ─── Testimonials carousel ──────────────────────────────────────────── */
function initTestimonialsCarousel() {
  const track = document.getElementById('testimonials-track');
  if (!track) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = Array.from(track.querySelectorAll('.testimonial-card'));
  if (items.length === 0) return;
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dotsContainer = document.getElementById('carousel-dots');
  let dots = [];
  const carousel = track.closest('.testimonials-carousel');
  let visibleCount = window.innerWidth <= 768 ? 1 : 3;
  let currentIndex = 0;
  let interval = null;

  function getItemPercent() { return 100 / visibleCount; }
  const slideCount = items.length;
  let maxIndex = slideCount;

  function setupClones() {
    const clones = track.querySelectorAll('.testimonial-clone');
    clones.forEach(c => c.remove());
    for (let i = 0; i < visibleCount; i++) {
      const clone = items[i].cloneNode(true);
      clone.classList.add('testimonial-clone');
      track.appendChild(clone);
    }
  }

  function setupDots() {
    dotsContainer.innerHTML = '';
    dots = [];
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot';
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      if (i === 0) { dot.classList.add('active'); dot.setAttribute('aria-current', 'true'); }
      dot.addEventListener('click', () => { goTo(i); resetInterval(); });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }
  }
  setupClones();
  setupDots();

  function goTo(index, instant) {
    if (index < 0) index = slideCount - 1;
    const wrap = index >= slideCount;
    if (wrap) index = 0;
    currentIndex = index;
    const pos = currentIndex * getItemPercent();
    track.style.transition = (instant || wrap || prefersReducedMotion) ? 'none' : 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = `translateX(-${pos}%)`;
    dots.forEach((dot, i) => {
      const active = i === currentIndex;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  function startInterval() {
    if (prefersReducedMotion) return;
    interval = setInterval(() => goTo(currentIndex + 1), 3000);
  }
  function stopInterval() { if (interval) { clearInterval(interval); interval = null; } }
  function resetInterval() { stopInterval(); startInterval(); }

  prevBtn?.addEventListener('click', () => { goTo(currentIndex - 1); resetInterval(); });
  nextBtn?.addEventListener('click', () => { goTo(currentIndex + 1); resetInterval(); });

  carousel?.addEventListener('mouseenter', stopInterval);
  carousel?.addEventListener('mouseleave', startInterval);
  carousel?.addEventListener('focusin', stopInterval);
  carousel?.addEventListener('focusout', startInterval);

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) { goTo(currentIndex - 1); resetInterval(); }
    else if (dx < -50) { goTo(currentIndex + 1); resetInterval(); }
  }, { passive: true });

  goTo(0, true);
  startInterval();
}

/* ─── Blog search ────────────────────────────────────────────────────── */
function initBlogSearch() {
  const searchInput = document.getElementById('blog-search');
  const cards = document.querySelectorAll('.blog-card');
  if (!searchInput || cards.length === 0) return;
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
      const desc  = card.querySelector('p')?.textContent?.toLowerCase() || '';
      card.style.display = (title.includes(query) || desc.includes(query)) ? '' : 'none';
    });
  });
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
  initBlogSearch();
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
