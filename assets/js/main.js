// =========================================================
// Lintech Innovations Corp. — Client Interactions
// Clean, functional, tactile engineering without AI gimmicks.
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Subtle scroll-aware header styling
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
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

  // 3. Interactive Service Pill Selector (in Contact Form)
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

  // 4. Capability Workbench Tabs (Live Operational Previews)
  const workbenchTabs = document.querySelectorAll('.workbench-tab');
  const workbenchPanels = document.querySelectorAll('.workbench-panel');

  if (workbenchTabs.length && workbenchPanels.length) {
    workbenchTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;
        if (!targetId) return;

        workbenchTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        workbenchPanels.forEach(panel => {
          panel.classList.toggle('active', panel.id === targetId);
        });
      });
    });
  }

  // 5. Interactive Scope Configurator
  const capChips = document.querySelectorAll('#configCapabilities .config-chip');
  const timeChips = document.querySelectorAll('#configTimeline .config-chip');
  const modelChips = document.querySelectorAll('#configModel .config-chip');

  const summaryTitle = document.getElementById('summaryTitle');
  const summaryDesc = document.getElementById('summaryDesc');
  const summaryCapText = document.getElementById('summaryCapText');
  const summaryTimeText = document.getElementById('summaryTimeText');
  const summaryModelText = document.getElementById('summaryModelText');
  const applyScopeBtn = document.getElementById('applyScopeBtn');

  function updateConfiguratorSummary() {
    const selectedCaps = Array.from(capChips)
      .filter(c => c.classList.contains('selected'))
      .map(c => c.dataset.value);

    const selectedTime = document.querySelector('#configTimeline .config-chip.selected')?.dataset.value || 'Within 30 Days';
    const selectedModel = document.querySelector('#configModel .config-chip.selected')?.dataset.value || 'Dedicated Sprint Pod';

    if (summaryCapText) {
      summaryCapText.textContent = `Capabilities: ${selectedCaps.length ? selectedCaps.join(', ') : 'Custom Architecture'}`;
    }
    if (summaryTimeText) {
      summaryTimeText.textContent = `Timeline: ${selectedTime}`;
    }
    if (summaryModelText) {
      summaryModelText.textContent = `Model: ${selectedModel}`;
    }

    if (summaryTitle && summaryDesc) {
      const hasSoftware = selectedCaps.some(c => c.includes('Software') || c.includes('Web'));
      const hasVA = selectedCaps.some(c => c.includes('Virtual'));
      const hasMarketing = selectedCaps.some(c => c.includes('Marketing'));

      if (hasSoftware && hasVA) {
        summaryTitle.textContent = 'Dual-Wing Engineering & Operations';
        summaryDesc.textContent = 'Integrated technical development combined with operational virtual assistant support to execute and maintain systems seamlessly.';
      } else if (hasSoftware && hasMarketing) {
        summaryTitle.textContent = 'Full-Funnel Platform & Growth Stack';
        summaryDesc.textContent = 'High-performance engineering paired with digital acquisition campaigns to drive measurable user capture and conversion.';
      } else if (hasVA) {
        summaryTitle.textContent = 'Embedded Operational Team Pod';
        summaryDesc.textContent = 'Dedicated virtual assistants and operations specialists integrated into your daily workflow to eliminate operational friction.';
      } else {
        summaryTitle.textContent = 'Custom Engineering & Digital Architecture';
        summaryDesc.textContent = 'Purpose-built software and web platforms designed to streamline workflows and modernize business infrastructure.';
      }
    }
  }

  // Capability chips (multi-select, keep at least 1)
  capChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const selected = document.querySelectorAll('#configCapabilities .config-chip.selected');
      if (chip.classList.contains('selected') && selected.length === 1) {
        // Prevent deselecting the only active capability
        return;
      }
      chip.classList.toggle('selected');
      updateConfiguratorSummary();
    });
  });

  // Timeline chips (single select)
  timeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      timeChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      updateConfiguratorSummary();
    });
  });

  // Model chips (single select)
  modelChips.forEach(chip => {
    chip.addEventListener('click', () => {
      modelChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      updateConfiguratorSummary();
    });
  });

  // Apply Scope to Inquiry button
  if (applyScopeBtn) {
    applyScopeBtn.addEventListener('click', () => {
      const selectedCaps = Array.from(capChips)
        .filter(c => c.classList.contains('selected'))
        .map(c => c.dataset.value);
      const selectedTime = document.querySelector('#configTimeline .config-chip.selected')?.dataset.value || 'Immediate';
      const selectedModel = document.querySelector('#configModel .config-chip.selected')?.dataset.value || 'Dual-Wing';

      // Auto-populate message textarea
      const projectDetails = document.getElementById('projectDetails');
      if (projectDetails) {
        projectDetails.value = `[Configured Scope]\n- Capabilities: ${selectedCaps.join(', ')}\n- Target Timeline: ${selectedTime}\n- Engagement Structure: ${selectedModel}\n\nProject specifics / operational goals:\n`;
      }

      // Sync service pill in contact form
      if (servicePills && serviceInterestInput) {
        let matchingValue = 'custom-software';
        if (selectedCaps.length > 1 && selectedCaps.some(c => c.includes('Virtual'))) {
          matchingValue = 'comprehensive-support';
        } else if (selectedCaps.some(c => c.includes('Software'))) {
          matchingValue = 'custom-software';
        } else if (selectedCaps.some(c => c.includes('Web'))) {
          matchingValue = 'web-development';
        } else if (selectedCaps.some(c => c.includes('Marketing'))) {
          matchingValue = 'digital-marketing';
        } else if (selectedCaps.some(c => c.includes('Virtual'))) {
          matchingValue = 'virtual-assistants';
        }

        servicePills.querySelectorAll('.service-pill-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.value === matchingValue);
        });
        serviceInterestInput.value = matchingValue;
      }

      // Smooth scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          document.getElementById('contactName')?.focus();
        }, 500);
      }

      showToast('Scope configuration applied to inquiry form. Please enter your name and email!');
    });
  }

  // 6. Executive FAQ Accordion
  const faqItems = document.querySelectorAll('#faqAccordion .faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other accordion items for clean single-view accordion
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

  // 7. Clean Toast Notification (replaces native alert dialogs per UI standards)
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
      // Reset pills to first option
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
