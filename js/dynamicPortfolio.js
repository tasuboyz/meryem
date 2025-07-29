/**
 * Dynamic Portfolio Data Generator
 * Generates portfolio data from folder structure
 */

class DynamicPortfolio {
    constructor() {
        this.projectFolders = {
            'medica': {
                path: '2024 per TGS fiera MEDICA A DUSSELDORF',
                title: 'TGS Fiera Medica 2024 - Düsseldorf',
                description: 'Design innovativo per stand fieristico nel settore medicale. Progetto realizzato per la prestigiosa fiera di Düsseldorf 2024.',
                category: 'Stands Fieristici',
                year: '2024',
                client: 'TGS Group',
                location: 'Düsseldorf, Germania',
                status: 'Completato'
            },
            'realizzazione': {
                path: 'in fase di realizzazione',
                title: 'Work in Progress',
                description: 'Progetti attualmente in fase di sviluppo e realizzazione. Concept innovativi e soluzioni creative in corso.',
                category: 'Work in Progress',
                year: '2024',
                client: 'Vari Clienti',
                location: 'Italia',
                status: 'In Realizzazione'
            },
            'render': {
                path: 'realizzazione render',
                title: 'Rendering Architettonici',
                description: 'Progetti completati con rendering fotorealistici. Visualizzazioni 3D di alta qualità per presentazioni professionali.',
                category: 'Rendering 3D',
                year: '2024',
                client: 'Clienti Privati',
                location: 'Italia',
                status: 'Completato'
            },
            'render2': {
                path: 'realizzazione render 2',
                title: 'Rendering Collection Vol.2',
                description: 'Seconda collezione di progetti renderizzati. Portfolio avanzato di visualizzazioni architettoniche e design.',
                category: 'Rendering 3D',
                year: '2024',
                client: 'Studi di Architettura',
                location: 'Italia',
                status: 'Completato'
            }
        };

        this.folderImages = {
            '2024 per TGS fiera MEDICA A DUSSELDORF': [
                'Immagine WhatsApp 2025-07-27 ore 13.26.16_5f3b06d9.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.27.27_dc646595.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.27.38_ab90a085.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.30.01_9d77ef16.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.30.30_cd9561ed.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.31.04_8e4bad07.jpg'
            ],
            'in fase di realizzazione': [
                'Immagine WhatsApp 2025-07-27 ore 13.37.23_7e0c8fdb.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.37.23_d9baec3f.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.37.23_e9e31ad5.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.37.23_ee9cc75f.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.37.24_36f6da97.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.37.24_5a482ca8.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.37.24_a8eeedcb.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.37.24_d21cd2c5.jpg'
            ],
            'realizzazione render': [
                'Immagine WhatsApp 2025-07-27 ore 13.34.47_285ff1e3.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.34.49_00c94580.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.34.49_119bfddd.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.34.49_155e1a6a.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.34.49_16ff8519.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.34.49_20955247.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.34.49_3c4e8633.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.34.49_5c5c6e02.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.34.49_9c5c3efd.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.34.49_a04e73e0.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.34.49_a9516611.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.34.49_b49d65fc.jpg'
            ],
            'realizzazione render 2': [
                'Immagine WhatsApp 2025-07-27 ore 13.44.20_2f4ce8d2.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.44.21_0e33c81a.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.44.21_204f0235.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.44.21_eb6988b9.jpg',
                'Immagine WhatsApp 2025-07-27 ore 13.44.22_415509d8.jpg'
            ]
        };
    }

    /**
     * Generates portfolio data from folder structure
     * @returns {Array} Portfolio data array
     */
    generatePortfolioData() {
        const portfolioData = [];
        let id = 1;

        for (const [key, project] of Object.entries(this.projectFolders)) {
            const folderPath = project.path;
            const images = this.folderImages[folderPath] || [];
            
            if (images.length > 0) {
                // Create image paths for the project
                const imagePaths = images.map(imageName => {
                    // URL encode the folder path and image name for proper handling of spaces and special characters
                    const encodedFolder = encodeURIComponent(folderPath);
                    const encodedImage = encodeURIComponent(imageName);
                    return `${encodedFolder}/${encodedImage}`;
                });

                const portfolioItem = {
                    id: id++,
                    title: project.title,
                    category: this.mapCategoryForPortfolio(project.category),
                    image: imagePaths[0], // First image as thumbnail
                    images: imagePaths, // All images for gallery
                    description: project.description,
                    year: project.year,
                    status: project.status,
                    tags: this.getTagsFromCategory(project.category),
                    fullDescription: this.getFullDescription(project),
                    details: {
                        client: project.client,
                        location: project.location,
                        duration: this.getDurationFromCategory(project.category),
                        team: "Team Creativo",
                        services: this.getServicesFromCategory(project.category)
                    }
                };

                portfolioData.push(portfolioItem);
            }
        }

        return portfolioData;
    }

