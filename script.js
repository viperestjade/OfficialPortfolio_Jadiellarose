// =============================================
// script.js — Jade Portfolio (Combined)
// =============================================


// -----------------------------------------------
// 1. DYNAMIC YEAR in footer copyright
// -----------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();


// -----------------------------------------------
// 2. MOBILE HAMBURGER MENU toggle
// -----------------------------------------------
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// -----------------------------------------------
// 3. SCROLL-REVEAL ANIMATION
// -----------------------------------------------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Hero content is above the fold — make visible immediately
document.querySelectorAll('#home .reveal').forEach(el => el.classList.add('visible'));


// -----------------------------------------------
// 4. RESUME DOWNLOAD MODAL
// -----------------------------------------------
const resumeBtn     = document.getElementById('resumeBtn');
const downloadModal = document.getElementById('downloadModal');
const modalCancel   = document.getElementById('modalCancel');
const modalConfirm  = document.getElementById('modalConfirm');
const resumeLink    = document.getElementById('resumeDownloadLink');

resumeBtn.addEventListener('click', () => {
  downloadModal.classList.add('active');
  document.body.style.overflow = 'hidden';
});
modalCancel.addEventListener('click', closeModal);
downloadModal.addEventListener('click', (e) => {
  if (e.target === downloadModal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
modalConfirm.addEventListener('click', () => {
  resumeLink.click();
  closeModal();
});
function closeModal() {
  downloadModal.classList.remove('active');
  document.body.style.overflow = '';
}


// -----------------------------------------------
// 5. SHORTCUT BUTTONS — smooth scroll to section
// -----------------------------------------------
const NAV_HEIGHT = 74;

document.querySelectorAll('.shortcut-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const targetY = targetEl.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  });
});


// -----------------------------------------------
// 6. HIGHLIGHT ACTIVE SHORTCUT on scroll
// -----------------------------------------------
const sections     = document.querySelectorAll('section[id]');
const shortcutBtns = document.querySelectorAll('.shortcut-btn');

function updateActiveShortcut() {
  let currentSection = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - NAV_HEIGHT - 20) {
      currentSection = sec.getAttribute('id');
    }
  });
  shortcutBtns.forEach(btn => {
    btn.classList.remove('active-shortcut');
    if (btn.getAttribute('data-target') === currentSection) {
      btn.classList.add('active-shortcut');
    }
  });
}
window.addEventListener('scroll', updateActiveShortcut);
updateActiveShortcut();


// -----------------------------------------------
// 7. ACTIVE NAV LINK HIGHLIGHT on scroll
// -----------------------------------------------
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - NAV_HEIGHT - 20) {
      current = sec.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--terra)';
    }
  });
});


// -----------------------------------------------
// 8. SCROLL-TO-TOP BUTTON
// -----------------------------------------------
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 300);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// -----------------------------------------------
// 9. COMING SOON IMAGE FALLBACK
// -----------------------------------------------
const comingSoonImg      = document.querySelector('.coming-soon-img');
const comingSoonFallback = document.querySelector('.coming-soon-fallback');

if (comingSoonImg && comingSoonFallback) {
  comingSoonImg.addEventListener('error', () => {
    comingSoonImg.style.display = 'none';
    comingSoonFallback.style.display = 'block';
  });
}


// -----------------------------------------------
// 11. CONTACT FORM — Send button feedback
// -----------------------------------------------
const contactSendBtn = document.getElementById('contactSendBtn');
if (contactSendBtn) {
  contactSendBtn.addEventListener('click', () => {
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    // Build mailto link as a simple fallback
    const firstName = document.getElementById('firstName').value.trim();
    const lastName  = document.getElementById('lastName').value.trim();
    const name = [firstName, lastName].filter(Boolean).join(' ');
    const subject = encodeURIComponent('Portfolio Inquiry from ' + (name || 'a visitor'));
    const body    = encodeURIComponent(message);
    window.location.href = `mailto:ricafortjade@gmail.com?subject=${subject}&body=${body}`;
  });
}

// -----------------------------------------------
document.querySelectorAll('.skill-card').forEach((card, cardIndex) => {
  const icons = card.querySelectorAll('.skill-card-icon');
  if (icons.length <= 1) return;

  let current = 0;
  setTimeout(() => {
    setInterval(() => {
      icons[current].classList.remove('active');
      current = (current + 1) % icons.length;
      icons[current].classList.add('active');
    }, 5000);
  }, cardIndex * 600);
});

