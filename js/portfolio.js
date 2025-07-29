// Portfolio Manager
class PortfolioManager {
    constructor() {
        this.portfolioGrid = document.getElementById('portfolio-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
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
        let categoryIcon = this.getCategoryIcon(item.category);

        // Gestisci immagini reali se disponibili
        let imageContent = '';
        if (item.image && item.image.trim() !== '') {
            imageContent = `
                <img src="${item.image}" alt="${item.title}" class="portfolio-img" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
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

        // Portfolio items click - solo per mostrare info basilari
        this.portfolioGrid?.addEventListener('click', (e) => {
            const portfolioItem = e.target.closest('.portfolio-item');
            if (portfolioItem) {
                const itemId = parseInt(portfolioItem.dataset.id);
                this.showProjectInfo(itemId);
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

    showProjectInfo(itemId) {
        const item = portfolioData.find(p => p.id === itemId);
        if (!item) return;

        // Mostra una notifica con le info del progetto
        if (typeof showNotification === 'function') {
            const info = `${item.title} - ${item.details?.client || 'Cliente'} (${item.year}) - ${item.status}`;
            showNotification(info, 'info');
        } else {
            // Fallback con alert se la funzione di notifica non è disponibile
            alert(`${item.title}\n${item.description}\nCliente: ${item.details?.client || 'N/A'}\nAnno: ${item.year}\nStatus: ${item.status}`);
        }
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
