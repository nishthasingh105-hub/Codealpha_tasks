/**
 * LUMIÈRE — gallery.js
 * Full image gallery with masonry grid, category filters,
 * lightbox, prev/next navigation, thumbnails, and keyboard support.
 */

'use strict';

/* ═══════════════════════════════════════
   1. DATA
═══════════════════════════════════════ */
const IMAGES = [
  // Nature - Beautiful landscapes and natural scenery
  { id: 1,  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop', thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop', title: 'Mountain Peaks', category: 'nature' },
  { id: 2,  src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=900&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=200&h=150&fit=crop', title: 'Alpine Lake', category: 'nature' },
  { id: 3,  src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&h=900&fit=crop', thumb: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=150&fit=crop', title: 'Forest Dreams', category: 'nature' },
  { id: 4,  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1100&fit=crop', thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop', title: 'Waterfall Magic', category: 'nature' },
  { id: 5,  src: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=950&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=200&h=150&fit=crop', title: 'Golden Dunes', category: 'nature' },
  { id: 6,  src: 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=900&h=700&fit=crop', thumb: 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=200&h=150&fit=crop', title: 'Northern Lights', category: 'nature' },
  { id: 7,  src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=150&fit=crop', title: 'Wildflower Valley', category: 'nature' },
  { id: 8,  src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=900&h=1200&fit=crop', thumb: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=200&h=150&fit=crop', title: 'Ocean Cliffs', category: 'nature' },

  // Architecture - Buildings and structural beauty
  { id: 9,  src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=1000&fit=crop', thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=150&fit=crop', title: 'Modern Towers', category: 'architecture' },
  { id: 10, src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=200&h=150&fit=crop', title: 'Suspension Bridge', category: 'architecture' },
  { id: 11, src: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=750&h=1000&fit=crop', thumb: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=150&fit=crop', title: 'Classic Columns', category: 'architecture' },
  { id: 12, src: 'https://images.unsplash.com/photo-1499092346589-b8a1dfe5b8dd?w=850&h=650&fit=crop', thumb: 'https://images.unsplash.com/photo-1499092346589-b8a1dfe5b8dd?w=200&h=150&fit=crop', title: 'Dome Cathedral', category: 'architecture' },
  { id: 13, src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&h=900&fit=crop', thumb: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&h=150&fit=crop', title: 'Spiral Design', category: 'architecture' },
  { id: 14, src: 'https://images.unsplash.com/photo-1509043666159-fc0cdc0a24b0?w=950&h=700&fit=crop', thumb: 'https://images.unsplash.com/photo-1509043666159-fc0cdc0a24b0?w=200&h=150&fit=crop', title: 'Geometric Lines', category: 'architecture' },
  { id: 15, src: 'https://images.unsplash.com/photo-1486182162348-e3d3d2b5984f?w=800&h=1100&fit=crop', thumb: 'https://images.unsplash.com/photo-1486182162348-e3d3d2b5984f?w=200&h=150&fit=crop', title: 'Grand Facade', category: 'architecture' },
  { id: 16, src: 'https://images.unsplash.com/photo-1462396610613-dda8ad27c3b9?w=900&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1462396610613-dda8ad27c3b9?w=200&h=150&fit=crop', title: 'City Rooftops', category: 'architecture' },

  // Travel - Exotic locations and adventures
  { id: 17, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop', title: 'Temple Wonder', category: 'travel' },
  { id: 18, src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=950&h=700&fit=crop', thumb: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=150&fit=crop', title: 'Open Highway', category: 'travel' },
  { id: 19, src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=1000&fit=crop', thumb: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=150&fit=crop', title: 'Market Colors', category: 'travel' },
  { id: 20, src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=900&h=650&fit=crop', thumb: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=200&h=150&fit=crop', title: 'Harbor Town', category: 'travel' },
  { id: 21, src: 'https://images.unsplash.com/photo-1465821050379-ddf2b892b3e1?w=850&h=1100&fit=crop', thumb: 'https://images.unsplash.com/photo-1465821050379-ddf2b892b3e1?w=200&h=150&fit=crop', title: 'Canyon Hike', category: 'travel' },
  { id: 22, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop', title: 'Hillside Village', category: 'travel' },
  { id: 23, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=950&h=700&fit=crop', thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop', title: 'Glacier Bay', category: 'travel' },
  { id: 24, src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=900&fit=crop', thumb: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=150&fit=crop', title: 'Night Bazaar', category: 'travel' },

  // Abstract - Artistic and conceptual
  { id: 25, src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop', thumb: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=150&fit=crop', title: 'Liquid Light', category: 'abstract' },
  { id: 26, src: 'https://images.unsplash.com/photo-1541447271605-d91a5797ffd7?w=850&h=1000&fit=crop', thumb: 'https://images.unsplash.com/photo-1541447271605-d91a5797ffd7?w=200&h=150&fit=crop', title: 'Geometric Forms', category: 'abstract' },
  { id: 27, src: 'https://images.unsplash.com/photo-1542274604-787d3f6627c7?w=900&h=700&fit=crop', thumb: 'https://images.unsplash.com/photo-1542274604-787d3f6627c7?w=200&h=150&fit=crop', title: 'Color Waves', category: 'abstract' },
  { id: 28, src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=750&h=950&fit=crop', thumb: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=150&fit=crop', title: 'Smoke Forms', category: 'abstract' },
  { id: 29, src: 'https://images.unsplash.com/photo-1541664032343-69e8305cd5a9?w=900&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1541664032343-69e8305cd5a9?w=200&h=150&fit=crop', title: 'Prism Light', category: 'abstract' },
  { id: 30, src: 'https://images.unsplash.com/photo-1541442505-d3ecc1d9ce0f?w=850&h=1100&fit=crop', thumb: 'https://images.unsplash.com/photo-1541442505-d3ecc1d9ce0f?w=200&h=150&fit=crop', title: 'Sound Waves', category: 'abstract' },
  { id: 31, src: 'https://images.unsplash.com/photo-1542435503-a2e44ab7d7a0?w=800&h=800&fit=crop', thumb: 'https://images.unsplash.com/photo-1542435503-a2e44ab7d7a0?w=200&h=150&fit=crop', title: 'Mirror World', category: 'abstract' },
  { id: 32, src: 'https://images.unsplash.com/photo-1503424886307-b090341eeae8?w=950&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1503424886307-b090341eeae8?w=200&h=150&fit=crop', title: 'Color Storm', category: 'abstract' },

  // Portrait - Human faces and expressions
  { id: 33, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&h=950&fit=crop', thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop', title: 'Morning Light', category: 'portrait' },
  { id: 34, src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=750&h=1000&fit=crop', thumb: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=150&fit=crop', title: 'Quiet Gaze', category: 'portrait' },
  { id: 35, src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=700&h=900&fit=crop', thumb: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=200&h=150&fit=crop', title: 'Ember Shadow', category: 'portrait' },
  { id: 36, src: 'https://images.unsplash.com/photo-1503227192674-cf1410ca3642?w=800&h=1000&fit=crop', thumb: 'https://images.unsplash.com/photo-1503227192674-cf1410ca3642?w=200&h=150&fit=crop', title: 'Profile Study', category: 'portrait' },
  { id: 37, src: 'https://images.unsplash.com/photo-1534308143481-c55f00be8e23?w=700&h=850&fit=crop', thumb: 'https://images.unsplash.com/photo-1534308143481-c55f00be8e23?w=200&h=150&fit=crop', title: 'Freckled Soul', category: 'portrait' },
  { id: 38, src: 'https://images.unsplash.com/photo-1516746733990-3aef92c17fc9?w=750&h=1000&fit=crop', thumb: 'https://images.unsplash.com/photo-1516746733990-3aef92c17fc9?w=200&h=150&fit=crop', title: 'Blue Hour', category: 'portrait' },
  { id: 39, src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&h=900&fit=crop', thumb: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=150&fit=crop', title: 'Golden Hour', category: 'portrait' },
  { id: 40, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1050&fit=crop', thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop', title: 'In Thought', category: 'portrait' },

  // Cityscape - Urban environments
  { id: 41, src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=950&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=200&h=150&fit=crop', title: 'Neon Skyline', category: 'cityscape' },
  { id: 42, src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&h=700&fit=crop', thumb: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=150&fit=crop', title: 'Foggy City', category: 'cityscape' },
  { id: 43, src: 'https://images.unsplash.com/photo-1480555132570-ba8e7ad50e8f?w=850&h=1100&fit=crop', thumb: 'https://images.unsplash.com/photo-1480555132570-ba8e7ad50e8f?w=200&h=150&fit=crop', title: 'Urban Jungle', category: 'cityscape' },
  { id: 44, src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=950&h=650&fit=crop', thumb: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&h=150&fit=crop', title: 'Rain Reflection', category: 'cityscape' },
  { id: 45, src: 'https://images.unsplash.com/photo-1486299967070-08de336d282b?w=900&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1486299967070-08de336d282b?w=200&h=150&fit=crop', title: 'Rush Hour', category: 'cityscape' },
  { id: 46, src: 'https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=800&h=1000&fit=crop', thumb: 'https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=200&h=150&fit=crop', title: 'Night Metro', category: 'cityscape' },
  { id: 47, src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=950&h=700&fit=crop', thumb: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=200&h=150&fit=crop', title: 'Steel & Glass', category: 'cityscape' },
  { id: 48, src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=150&fit=crop', title: 'Sunrise City', category: 'cityscape' },
];

const ITEMS_PER_PAGE = 12;

/* ═══════════════════════════════════════
   2. STATE
═══════════════════════════════════════ */
let state = {
  activeFilter : 'all',
  visibleImages: [],
  filtered     : [],
  currentLBIndex: 0,
  page         : 1,
};

/* ═══════════════════════════════════════
   3. DOM REFERENCES
═══════════════════════════════════════ */
const grid         = document.getElementById('galleryGrid');
const filterBtns   = document.querySelectorAll('.filter-btn');
const loadMoreBtn  = document.getElementById('loadMoreBtn');
const lightbox     = document.getElementById('lightbox');
const lbOverlay    = document.getElementById('lbOverlay');
const lbClose      = document.getElementById('lbClose');
const lbPrev       = document.getElementById('lbPrev');
const lbNext       = document.getElementById('lbNext');
const lbImg        = document.getElementById('lbImg');
const lbSpinner    = document.getElementById('lbSpinner');
const lbTitle      = document.getElementById('lbTitle');
const lbCat        = document.getElementById('lbCat');
const lbCounter    = document.getElementById('lbCounter');
const lbThumbnails = document.getElementById('lbThumbnails');

/* ═══════════════════════════════════════
   4. RENDER GRID
═══════════════════════════════════════ */
function applyFilter(filter) {
  state.activeFilter = filter;
  state.page = 1;
  state.filtered = filter === 'all'
    ? IMAGES
    : IMAGES.filter(img => img.category === filter);
  renderGrid(true);
}

function renderGrid(reset = false) {
  const start = 0;
  const end   = state.page * ITEMS_PER_PAGE;
  state.visibleImages = state.filtered.slice(start, end);

  if (reset) grid.innerHTML = '';

  // Remove cards not in new filtered set
  const existingCards = grid.querySelectorAll('.gallery-card');
  existingCards.forEach(card => {
    if (!state.visibleImages.find(img => img.id === +card.dataset.id)) {
      card.remove();
    }
  });

  // Add new cards
  const existingIds = Array.from(grid.querySelectorAll('.gallery-card')).map(c => +c.dataset.id);
  state.visibleImages.forEach((img, i) => {
    if (existingIds.includes(img.id)) return;
    const card = createCard(img, i);
    grid.appendChild(card);
  });

  // Update load more
  loadMoreBtn.disabled = end >= state.filtered.length;
  loadMoreBtn.style.display = state.filtered.length <= ITEMS_PER_PAGE ? 'none' : '';
}

function createCard(img, animIndex) {
  const card = document.createElement('article');
  card.className = 'gallery-card fade-in';
  card.dataset.id  = img.id;
  card.dataset.cat = img.category;
  card.style.animationDelay = `${(animIndex % ITEMS_PER_PAGE) * 35}ms`;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `View ${img.title}`);

  card.innerHTML = `
    <div class="card-img-wrap">
      <img
        class="card-img"
        src="${img.src}"
        alt="${img.title}"
        loading="lazy"
        decoding="async"
      />
      <div class="card-overlay">
        <p class="card-title">${img.title}</p>
        <span class="card-cat-badge">${img.category}</span>
      </div>
      <div class="card-expand" aria-hidden="true">⤢</div>
    </div>
  `;

  card.addEventListener('click',  () => openLightbox(img.id));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(img.id);
    }
  });

  return card;
}

/* ═══════════════════════════════════════
   5. FILTER LOGIC
═══════════════════════════════════════ */
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    applyFilter(btn.dataset.filter);
  });
});

