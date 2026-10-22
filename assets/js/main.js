// =========================================================
// Lintech Innovations Corp. — Client Interactions & Animation Engine
// Elegant, fast, failsafe, and 100% Hostinger Plug-and-Play compatible.
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Progressive Scroll Reveal (Zero blank states - failsafe)
  if ('IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll('.service-card, .pillar-box, .workflow-step, .faq-item, .inquiry-box, .section-header');
    
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealTargets.forEach((el, index) => {
      el.classList.add('scroll-reveal');
      // Subtle stagger delay if items are in the same grid
      const delay = (index % 4) * 0.08;
      if (delay > 0) {
        el.style.transitionDelay = `${delay}s`;
      }
      observer.observe(el);
    });
  }

  // 2. Smooth Anchor Navigation with Header Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 3. Subtle scroll-aware header styling
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 15);
  };
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  // 4. Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 5. Interactive Service Pill Selector in Contact Form
  const servicePills = document.getElementById('servicePills');
  const serviceInterestInput = document.getElementById('serviceInterest');
  if (servicePills && serviceInterestInput) {
    servicePills.querySelectorAll('.service-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        servicePills.querySelectorAll('.service-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        serviceInterestInput.value = btn.dataset.value;
      });
    });
  }

  // 6. Executive FAQ Accordion
  const faqItems = document.querySelectorAll('#faqAccordion .faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // 7. Clean Toast Notification
  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.innerHTML = '<span class="toast-badge">✓</span><span class="toast-text"></span>';
      document.body.appendChild(toast);
    }
    const textEl = toast.querySelector('.toast-text');
    if (textEl) textEl.textContent = message;

    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // 8. Contact / Inquiry Form Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || 'there';
      contactForm.reset();
      if (servicePills && serviceInterestInput) {
        servicePills.querySelectorAll('.service-pill-btn').forEach((b, idx) => {
          b.classList.toggle('active', idx === 0);
        });
        serviceInterestInput.value = 'custom-software';
      }
      showToast(`Thank you, ${name}! Your inquiry has been received. Lintech will follow up within 24 hours.`);
    });
  }

  // 9. Dynamic Copyright Year
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
