/**
 * KhanaBook POS — Home Page Logic v4 (site.js shared functions removed)
 */

/* ─── Testimonials carousel (data-driven, 3-visible) ────────────────── */
function initTestimonialsCarousel() {
  const DATA = [
    { initials: 'RK', name: 'Rajesh Kumar', role: 'Owner, Spice Garden, Bengaluru', quote: 'We cut our billing time from 1 minute to under 10 seconds. Rush hour is no longer a nightmare — KhanaBook handles it effortlessly.' },
    { initials: 'PM', name: 'Priya Menon', role: 'Owner, Kerala Kitchen, Chennai', quote: 'The AI menu import saved us a full day of data entry. We uploaded our menu and it was done in minutes. Absolutely brilliant.' },
    { initials: 'AS', name: 'Arjun', role: 'Owner, Madurai Kitchen, Madurai', quote: 'Power cuts used to kill our billing. Now we\'re 100% offline-capable. KhanaBook has been a game-changer for our roadside dhaba.' },
    { initials: 'TK', name: 'Tharun Kumar', role: 'Founder, Avartana, Chennai', quote: 'I was using a device for billing and it got lost. I logged into another device and all my data was backed up — it continued from the existing order ID like nothing happened.' },
  ];
  const track = document.getElementById('testimonials-track');
  if (!track) return;
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dotsContainer = document.getElementById('carousel-dots');
  let idx = 0, timer = null;

  function getVisible() { return window.innerWidth <= 768 ? 1 : 3; }

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function cardHTML(t) {
    return '<div class="testimonial-card">'
      + '<div class="testimonial-quote">' + escapeHTML(t.quote) + '</div>'
      + '<div class="testimonial-author"><div class="testimonial-avatar" aria-hidden="true">' + escapeHTML(t.initials) + '</div>'
      + '<div><div class="testimonial-name">' + escapeHTML(t.name) + '</div><div class="testimonial-role">' + escapeHTML(t.role) + '</div></div></div>'
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
  const thumb = document.getElementById('toggle-thumb');
  const prices = document.querySelectorAll('.plan-price');
  const periods = document.querySelectorAll('.plan-period');
  toggle.addEventListener('click', () => {
    const isAnnual = toggle.getAttribute('aria-checked') === 'true';
    const next = !isAnnual;
    toggle.setAttribute('aria-checked', String(next));
    if (next) { thumb.classList.remove('left-1'); thumb.classList.add('right-1', 'translate-x-6'); toggle.classList.replace('bg-outline-variant', 'bg-primary'); }
    else { thumb.classList.remove('right-1', 'translate-x-6'); thumb.classList.add('left-1'); toggle.classList.replace('bg-primary', 'bg-outline-variant'); }
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
  const demoBtn = document.getElementById('watch-demo-btn');
  let demoOpener = null;

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
        const response = await fetch(FORMSPREE_URL, {
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
      err.className = 'lead-error';
      err.style.cssText = 'color:var(--violet-dark);font-size:.85rem;margin-top:.25rem;display:flex;align-items:center;gap:.25rem';
      err.innerHTML = '<span class="material-symbols-outlined" style="font-size:.85rem">error</span> ' + msg;
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
