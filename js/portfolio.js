// ========================================
// Portfolio Manager
// ========================================

class PortfolioManager {
    constructor() {
        this.portfolioGrid = document.getElementById('portfolio-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.modal = document.getElementById('portfolio-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalGallery = document.getElementById('modal-gallery');
        this.modalDescription = document.getElementById('modal-description');
        this.modalDetails = document.getElementById('modal-details');
        this.modalClose = document.getElementById('modal-close');
        this.modalOverlay = document.getElementById('modal-overlay');
        
        this.currentFilter = 'all';
        this.portfolioItems = [];
        this.isModalOpen = false;
        
        this.init();
    }
    
    init() {
        this.createPortfolioItems();
        this.setupEventListeners();
        this.setupLazyLoading();
    }
    
    createPortfolioItems() {
        // Clear existing items
        this.portfolioGrid.innerHTML = '';
        this.portfolioItems = [];
        
        portfolioData.forEach((project, index) => {
            const portfolioItem = this.createPortfolioItem(project, index);
            this.portfolioGrid.appendChild(portfolioItem);
            this.portfolioItems.push({
                element: portfolioItem,
                data: project,
                category: project.category
            });
        });
        
        // Apply current filter
        this.filterPortfolio(this.currentFilter);
    }
    
    createPortfolioItem(project, index) {
        const item = document.createElement('div');
        item.className = `portfolio-item fade-in`;
        item.setAttribute('data-category', project.category);
        item.setAttribute('data-project-id', project.id);
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.innerHTML = `
            <div class="portfolio-image">
                <img src="${project.coverImage}" 
                     alt="${project.title}"
                     loading="lazy"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltbWFnaW5lIG5vbiBkaXNwb25pYmlsZTwvdGV4dD48L3N2Zz4='">
                <div class="portfolio-overlay">
                    <div class="portfolio-overlay-content">
                        <h4>Visualizza Progetto</h4>
                        <p>Clicca per vedere i dettagli</p>
                    </div>
                </div>
            </div>
            <div class="portfolio-content">
                <div class="portfolio-category">${this.getCategoryLabel(project.category)}</div>
                <h3 class="portfolio-title">${project.title}</h3>
                <p class="portfolio-description">${this.truncateText(project.description, 120)}</p>
            </div>
        `;
        
        // Add click event
        item.addEventListener('click', () => this.openModal(project));
        
        return item;
    }
    
    setupEventListeners() {
        // Filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.setActiveFilter(filter);
                this.filterPortfolio(filter);
            });
        });
        
        // Modal events
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modalOverlay.addEventListener('click', () => this.closeModal());
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen) {
                this.closeModal();
            }
        });
        
        // Prevent modal close when clicking inside modal content
        document.querySelector('.modal-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            const images = this.portfolioGrid.querySelectorAll('img');
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    setActiveFilter(filter) {
        this.currentFilter = filter;
        
        // Update button states
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-filter') === filter) {
                button.classList.add('active');
            }
        });
    }
    
    filterPortfolio(filter) {
        this.portfolioItems.forEach((item, index) => {
            const shouldShow = filter === 'all' || item.category === filter;
            
            if (shouldShow) {
                item.element.style.display = 'block';
                item.element.style.animationDelay = `${index * 0.05}s`;
                item.element.classList.add('visible');
            } else {
                item.element.style.display = 'none';
                item.element.classList.remove('visible');
            }
        });
        
        // Trigger layout recalculation for smooth animation
        requestAnimationFrame(() => {
            this.portfolioGrid.style.height = 'auto';
        });
    }
    
    openModal(project) {
        this.isModalOpen = true;
        this.populateModal(project);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate modal appearance
        requestAnimationFrame(() => {
            this.modal.style.opacity = '1';
        });
    }
    
    closeModal() {
        this.isModalOpen = false;
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear modal content after animation
        setTimeout(() => {
            this.clearModal();
        }, 300);
    }
    
    populateModal(project) {
        // Set title
        this.modalTitle.textContent = project.title;
        
        // Set description
        this.modalDescription.textContent = project.description;
        
        // Create gallery
        this.modalGallery.innerHTML = '';
        project.images.forEach((imagePath, index) => {
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `${project.title} - Immagine ${index + 1}`;
            img.loading = 'lazy';
            img.onerror = function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltbWFnaW5lIG5vbiBkaXNwb25pYmlsZTwvdGV4dD48L3N2Zz4=';
            };
            
            // Add click event for full-size view
            img.addEventListener('click', () => this.openImageFullscreen(imagePath, project.title));
            
            this.modalGallery.appendChild(img);
        });
        
        // Create details
        this.modalDetails.innerHTML = '';
        
        // Basic project info
        const basicInfo = [
            { label: 'Anno', value: project.year },
            { label: 'Cliente', value: project.client },
            { label: 'Ubicazione', value: project.location },
            { label: 'Categoria', value: this.getCategoryLabel(project.category) }
        ];
        
        basicInfo.forEach(info => {
            if (info.value && info.value !== 'N/A') {
                const detailItem = document.createElement('div');
                detailItem.className = 'detail-item';
                detailItem.innerHTML = `
                    <h4>${info.label}</h4>
                    <p>${info.value}</p>
                `;
                this.modalDetails.appendChild(detailItem);
            }
        });
        
        // Project-specific details
        if (project.details) {
            Object.entries(project.details).forEach(([key, value]) => {
                const detailItem = document.createElement('div');
                detailItem.className = 'detail-item';
                
                const label = this.formatDetailLabel(key);
                const formattedValue = Array.isArray(value) ? value.join(', ') : value;
                
                detailItem.innerHTML = `
                    <h4>${label}</h4>
                    <p>${formattedValue}</p>
                `;
                this.modalDetails.appendChild(detailItem);
            });
        }
    }
    
    clearModal() {
        this.modalTitle.textContent = '';
        this.modalDescription.textContent = '';
        this.modalGallery.innerHTML = '';
        this.modalDetails.innerHTML = '';
    }
    
    openImageFullscreen(imagePath, title) {
        // Create fullscreen overlay
        const fullscreenOverlay = document.createElement('div');
        fullscreenOverlay.className = 'fullscreen-image-overlay';
        fullscreenOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: zoom-out;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const fullscreenImage = document.createElement('img');
        fullscreenImage.src = imagePath;
        fullscreenImage.alt = title;
        fullscreenImage.style.cssText = `
            max-width: 95%;
            max-height: 95%;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;
        
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s ease;
        `;
        
        closeButton.onmouseover = () => closeButton.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        closeButton.onmouseout = () => closeButton.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        
        fullscreenOverlay.appendChild(fullscreenImage);
        fullscreenOverlay.appendChild(closeButton);
        document.body.appendChild(fullscreenOverlay);
        
        // Animate appearance
        requestAnimationFrame(() => {
            fullscreenOverlay.style.opacity = '1';
        });
        
        // Close events
        const closeFullscreen = () => {
            fullscreenOverlay.style.opacity = '0';
            setTimeout(() => {
                if (fullscreenOverlay.parentNode) {
                    fullscreenOverlay.parentNode.removeChild(fullscreenOverlay);
                }
            }, 300);
        };
        
        fullscreenOverlay.addEventListener('click', closeFullscreen);
        closeButton.addEventListener('click', closeFullscreen);
        
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeFullscreen();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }
    
    getCategoryLabel(category) {
        const labels = {
            'fiere': 'Fiere & Eventi',
            'render': 'Rendering 3D',
            'sviluppo': 'In Sviluppo',
            'architettura': 'Architettura'
        };
        return labels[category] || category;
    }
    
    formatDetailLabel(key) {
        const labels = {
            'superficie': 'Superficie',
            'tipologia': 'Tipologia',
            'settore': 'Settore',
            'servizi': 'Servizi',
            'software': 'Software',
            'risoluzione': 'Risoluzione',
            'focus': 'Focus',
            'stile': 'Stile',
            'stato': 'Stato',
            'fase': 'Fase'
        };
        return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
    }
    
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }
    
    // Public methods
    addProject(projectData) {
        portfolioData.push(projectData);
        this.createPortfolioItems();
    }
    
    removeProject(projectId) {
        const index = portfolioData.findIndex(project => project.id === projectId);
        if (index > -1) {
            portfolioData.splice(index, 1);
            this.createPortfolioItems();
        }
    }
    
    updateProject(projectId, updatedData) {
        const index = portfolioData.findIndex(project => project.id === projectId);
        if (index > -1) {
            portfolioData[index] = { ...portfolioData[index], ...updatedData };
            this.createPortfolioItems();
        }
    }
    
    getProjectById(projectId) {
        return portfolioData.find(project => project.id === projectId);
    }
    
    getCurrentFilter() {
        return this.currentFilter;
    }
    
    getVisibleProjects() {
        if (this.currentFilter === 'all') {
            return portfolioData;
        }
        return portfolioData.filter(project => project.category === this.currentFilter);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioManager;
}