/* ═══════════════════════════════════════
   6. LOAD MORE
═══════════════════════════════════════ */
loadMoreBtn.addEventListener('click', () => {
  state.page++;
  renderGrid();
});

/* ═══════════════════════════════════════
   7. LIGHTBOX
═══════════════════════════════════════ */
function openLightbox(imageId) {
  const idx = state.filtered.findIndex(img => img.id === imageId);
  if (idx === -1) return;
  state.currentLBIndex = idx;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  renderLightbox();
  buildThumbnails();
  trapFocus(lightbox);
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

function renderLightbox() {
  const img = state.filtered[state.currentLBIndex];
  if (!img) return;

  // Show spinner
  lbSpinner.classList.add('visible');
  lbImg.classList.add('loading');

  const newImg = new Image();
  newImg.onload = () => {
    lbImg.src = newImg.src;
    lbImg.alt = img.title;
    lbImg.classList.remove('loading');
    lbSpinner.classList.remove('visible');
  };
  newImg.onerror = () => {
    lbSpinner.classList.remove('visible');
  };
  newImg.src = img.src;

  lbTitle.textContent   = img.title;
  lbCat.textContent     = img.category.charAt(0).toUpperCase() + img.category.slice(1);
  lbCounter.textContent = `${state.currentLBIndex + 1} / ${state.filtered.length}`;

  lbPrev.disabled = state.currentLBIndex === 0;
  lbNext.disabled = state.currentLBIndex === state.filtered.length - 1;

  // Update thumb highlight
  const thumbs = lbThumbnails.querySelectorAll('.lb-thumb');
  thumbs.forEach((t, i) => t.classList.toggle('active', i === state.currentLBIndex));
  scrollThumbIntoView(state.currentLBIndex);
}

function buildThumbnails() {
  lbThumbnails.innerHTML = '';
  state.filtered.forEach((img, i) => {
    const t = document.createElement('img');
    t.src     = img.thumb;
    t.alt     = img.title;
    t.className = 'lb-thumb' + (i === state.currentLBIndex ? ' active' : '');
    t.loading = 'lazy';
    t.addEventListener('click', () => {
      state.currentLBIndex = i;
      renderLightbox();
    });
    lbThumbnails.appendChild(t);
  });
}

function scrollThumbIntoView(index) {
  const thumb = lbThumbnails.querySelectorAll('.lb-thumb')[index];
  if (thumb) thumb.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
}

function navigate(dir) {
  const next = state.currentLBIndex + dir;
  if (next < 0 || next >= state.filtered.length) return;
  state.currentLBIndex = next;
  renderLightbox();
}

/* ─── Lightbox Events ─── */
lbClose.addEventListener('click', closeLightbox);
lbOverlay.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => navigate(-1));
lbNext.addEventListener('click', () => navigate(1));

