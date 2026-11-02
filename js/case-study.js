/**
 * CRAFTING WEB DESIGNS — CASE STUDY CONTROLLER (REUSABLE ARCHITECTURE)
 * Controls navigation menu, nested submenus, and subtle scroll reveals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCaseStudyNav();
  initCaseStudyScrollReveals();
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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
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
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    });

    document.querySelectorAll('.cs-reveal').forEach(el => observer.observe(el));
  }
}
