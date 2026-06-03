/**
 * KhanaBook POS — Home Page Logic v4
 * Fixes: email/phone regex, theme mismatch, single DOMContentLoaded,
 *        rAF-throttled scroll/mousemove, parallax reduced-motion guard,
 *        modal race condition, focus-trap edge case, drawer inert,
 *        testimonial 6 s autoplay, carousel aria, stars aria.
 */

/* ─── Safe localStorage wrapper ─────────────────────────────────────── */
const safeStorage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, val) { try { localStorage.setItem(key, val); } catch {} },
  session: {
    get(key) { try { return sessionStorage.getItem(key); } catch { return null; } },
    set(key, val) { try { sessionStorage.setItem(key, val); } catch {} }
  }
};

/* ─── Theme ──────────────────────────────────────────────────────────── */
function getInitialTheme() {
  const stored = safeStorage.get('khana-theme');
  if (stored) return stored;
  // Both inline script + JS now agree: OS dark → dark, else light
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');
  if (theme === 'light') {
    html.classList.remove('dark');
    if (icon) icon.textContent = 'dark_mode';
  } else {
    html.classList.add('dark');
    if (icon) icon.textContent = 'light_mode';
  }
  safeStorage.set('khana-theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* ─── Nav active link ────────────────────────────────────────────────── */
function setActiveNavLink() {
  const path = window.location.pathname;
  let page = path.substring(path.lastIndexOf('/') + 1) || 'home.html';
  if (page === 'index.html') page = 'home.html';
  const getFilename = (u) => {
    if (!u) return '';
    return u.split('#')[0].split('?')[0].split('/').pop();
  };
  document.querySelectorAll('nav a, #mobile-drawer a').forEach(link => {
    const linkFile = getFilename(link.getAttribute('href'));
    link.classList.toggle('nav-link-active', linkFile === page);
  });
}

/* ─── Scroll reveal ──────────────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

/* ─── Cookie consent ─────────────────────────────────────────────────── */
function initCookieConsent() {
  if (safeStorage.get('khana-cookie-consent')) return;
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  banner.classList.remove('hidden');
  const hide = () => {
    banner.classList.add('hidden');
    document.querySelector('.whatsapp-float')?.style.setProperty('bottom', '24px');
  };
  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    safeStorage.set('khana-cookie-consent', 'accepted'); hide();
  });
  document.getElementById('cookie-decline')?.addEventListener('click', () => {
    safeStorage.set('khana-cookie-consent', 'declined'); hide();
  });
}

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
  let currentIndex = 0;
  const items  = track.querySelectorAll('.testimonial-card');
  if (items.length === 0) return;
  const prevBtn  = document.getElementById('testimonial-prev');
  const nextBtn  = document.getElementById('testimonial-next');
  const dots     = document.querySelectorAll('.testimonial-dot');
  const carousel = track.closest('.testimonials-carousel');
  let interval   = null;

  function goTo(index) {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    currentIndex = index;
    track.style.transition = prefersReducedMotion ? 'none' : 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform  = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
      dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
    });
    // Announce slide change to screen readers
    const live = document.getElementById('carousel-live');
    if (live) live.textContent = `Testimonial ${currentIndex + 1} of ${items.length}`;
  }

  function startInterval() {
    if (prefersReducedMotion) return;
    interval = setInterval(() => goTo(currentIndex + 1), 6000); // 6 s — readable
  }
  function stopInterval() { if (interval) { clearInterval(interval); interval = null; } }
  function resetInterval() { stopInterval(); startInterval(); }

  prevBtn?.addEventListener('click', () => { goTo(currentIndex - 1); resetInterval(); });
  nextBtn?.addEventListener('click', () => { goTo(currentIndex + 1); resetInterval(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetInterval(); }));

  // Pause on hover AND focus (keyboard users)
  carousel?.addEventListener('mouseenter', stopInterval);
  carousel?.addEventListener('mouseleave', startInterval);
  carousel?.addEventListener('focusin',    stopInterval);
  carousel?.addEventListener('focusout',   startInterval);

  // Touch swipe
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 50)  { goTo(currentIndex - 1); resetInterval(); }
    else if (dx < -50) { goTo(currentIndex + 1); resetInterval(); }
  }, { passive: true });

  goTo(0);
  startInterval();
}

/* ─── Contact form ───────────────────────────────────────────────────── */
// Fixed email regex: proper \s and escaped dot
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone: optional leading +, then 10–15 digits/spaces
const PHONE_RE = /^\+?[0-9\s]{10,15}$/;

function setupContactForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  const btn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    form.querySelectorAll('.field-error').forEach(el => el.remove());
    form.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border', 'border-error'));
    let isValid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.dataset.hasInputHandler) {
        const handler = () => {
          field.classList.remove('error-border', 'border-error');
          field.parentNode.querySelector('.field-error')?.remove();
        };
        field.addEventListener('input', handler);
        field.addEventListener('change', handler);
        field.dataset.hasInputHandler = 'true';
      }
      const value = field.value.trim();
      if (!value) { isValid = false; showFieldError(field, 'This field is required'); }
      else if (field.type === 'email' && !EMAIL_RE.test(value)) { isValid = false; showFieldError(field, 'Please enter a valid email address'); }
      else if (field.id === 'phone' && value && !PHONE_RE.test(value)) { isValid = false; showFieldError(field, 'Please enter a valid phone number'); }
    });
    if (!isValid) {
      form.querySelector('.error-border')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    btn.disabled = true;
    btn.innerHTML = '<svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';
    try {
      const response = await fetch('https://formspree.io/f/mlgvyknl', {
        method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' }
      });
      btn.innerHTML = response.ok
        ? '<span class="material-symbols-outlined" style="font-size:20px;">check_circle</span><span>Message Sent!</span>'
        : '<span class="material-symbols-outlined" style="font-size:20px;">error</span><span>Failed to Send</span>';
      if (response.ok) form.reset();
    } catch {
      btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;">error</span><span>Error Sending</span>';
    } finally {
      btn.disabled = false;
      setTimeout(() => { btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;">send</span><span>Send Message</span>'; }, 4000);
    }
  });
}

