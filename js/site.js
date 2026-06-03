/**
 * KhanaBook POS — Shared Site Logic v3.2 (Optimized Redesign)
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
  const btn = document.querySelector('button[onclick="toggleTheme()"]');
  if (theme === 'light') {
    html.classList.remove('dark');
    if (icon) icon.textContent = 'dark_mode';
    if (btn) btn.setAttribute('aria-pressed', 'false');
  } else {
    html.classList.add('dark');
    if (icon) icon.textContent = 'light_mode';
    if (btn) btn.setAttribute('aria-pressed', 'true');
  }
  try {
    localStorage.setItem('khana-theme', theme);
  } catch (e) {
    console.warn('localStorage is not accessible:', e);
  }
}

function toggleTheme() {
  const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const btn = document.querySelector('button[onclick="toggleTheme()"]');
  if (btn) { btn.classList.remove('animating'); void btn.offsetWidth; btn.classList.add('animating'); }
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
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });
  document.querySelectorAll('[data-reveal]').forEach(el => {
    const inHero = el.closest('.hero, .hero-content, .hero-visual, .hero-inner');
    if (inHero) {
      el.classList.add('revealed');
    } else {
      observer.observe(el);
    }
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
      if (!value) {
        isValid = false;
        showFieldError(field, 'This field is required');
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        isValid = false;
        showFieldError(field, 'Please enter a valid email address');
      } else if (field.id === 'phone' && value && !/^[0-9\s]{10,15}$/.test(value.replace(/\+/g,''))) {
        isValid = false;
        showFieldError(field, 'Please enter a valid phone number');
      }
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

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ==========================================================================
   Consolidated Shared DOM Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Sync theme button state and icons on boot
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  applyTheme(currentTheme);

  // 2. Set copyright year
  document.querySelectorAll('.copyright-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // 3. Bootstrap standard components
  setActiveNavLink();
  initScrollReveal();
  initCookieConsent();
  setupContactForm('contact-form');
  initSmoothScroll();

  // 4. Optimized scroll-to-top button visibility listener
  const scrollBtn = document.getElementById('scroll-to-top');
  if (scrollBtn) {
    let scrollTicker = false;
    window.addEventListener('scroll', () => {
      if (!scrollTicker) {
        scrollTicker = true;
        requestAnimationFrame(() => {
          scrollBtn.classList.toggle('visible', window.scrollY > 300);
          scrollTicker = false;
        });
      }
    }, { passive: true });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Performance Optimized Mouse Parallax and Tilt Elements
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    // Card tilt interaction
    const cards = document.querySelectorAll('.glass-card, .glass-panel, .testimonial-card, .blog-card, .card-3d');
    let tiltTicker = false;

    cards.forEach(card => {
      let rect = null;
      card.addEventListener('mouseenter', () => {
        rect = card.getBoundingClientRect();
      });
      card.addEventListener('mousemove', e => {
        if (!rect) rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        if (!tiltTicker) {
          tiltTicker = true;
          requestAnimationFrame(() => {
            const rx = -(y / (rect.height / 2)) * 10;
            const ry = (x / (rect.width / 2)) * 10;
            card.style.setProperty('--rx', rx + 'deg');
            card.style.setProperty('--ry', ry + 'deg');
            tiltTicker = false;
          });
        }
      });
      card.addEventListener('mouseleave', () => {
        rect = null;
        requestAnimationFrame(() => {
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
        });
      });
    });

    // Background components parallax
    let parallaxTicker = false;
    // Cache the layers once to avoid repeated DOM queries inside scroll/move events
    const layers = document.querySelectorAll('[data-depth]');
    if (layers.length > 0) {
      document.addEventListener('mousemove', e => {
        if (!parallaxTicker) {
          parallaxTicker = true;
          requestAnimationFrame(() => {
            const xOffset = (window.innerWidth / 2 - e.clientX) / 45;
            const yOffset = (window.innerHeight / 2 - e.clientY) / 45;

            layers.forEach(layer => {
              const depth = parseFloat(layer.getAttribute('data-depth')) || 1;
              const x = xOffset * depth;
              const y = yOffset * depth;
              layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });
            parallaxTicker = false;
          });
        }
      }, { passive: true });
    }
  }

  // 6. Bulletproof Mobile Navigation Drawer Controller
  const trigger = document.getElementById('hamburger-trigger');
  const drawer = document.getElementById('mobile-drawer');
  const menuIcon = document.getElementById('mobile-menu-icon');

  if (trigger && drawer) {
    const focusables = drawer.querySelectorAll('a[href], button, input, textarea, select');
    const firstEl = focusables[0];
    const lastEl = focusables[focusables.length - 1];

    function toggleDrawer(open) {
      trigger.setAttribute('aria-expanded', open.toString());
      if (open) {
        drawer.setAttribute('data-open', 'true');
        drawer.setAttribute('aria-hidden', 'false');
        drawer.removeAttribute('inert');
        document.body.style.setProperty('overflow', 'hidden');
        if (menuIcon) menuIcon.textContent = 'close';
        if (firstEl) firstEl.focus();
      } else {
        drawer.setAttribute('data-open', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        drawer.setAttribute('inert', '');
        document.body.style.removeProperty('overflow');
        if (menuIcon) menuIcon.textContent = 'menu';
        trigger.focus();
      }
    }

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = drawer.getAttribute('data-open') === 'true';
      toggleDrawer(!isOpen);
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

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleDrawer(false);
      });
    });
  }
});
