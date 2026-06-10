/**
 * KhanaBook POS — Shared Site Logic v4
 */

const safeStorage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, val) { try { localStorage.setItem(key, val); } catch {} },
  session: {
    get(key) { try { return sessionStorage.getItem(key); } catch { return null; } },
    set(key, val) { try { sessionStorage.setItem(key, val); } catch {} }
  }
};

function getInitialTheme() {
  const stored = safeStorage.get('khana-theme');
  if (stored) return stored;
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

function initCookieConsent() {
  if (safeStorage.get('khana-cookie-consent')) return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.setAttribute('aria-live', 'polite');
  banner.innerHTML = `
    <div class="cookie-bar">
      <div class="cookie-bar-inner">
        <p class="cookie-bar-text">This site uses cookies to improve your experience. <strong>In line with India's DPDP Act</strong>, we ask for your consent before setting non-essential cookies.</p>
        <div class="cookie-bar-actions">
          <button id="cookie-decline" class="cookie-bar-btn cookie-bar-btn-ghost">Decline</button>
          <button id="cookie-accept" class="cookie-bar-btn cookie-bar-btn-primary">Accept All</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(banner);

  requestAnimationFrame(() => banner.classList.add('cookie-visible'));

  const hide = () => {
    banner.classList.remove('cookie-visible');
    setTimeout(() => banner.remove(), 500);
  };

  document.getElementById('cookie-accept').addEventListener('click', () => {
    safeStorage.set('khana-cookie-consent', 'accepted');
    hide();
  });
  document.getElementById('cookie-decline').addEventListener('click', () => {
    safeStorage.set('khana-cookie-consent', 'declined');
    hide();
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
      if (response.ok) { form.reset(); showFormSuccess(form); }
    } catch {
      btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;">error</span><span>Error Sending</span>';
    } finally {
      btn.disabled = false;
      setTimeout(() => { btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;">send</span><span>Send Message</span>'; }, 4000);
    }
  });
}

function showFormSuccess(form) {
  const existing = form.previousElementSibling;
  if (existing && existing.classList.contains('form-success-banner')) existing.remove();
  const banner = document.createElement('div');
  banner.className = 'form-success-banner';
  banner.innerHTML = '<span class="material-symbols-outlined" style="font-size:1.3rem;color:#16a34a">check_circle</span><div><strong>Message sent!</strong> We\'ll get back to you within 24 hours.</div>';
  form.parentNode.insertBefore(banner, form);
  banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

function injectWhatsAppButton() {
  if (document.querySelector('.whatsapp-float')) return;
  const btn = document.createElement('a');
  btn.href = 'https://wa.me/919471676935?text=Hi%20KhanaBook%2C%20I%27d%20like%20to%20know%20more%20about%20your%20POS%20system.';
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.className = 'whatsapp-float';
  btn.setAttribute('aria-label', 'Chat with us on WhatsApp');
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  document.body.appendChild(btn);
}

function injectCalendlyBadge() {
  if (document.querySelector('.calendly-badge-widget')) return;
  var link = document.createElement('link');
  link.href = 'https://assets.calendly.com/assets/external/widget.css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  var script = document.createElement('script');
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  script.async = true;
  script.onload = function() {
    function tryInit(attempts) {
      if (window.Calendly) {
        Calendly.initBadgeWidget({
          url: 'https://calendly.com/YOUR-CALENDLY-LINK',
          text: '📅 Book a Demo',
          color: '#6C27D9',
          textColor: '#ffffff',
          branding: false
        });
      } else if (attempts < 10) {
        setTimeout(function() { tryInit(attempts + 1); }, 200);
      }
    }
    tryInit(0);
  };
  document.body.appendChild(script);
}

function openCalendlyPopup() {
  var link = document.querySelector('link[href*="calendly"]');
  var script = document.querySelector('script[src*="calendly"]');
  if (window.Calendly) {
    Calendly.initPopupWidget({ url: 'https://calendly.com/YOUR-CALENDLY-LINK' });
    return;
  }
  if (!script) {
    link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }
  var check = setInterval(function() {
    if (window.Calendly) {
      clearInterval(check);
      Calendly.initPopupWidget({ url: 'https://calendly.com/YOUR-CALENDLY-LINK' });
    }
  }, 100);
  setTimeout(function() { clearInterval(check); }, 5000);
}

function injectStickyCTABar() {
  if (document.querySelector('.sticky-cta-bar')) return;
  const bar = document.createElement('div');
  bar.className = 'sticky-cta-bar';
  bar.id = 'sticky-cta-bar';
  bar.innerHTML = `
    <a href="get-started.html" class="sticky-cta-btn">🚀 Start Free Year</a>
    <a href="https://play.google.com/store/apps/details?id=com.piquantservices.khanabooklite" target="_blank" rel="noopener" class="sticky-play-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.31.18.67.22 1.01.13l11.96-6.9-2.7-2.7-10.27 9.47zm-1.24-19.5A1.73 1.73 0 001.5 5.5v13c0 .48.15.92.44 1.24l.07.07 7.28-7.28v-.17L1.94 4.26zm16.14 8.5l-2.56-2.57-2.57 2.57 2.57 2.56 2.56-2.56zm-13.9-8.32L16.14 11.5 13.57 9 2.18 2.24c-.3-.18-.64-.23-.98-.14l10.27 9.47-7.27-7.28-.12-.07z"/></svg>
      Google Play
    </a>`;
  document.body.appendChild(bar);
  let rafPending = false;
  window.addEventListener('scroll', () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      bar.classList.toggle('visible', window.scrollY > 300);
      rafPending = false;
    });
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  applyTheme(currentTheme);

  document.querySelectorAll('.copyright-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  setActiveNavLink();
  initScrollReveal();
  initCookieConsent();
  setupContactForm('contact-form');
  initSmoothScroll();

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

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    document.querySelectorAll('.glass-card, .glass-panel, .testimonial-card, .blog-card, .card-3d').forEach(card => {
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

  injectWhatsAppButton();
  injectStickyCTABar();
  injectCalendlyBadge();

  const trigger = document.getElementById('hamburger-trigger');
  const drawer  = document.getElementById('mobile-drawer');
  const menuIcon = document.getElementById('mobile-menu-icon');
  if (trigger && drawer) {
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
    drawer.setAttribute('inert', '');
  }
});
