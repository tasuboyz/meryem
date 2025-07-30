// Portfolio Manager
class PortfolioManager {
    constructor() {
        this.portfolioGrid = document.getElementById('portfolio-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.modal = document.getElementById('project-modal');
        this.modalOverlay = this.modal?.querySelector('.modal-overlay');
        this.modalClose = this.modal?.querySelector('#modal-close');
        this.currentFilter = 'all';
        this.portfolioItems = [];
        this.currentImageIndex = 0;
        this.currentImages = [];
        
        this.init();
    }

    init() {
        this.createPortfolioItems();
        this.bindEvents();
        this.setupIntersectionObserver();
    }

    createPortfolioItems() {
        if (!this.portfolioGrid) return;

        this.portfolioGrid.innerHTML = '';
        
        portfolioData.forEach(item => {
            const portfolioItem = this.createPortfolioCard(item);
            this.portfolioGrid.appendChild(portfolioItem);
            this.portfolioItems.push(portfolioItem);
        });
    }

    createPortfolioCard(item) {
        const card = document.createElement('div');
        card.className = `portfolio-item fade-in-up`;
        card.dataset.category = item.category;
        card.dataset.id = item.id;

        // Determina l'icona in base alla categoria
        let categoryIcon = this.getCategoryIcon(item.category);

        // Gestisci immagini reali se disponibili
        let imageContent = '';
        if (item.image && item.image.trim() !== '') {
            imageContent = `
                <img src="${item.image}" alt="${item.title}" class="portfolio-img" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                     onload="this.nextElementSibling.style.display='none';">
                <div class="image-placeholder-portfolio" style="display: none;">
                    <span class="icon">${categoryIcon}</span>
                    <span class="text">Immagine progetto</span>
                </div>
            `;
        } else {
            imageContent = `
                <div class="image-placeholder-portfolio">
                    <span class="icon">${categoryIcon}</span>
                    <span class="text">Immagine progetto</span>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="portfolio-image">
                ${imageContent}
                <div class="portfolio-overlay">
                    <div class="overlay-content">
                        <span class="overlay-icon">👁️</span>
                        <span class="overlay-text">Visualizza Dettagli</span>
                    </div>
                </div>
            </div>
            <div class="portfolio-info">
                <h3>${item.title}</h3>
                <div class="portfolio-category">${this.getCategoryName(item.category)}</div>
                <p class="portfolio-description">${item.description}</p>
                <div class="portfolio-tags">
                    ${(item.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        return card;
    }

    getCategoryName(category) {
        return portfolioCategories[category] || category;
    }

    bindEvents() {
        // Filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterPortfolio(filter);
                this.updateActiveFilter(e.target);
            });
        });

        // Portfolio items click
        this.portfolioGrid?.addEventListener('click', (e) => {
            const portfolioItem = e.target.closest('.portfolio-item');
            if (portfolioItem) {
                const itemId = parseInt(portfolioItem.dataset.id);
                this.openProjectModal(itemId);
            }
        });

        // Modal events
        this.modalClose?.addEventListener('click', () => this.closeModal());
        this.modalOverlay?.addEventListener('click', () => this.closeModal());
        
        // Gallery navigation
        document.getElementById('prev-btn')?.addEventListener('click', () => this.prevImage());
        document.getElementById('next-btn')?.addEventListener('click', () => this.nextImage());
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (this.modal?.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.prevImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    filterPortfolio(filter) {
        this.currentFilter = filter;
        
        this.portfolioItems.forEach((item, index) => {
            const shouldShow = filter === 'all' || item.dataset.category === filter;
            
            if (shouldShow) {
                setTimeout(() => {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    requestAnimationFrame(() => {
                        item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                }, index * 50);
            } else {
                item.style.transition = 'all 0.3s ease-out';
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        // Show notification
        this.showFilterNotification();
    }

    updateActiveFilter(activeButton) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    openProjectModal(itemId) {
        const item = portfolioData.find(p => p.id === itemId);
        if (!item || !this.modal) return;

        this.currentImages = item.images || [];
        this.currentImageIndex = 0;

        // Populate modal content
        this.populateModalContent(item);
        
        // Show modal with animation
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        requestAnimationFrame(() => {
            this.modal.classList.add('active');
        });
    }

    populateModalContent(item) {
        // Basic info
        document.getElementById('modal-title').textContent = item.title;
        document.getElementById('modal-category').textContent = this.getCategoryName(item.category);
        document.getElementById('modal-description').textContent = item.fullDescription || item.description;
        document.getElementById('modal-client').textContent = item.details?.client || 'N/A';
        document.getElementById('modal-year').textContent = item.year;
        document.getElementById('modal-status').textContent = item.status || 'Completato';
        document.getElementById('modal-location').textContent = item.details?.location || 'N/A';

        // Tags
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = (item.tags || []).map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');

        // Setup gallery
        this.setupGallery();
    }

    setupGallery() {
        const thumbnailsContainer = document.getElementById('gallery-thumbnails');
        const totalImagesSpan = document.getElementById('total-images');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        // Clear thumbnails
        thumbnailsContainer.innerHTML = '';
        
        if (this.currentImages.length === 0) {
            // No images available
            document.getElementById('main-image').style.display = 'none';
            thumbnailsContainer.innerHTML = '<p style="color: var(--text-secondary); padding: 20px;">Nessuna immagine disponibile per questo progetto.</p>';
            totalImagesSpan.textContent = '0';
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }

        // Adjust number of images based on screen size
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        
        let maxImages;
        if (isSmallMobile) {
            maxImages = 6; // Fewer images on very small screens
        } else if (isMobile) {
            maxImages = 8;
        } else {
            maxImages = 12; // More images on larger screens
        }
        
        const originalCount = this.currentImages.length;
        const imagesToShow = this.currentImages.slice(0, maxImages);
        
        // Update the current images to only include limited images
        this.currentImages = imagesToShow;

        // Set total images (show actual number being displayed)
        totalImagesSpan.textContent = imagesToShow.length;
        
        // Add class to thumbnails container based on number of images
        if (imagesToShow.length > 6 && isMobile) {
            thumbnailsContainer.classList.add('many-images');
        } else {
            thumbnailsContainer.classList.remove('many-images');
        }
        
        // Create thumbnails
        imagesToShow.forEach((imagePath, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${imagePath}" alt="Thumbnail ${index + 1}">`;
            thumbnail.addEventListener('click', () => this.showImage(index));
            thumbnailsContainer.appendChild(thumbnail);
        });

        // Show first image
        this.showImage(0);
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Add touch/swipe support for mobile
        if (isMobile) {
            this.addSwipeSupport();
        }
    }