    /**
     * Maps category names to portfolio system categories
     */
    mapCategoryForPortfolio(category) {
        switch (category) {
            case 'Stands Fieristici':
                return 'padiglioni';
            case 'Rendering 3D':
                return 'rendering';
            case 'Work in Progress':
                return 'wip';
            default:
                return category.toLowerCase().replace(/\s+/g, '-');
        }
    }

    /**
     * Gets tags based on category
     */
    getTagsFromCategory(category) {
        switch (category) {
            case 'Stands Fieristici':
                return ['Stand', 'Fiera', 'Design', 'Allestimento'];
            case 'Rendering 3D':
                return ['3D', 'Rendering', 'Visualizzazione', 'Architettura'];
            case 'Work in Progress':
                return ['WIP', 'Sviluppo', 'Progetto', 'Innovativo'];
            default:
                return ['Progetto', 'Design', 'Professionale'];
        }
    }

    /**
     * Generates full description for project
     */
    getFullDescription(project) {
        const baseDescription = project.description;
        const additionalInfo = this.getAdditionalDescriptionInfo(project.category);
        
        return `${baseDescription} ${additionalInfo}`;
    }

    /**
     * Gets additional description info based on category
     */
    getAdditionalDescriptionInfo(category) {
        switch (category) {
            case 'Stands Fieristici':
                return 'Il progetto include progettazione completa, visualizzazione 3D e coordinamento dell\'allestimento. Particolare attenzione è stata dedicata all\'esperienza del visitatore e all\'identità del brand.';
            case 'Rendering 3D':
                return 'Realizzato con tecniche di rendering fotorealistico avanzate. Il progetto comprende modellazione dettagliata, illuminazione studiata e post-produzione professionale.';
            case 'Work in Progress':
                return 'Progetto attualmente in fase di sviluppo. Seguiamo un approccio iterativo con feedback costanti per garantire risultati ottimali.';
            default:
                return 'Progetto realizzato con metodologie professionali e attenzione ai dettagli. Risultato finale di alta qualità e soddisfazione del cliente.';
        }
    }

    /**
     * Gets duration based on category
     */
    getDurationFromCategory(category) {
        switch (category) {
            case 'Stands Fieristici':
                return '3 mesi';
            case 'Rendering 3D':
                return '1-2 mesi';
            case 'Work in Progress':
                return 'In corso';
            default:
                return '1 mese';
        }
    }

    /**
     * Gets services based on category
     */
    getServicesFromCategory(category) {
        switch (category) {
            case 'Stands Fieristici':
                return ['Design Stand', 'Progettazione 3D', 'Allestimento', 'Coordinamento'];
            case 'Rendering 3D':
                return ['Modellazione 3D', 'Rendering', 'Post-produzione', 'Presentazione'];
            case 'Work in Progress':
                return ['Progettazione', 'Sviluppo', 'Revisioni'];
            default:
                return ['Progettazione', 'Realizzazione'];
        }
    }

    /**
     * Gets all available categories
     */
    getCategories() {
        const categories = new Set();
        Object.values(this.projectFolders).forEach(project => {
            categories.add(project.category);
        });
        return ['Tutti', ...Array.from(categories)];
    }

    /**
     * Initialize and return portfolio data
     */
    static init() {
        const generator = new DynamicPortfolio();
        return generator.generatePortfolioData();
    }

    /**
     * Get categories for filter
     */
    static getCategories() {
        const generator = new DynamicPortfolio();
        return generator.getCategories();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DynamicPortfolio;
}
