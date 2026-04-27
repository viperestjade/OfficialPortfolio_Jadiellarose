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

// -----------------------------------------------
// 1. DYNAMIC YEAR in footer copyright
// -----------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();

// -----------------------------------------------
// LIGHTBOX
// -----------------------------------------------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxInfo = document.getElementById("lightboxInfo");

function openLightbox(imgSrc, el) {
  lightbox.classList.add("active");
  lightboxImg.src = imgSrc;

  // Get info from card
  const card = el.closest(".cert-card");

  const title = card.querySelector(".cert-title").textContent;
  const meta = card.querySelector(".cert-meta").innerHTML;
  const desc = card.querySelector(".cert-desc").textContent;

  lightboxInfo.innerHTML = `
    <div class="lb-title">${title}</div>
    <div class="lb-meta">${meta}</div>
    <div class="lb-desc">${desc}</div>
  `;
}

function closeLightbox(e) {
  // close if background or button clicked
  if (!e || e.target.id === "lightbox") {
    lightbox.classList.remove("active");
    lightboxImg.src = "";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

// -----------------------------------------------
// FILTER SYSTEM
// -----------------------------------------------
const chips = document.querySelectorAll(".filter-chip");
const cards = document.querySelectorAll(".cert-card");
const searchInput = document.getElementById("certSearch");
const noResults = document.getElementById("noResults");

let activeFilter = "all";

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    activeFilter = chip.dataset.filter;
    filterCards();
  });
});

searchInput.addEventListener("input", filterCards);

function filterCards() {
  const searchText = searchInput.value.toLowerCase();
  let visibleCount = 0;

  cards.forEach((card) => {
    const category = card.dataset.category;
    const text = card.textContent.toLowerCase();

    const matchFilter =
      activeFilter === "all" || category === activeFilter;

    const matchSearch = text.includes(searchText);

    if (matchFilter && matchSearch) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

  noResults.style.display = visibleCount === 0 ? "flex" : "none";
}