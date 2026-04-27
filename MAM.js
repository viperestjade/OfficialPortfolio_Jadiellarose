/* =============================================
   MAM.js — More About Me Page Scripts
============================================= */

/* ---- Dark Mode ---- */
(function () {
  const toggle = document.getElementById('themeToggle');
  const icon   = document.getElementById('themeIcon');

  // Sync with main site preference
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    icon.textContent = '☾';
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    icon.textContent = isDark ? '☾' : '☀';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
})();


/* ---- Footer Year ---- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ---- Scroll Reveal ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));


/* ---- Skill Bars ---- */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.bar-fill');
        fills.forEach((fill) => {
          const w = fill.getAttribute('data-w') || 0;
          // slight stagger per bar
          const idx = Array.from(fills).indexOf(fill);
          setTimeout(() => {
            fill.style.width = w + '%';
          }, idx * 120);
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);

document.querySelectorAll('.toolkit-col').forEach((col) => barObserver.observe(col));


/* ---- Scroll-to-Top ---- */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ---- Service Icon Cycling ---- */
// Cycle through icon images on each skill-card-icon-wrap
document.querySelectorAll('.skill-card-icon-wrap').forEach((wrap) => {
  const icons = wrap.querySelectorAll('.skill-card-icon');
  if (icons.length < 2) return;
  let current = 0;
  setInterval(() => {
    icons[current].classList.remove('active');
    current = (current + 1) % icons.length;
    icons[current].classList.add('active');
  }, 1800);
});


/* ---- Contact Modal ---- */
const contactModal = document.getElementById('contactModal');
const modalTitle   = document.getElementById('modalServiceTitle');
const modalDesc    = document.getElementById('modalServiceDesc');
const modalIcon    = document.getElementById('modalIconBig');

// Map service names to emojis
const serviceIcons = {
  'UI/UX Design':         '🖌️',
  'Graphic Design':       '🎨',
  'Web Development':      '💻',
  'App Development':      '📱',
  'Game Development':     '🎮',
  'Video & Image Editing':'🎬',
  'Project Management':    '📋',
  'default':              '✨',
};

function openContact(card) {
  const service = card.getAttribute('data-service') || 'My Service';
  const desc    = card.getAttribute('data-desc')    || '';
  const emoji   = serviceIcons[service] || serviceIcons['default'];

  modalTitle.textContent = service;
  modalDesc.textContent  = desc;
  modalIcon.textContent  = emoji;

  contactModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Trap focus inside modal
  setTimeout(() => {
    const firstFocusable = contactModal.querySelector('a, button');
    if (firstFocusable) firstFocusable.focus();
  }, 100);
}

function openContactDirect() {
  modalTitle.textContent = 'Let\'s Work Together';
  modalDesc.textContent  = 'I\'m open for freelance projects, collaborations, and internships. Pick a channel and let\'s chat!';
  modalIcon.textContent  = '🚀';

  contactModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeContact() {
  contactModal.classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === contactModal) closeContact();
}

// Keyboard ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && contactModal.classList.contains('active')) {
    closeContact();
  }
});

// Expose to global scope for inline onclick
window.openContact       = openContact;
window.openContactDirect = openContactDirect;
window.closeContact      = closeContact;
window.closeModalOutside = closeModalOutside;


/* ---- Smooth active nav highlight on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navTitle  = document.querySelector('.nav-title');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const labels = {
          'mam-hero':   'More About Me',
          'services':   'Services',
          'mam-skills': 'Toolkit',
          'mam-facts':  'Fun Facts',
          'mam-cta':    'Contact',
        };
        if (navTitle && labels[id]) {
          navTitle.textContent = labels[id];
        }
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => sectionObserver.observe(s));


/* ---- Service card ripple effect on click ---- */
document.querySelectorAll('.service-card').forEach((card) => {
  card.addEventListener('click', function (e) {
    // Create ripple
    const ripple = document.createElement('span');
    const rect   = card.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(196, 113, 74, 0.18);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleAnim 0.5s ease-out forwards;
      pointer-events: none;
      z-index: 5;
    `;

    // Add ripple keyframes once
    if (!document.getElementById('rippleStyle')) {
      const style = document.createElement('style');
      style.id = 'rippleStyle';
      style.textContent = `
        @keyframes rippleAnim {
          to { transform: scale(2.5); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 550);
  });
});


/* ---- Tilt effect on fact cards ---- */
document.querySelectorAll('.fact-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
    setTimeout(() => { card.style.transition = ''; }, 400);
  });
});

/* ---- Lightbox ---- */
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(e, src) {
  e.stopPropagation(); // prevent card's openContact from firing
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  // only restore scroll if contact modal is also closed
  if (!document.getElementById('contactModal').classList.contains('active')) {
    document.body.style.overflow = '';
  }
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});

window.openLightbox  = openLightbox;
window.closeLightbox = closeLightbox;