/**
 * Frontend JavaScript for Microsaas FAQ Accordion
 * Handles smooth expand/collapse animations and accessible ARIA attributes.
 */

document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('[data-microsaas-accordion="true"]');

  accordions.forEach((accordion) => {
    const items = accordion.querySelectorAll('.microsaas-faq-item');

    items.forEach((item) => {
      const trigger = item.querySelector('.microsaas-faq-trigger');
      const panel = item.querySelector('.microsaas-faq-panel');

      if (!trigger || !panel) return;

      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        // Close other open panels in the same accordion (optional standard accordion behavior)
        items.forEach((otherItem) => {
          if (otherItem !== item) {
            const otherTrigger = otherItem.querySelector('.microsaas-faq-trigger');
            const otherPanel = otherItem.querySelector('.microsaas-faq-panel');
            if (otherTrigger && otherPanel) {
              otherTrigger.setAttribute('aria-expanded', 'false');
              otherItem.classList.remove('is-active');
              otherPanel.hidden = true;
            }
          }
        });

        // Toggle current item
        if (isExpanded) {
          trigger.setAttribute('aria-expanded', 'false');
          item.classList.remove('is-active');
          panel.hidden = true;
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          item.classList.add('is-active');
          panel.hidden = false;
        }
      });
    });
  });
});
