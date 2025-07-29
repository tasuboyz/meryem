// Configurazione del sito
const siteConfig = {
    companyName: "StudioDesign",
    email: "info@studiodesign.com",
    phone: "+39 123 456 7890",
    location: "Milano, Italia",
    socialLinks: {
        facebook: "#",
        instagram: "#",
        linkedin: "#",
        twitter: "#"
    }
};

// Importa DynamicPortfolio se disponibile
let portfolioData = [];

// Inizializza portfolio data da cartelle reali se DynamicPortfolio è disponibile
if (typeof DynamicPortfolio !== 'undefined') {
    portfolioData = DynamicPortfolio.init();
} else {
    // Fallback data se DynamicPortfolio non è disponibile
    portfolioData = [
        {
            id: 1,
            title: "Villa Moderna - Rendering Esterno",
            description: "Visualizzazione fotorealistica di villa moderna con piscina e giardino",
            category: "rendering",
            tags: ["Architettura", "Esterno", "Fotorealistico", "Villa"],
            image: "",
            images: [],
            year: "2024",
            status: "Completato",
            details: {
                client: "Studio Architettura XYZ",
                location: "Italia",
                duration: "2 mesi",
                team: "Team Creativo",
                services: ["Modellazione 3D", "Rendering", "Post-produzione"]
            },
            fullDescription: "Progetto di rendering esterno per una villa moderna di lusso. Il progetto include la visualizzazione completa dell'edificio, degli spazi esterni, della piscina e del paesaggio circostante."
        }
    ];
}

// Configurazione animazioni
const animationConfig = {
    duration: 800,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    stagger: 200,
    threshold: 0.1
};

// Categorie portfolio (aggiornate dinamicamente se DynamicPortfolio è disponibile)
let portfolioCategories = {
    all: "Tutti",
    rendering: "Rendering",
    padiglioni: "Padiglioni", 
    "3d": "Modellazione 3D"
};

// Aggiorna categorie se DynamicPortfolio è disponibile
if (typeof DynamicPortfolio !== 'undefined') {
    const dynamicCategories = DynamicPortfolio.getCategories();
    portfolioCategories = {
        all: "Tutti"
    };
    
    // Mappa le categorie dinamiche a quelle del sistema
    dynamicCategories.forEach(cat => {
        if (cat !== 'Tutti') {
            switch(cat) {
                case 'Stands Fieristici':
                    portfolioCategories['padiglioni'] = cat;
                    break;
                case 'Rendering 3D':
                    portfolioCategories['rendering'] = cat;
                    break;
                case 'Work in Progress':
                    portfolioCategories['wip'] = cat;
                    break;
                default:
                    portfolioCategories[cat.toLowerCase().replace(/\s+/g, '-')] = cat;
            }
        }
    });
}

// Messaggi di notifica
const notificationMessages = {
    success: {
        form: "Messaggio inviato con successo! Ti risponderemo presto.",
        filter: "Portfolio filtrato con successo."
    },
    error: {
        form: "Errore nell'invio del messaggio. Riprova più tardi.",
        validation: "Compila tutti i campi obbligatori.",
        email: "Inserisci un indirizzo email valido."
    }
};

// Configurazione particles
const particlesConfig = {
    count: 50,
    speed: 0.5,
    size: {
        min: 2,
        max: 4
    },
    opacity: {
        min: 0.3,
        max: 0.8
    }
};

// Export per uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        siteConfig,
        portfolioData,
        animationConfig,
        portfolioCategories,
        notificationMessages,
        particlesConfig
    };
}
