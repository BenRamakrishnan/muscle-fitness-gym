/**
 * MUSCLE FITNESS GYM (BANGALORE, KARNATAKA) - CORE APPLICATION SCRIPT
 * Manages mobile drawer, Bangalore studio switcher, schedule filtering, and billing toggles.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initStudioTabs();
  initTimetable();
  initBillingToggle();
  initScrollSpy();
  initGalleryFilter();
  initLightbox();
});

// Mobile Drawer Navigation
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const links = drawer?.querySelectorAll('a');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
  });

  links?.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Bangalore Studio Switcher
function initStudioTabs() {
  const studioTabs = document.querySelectorAll('.studio-tab-btn');
  const studioCards = document.querySelectorAll('.studio-card-panel');

  studioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-studio');

      studioTabs.forEach(t => t.classList.remove('active'));
      studioCards.forEach(c => c.style.display = 'none');

      tab.classList.add('active');
      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        targetCard.style.display = 'flex';
      }
    });
  });
}

// Timetable Day & Category Filter
function initTimetable() {
  const dayPills = document.querySelectorAll('.day-pill');
  const catButtons = document.querySelectorAll('.cat-btn');
  const rows = document.querySelectorAll('.schedule-row');

  let activeDay = 'mon';
  let activeCat = 'all';

  function filterSchedule() {
    rows.forEach(row => {
      const rowDay = row.getAttribute('data-day');
      const rowCat = row.getAttribute('data-cat');

      const matchDay = (rowDay === activeDay || rowDay === 'all');
      const matchCat = (activeCat === 'all' || rowCat === activeCat);

      if (matchDay && matchCat) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  dayPills.forEach(pill => {
    pill.addEventListener('click', () => {
      dayPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeDay = pill.getAttribute('data-day');
      filterSchedule();
    });
  });

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.getAttribute('data-cat');
      filterSchedule();
    });
  });

  filterSchedule();
}

// Membership Monthly / Annual Billing Toggle
function initBillingToggle() {
  const toggle = document.getElementById('billing-toggle');
  const prices = document.querySelectorAll('.price-amount');
  const monthlyLabel = document.getElementById('label-monthly');
  const annualLabel = document.getElementById('label-annual');

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isAnnual = toggle.classList.toggle('annual');
    toggle.setAttribute('aria-checked', isAnnual.toString());

    if (isAnnual) {
      monthlyLabel?.classList.remove('active');
      annualLabel?.classList.add('active');
    } else {
      monthlyLabel?.classList.add('active');
      annualLabel?.classList.remove('active');
    }

    prices.forEach(priceEl => {
      const monthlyPrice = priceEl.getAttribute('data-monthly');
      const annualPrice = priceEl.getAttribute('data-annual');
      priceEl.textContent = isAnnual ? annualPrice : monthlyPrice;
    });
  });
}

// Active Nav Link Spy on Scroll
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// Gallery Filter
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      items.forEach(item => {
        const itemCat = item.getAttribute('data-cat');
        if (filter === 'all' || itemCat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Lightbox modal for gallery images
function initLightbox() {
  const items = document.querySelectorAll('.gallery-item-card');
  const lightboxModal = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!lightboxModal || !lightboxImg) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-item-caption')?.textContent || '';
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || caption;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightboxModal.classList.add('open');
        lightboxModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('open');
    lightboxModal.setAttribute('aria-hidden', 'true');
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
      closeLightbox();
    }
  });
}

