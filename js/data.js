// ========================================
// Site Configuration & Data
// ========================================

const siteConfig = {
    title: 'StudioDesign',
    description: 'Portfolio professionale di design architettonico e rendering 3D',
    author: 'StudioDesign',
    contact: {
        email: 'info@studiodesign.it',
        phone: '+39 XXX XXX XXXX',
        location: 'Italia'
    },
    social: {
        linkedin: '#',
        instagram: '#',
        behance: '#'
    }
};

// Portfolio Data
const portfolioData = [
    {
        id: 'fiera-medica-2024',
        title: 'Padiglione Fiera Medica Düsseldorf 2024',
        category: 'fiere',
        description: 'Progettazione completa di un padiglione espositivo per la fiera medica internazionale di Düsseldorf. Il design combina funzionalità e estetica moderna per creare un ambiente accogliente e professionale.',
        images: [
            '2024 per TGS fiera MEDICA A DUSSELDORF/Immagine WhatsApp 2025-07-27 ore 13.26.16_5f3b06d9.jpg',
            '2024 per TGS fiera MEDICA A DUSSELDORF/Immagine WhatsApp 2025-07-27 ore 13.27.27_dc646595.jpg',
            '2024 per TGS fiera MEDICA A DUSSELDORF/Immagine WhatsApp 2025-07-27 ore 13.27.38_ab90a085.jpg',
            '2024 per TGS fiera MEDICA A DUSSELDORF/Immagine WhatsApp 2025-07-27 ore 13.30.01_9d77ef16.jpg',
            '2024 per TGS fiera MEDICA A DUSSELDORF/Immagine WhatsApp 2025-07-27 ore 13.30.30_cd9561ed.jpg',
            '2024 per TGS fiera MEDICA A DUSSELDORF/Immagine WhatsApp 2025-07-27 ore 13.31.04_8e4bad07.jpg'
        ],
        coverImage: '2024 per TGS fiera MEDICA A DUSSELDORF/Immagine WhatsApp 2025-07-27 ore 13.26.16_5f3b06d9.jpg',
        year: '2024',
        client: 'TGS',
        location: 'Düsseldorf, Germania',
        details: {
            superficie: '120 mq',
            tipologia: 'Padiglione Espositivo',
            settore: 'Medicale',
            servizi: ['Concept Design', 'Progettazione Tecnica', 'Rendering 3D', 'Supervisione Realizzazione']
        }
    },
    {
        id: 'rendering-architettonici',
        title: 'Rendering Architettonici Professionali',
        category: 'render',
        description: 'Collezione di rendering architettonici fotorealistici che mostrano la nostra capacità di trasformare progetti tecnici in visualizzazioni emozionali e coinvolgenti.',
        images: [
            'realizzazione render/Immagine WhatsApp 2025-07-27 ore 13.34.47_285ff1e3.jpg',
            'realizzazione render/Immagine WhatsApp 2025-07-27 ore 13.34.49_00c94580.jpg',
            'realizzazione render/Immagine WhatsApp 2025-07-27 ore 13.34.49_119bfddd.jpg',
            'realizzazione render/Immagine WhatsApp 2025-07-27 ore 13.34.49_155e1a6a.jpg',
            'realizzazione render/Immagine WhatsApp 2025-07-27 ore 13.34.49_16ff8519.jpg',
            'realizzazione render/Immagine WhatsApp 2025-07-27 ore 13.34.49_20955247.jpg'
        ],
        coverImage: 'realizzazione render/Immagine WhatsApp 2025-07-27 ore 13.34.47_285ff1e3.jpg',
        year: '2024-2025',
        client: 'Vari Clienti',
        location: 'Italia',
        details: {
            tipologia: 'Rendering Architettonici',
            software: '3D Studio Max, V-Ray, Photoshop',
            risoluzione: '4K - 8K',
            servizi: ['Modellazione 3D', 'Texturing', 'Lighting', 'Post-produzione']
        }
    },
    {
        id: 'rendering-serie-2',
        title: 'Portfolio Rendering - Serie 2',
        category: 'render',
        description: 'Seconda serie di rendering architettonici che esplorano diverse tipologie progettuali, dall\'architettura residenziale a quella commerciale.',
        images: [
            'realizzazione render 2/Immagine WhatsApp 2025-07-27 ore 13.44.20_2f4ce8d2.jpg',
            'realizzazione render 2/Immagine WhatsApp 2025-07-27 ore 13.44.21_0e33c81a.jpg',
            'realizzazione render 2/Immagine WhatsApp 2025-07-27 ore 13.44.21_204f0235.jpg',
            'realizzazione render 2/Immagine WhatsApp 2025-07-27 ore 13.44.21_eb6988b9.jpg',
            'realizzazione render 2/Immagine WhatsApp 2025-07-27 ore 13.44.22_415509d8.jpg'
        ],
        coverImage: 'realizzazione render 2/Immagine WhatsApp 2025-07-27 ore 13.44.20_2f4ce8d2.jpg',
        year: '2024-2025',
        client: 'Vari Clienti',
        location: 'Italia',
        details: {
            tipologia: 'Rendering Architettonici',
            focus: 'Architettura Residenziale e Commerciale',
            stile: 'Fotorealismo',
            servizi: ['Concept Visual', 'Rendering Finali', 'Animazioni 3D']
        }
    },
    {
        id: 'progetti-sviluppo',
        title: 'Progetti in Fase di Realizzazione',
        category: 'sviluppo',
        description: 'Progetti attualmente in fase di sviluppo che mostrano il nostro processo creativo dalla progettazione iniziale alla realizzazione finale.',
        images: [
            'in fase di realizzazione/Immagine WhatsApp 2025-07-27 ore 13.37.23_7e0c8fdb.jpg',
            'in fase di realizzazione/Immagine WhatsApp 2025-07-27 ore 13.37.23_d9baec3f.jpg',
            'in fase di realizzazione/Immagine WhatsApp 2025-07-27 ore 13.37.23_e9e31ad5.jpg',
            'in fase di realizzazione/Immagine WhatsApp 2025-07-27 ore 13.37.23_ee9cc75f.jpg',
            'in fase di realizzazione/Immagine WhatsApp 2025-07-27 ore 13.37.24_36f6da97.jpg',
            'in fase di realizzazione/Immagine WhatsApp 2025-07-27 ore 13.37.24_5a482ca8.jpg'
        ],
        coverImage: 'in fase di realizzazione/Immagine WhatsApp 2025-07-27 ore 13.37.23_7e0c8fdb.jpg',
        year: '2025',
        client: 'In Sviluppo',
        location: 'Varie',
        details: {
            stato: 'In Corso di Realizzazione',
            tipologia: 'Progetti Misti',
            fase: 'Sviluppo e Costruzione',
            servizi: ['Progettazione', 'Direzione Lavori', 'Consulenza Tecnica']
        }
    }
];

// Particles Configuration
const particlesConfig = {
    count: 50,
    size: {
        min: 2,
        max: 6
    },
    speed: {
        min: 0.5,
        max: 2
    },
    opacity: {
        min: 0.1,
        max: 0.3
    }
};

// Animation Configuration
const animationConfig = {
    observerOptions: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    },
    staggerDelay: 100, // milliseconds
    transitionDuration: 800 // milliseconds
};

// Form Validation Rules
const validationRules = {
    name: {
        required: true,
        minLength: 2,
        message: 'Il nome deve contenere almeno 2 caratteri'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Inserisci un indirizzo email valido'
    },
    subject: {
        required: true,
        minLength: 5,
        message: 'L\'oggetto deve contenere almeno 5 caratteri'
    },
    message: {
        required: true,
        minLength: 20,
        message: 'Il messaggio deve contenere almeno 20 caratteri'
    }
};

// Export for module usage (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        siteConfig,
        portfolioData,
        particlesConfig,
        animationConfig,
        validationRules
    };
}
