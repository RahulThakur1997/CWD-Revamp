/**
 * Crafting Web Designs (CWD) - Primary Interactive Controller
 * Awwwards / FWA Standard Interactive Interactions & Physics
 */

// --------------------------------------------------------------------------
// 0. CRITICAL MOBILE ENGINE SAFEGUARD: Disable ScrollTrigger Pinning on Mobile (< 768px)
// --------------------------------------------------------------------------
function disarmMobileScrollTrigger() {
  if (window.innerWidth < 768) {
    // Disable all pinning on mobile completely
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });
      ScrollTrigger.config({ ignoreMobileResize: true });
      // Kill any pinning triggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.pin) {
          trigger.kill(false);
        }
      });
    }
  }
}
disarmMobileScrollTrigger();
window.addEventListener('resize', disarmMobileScrollTrigger, { passive: true });
window.addEventListener('orientationchange', disarmMobileScrollTrigger, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
  disarmMobileScrollTrigger();

  // 1. Initialize WebGL Refractive Background
  if (window.WebGLRefractiveBackground) {
    new window.WebGLRefractiveBackground('webgl-canvas');
  }

  // 2. Initialize Custom Magnetic Cursor
  initCustomCursor();

  // 3. Initialize Interactive 3D Card Tilt & Specs
  initCard3DTilt();

  // 4. Initialize CTA Ripple & Micro-Interactions
  initCtaRipple();

  // 5. Initialize Kinetic Micro-Glyphs
  initKineticGlyphs();

  // 6. Initialize Marquee Controls (Pause / Resume / Scrub)
  initMarqueeControls();

  // 7. Initialize Client Mockup Lightbox Modal
  initLightboxModal();

  // 8. Sticky Header Scroll Detection
  initHeaderScroll();

  // 9. Sticky Card Stacking Depth & Perspective Controller
  initCardStackScroll();

  // 10. Sticky Pinned "Why Teams Choose Us" Dynamic Graphic Controller
  initWhyTeamsChooseUs();

  // 11. Interactive Projector Light Beam CTA Controller (invints.com Style)
  initProjectorBeam();

  // 12. Footer Interactive Utilities (Copy Email & Smooth Back-to-Top)
  initFooterUtilities();

  // 13. Floating Header Mobile Dropdown Menu Controller
  initMobileMenu();

  // 14. Disable GSAP ScrollTrigger pinning and sticky page locks on mobile (< 768px)
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });
    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.matchMedia({
      "(max-width: 768px)": function() {
        // Kill pinning so sections scroll naturally down the page
        ScrollTrigger.getAll().forEach(t => t.kill(false));
      }
    });
  }
});

/* --------------------------------------------------------------------------
   Custom Magnetic Cursor Engine
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  // Don't initialize on touch devices or small screens
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
    const dot = document.querySelector('.custom-cursor-dot');
    const ring = document.querySelector('.custom-cursor-ring');
    if (dot) dot.style.display = 'none';
    if (ring) ring.style.display = 'none';
    return;
  }

  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  if (!dot || !ring) return;

  // Reveal cursor once user moves the mouse
  window.addEventListener('mousemove', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  }, { once: true, passive: true });

  let mouseX = window.innerWidth * 0.5;
  let mouseY = window.innerHeight * 0.5;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  // Lerp loop for smooth trailing ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover detection for interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .status-badge, .kinetic-glyph, .micro-proof-bar, .logo-item, .stack-mockup-frame, .stack-card-inspect, .explore-case-studies-btn, .service-card, .service-drawer-btn, .why-value-card, .process-card, .tech-pill, .google-review-card, .floating-photo-card, #interactive-globe-canvas, .kinetic-tilted-cta, .copy-email-interactive-card, .split-horizon-seam-lower'
  );

  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('is-hovering');
    });
  });
}

/* --------------------------------------------------------------------------
   Interactive 3D Perspective Card Tilt
   -------------------------------------------------------------------------- */
