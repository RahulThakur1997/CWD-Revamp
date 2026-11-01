/**
 * Crafting Web Designs (CWD) - One Day Websites Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initSolutionInteractive();
  initLeadModal();
  initFaqAccordion();
  initMobileMenu();
});

/* --------------------------------------------------------------------------
   1. The Solution: Interactive 3-Stage Website Evolution
   Stage 1: Industry-Ready Foundation
   Stage 2: Your Brand & Services
   Stage 3: Your Website (Live & Converting)
   -------------------------------------------------------------------------- */
function initSolutionInteractive() {
  const tabs = document.querySelectorAll('.stage-tab-btn');
  const views = document.querySelectorAll('.solution-stage-view');

  if (!tabs.length || !views.length) return;

  function activateStage(stageNumber) {
    tabs.forEach(tab => {
      const isTarget = tab.dataset.stage === stageNumber;
      tab.classList.toggle('is-active', isTarget);
      tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    views.forEach(view => {
      const isTarget = view.dataset.stage === stageNumber;
      view.classList.toggle('is-active', isTarget);
      view.setAttribute('aria-hidden', isTarget ? 'false' : 'true');
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const stage = tab.dataset.stage;
      activateStage(stage);
    });

    // Keyboard navigation support
    tab.addEventListener('keydown', (e) => {
      let nextStage = null;
      const current = parseInt(tab.dataset.stage, 10);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextStage = current === 3 ? 1 : current + 1;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextStage = current === 1 ? 3 : current - 1;
      }

      if (nextStage) {
        e.preventDefault();
        const nextBtn = document.querySelector(`.stage-tab-btn[data-stage="${nextStage}"]`);
        if (nextBtn) {
          nextBtn.focus();
          activateStage(String(nextStage));
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. Lead Capture Modal Controller
   -------------------------------------------------------------------------- */
function initLeadModal() {
  const backdrop = document.getElementById('lead-modal-backdrop');
  const dialog = document.getElementById('lead-modal-dialog');
  const closeBtn = document.getElementById('lead-modal-close');
  const triggers = document.querySelectorAll('[data-open-modal="lead-modal"], .open-lead-modal-btn');
  const form = document.getElementById('one-day-lead-form');
  const successState = document.getElementById('lead-modal-success');

  if (!backdrop || !dialog) return;

  function openModal(defaultIndustry) {
    backdrop.classList.add('is-open');
    dialog.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    if (defaultIndustry) {
      const industrySelect = document.getElementById('lead-industry');
      if (industrySelect) industrySelect.value = defaultIndustry;
    }

    const firstInput = dialog.querySelector('input:not([type="hidden"])');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 150);
    }
  }

  function closeModal() {
    backdrop.classList.remove('is-open');
    dialog.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefillIndustry = btn.getAttribute('data-industry') || '';
      openModal(prefillIndustry);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dialog.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing Request...
        `;
      }

      // Simulate project intake confirmation
      setTimeout(() => {
        form.classList.add('hidden');
        if (successState) {
          successState.classList.remove('hidden');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 1000);
    });
  }
}

/* --------------------------------------------------------------------------
   3. Accessible FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const detailsList = document.querySelectorAll('.faq-accordion-item');
  if (!detailsList.length) return;

  detailsList.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        detailsList.forEach(other => {
          if (other !== item && other.open) {
            other.removeAttribute('open');
          }
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Floating Sticky Header Mobile Menu Controller
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const trigger = document.getElementById('nav-menu-trigger');
  const closeBtn = document.getElementById('nav-menu-close');
  const panel = document.getElementById('nav-overlay-panel');
  const backdrop = document.getElementById('nav-overlay-backdrop');

  if (!trigger || !panel) return;

  function openMenu() {
    panel.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    if (window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    panel.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
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
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
}