const projectData = {
  'reelchoice': {
    title: 'ReelChoice',
    tag: 'Webpage Design · Collaboration',
    banner: 'assets/proj/reelchoice.png',
    sections: [
      {
        heading: 'Overview',
        text: 'ReelChoice is a smart platform designed to simplify movie and TV show selection by recommending content based on user preferences, mood, and trusted ratings.'
      },
      {
        heading: 'Problem',
        text: 'Users spend excessive time browsing streaming platforms without deciding what to watch — commonly known as "decision fatigue." Existing platforms lack personalized, mood-based filtering.'
      },
      {
        heading: 'Solution',
        items: [
          'Mood-based recommendation engine',
          'Integration of trusted rating aggregators (IMDb, Rotten Tomatoes)',
          'Personalized watchlist and preference learning',
          'Clean, distraction-free UI to reduce cognitive load'
        ]
      },
      {
        heading: 'Key Features',
        items: [
          'Mood selector on homepage',
          'Smart filters by genre, length, and rating',
          'Collaborative watchlists for groups',
          'Cross-platform streaming availability checker'
        ]
      },
      {
        heading: 'Tools Used',
        text: 'Figma · Prototyping · UX Research · User Testing'
      }
    ]
  },
  'adnu-dekusu': {
    title: 'ADNU Dekusu',
    tag: 'Webpage Design · Collaboration',
    banner: 'assets/proj-adnu-dekusu.png',
    sections: [
      {
        heading: 'Overview',
        text: 'A centralized platform that improves campus navigation, communication, and access to information through an interactive map, reachable contacts, real-time updates, and organized FAQs.'
      },
      {
        heading: 'Problem',
        text: 'New students and visitors at ADNU struggle to locate offices, find contact information, and stay updated on campus announcements — all scattered across different channels.'
      },
      {
        heading: 'Solution',
        items: [
          'Interactive campus map with searchable locations',
          'Centralized directory of offices and personnel',
          'Real-time announcements and bulletin board',
          'Organized FAQ system by department'
        ]
      },
      {
        heading: 'Key Features',
        items: [
          'Clickable building map with room-level detail',
          'Search bar for contacts, rooms, and FAQs',
          'Mobile-responsive for on-the-go use',
          'Admin panel for real-time content updates'
        ]
      },
      {
        heading: 'Tools Used',
        text: 'Figma · Information Architecture · UX Research'
      }
    ]
  },
  'pinmart': {
    title: 'PinMart',
    tag: 'Webpage Design · Collaboration',
    banner: 'assets/proj-pinmart.png',
    sections: [
      {
        heading: 'Overview',
        text: 'PinMart is a platform where users discover, save, and shop furniture inspiration. Users can bookmark photos and videos into personalized collections and directly purchase items.'
      },
      {
        heading: 'Problem',
        text: 'Interior design inspiration is fragmented across Pinterest, Instagram, and e-commerce sites. Users cannot directly purchase items they discover on mood boards.'
      },
      {
        heading: 'Solution',
        items: [
          'Unified inspiration and shopping experience',
          'Pinboard collections linked directly to product listings',
          'Visual search to find similar furniture items',
          'Integrated checkout without leaving the platform'
        ]
      },
      {
        heading: 'Key Features',
        items: [
          'Drag-and-drop mood board builder',
          'Shop-the-look feature on saved pins',
          'Seller marketplace for local furniture shops',
          'Price tracking and wishlist alerts'
        ]
      },
      {
        heading: 'Tools Used',
        text: 'Figma · Interaction Design · E-commerce UX'
      }
    ]
  },
  'explorific': {
    title: 'Explorific',
    tag: 'Application Design · Collaboration',
    banner: 'assets/proj-explorific.png',
    sections: [
      {
        heading: 'Overview',
        text: 'Explorific is a smart travel guide for Naga City, helping users discover the best places to eat, drink, and relax through an interactive map, GPS navigation, and filtered searches.'
      },
      {
        heading: 'Problem',
        text: 'Tourists and locals in Naga City lack a dedicated, up-to-date guide to discover establishments by category, ratings, or specific amenities.'
      },
      {
        heading: 'Solution',
        items: [
          'Category-based discovery (food, cafes, recreation)',
          'GPS-powered navigation to any listed spot',
          'Filter by ratings, distance, and amenities',
          'User-submitted reviews and photos'
        ]
      },
      {
        heading: 'Key Features',
        items: [
          'Interactive map with real-time location',
          'Curated "Best of Naga" collections',
          'Offline access for saved places',
          'Business profile pages with full details'
        ]
      },
      {
        heading: 'Tools Used',
        text: 'Figma · Mobile UX · Map Integration Design'
      }
    ]
  },
  'emotion-diary': {
    title: 'Emotion Diary',
    tag: 'Application Design · Collaboration',
    banner: 'assets/proj-emotion-diary.png',
    sections: [
      {
        heading: 'Overview',
        text: 'Emotion Diary is a mood-tracking app that helps users monitor their emotional well-being by logging emotions, adding personal notes, and reviewing patterns over time.'
      },
      {
        heading: 'Problem',
        text: 'Many people struggle to identify and articulate their emotions daily. Existing journaling apps are text-heavy and lack visual emotional pattern tracking.'
      },
      {
        heading: 'Solution',
        items: [
          'Visual emotion selector with intuitive iconography',
          'Optional short message per entry for context',
          'History view with timeline and pattern insights',
          'Minimal, calming UI to reduce journaling friction'
        ]
      },
      {
        heading: 'Key Features',
        items: [
          'Daily emotion check-in with one tap',
          'Weekly and monthly mood trend charts',
          'Private entries with passcode lock',
          'Gentle reminders to log emotions'
        ]
      },
      {
        heading: 'Tools Used',
        text: 'Figma · Mental Health UX · Interaction Design'
      }
    ]
  },
  'stray': {
    title: 'STRAY',
    tag: 'StartUp Design · Solo',
    banner: 'assets/proj-stray.png',
    sections: [
      {
        heading: 'Overview',
        text: 'STRAY is a web and app platform dedicated to rescuing, treating, and rehoming stray animals, building a better future for animals and communities.'
      },
      {
        heading: 'Problem',
        text: 'Stray animal rescue efforts are disorganized and siloed. Rescuers, veterinarians, and adopters have no unified platform to coordinate care, track animals, or facilitate adoptions.'
      },
      {
        heading: 'Solution',
        items: [
          'Centralized rescue coordination and case tracking',
          'Adoption listings with animal profiles and medical history',
          'Volunteer and donor management system',
          'Community reporting for stray sightings'
        ]
      },
      {
        heading: 'Key Features',
        items: [
          'Animal profile cards with health and rescue status',
          'Map-based stray sighting reports',
          'Adoption matching based on lifestyle preferences',
          'Fundraising module for medical treatments'
        ]
      },
      {
        heading: 'Tools Used',
        text: 'Figma · End-to-end Product Design · Social Impact UX'
      }
    ]
  },
  'echoes': {
    title: 'Echoes of Hope',
    tag: 'Game Development Design · Collaboration',
    banner: 'assets/proj-echoes.png',
    sections: [
      {
        heading: 'Overview',
        text: 'Echoes of Hope is a narrative game where a student must decide how to face a three-day struggle with depression, revealing the power of choices, empathy, and seeking help.'
      },
      {
        heading: 'Problem',
        text: 'Mental health conversations among students are still stigmatized. Traditional awareness campaigns fail to create genuine emotional engagement or behavioral change.'
      },
      {
        heading: 'Solution',
        items: [
          'Story-driven gameplay where choices have real consequences',
          'Multiple endings based on whether the character seeks help',
          'Empathy-building through first-person perspective',
          'Post-game resources and mental health hotlines'
        ]
      },
      {
        heading: 'Key Features',
        items: [
          'Branching narrative with 3 distinct endings',
          'Day-by-day emotional arc with decision points',
          'Visual novel art style for emotional immersion',
          'In-game journaling mechanic reflecting character thoughts'
        ]
      },
      {
        heading: 'Tools Used',
        text: 'Figma · Game UI Design · Narrative Design · Ren\'Py'
      }
    ]
  }
};

