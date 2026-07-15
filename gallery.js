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
  // Nature
  { id: 1,  src: 'https://picsum.photos/seed/forest01/800/1000', thumb: 'https://picsum.photos/seed/forest01/200/150', title: 'Ancient Forest', category: 'nature' },
  { id: 2,  src: 'https://picsum.photos/seed/lake22/900/600',   thumb: 'https://picsum.photos/seed/lake22/200/150',   title: 'Mountain Lake', category: 'nature' },
  { id: 3,  src: 'https://picsum.photos/seed/bloom9/700/900',   thumb: 'https://picsum.photos/seed/bloom9/200/150',   title: 'Spring Bloom', category: 'nature' },
  { id: 4,  src: 'https://picsum.photos/seed/waterfall7/800/1100', thumb: 'https://picsum.photos/seed/waterfall7/200/150', title: 'Hidden Falls', category: 'nature' },
  { id: 5,  src: 'https://picsum.photos/seed/desert55/950/600',  thumb: 'https://picsum.photos/seed/desert55/200/150',  title: 'Sand Dunes', category: 'nature' },
  { id: 6,  src: 'https://picsum.photos/seed/aurora3/900/700',   thumb: 'https://picsum.photos/seed/aurora3/200/150',   title: 'Aurora Night', category: 'nature' },
  { id: 7,  src: 'https://picsum.photos/seed/meadow11/800/600',  thumb: 'https://picsum.photos/seed/meadow11/200/150',  title: 'Wildflower Meadow', category: 'nature' },
  { id: 8,  src: 'https://picsum.photos/seed/coast88/900/1200',  thumb: 'https://picsum.photos/seed/coast88/200/150',   title: 'Rugged Coast', category: 'nature' },

  // Architecture
  { id: 9,  src: 'https://picsum.photos/seed/arch01/800/1000',  thumb: 'https://picsum.photos/seed/arch01/200/150',  title: 'Glass Spires', category: 'architecture' },
  { id: 10, src: 'https://picsum.photos/seed/bridge4/900/600',  thumb: 'https://picsum.photos/seed/bridge4/200/150', title: 'Iron Bridge', category: 'architecture' },
  { id: 11, src: 'https://picsum.photos/seed/column7/750/1000', thumb: 'https://picsum.photos/seed/column7/200/150', title: 'Marble Columns', category: 'architecture' },
  { id: 12, src: 'https://picsum.photos/seed/dome13/850/650',   thumb: 'https://picsum.photos/seed/dome13/200/150',  title: 'Cathedral Dome', category: 'architecture' },
  { id: 13, src: 'https://picsum.photos/seed/stair55/700/900',  thumb: 'https://picsum.photos/seed/stair55/200/150', title: 'Spiral Staircase', category: 'architecture' },
  { id: 14, src: 'https://picsum.photos/seed/minimal8/950/700', thumb: 'https://picsum.photos/seed/minimal8/200/150', title: 'Minimal Lines', category: 'architecture' },
  { id: 15, src: 'https://picsum.photos/seed/facade2/800/1100', thumb: 'https://picsum.photos/seed/facade2/200/150', title: 'Ornate Facade', category: 'architecture' },
  { id: 16, src: 'https://picsum.photos/seed/rooftop6/900/600', thumb: 'https://picsum.photos/seed/rooftop6/200/150', title: 'Rooftop Terrace', category: 'architecture' },

  // Travel
  { id: 17, src: 'https://picsum.photos/seed/travel01/900/600', thumb: 'https://picsum.photos/seed/travel01/200/150', title: 'Golden Temple', category: 'travel' },
  { id: 18, src: 'https://picsum.photos/seed/road44/950/700',   thumb: 'https://picsum.photos/seed/road44/200/150',   title: 'Open Road', category: 'travel' },
  { id: 19, src: 'https://picsum.photos/seed/market3/800/1000', thumb: 'https://picsum.photos/seed/market3/200/150',  title: 'Spice Market', category: 'travel' },
  { id: 20, src: 'https://picsum.photos/seed/port9/900/650',    thumb: 'https://picsum.photos/seed/port9/200/150',    title: 'Old Harbour', category: 'travel' },
  { id: 21, src: 'https://picsum.photos/seed/canyon5/850/1100', thumb: 'https://picsum.photos/seed/canyon5/200/150',  title: 'Red Canyon', category: 'travel' },
  { id: 22, src: 'https://picsum.photos/seed/village77/900/600', thumb: 'https://picsum.photos/seed/village77/200/150', title: 'Hilltop Village', category: 'travel' },
  { id: 23, src: 'https://picsum.photos/seed/glacier2/950/700', thumb: 'https://picsum.photos/seed/glacier2/200/150', title: 'Glacier Bay', category: 'travel' },
  { id: 24, src: 'https://picsum.photos/seed/bazaar1/800/900',  thumb: 'https://picsum.photos/seed/bazaar1/200/150',  title: 'Night Bazaar', category: 'travel' },

  // Abstract
  { id: 25, src: 'https://picsum.photos/seed/abstract1/800/800', thumb: 'https://picsum.photos/seed/abstract1/200/150', title: 'Liquid Light', category: 'abstract' },
  { id: 26, src: 'https://picsum.photos/seed/geo5/850/1000',     thumb: 'https://picsum.photos/seed/geo5/200/150',     title: 'Geometric Maze', category: 'abstract' },
  { id: 27, src: 'https://picsum.photos/seed/fractal9/900/700',  thumb: 'https://picsum.photos/seed/fractal9/200/150',  title: 'Fractal Dance', category: 'abstract' },
  { id: 28, src: 'https://picsum.photos/seed/smoke2/750/950',    thumb: 'https://picsum.photos/seed/smoke2/200/150',    title: 'Smoke Forms', category: 'abstract' },
  { id: 29, src: 'https://picsum.photos/seed/prism4/900/600',    thumb: 'https://picsum.photos/seed/prism4/200/150',    title: 'Prism Break', category: 'abstract' },
  { id: 30, src: 'https://picsum.photos/seed/wave7/850/1100',    thumb: 'https://picsum.photos/seed/wave7/200/150',     title: 'Sound Waves', category: 'abstract' },
  { id: 31, src: 'https://picsum.photos/seed/mirror3/800/800',   thumb: 'https://picsum.photos/seed/mirror3/200/150',   title: 'Mirror World', category: 'abstract' },
  { id: 32, src: 'https://picsum.photos/seed/color8/950/600',    thumb: 'https://picsum.photos/seed/color8/200/150',    title: 'Color Storm', category: 'abstract' },

  // Portrait
  { id: 33, src: 'https://picsum.photos/seed/port01/700/950',   thumb: 'https://picsum.photos/seed/port01/200/150',   title: 'Morning Light', category: 'portrait' },
  { id: 34, src: 'https://picsum.photos/seed/port22/750/1000',  thumb: 'https://picsum.photos/seed/port22/200/150',   title: 'Quiet Gaze', category: 'portrait' },
  { id: 35, src: 'https://picsum.photos/seed/port33/700/900',   thumb: 'https://picsum.photos/seed/port33/200/150',   title: 'Ember Shadow', category: 'portrait' },
  { id: 36, src: 'https://picsum.photos/seed/port44/800/1000',  thumb: 'https://picsum.photos/seed/port44/200/150',   title: 'Profile Study', category: 'portrait' },
  { id: 37, src: 'https://picsum.photos/seed/port55/700/850',   thumb: 'https://picsum.photos/seed/port55/200/150',   title: 'Freckled Light', category: 'portrait' },
  { id: 38, src: 'https://picsum.photos/seed/port66/750/1000',  thumb: 'https://picsum.photos/seed/port66/200/150',   title: 'Blue Hour', category: 'portrait' },
  { id: 39, src: 'https://picsum.photos/seed/port77/700/900',   thumb: 'https://picsum.photos/seed/port77/200/150',   title: 'Golden Hour', category: 'portrait' },
  { id: 40, src: 'https://picsum.photos/seed/port88/800/1050',  thumb: 'https://picsum.photos/seed/port88/200/150',   title: 'In Thought', category: 'portrait' },

  // Cityscape
  { id: 41, src: 'https://picsum.photos/seed/city01/950/600',   thumb: 'https://picsum.photos/seed/city01/200/150',   title: 'Neon Skyline', category: 'cityscape' },
  { id: 42, src: 'https://picsum.photos/seed/city22/900/700',   thumb: 'https://picsum.photos/seed/city22/200/150',   title: 'Fog City', category: 'cityscape' },
  { id: 43, src: 'https://picsum.photos/seed/city33/850/1100',  thumb: 'https://picsum.photos/seed/city33/200/150',   title: 'Vertical Jungle', category: 'cityscape' },
  { id: 44, src: 'https://picsum.photos/seed/city44/950/650',   thumb: 'https://picsum.photos/seed/city44/200/150',   title: 'Rain Reflection', category: 'cityscape' },
  { id: 45, src: 'https://picsum.photos/seed/city55/900/600',   thumb: 'https://picsum.photos/seed/city55/200/150',   title: 'Rush Hour', category: 'cityscape' },
  { id: 46, src: 'https://picsum.photos/seed/city66/800/1000',  thumb: 'https://picsum.photos/seed/city66/200/150',   title: 'Midnight Metro', category: 'cityscape' },
  { id: 47, src: 'https://picsum.photos/seed/city77/950/700',   thumb: 'https://picsum.photos/seed/city77/200/150',   title: 'Steel & Glass', category: 'cityscape' },
  { id: 48, src: 'https://picsum.photos/seed/city88/900/600',   thumb: 'https://picsum.photos/seed/city88/200/150',   title: 'Sunrise City', category: 'cityscape' },
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

  const imgWrap = document.createElement('div');
  imgWrap.className = 'card-img-wrap';

  const cardImg = document.createElement('img');
  cardImg.className = 'card-img';
  cardImg.src = img.src;
  cardImg.alt = img.title;
  imgWrap.appendChild(cardImg);

  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';

  const title = document.createElement('p');
  title.className = 'card-title';
  title.textContent = img.title;

  const badge = document.createElement('span');
  badge.className = 'card-cat-badge';
  badge.textContent = img.category;

  overlay.appendChild(title);
  overlay.appendChild(badge);

  const expand = document.createElement('div');
  expand.className = 'card-expand';
  expand.innerHTML = '🔍';

  card.appendChild(imgWrap);
  card.appendChild(overlay);
  card.appendChild(expand);

  card.addEventListener('click', () => openLightbox(img.id));

  return card;
}

