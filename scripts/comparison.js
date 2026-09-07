/**
 * MUSCLE FITNESS GYM - INTERACTIVE TRANSFORMATION COMPARISON SLIDER
 * Supports pointer drag, mobile touch swipe, and accessible range slider input.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.comparison-container');
  const sliderInput = document.querySelector('.comparison-input');
  const overlay = document.querySelector('.comparison-image-overlay');
  const handle = document.querySelector('.comparison-handle');
  const divider = document.querySelector('.comparison-divider-line');

  if (!container || !overlay || !handle) return;

  function updateSlider(val) {
    const clamped = Math.max(0, Math.min(100, Number(val)));
    container.style.setProperty('--slider-pos', `${clamped}%`);
    overlay.style.clipPath = `polygon(0 0, ${clamped}% 0, ${clamped}% 100%, 0 100%)`;
    overlay.style.webkitClipPath = `polygon(0 0, ${clamped}% 0, ${clamped}% 100%, 0 100%)`;
    handle.style.left = `${clamped}%`;
    if (divider) divider.style.left = `${clamped}%`;
    if (sliderInput) sliderInput.value = clamped;
  }

  // Accessible Range input
  if (sliderInput) {
    sliderInput.addEventListener('input', (e) => {
      updateSlider(e.target.value);
    });
  }

  let isDragging = false;

  function handlePointerMove(clientX) {
    const rect = container.getBoundingClientRect();
    if (rect.width <= 0) return;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    updateSlider(percentage);
  }

  // Touch Swipe for Mobile Screens
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches && e.touches[0]) {
      handlePointerMove(e.touches[0].clientX);
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      handlePointerMove(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Mouse Drag for Desktop Screens
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    handlePointerMove(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    handlePointerMove(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Initial position at 50%
  updateSlider(50);
});