function initCard3DTilt() {
  const cards = document.querySelectorAll('.marquee-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    let bounds;

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.1s ease-out, border-color 0.4s ease, box-shadow 0.4s ease';
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPct = (mouseX / bounds.width) - 0.5;
      const yPct = (mouseY / bounds.height) - 0.5;

      const rotateY = xPct * 12; // tilt angle
      const rotateX = -yPct * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.035, 1.035, 1.035)`;
    }

    function onMouseLeave() {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}

/* --------------------------------------------------------------------------
   CTA Button Expanding Ripple & Magnetic Micro-Interactions
   -------------------------------------------------------------------------- */
function initCtaRipple() {
  const ctaBtn = document.querySelector('.cta-primary-btn');
  if (!ctaBtn) return;

  ctaBtn.addEventListener('click', (e) => {
    const rect = ctaBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple-wave';
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;

    ctaBtn.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });

  // Magnetic slight pull on primary CTA
  ctaBtn.addEventListener('mousemove', (e) => {
    const rect = ctaBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ctaBtn.style.transform = `translate(${x * 0.15}px, ${y * 0.15 - 2}px) scale(1.02)`;
  });

  ctaBtn.addEventListener('mouseleave', () => {
    ctaBtn.style.transform = '';
  });
}

/* --------------------------------------------------------------------------
   Kinetic Micro-Glyphs (Star Spin & Micro-Acceleration)
   -------------------------------------------------------------------------- */
function initKineticGlyphs() {
  const star = document.querySelector('.glyph-star');

  if (star) {
    star.addEventListener('click', () => {
      star.style.animationDuration = '0.6s';
      setTimeout(() => {
        star.style.animationDuration = '14s';
      }, 1200);
    });
  }
}

/* --------------------------------------------------------------------------
   Marquee Accessibility & Controls
   -------------------------------------------------------------------------- */
function initMarqueeControls() {
  const pauseBtn = document.getElementById('marquee-toggle-btn');
  const tracks = document.querySelectorAll('.marquee-track');
  if (!pauseBtn || !tracks.length) return;

  let isPaused = false;

  pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    tracks.forEach((track) => {
      track.classList.toggle('is-paused', isPaused);
    });

    const statusText = pauseBtn.querySelector('.marquee-btn-text');
    if (statusText) {
      statusText.textContent = isPaused ? 'Resume Motion' : 'Pause Motion';
    }

    const icon = pauseBtn.querySelector('.marquee-btn-icon');
    if (icon) {
      icon.textContent = isPaused ? '▶' : '⏸';
    }
  });
}

/* --------------------------------------------------------------------------
   Client Mockup Lightbox Modal
   -------------------------------------------------------------------------- */
function initLightboxModal() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const modalCategory = document.getElementById('lightbox-category');
  const modalMetric = document.getElementById('lightbox-metric');
  const cards = document.querySelectorAll('.marquee-card, .stack-card');

  if (!modal || !cards.length) return;

  function openModal(card) {
    const title = card.getAttribute('data-title') || 'Client Website';
    const category = card.getAttribute('data-category') || 'Web Design';
    const metric = card.getAttribute('data-metric') || 'High-Converting';
    const imgSrc = card.getAttribute('data-image') || '';

    if (modalImg) modalImg.src = imgSrc;
    if (modalTitle) modalTitle.textContent = title;
    if (modalCategory) modalCategory.textContent = category;
    if (modalMetric) modalMetric.textContent = metric;

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  // Marquee cards are non-clickable visual displays (no click popup/modal)

  // Stack cards: clicking inspect button or mockup frame opens lightbox
  document.querySelectorAll('.stack-card').forEach((card) => {
    const inspectBtn = card.querySelector('.stack-card-inspect');
    const mockupFrame = card.querySelector('.stack-mockup-frame');

    if (inspectBtn) {
      inspectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(card);
      });
    }

    if (mockupFrame) {
      mockupFrame.addEventListener('click', () => {
        openModal(card);
      });
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   Sticky Header Scroll Detection
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   Sticky Card Stacking Progressive Depth Scaling (Design Monks standard)
   -------------------------------------------------------------------------- */
function initCardStackScroll() {
  const cards = document.querySelectorAll('.industry-card, [data-card], .stack-card');
  if (!cards.length) return;

  const targetTops = [80, 125, 170, 215];
  let isMobile = window.innerWidth < 768;

  function resetMobileCards() {
    cards.forEach((card) => {
      card.style.transform = 'none';
      card.style.position = 'relative';
      card.style.top = 'auto';
    });
  }

  function onScroll() {
    if (window.innerWidth < 768) {
      if (!isMobile) {
        resetMobileCards();
        isMobile = true;
      }
      return;
    }

    isMobile = false;
    const vh = window.innerHeight;

    cards.forEach((card, i) => {
      let coveredProgress = 0;

      for (let j = i + 1; j < cards.length; j++) {
        const nextCard = cards[j];
        const nextRect = nextCard.getBoundingClientRect();
        const nextTargetTop = targetTops[j];

        if (nextRect.top < vh) {
          const range = Math.max(100, vh - nextTargetTop);
          const progress = Math.max(0, Math.min(1, (vh - nextRect.top) / range));
          coveredProgress += progress * 0.032;
        }
      }

      const scale = Math.max(0.90, 1 - coveredProgress);
      card.style.transform = `scale(${scale.toFixed(4)})`;
    });
  }

  function onResize() {
    if (window.innerWidth < 768) {
      resetMobileCards();
      isMobile = true;
      return;
    }
    isMobile = false;
    onScroll();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', onResize, { passive: true });

  if (window.innerWidth < 768) {
    resetMobileCards();
  } else {
    onScroll();
  }
}

/* --------------------------------------------------------------------------
   Sticky Pinned "Why Teams Choose Us" Dynamic Graphic Controller
   -------------------------------------------------------------------------- */
function initWhyTeamsChooseUs() {
  const cards = document.querySelectorAll('.why-value-card');
  const panes = document.querySelectorAll('.graphic-pane');
  if (!cards.length || !panes.length) return;

  function updateActiveState() {
    const viewportCenter = window.innerHeight * 0.45;
    let activeIndex = 1;
    let minDistance = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height * 0.4;
      const dist = Math.abs(cardCenter - viewportCenter);

      if (dist < minDistance) {
        minDistance = dist;
        activeIndex = parseInt(card.getAttribute('data-index'), 10) || 1;
      }
    });

    cards.forEach((card) => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      card.classList.toggle('is-active', idx === activeIndex);
    });

    panes.forEach((pane) => {
      const pIdx = parseInt(pane.getAttribute('data-pane'), 10);
      pane.classList.toggle('is-active', pIdx === activeIndex);
    });
  }

  window.addEventListener('scroll', updateActiveState, { passive: true });
  window.addEventListener('resize', updateActiveState, { passive: true });
  updateActiveState();

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      cards.forEach(c => c.classList.toggle('is-active', parseInt(c.getAttribute('data-index'), 10) === idx));
      panes.forEach(p => p.classList.toggle('is-active', parseInt(p.getAttribute('data-pane'), 10) === idx));
    });
  });
}




/* --------------------------------------------------------------------------
   Interactive Projector Light Beam CTA Controller (invints.com Style)
   -------------------------------------------------------------------------- */
function initProjectorBeam() {
  const section = document.getElementById('contact');
  if (!section) return;

  const cone = document.getElementById('projector-light-cone');
  const aura = document.getElementById('projector-cursor-aura');
  const lens = document.getElementById('projector-lens');
  const statusText = document.getElementById('projector-status-text');
  const beamSvg = document.getElementById('projector-beam-svg');
  if (!cone || !beamSvg) return;

  let isHovered = false;
  let animFrameId = null;

  // Coordinate tracking with smooth lerp
  let targetY = 360;
  let currentY = 360;
  let targetX = 800;
  let currentX = 800;

  function updateOrigin() {
    if (!lens) return { x: 190, y: 260 };
    const sRect = section.getBoundingClientRect();
    const lRect = lens.getBoundingClientRect();
    return {
      x: (lRect.left + lRect.width / 2) - sRect.left,
      y: (lRect.top + lRect.height / 2) - sRect.top
    };
  }

  let origin = updateOrigin();
  window.addEventListener('resize', () => {
    origin = updateOrigin();
  }, { passive: true });

  function renderLoop() {
    // Smooth lerp easing
    currentY += (targetY - currentY) * 0.12;
    currentX += (targetX - currentX) * 0.12;

    const sWidth = section.clientWidth || 1440;
    const sHeight = section.clientHeight || 720;

    // Conical spread angles pointing toward cursor
    const spreadHalf = Math.max(260, sHeight * 0.48);
    const topAimY = Math.max(-100, currentY - spreadHalf);
    const bottomAimY = Math.min(sHeight + 100, currentY + spreadHalf);

    // Update SVG viewBox dynamically if dimensions change
    beamSvg.setAttribute('viewBox', `0 0 ${sWidth} ${sHeight}`);

    // Update polygon points: origin -> right-top -> right-bottom
    const ox = Math.round(origin.x);
    const oy = Math.round(origin.y);
    const tx = Math.round(sWidth);
    const y1 = Math.round(topAimY);
    const y2 = Math.round(bottomAimY);

    cone.setAttribute('points', `${ox},${oy} ${tx},${y1} ${tx},${y2}`);

    // Position cursor aura
    if (aura && isHovered) {
      aura.style.left = `${currentX}px`;
      aura.style.top = `${currentY}px`;
    }

    if (isHovered || Math.abs(currentY - targetY) > 0.5) {
      animFrameId = requestAnimationFrame(renderLoop);
    } else {
      animFrameId = null;
    }
  }

  function onPointerMove(e) {
    const sRect = section.getBoundingClientRect();
    targetX = e.clientX - sRect.left;
    targetY = e.clientY - sRect.top;

    if (!isHovered) {
      isHovered = true;
      section.classList.add('is-illuminated');
      if (statusText) statusText.textContent = 'OPTIC BEAM ACTIVE';
      origin = updateOrigin();
    }
    if (!animFrameId) {
      animFrameId = requestAnimationFrame(renderLoop);
    }
  }

  function onPointerLeave() {
    isHovered = false;
    section.classList.remove('is-illuminated');
    if (statusText) statusText.textContent = 'PROJECTOR STANDBY';
    targetY = 360;
    targetX = 800;
    if (!animFrameId) {
      animFrameId = requestAnimationFrame(renderLoop);
    }
  }

  section.addEventListener('mousemove', onPointerMove, { passive: true });
  section.addEventListener('mouseenter', onPointerMove, { passive: true });
  section.addEventListener('mouseleave', onPointerLeave, { passive: true });

  // Touch support for mobile / tablets
  section.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const sRect = section.getBoundingClientRect();
      targetX = touch.clientX - sRect.left;
      targetY = touch.clientY - sRect.top;
      isHovered = true;
      section.classList.add('is-illuminated');
      if (statusText) statusText.textContent = 'OPTIC BEAM ACTIVE';
      origin = updateOrigin();
      if (!animFrameId) {
        animFrameId = requestAnimationFrame(renderLoop);
      }
    }
  }, { passive: true });

  section.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const sRect = section.getBoundingClientRect();
      targetX = touch.clientX - sRect.left;
      targetY = touch.clientY - sRect.top;
    }
  }, { passive: true });

  section.addEventListener('touchend', () => {
    setTimeout(onPointerLeave, 2000);
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   Footer Interactive Utilities (Copy Email & Smooth Back-to-Top)
   -------------------------------------------------------------------------- */
function initFooterUtilities() {
  // 1. Copy Email to Clipboard
  const copyCard = document.getElementById('copy-email-card');
  const copyBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('email-address-text');
  const feedbackLabel = document.getElementById('copy-feedback-label');

  const emailToCopy = emailTextEl ? emailTextEl.textContent.trim() : 'hello@craftingwebdesigns.com';

  function triggerCopy(e) {
    if (e) e.preventDefault();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailToCopy).then(showCopiedState).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  }

  function fallbackCopy() {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = emailToCopy;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showCopiedState();
    } catch (err) {
      console.warn('Copy fallback failed', err);
    }
  }

  let copyTimeout = null;
  function showCopiedState() {
    if (copyCard) copyCard.classList.add('is-copied');
    if (feedbackLabel) feedbackLabel.textContent = 'Copied! ✓';

    clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => {
      if (copyCard) copyCard.classList.remove('is-copied');
      if (feedbackLabel) feedbackLabel.textContent = 'Copy';
    }, 2400);
  }

  if (copyCard) {
    copyCard.addEventListener('click', triggerCopy);
    copyCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerCopy();
      }
    });
  }
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerCopy(e);
    });
  }

  // 2. Back to Top Smooth Scroll
  const backToTopBtn = document.getElementById('footer-back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   Header Navigation Overlay Toggle Controller
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
    if (e.key === 'Escape' && panel.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

// Global Image Error Fallback Event Listener for Production
window.addEventListener('error', function(e) {
  if (e.target && e.target.tagName === 'IMG') {
    if (typeof handleImgError === 'function') {
      handleImgError(e.target);
    }
  }
}, true);