function openProject(id) {
  const data = projectData[id];
  if (!data) return;

  // Read banner from the clicked card's data-banner attribute
  const card = document.querySelector(`[onclick="openProject('${id}')"]`);
  const bannerSrc = card ? card.getAttribute('data-banner') : '';

  document.getElementById('projModalTitle').textContent = data.title;
  document.getElementById('projModalTag').textContent = data.tag;

  const bannerImg = document.getElementById('projModalBanner');
  bannerImg.src = bannerSrc;
  bannerImg.alt = data.title;
  bannerImg.style.display = bannerSrc ? 'block' : 'none';

  const sectionsEl = document.getElementById('projModalSections');
  sectionsEl.innerHTML = data.sections.map(s => `
    <div class="proj-modal-section">
      <h4>${s.heading}</h4>
      ${s.text ? `<p>${s.text}</p>` : ''}
      ${s.items ? `<ul>${s.items.map(i => `<li>${i}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');

  document.getElementById('projModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  document.getElementById('projModal').classList.remove('active');
  document.body.style.overflow = '';
}

function closeProjectModal(e) {
  if (e.target === document.getElementById('projModal')) closeProject();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProject();
});

const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const savedTheme  = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeIcon.textContent = '☾';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeIcon.textContent = isDark ? '☾' : '☀';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

