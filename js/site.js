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