function showFieldError(field, message) {
  field.classList.add('error-border', 'border-error');
  const error = document.createElement('p');
  error.className = 'field-error text-error text-label-sm mt-1 flex items-center gap-1';
  error.innerHTML = '<span class="material-symbols-outlined text-xs">error</span> ' + message;
  field.parentNode.appendChild(error);
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

/* ─── Smooth scroll ──────────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
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
   SINGLE DOMContentLoaded bootstrap — all init calls live here
   ══════════════════════════════════════════════════════════════════════ */
applyTheme(getInitialTheme());

document.addEventListener('DOMContentLoaded', () => {
  // Copyright year
  document.querySelectorAll('.copyright-year').forEach(el => { el.textContent = new Date().getFullYear(); });

  // Sync theme icon after DOM ready
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = document.documentElement.classList.contains('dark') ? 'light_mode' : 'dark_mode';

  setActiveNavLink();
  initScrollReveal();
  initCookieConsent();
  initPricingCalculator();
  initTestimonialsCarousel();
  setupContactForm('contact-form');
  initBlogSearch();
  initSmoothScroll();
  initBillingToggle();

  /* ── Scroll-to-top (rAF throttled) ── */
  const scrollBtn = document.getElementById('scroll-to-top');
  if (scrollBtn) {
    let rafPending = false;
    window.addEventListener('scroll', () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        scrollBtn.classList.toggle('visible', window.scrollY > 300);
        rafPending = false;
      });
    }, { passive: true });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Hero gradient via CSS custom props (no background string repaint) ── */
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

  /* ── Modal handlers (defined in DOMContentLoaded — no race) ── */
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
      // Focus the close button inside demoModal
      const closeBtn = demoModal.querySelector('button');
      closeBtn?.focus();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { window.closeDemoModal(); window.closeLead(); }
  });

  // Focus traps
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

  setTimeout(showLead, 30000); // 30 s fallback

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (!isMobile) {
    document.addEventListener('mouseleave', e => {
      if (e.clientY < 20) showLead();
    });
  }

  /* ── 3D card tilt (reduced-motion already checked in fn) ── */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.glass-card, .glass-panel, .blog-card, .card-3d').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const rx = -((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 10;
        const ry =  ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) * 10;
        card.style.setProperty('--rx', rx + 'deg');
        card.style.setProperty('--ry', ry + 'deg');
      });
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });

    /* ── Parallax layers (rAF throttled, reduced-motion guarded) ── */
    let rafParallax = false;
    document.addEventListener('mousemove', e => {
      if (rafParallax) return;
      rafParallax = true;
      requestAnimationFrame(() => {
        const xOff = (window.innerWidth  / 2 - e.clientX) / 45;
        const yOff = (window.innerHeight / 2 - e.clientY) / 45;
        document.querySelectorAll('[data-depth]').forEach(layer => {
          const d = parseFloat(layer.getAttribute('data-depth')) || 1;
          layer.style.transform = `translate3d(${xOff * d}px, ${yOff * d}px, 0)`;
        });
        rafParallax = false;
      });
    });
  }

  /* ── Mobile nav drawer ── */
  const trigger = document.getElementById('hamburger-trigger');
  const drawer  = document.getElementById('mobile-drawer');
  const menuIcon = document.getElementById('mobile-menu-icon');
  if (trigger && drawer) {
    // Focus trap — guard against empty or single-element drawers
    const getFocusables = () => Array.from(drawer.querySelectorAll('a[href], button, input, textarea, select'));
    function toggleDrawer(open) {
      trigger.setAttribute('aria-expanded', String(open));
      if (open) {
        drawer.classList.remove('hidden');
        drawer.removeAttribute('inert');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          drawer.classList.add('is-active');
          if (menuIcon) menuIcon.textContent = 'close';
          getFocusables()[0]?.focus();
        }, 10);
      } else {
        drawer.classList.remove('is-active');
        if (menuIcon) menuIcon.textContent = 'menu';
        setTimeout(() => {
          drawer.classList.add('hidden');
          drawer.setAttribute('inert', '');
          drawer.setAttribute('aria-hidden', 'true');
          document.body.style.removeProperty('overflow');
          trigger.focus();
        }, 200);
      }
    }
    trigger.addEventListener('click', e => { e.preventDefault(); toggleDrawer(trigger.getAttribute('aria-expanded') !== 'true'); });
    drawer.addEventListener('keydown', e => {
      if (e.key === 'Escape') { toggleDrawer(false); return; }
      if (e.key === 'Tab') {
        const focusables = getFocusables();
        if (focusables.length < 2) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    });
    drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toggleDrawer(false)));
    // Start closed with inert
    drawer.setAttribute('inert', '');
  }
});