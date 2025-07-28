// Portfolio Manager
class PortfolioManager {
    constructor() {
        this.portfolioGrid = document.getElementById('portfolio-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.modal = document.getElementById('portfolio-modal');
        this.modalOverlay = this.modal?.querySelector('.modal-overlay');
        this.modalClose = this.modal?.querySelector('.modal-close');
        this.currentFilter = 'all';
        this.portfolioItems = [];
        
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
        let categoryIcon = '';
        switch(item.category) {
            case 'rendering':
                categoryIcon = '🏢';
                break;
            case 'padiglioni':
                categoryIcon = '🎪';
                break;
            case '3d':
                categoryIcon = '🎨';
                break;
            default:
                categoryIcon = '📐';
        }

        card.innerHTML = `
            <div class="portfolio-image">
                <div class="image-placeholder-portfolio">
                    <span class="icon">${categoryIcon}</span>
                    <span class="text">Immagine progetto</span>
                </div>
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
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
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
                this.openModal(itemId);
            }
        });

        // Modal events
        this.modalClose?.addEventListener('click', () => this.closeModal());
        this.modalOverlay?.addEventListener('click', () => this.closeModal());
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
                this.closeModal();
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

    openModal(itemId) {
        const item = portfolioData.find(p => p.id === itemId);
        if (!item || !this.modal) return;

        // Populate modal content
        this.populateModal(item);
        
        // Show modal with animation
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        requestAnimationFrame(() => {
            this.modal.classList.add('active');
        });
    }

    populateModal(item) {
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalCategory = document.getElementById('modal-category');
        const modalDescription = document.getElementById('modal-description');
        const modalTags = document.getElementById('modal-tags');

        // Set placeholder image
        if (modalImage) {
            modalImage.style.display = 'none';
            modalImage.parentElement.innerHTML = `
                <div class="image-placeholder-portfolio" style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--background-dark);">
                    <span class="icon" style="font-size: 64px; margin-bottom: 15px;">${this.getCategoryIcon(item.category)}</span>
                    <span class="text" style="color: var(--text-muted);">Immagine del progetto</span>
                </div>
            `;
        }

        if (modalTitle) modalTitle.textContent = item.title;
        if (modalCategory) modalCategory.textContent = this.getCategoryName(item.category);
        if (modalDescription) modalDescription.textContent = item.fullDescription || item.description;
        
        if (modalTags) {
            modalTags.innerHTML = item.tags.map(tag => 
                `<span class="tag">${tag}</span>`
            ).join('');
        }
    }

    getCategoryIcon(category) {
        switch(category) {
            case 'rendering': return '🏢';
            case 'padiglioni': return '🎪';
            case '3d': return '🎨';
            default: return '📐';
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