/* ─── Keyboard ─── */
document.addEventListener('keydown', e => {
  if (lightbox.hidden) return;
  switch (e.key) {
    case 'ArrowLeft':  e.preventDefault(); navigate(-1); break;
    case 'ArrowRight': e.preventDefault(); navigate(1);  break;
    case 'Escape':     closeLightbox();                   break;
  }
});

/* ─── Touch / Swipe ─── */
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend',   e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
});

/* ─── Focus Trap ─── */
function trapFocus(el) {
  const focusable = el.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  el.addEventListener('keydown', function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
    if (lightbox.hidden) el.removeEventListener('keydown', handler);
  });
  first && first.focus();
}

/* ═══════════════════════════════════════
   8. SMOOTH SCROLL for Hero CTA
═══════════════════════════════════════ */
document.querySelector('.hero-cta')?.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
});

/* ═══════════════════════════════════════
   9. INTERSECTION OBSERVER (subtle reveal)
═══════════════════════════════════════ */
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

/* ═══════════════════════════════════════
   10. INIT
═══════════════════════════════════════ */
(function init() {
  applyFilter('all');

  // Animate section header
  const sectionHeader = document.querySelector('.section-header');
  if (sectionHeader) {
    sectionHeader.style.opacity = '0';
    sectionHeader.style.transform = 'translateY(24px)';
    sectionHeader.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(sectionHeader);
  }
})();
