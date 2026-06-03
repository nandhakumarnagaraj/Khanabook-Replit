/**
 * KhanaBook POS — Shared Site Logic v3 (Redesigned 3D Edition)
 */

function getInitialTheme() {
  try {
    const stored = localStorage.getItem('khana-theme');
    if (stored) return stored;
  } catch (e) {
    console.warn('localStorage is not accessible:', e);
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
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
  try {
    localStorage.setItem('khana-theme', theme);
  } catch (e) {
    console.warn('localStorage is not accessible:', e);
  }
}

function toggleTheme() {
  const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function setActiveNavLink() {
  const path = window.location.pathname;
  let page = path.substring(path.lastIndexOf('/') + 1);
  if (!page || page === 'index.html') {
    page = 'home.html';
  }
  const getFilename = (urlStr) => {
    if (!urlStr) return '';
    const cleanUrl = urlStr.split('#')[0].split('?')[0];
    return cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1);
  };
  const targetPage = getFilename(page) || 'home.html';
  document.querySelectorAll('nav a, #mobile-drawer a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = getFilename(href);
    if (linkFile === targetPage) {
      link.classList.add('nav-link-active');
    } else {
      link.classList.remove('nav-link-active');
    }
  });
}



function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });
  document.querySelectorAll('[data-reveal]').forEach(el => {
    observer.observe(el);
  });
}

function initCookieConsent() {
  try {
    if (localStorage.getItem('khana-cookie-consent')) return;
  } catch (e) {
    console.warn('localStorage is not accessible:', e);
    return;
  }
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  banner.classList.remove('hidden');
  document.querySelector('.whatsapp-float')?.style.setProperty('bottom', '120px');
  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    try { localStorage.setItem('khana-cookie-consent', 'accepted'); } catch (e) {}
    banner.classList.add('hidden');
    document.querySelector('.whatsapp-float')?.style.setProperty('bottom', '24px');
  });
  document.getElementById('cookie-decline')?.addEventListener('click', () => {
    try { localStorage.setItem('khana-cookie-consent', 'declined'); } catch (e) {}
    banner.classList.add('hidden');
    document.querySelector('.whatsapp-float')?.style.setProperty('bottom', '24px');
  });
}

function initPricingCalculator() {
  const calc = document.getElementById('pricing-calculator');
  if (!calc) return;
  const terminalsSlider = document.getElementById('calc-terminals');
  const locationsSlider = document.getElementById('calc-locations');
  const billingToggle = document.getElementById('calc-billing');
  const totalDisplay = document.getElementById('calc-total');
  const terminalVal = document.getElementById('calc-terminal-val');
  const locationVal = document.getElementById('calc-location-val');
  function updatePricing() {
    const terminals = parseInt(terminalsSlider.value);
    const locations = parseInt(locationsSlider.value);
    const isAnnual = billingToggle.checked;
    const basePrice = 0;
    const paidTerminals = Math.max(0, terminals - 1);
    const paidLocations = Math.max(0, locations - 1);
    const terminalPrice = paidTerminals * 499;
    const locationPrice = paidLocations * 999;
    let total = basePrice + terminalPrice + locationPrice;
    if (isAnnual) total = Math.round(total * 12 * 0.8);
    terminalVal.textContent = terminals;
    locationVal.textContent = locations;
    totalDisplay.textContent = isAnnual ? '₹' + total.toLocaleString('en-IN') + '/yr' : '₹' + total.toLocaleString('en-IN') + '/mo';
  }
  terminalsSlider.addEventListener('input', updatePricing);
  locationsSlider.addEventListener('input', updatePricing);
  billingToggle.addEventListener('change', updatePricing);
  updatePricing();
}