    showImage(index) {
        if (index < 0 || index >= this.currentImages.length) return;

        this.currentImageIndex = index;
        const mainImage = document.getElementById('main-image');
        const currentImageSpan = document.getElementById('current-image');

        // Update main image
        mainImage.src = this.currentImages[index];
        mainImage.style.display = 'block';
        
        // Check if image is portrait oriented and add appropriate styling
        mainImage.onload = () => {
            const aspectRatio = mainImage.naturalWidth / mainImage.naturalHeight;
            const isPortrait = aspectRatio < 0.8; // More vertical than square
            const isMobile = window.innerWidth <= 768;
            
            if (isPortrait && isMobile) {
                mainImage.style.maxHeight = '85%';
                mainImage.style.maxWidth = '90%';
                mainImage.setAttribute('data-orientation', 'portrait');
            } else {
                mainImage.style.maxHeight = '100%';
                mainImage.style.maxWidth = '100%';
                mainImage.removeAttribute('data-orientation');
            }
        };
        
        // Update counter
        currentImageSpan.textContent = index + 1;

        // Update thumbnails
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        // Update navigation buttons
        this.updateNavigationButtons();
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.disabled = this.currentImageIndex <= 0;
        nextBtn.disabled = this.currentImageIndex >= this.currentImages.length - 1;
    }

    prevImage() {
        if (this.currentImageIndex > 0) {
            this.showImage(this.currentImageIndex - 1);
        }
    }

    nextImage() {
        if (this.currentImageIndex < this.currentImages.length - 1) {
            this.showImage(this.currentImageIndex + 1);
        }
    }

    closeModal() {
        if (!this.modal) return;

        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            this.modal.style.display = 'none';
        }, 300);
    }

    addSwipeSupport() {
        const galleryMain = document.querySelector('.gallery-main');
        if (!galleryMain) return;

        let startX = 0;
        let startY = 0;
        let isDragging = false;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;
            
            // Prevent scrolling while swiping
            e.preventDefault();
        };

        const handleTouchEnd = (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Check if it's a horizontal swipe (and not a vertical scroll)
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    // Swipe right - previous image
                    this.prevImage();
                } else {
                    // Swipe left - next image
                    this.nextImage();
                }
            }
            
            isDragging = false;
        };

        // Remove existing listeners
        galleryMain.removeEventListener('touchstart', handleTouchStart);
        galleryMain.removeEventListener('touchmove', handleTouchMove);
        galleryMain.removeEventListener('touchend', handleTouchEnd);

        // Add touch event listeners
        galleryMain.addEventListener('touchstart', handleTouchStart, { passive: true });
        galleryMain.addEventListener('touchmove', handleTouchMove, { passive: false });
        galleryMain.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    getCategoryIcon(category) {
        switch(category) {
            case 'rendering':
                return '🏢';
            case 'padiglioni':
                return '🎪';
            case '3d':
                return '🎨';
            case 'design':
                return '✨';
            case 'wip':
                return '🚧';
            default:
                return '📐';
        }
    }

    showFilterNotification() {
        if (typeof showNotification === 'function') {
            const categoryName = this.getCategoryName(this.currentFilter);
            const message = this.currentFilter === 'all' 
                ? 'Visualizzazione di tutti i progetti'
                : `Filtrato per categoria: ${categoryName}`;
            
            showNotification(message, 'success');
        }
    }

    setupIntersectionObserver() {
        if (!window.IntersectionObserver) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.portfolioItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Public methods for external use
    addProject(projectData) {
        portfolioData.push({
            id: portfolioData.length + 1,
            ...projectData
        });
        this.createPortfolioItems();
    }

    removeProject(projectId) {
        const index = portfolioData.findIndex(p => p.id === projectId);
        if (index > -1) {
            portfolioData.splice(index, 1);
            this.createPortfolioItems();
        }
    }

    getFilteredProjects() {
        return this.currentFilter === 'all' 
            ? portfolioData 
            : portfolioData.filter(p => p.category === this.currentFilter);
    }
}

// Initialize Portfolio Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioManager = new PortfolioManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioManager;
}
