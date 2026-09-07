/**
 * MUSCLE FITNESS GYM - VIP 1-DAY PASS BOOKING MODAL
 * Includes accessible focus management, Escape key dismiss, and instant confirmation preview.
 */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('vip-modal');
  const openButtons = document.querySelectorAll('[data-open-modal="vip-modal"]');
  const closeButton = document.getElementById('modal-close');
  const bookingForm = document.getElementById('vip-booking-form');
  const confirmationView = document.getElementById('modal-confirmation');
  const confirmationDetails = document.getElementById('confirmed-details');
  const resetBtn = document.getElementById('modal-done-btn');

  if (!modal) return;

  let lastActiveElement = null;

  function openModal(defaultHub = 'Shivaji Nagar Flagship') {
    lastActiveElement = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Set default hub if passed
    const locationSelect = document.getElementById('modal-location');
    if (locationSelect && defaultHub) {
      locationSelect.value = defaultHub;
    }

    // Reset views
    if (bookingForm) bookingForm.style.display = 'block';
    if (confirmationView) confirmationView.style.display = 'none';

    // Focus first interactive element
    const firstInput = modal.querySelector('input, select, button');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement) lastActiveElement.focus();
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preferredHub = btn.getAttribute('data-hub') || 'Shivaji Nagar Flagship';
      openModal(preferredHub);
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Handle Booking Form Submit
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('modal-name')?.value || 'Athlete';
      const phone = document.getElementById('modal-phone')?.value || '+91';
      const location = document.getElementById('modal-location')?.value || 'Shivaji Nagar Flagship';
      const timeSlot = document.getElementById('modal-time')?.value || 'Morning Peak (06:00 - 09:00)';

      // Switch to confirmation view
      bookingForm.style.display = 'none';
      if (confirmationView) {
        confirmationView.style.display = 'block';
      }

      if (confirmationDetails) {
        confirmationDetails.innerHTML = `
          <p><strong>Athlete:</strong> ${name}</p>
          <p><strong>Studio:</strong> ${location}</p>
          <p><strong>Slot:</strong> ${timeSlot}</p>
          <p><strong>Contact:</strong> ${phone}</p>
          <p class="text-sm" style="color: var(--color-volt); margin-top: 0.5rem;">
            ✓ VIP Pass Passcode dispatched to WhatsApp (+91).
          </p>
        `;
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', closeModal);
  }
});