function initTestimonialsCarousel() {
  const track = document.getElementById('testimonials-track');
  if (!track) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentIndex = 0;
  const items = track.querySelectorAll('.testimonial-card');
  if (items.length === 0) return;
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dots = document.querySelectorAll('.testimonial-dot');
  let interval = null;
  function resetInterval() {
    if (interval) clearInterval(interval);
    if (!prefersReducedMotion) {
      interval = setInterval(() => goTo(currentIndex + 1), 5000);
    }
  }
  function goTo(index) {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = items.length - 1;
    if (currentIndex >= items.length) currentIndex = 0;
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    if (!prefersReducedMotion) {
      track.style.transition = 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
      track.style.transition = 'none';
    }
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-primary', i === currentIndex);
      dot.classList.toggle('bg-outline-variant', i !== currentIndex);
    });
  }
  prevBtn?.addEventListener('click', () => { goTo(currentIndex - 1); resetInterval(); });
  nextBtn?.addEventListener('click', () => { goTo(currentIndex + 1); resetInterval(); });
  dots.forEach((dot, i) => { dot.addEventListener('click', () => { goTo(i); resetInterval(); }); });
  let startX = 0;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].clientX - startX;
    if (deltaX > 50) { goTo(currentIndex - 1); resetInterval(); }
    else if (deltaX < -50) { goTo(currentIndex + 1); resetInterval(); }
  }, { passive: true });
  resetInterval();
  track.addEventListener('mouseenter', () => { if (interval) clearInterval(interval); });
  track.addEventListener('mouseleave', () => { resetInterval(); });
  goTo(0);
}

function setupContactForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  const btn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.querySelectorAll('.field-error').forEach(el => el.remove());
    form.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border', 'border-error'));
    let isValid = true;
    const fields = form.querySelectorAll('[required]');
    fields.forEach(field => {
      const value = field.value.trim();
      if (!field.dataset.hasInputHandler) {
        const handler = () => {
          field.classList.remove('error-border', 'border-error');
          const errorMsg = field.parentNode.querySelector('.field-error');
          if (errorMsg) errorMsg.remove();
        };
        field.addEventListener('input', handler);
        field.addEventListener('change', handler);
        field.dataset.hasInputHandler = "true";
      }
      if (!value) { isValid = false; showFieldError(field, 'This field is required'); }
      else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { isValid = false; showFieldError(field, 'Please enter a valid email address'); }
      else if (field.id === 'phone' && value && !/^[0-9\s]{10,15}$/.test(value.replace(/\+/g,''))) { isValid = false; showFieldError(field, 'Please enter a valid phone number'); }
    });
    if (!isValid) {
      const firstError = form.querySelector('.error-border');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    btn.disabled = true;
    btn.innerHTML = '<svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';
    try {
      const response = await fetch('https://formspree.io/f/mlgvyknl', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        form.reset();
        btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;">check_circle</span><span>Message Sent!</span>';
      } else {
        btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;">error</span><span>Failed to Send</span>';
      }
    } catch (err) {
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

function initBlogSearch() {
  const searchInput = document.getElementById('blog-search');
  const cards = document.querySelectorAll('.blog-card');
  if (!searchInput || cards.length === 0) return;
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
      const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';
      card.style.display = (title.includes(query) || desc.includes(query)) ? '' : 'none';
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

function initBillingToggle() {
  const toggle = document.getElementById('billing-toggle');
  if (!toggle) return;
  const thumb = document.getElementById('toggle-thumb');
  const prices = document.querySelectorAll('.plan-price');
  const periods = document.querySelectorAll('.plan-period');
  toggle.addEventListener('click', () => {
    const isAnnual = toggle.getAttribute('aria-checked') === 'true';
    const nextState = !isAnnual;
    toggle.setAttribute('aria-checked', nextState ? 'true' : 'false');
    if (nextState) {
      thumb.classList.remove('left-1');
      thumb.classList.add('right-1', 'translate-x-6');
      toggle.classList.remove('bg-outline-variant');
      toggle.classList.add('bg-primary');
    } else {
      thumb.classList.remove('right-1', 'translate-x-6');
      thumb.classList.add('left-1');
      toggle.classList.remove('bg-primary');
      toggle.classList.add('bg-outline-variant');
    }
    prices.forEach(priceEl => {
      const monthly = priceEl.getAttribute('data-monthly');
      const annual = priceEl.getAttribute('data-annual');
      if (monthly && annual) {
        priceEl.textContent = '₹' + (nextState ? parseInt(annual).toLocaleString('en-IN') : parseInt(monthly).toLocaleString('en-IN'));
      }
    });
    periods.forEach(periodEl => {
      const annualText = periodEl.getAttribute('data-annual-text');
      if (annualText) periodEl.textContent = nextState ? annualText : '/mo';
    });
  });
}

applyTheme(getInitialTheme());

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.copyright-year').forEach(el => { el.textContent = new Date().getFullYear(); });
  
  
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = currentTheme === 'light' ? 'dark_mode' : 'light_mode';
  
  setActiveNavLink();
  initScrollReveal();
  initCookieConsent();
  initPricingCalculator();
  initTestimonialsCarousel();
  setupContactForm('contact-form');
  initBlogSearch();
  initSmoothScroll();
  initBillingToggle();

  // Scroll-to-top button
  const scrollBtn = document.getElementById('scroll-to-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});


/* ==========================================================================
   Page-Specific Script for our-story
   ========================================================================== */





/* ─── 3D Visual Redesign: Mouse Tilting Card Interaction ─── */
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.glass-card, .glass-panel, .testimonial-card, .blog-card, .card-3d');
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Compute degrees of rotation based on bounds (max 10 degrees)
      const rx = -(y / (rect.height / 2)) * 10;
      const ry = (x / (rect.width / 2)) * 10;
      
      card.style.setProperty('--rx', rx + 'deg');
      card.style.setProperty('--ry', ry + 'deg');
    });

    card.addEventListener('mouseleave', () => {
      // Snaps back smoothly to 0 degrees
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });

  // Ambient mouse parallax for floating background components (data-depth)
  document.addEventListener('mousemove', e => {
    const layers = document.querySelectorAll('[data-depth]');
    const xOffset = (window.innerWidth / 2 - e.clientX) / 45;
    const yOffset = (window.innerHeight / 2 - e.clientY) / 45;

    layers.forEach(layer => {
      const depth = parseFloat(layer.getAttribute('data-depth')) || 1;
      const x = xOffset * depth;
      const y = yOffset * depth;
      layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  });
});


// Bulletproof Mobile Navigation Controller
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('hamburger-trigger');
    const drawer = document.getElementById('mobile-drawer');
    const icon = document.getElementById('mobile-menu-icon');
    
    if (!trigger || !drawer) return;

    // Get all focusable elements inside the drawer
    const focusables = drawer.querySelectorAll('a[href], button, input, textarea, select');
    const firstEl = focusables[0];
    const lastEl = focusables[focusables.length - 1];

    function toggleDrawer(open) {
      try {
        trigger.setAttribute('aria-expanded', open.toString());
        if (open) {
          drawer.classList.remove('hidden');
          drawer.setAttribute('aria-hidden', 'false');
          // Body lock
          document.body.style.setProperty('overflow', 'hidden');
          // Add transition state
          setTimeout(() => {
            drawer.classList.add('is-active');
            if (icon) icon.textContent = 'close';
            if (firstEl) firstEl.focus();
          }, 10);
        } else {
          drawer.classList.remove('is-active');
          if (icon) icon.textContent = 'menu';
          
          // Wait for transition (200ms) before hiding
          setTimeout(() => {
            drawer.classList.add('hidden');
            drawer.setAttribute('aria-hidden', 'true');
            document.body.style.removeProperty('overflow');
            trigger.focus();
          }, 200);
        }
      } catch (error) {
        // Graceful fallback
        drawer.classList.add('hidden');
        drawer.classList.remove('is-active');
        document.body.style.removeProperty('overflow');
      }
    }

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      toggleDrawer(!isExpanded);
    });

    drawer.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggleDrawer(false);
      }
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          firstEl.focus();
          e.preventDefault();
        }
      }
    });

    // Close menu when a link inside it is clicked
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleDrawer(false);
      });
    });
  });
})();
