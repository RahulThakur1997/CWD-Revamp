/**
 * CRAFTING WEB DESIGNS — CASE STUDY CONTROLLER
 * Controls navigation menu, nested submenus, scroll reveals, and lightbox modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCaseStudyNav();
  initCaseStudyScrollReveals();
  initCaseStudyLightbox();
});

/* --------------------------------------------------------------------------
   Header Navigation Overlay & Nested Accordion Controller
   -------------------------------------------------------------------------- */
function initCaseStudyNav() {
  const trigger = document.getElementById('nav-menu-trigger');
  const closeBtn = document.getElementById('nav-menu-close');
  const panel = document.getElementById('nav-overlay-panel');
  const backdrop = document.getElementById('nav-overlay-backdrop');

  if (!trigger || !panel) return;

  function openMenu() {
    panel.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    trigger.classList.add('is-active');
    trigger.setAttribute('aria-expanded', 'true');
    if (window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    panel.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    trigger.classList.remove('is-active');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (panel.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Handle Nested Submenus (Services, Portfolio, Case Studies)
  const submenuTriggers = panel.querySelectorAll('.nav-submenu-trigger');
  submenuTriggers.forEach(subTrigger => {
    subTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentItem = subTrigger.closest('.nav-has-submenu');
      if (!parentItem) return;

      const isCurrentlyOpen = parentItem.classList.contains('is-active');

      // Close sibling submenus for clean accordion behavior
      panel.querySelectorAll('.nav-has-submenu.is-active').forEach(item => {
        if (item !== parentItem) {
          item.classList.remove('is-active');
          const itemBtn = item.querySelector('.nav-submenu-trigger');
          if (itemBtn) itemBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isCurrentlyOpen) {
        parentItem.classList.remove('is-active');
        subTrigger.setAttribute('aria-expanded', 'false');
      } else {
        parentItem.classList.add('is-active');
        subTrigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close when clicking outside panel
  document.addEventListener('click', (e) => {
    if (panel.classList.contains('is-open') && !panel.contains(e.target) && !trigger.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on nav link click
  panel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   Subtle Scroll Reveals (GSAP or IntersectionObserver)
   -------------------------------------------------------------------------- */
function initCaseStudyScrollReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.cs-reveal').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = document.querySelectorAll('.cs-reveal');
    revealElements.forEach(el => {
      gsap.fromTo(el, 
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });
  } else {
    // High-performance IntersectionObserver Fallback
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.1
    });

    document.querySelectorAll('.cs-reveal').forEach(el => observer.observe(el));
  }
}

/* --------------------------------------------------------------------------
   Tap-To-Enlarge Lightbox Controller
   -------------------------------------------------------------------------- */
function initCaseStudyLightbox() {
  const lightbox = document.getElementById('cs-lightbox');
  const img = document.getElementById('cs-lightbox-img');
  const title = document.getElementById('cs-lightbox-title');
  const closeBtn = document.getElementById('cs-lightbox-close');

  if (!lightbox || !img) return;

  function openLightbox(src, altText) {
    img.src = src;
    img.alt = altText || 'Website Screenshot Preview';
    if (title) title.textContent = altText || 'Website Screenshot Preview';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const src = trigger.getAttribute('data-lightbox');
      const caption = trigger.getAttribute('data-caption');
      if (src) openLightbox(src, caption);
    });
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const src = trigger.getAttribute('data-lightbox');
        const caption = trigger.getAttribute('data-caption');
        if (src) openLightbox(src, caption);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
}
