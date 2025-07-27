// Gestione Portfolio
class PortfolioManager {
    constructor() {
        this.currentFilter = 'all';
        this.portfolioGrid = document.getElementById('portfolio-grid');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.modal = document.getElementById('portfolio-modal');
        
        this.init();
    }

    init() {
        this.renderPortfolioItems();
        this.setupFilterButtons();
        this.setupModal();
    }

    renderPortfolioItems() {
        if (!this.portfolioGrid) return;

        this.portfolioGrid.innerHTML = '';

        portfolioData.forEach(item => {
            const portfolioItem = this.createPortfolioItem(item);
            this.portfolioGrid.appendChild(portfolioItem);
        });
    }

    createPortfolioItem(item) {
        const article = document.createElement('article');
        article.className = `portfolio-item ${item.category}`;
        article.setAttribute('data-category', item.category);
        article.setAttribute('data-id', item.id);

        article.innerHTML = `
            <div class="portfolio-image">
                <div class="placeholder-image">
                    <i class="fas fa-image"></i>
                    <p>Immagine Progetto</p>
                </div>
                <div class="portfolio-overlay">
                    <i class="fas fa-eye"></i>
                </div>
            </div>
            <div class="portfolio-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="portfolio-tags">
                    ${item.tags.map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        // Aggiungi event listener per aprire modal
        article.addEventListener('click', () => this.openModal(item));

        return article;
    }

    setupFilterButtons() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Rimuovi active da tutti i bottoni
                this.filterBtns.forEach(b => b.classList.remove('active'));
                
                // Aggiungi active al bottone cliccato
                btn.classList.add('active');
                
                // Ottieni categoria filtro
                const filter = btn.getAttribute('data-filter');
                this.filterPortfolio(filter);
            });
        });
    }

    filterPortfolio(category) {
        this.currentFilter = category;
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.classList.add('hidden');
            }
        });
    }

    setupModal() {
        if (!this.modal) return;

        const closeBtn = this.modal.querySelector('.modal-close');
        
        // Chiudi modal cliccando la X
        closeBtn.addEventListener('click', () => this.closeModal());
        
        // Chiudi modal cliccando fuori dal contenuto
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Chiudi modal con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    openModal(item) {
        if (!this.modal) return;

        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalTags = document.getElementById('modal-tags');

        // Imposta contenuto modal (per ora placeholder)
        modalImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0zNTAgMTcwSDQ1MFYyMzBIMzUwVjE3MFoiIGZpbGw9IiM3RjhDOEQiLz4KPHN2ZyBpZD0iY2FtZXJhIiBzdHJva2U9IiM3RjhDOEQiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGhlaWdodD0iNDAiIHdpZHRoPSI0MCI+PHBhdGggZD0ibTkgMTMgMyAzTDIyIDdsMC0zLTMgMEwxMCA5IDkgMTN6bTAtMTNMMSA5IDkgMTNsMy0zTDIyIDdsMC0zLTMgMEwxMCA5IDkgMTN6bTAtMTNMMSA5IDkgMTNsMy0zTDIyIDdsMC0zLTMgMEwxMCA5IDkgMTN6Ii8+PC9zdmc+';
        modalImage.alt = item.title;
        modalTitle.textContent = item.title;
        modalDescription.textContent = item.fullDescription;
        modalTags.innerHTML = item.tags.map(tag => 
            `<span class="portfolio-tag">${tag}</span>`
        ).join('');

        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Metodo per aggiungere nuovi progetti (per uso futuro)
    addProject(projectData) {
        portfolioData.push({
            id: portfolioData.length + 1,
            ...projectData
        });
        this.renderPortfolioItems();
    }

    // Metodo per rimuovere progetti (per uso futuro)
    removeProject(projectId) {
        const index = portfolioData.findIndex(item => item.id === projectId);
        if (index > -1) {
            portfolioData.splice(index, 1);
            this.renderPortfolioItems();
        }
    }
}

// Inizializza il portfolio manager quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();
});
