// Gallery Images Array
const galleryImages = document.querySelectorAll('.gallery-item');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
let filteredImages = [];

// ==================== FILTER FUNCTIONALITY ==================== //
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter and display images
        filterImages(filterValue);
    });
});

function filterImages(category) {
    galleryImages.forEach(item => {
        if (category === 'all') {
            item.classList.remove('hidden');
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
            if (item.getAttribute('data-category') === category) {
                item.classList.remove('hidden');
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        }
    });
}

// ==================== LIGHTBOX FUNCTIONALITY ==================== //
galleryImages.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (item.style.display !== 'none') {
            // Get the image and caption from the clicked item
            const img = item.querySelector('img');
            const caption = item.querySelector('h3');
            
            // Set lightbox content
            lightboxImage.src = img.src;
            lightboxCaption.textContent = caption.textContent;
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Store current index for navigation
            currentImageIndex = Array.from(galleryImages).indexOf(item);
        }
    });
});

// ==================== CLOSE LIGHTBOX ==================== //
lightboxClose.addEventListener('click', closeLightbox);

function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImage.src = '';
    document.body.style.overflow = 'auto';
}

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// ==================== KEYBOARD NAVIGATION ==================== //
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        showPreviousImage();
    } else if (e.key === 'ArrowRight') {
        showNextImage();
    }
});

// ==================== NAVIGATION BUTTONS ==================== //
lightboxPrev.addEventListener('click', showPreviousImage);
lightboxNext.addEventListener('click', showNextImage);

function showPreviousImage() {
    const visibleItems = Array.from(galleryImages).filter(item => 
        item.style.display !== 'none' && !item.classList.contains('hidden')
    );
    
    let currentVisibleIndex = visibleItems.findIndex(item => {
        const img = item.querySelector('img');
        return img.src === lightboxImage.src;
    });
    
    currentVisibleIndex = (currentVisibleIndex - 1 + visibleItems.length) % visibleItems.length;
    
    const prevItem = visibleItems[currentVisibleIndex];
    const img = prevItem.querySelector('img');
    const caption = prevItem.querySelector('h3');
    
    lightboxImage.style.animation = 'none';
    setTimeout(() => {
        lightboxImage.src = img.src;
        lightboxCaption.textContent = caption.textContent;
        lightboxImage.style.animation = 'zoomIn 0.4s ease';
    }, 10);
}

function showNextImage() {
    const visibleItems = Array.from(galleryImages).filter(item => 
        item.style.display !== 'none' && !item.classList.contains('hidden')
    );
    
    let currentVisibleIndex = visibleItems.findIndex(item => {
        const img = item.querySelector('img');
        return img.src === lightboxImage.src;
    });
    
    currentVisibleIndex = (currentVisibleIndex + 1) % visibleItems.length;
    
    const nextItem = visibleItems[currentVisibleIndex];
    const img = nextItem.querySelector('img');
    const caption = nextItem.querySelector('h3');
    
    lightboxImage.style.animation = 'none';
    setTimeout(() => {
        lightboxImage.src = img.src;
        lightboxCaption.textContent = caption.textContent;
        lightboxImage.style.animation = 'zoomIn 0.4s ease';
    }, 10);
}

// ==================== TOUCH SUPPORT FOR MOBILE ==================== //
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchStartX - touchEndX > swipeThreshold) {
        // Swiped left - show next image
        showNextImage();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swiped right - show previous image
        showPreviousImage();
    }
}

// ==================== INITIALIZATION ==================== //
window.addEventListener('load', () => {
    console.log('%c🎨 Professional Image Gallery Loaded! 🎨', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log(`Total Images: ${galleryImages.length}`);
    console.log('✓ Category Filtering');
    console.log('✓ Lightbox View');
    console.log('✓ Keyboard Navigation (← → Escape)');
    console.log('✓ Touch/Swipe Support');
});
