// =========================================================
// Lintech Innovations Corp. — Client Interactions
// Clean, fast, and simple.
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Subtle scroll-aware header styling
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 15);
  };
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  // 2. Mobile Menu Toggle
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

  // 3. Interactive Service Pill Selector in Contact Form
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

  // 4. Executive FAQ Accordion
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

  // 5. Clean Toast Notification
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

  // 6. Contact / Inquiry Form Handler
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

  // 7. Dynamic Copyright Year
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