/* ═══════════════════════════════════════
   5. LIGHTBOX
═══════════════════════════════════════ */
function openLightbox(imageId) {
  const img = state.filtered.find(i => i.id === imageId);
  if (!img) return;

  state.currentLBIndex = state.filtered.indexOf(img);
  lightbox.removeAttribute('hidden');
  updateLightboxContent();
  renderThumbnails();
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

function updateLightboxContent() {
  const img = state.filtered[state.currentLBIndex];
  if (!img) return;

  lbImg.classList.add('loading');
  lbSpinner.classList.add('visible');

  const tempImg = new Image();
  tempImg.onload = () => {
    lbImg.src = img.src;
    lbImg.classList.remove('loading');
    lbSpinner.classList.remove('visible');
  };
  tempImg.src = img.src;

  lbTitle.textContent = img.title;
  lbCat.textContent = img.category.toUpperCase();
  lbCounter.textContent = `${state.currentLBIndex + 1} / ${state.filtered.length}`;

  lbPrev.disabled = state.currentLBIndex === 0;
  lbNext.disabled = state.currentLBIndex === state.filtered.length - 1;
}

function renderThumbnails() {
  lbThumbnails.innerHTML = '';
  state.filtered.forEach((img, i) => {
    const thumb = document.createElement('img');
    thumb.className = `lb-thumb ${i === state.currentLBIndex ? 'active' : ''}`;
    thumb.src = img.thumb;
    thumb.alt = img.title;
    thumb.addEventListener('click', () => {
      state.currentLBIndex = i;
      updateLightboxContent();
      renderThumbnails();
    });
    lbThumbnails.appendChild(thumb);
  });
}

function nextImage() {
  if (state.currentLBIndex < state.filtered.length - 1) {
    state.currentLBIndex++;
    updateLightboxContent();
    renderThumbnails();
  }
}

function prevImage() {
  if (state.currentLBIndex > 0) {
    state.currentLBIndex--;
    updateLightboxContent();
    renderThumbnails();
  }
}

/* ═══════════════════════════════════════
   6. EVENT LISTENERS
═══════════════════════════════════════ */
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter);
  });
});

loadMoreBtn.addEventListener('click', () => {
  state.page++;
  renderGrid();
});

lbClose.addEventListener('click', closeLightbox);
lbOverlay.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevImage);
lbNext.addEventListener('click', nextImage);

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (lightbox.hasAttribute('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
});

/* ═══════════════════════════════════════
   7. INITIALIZATION
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  state.filtered = IMAGES;
  renderGrid(true);
});
