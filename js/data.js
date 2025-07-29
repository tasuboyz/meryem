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

// Dati portfolio demo
const portfolioData = [
    {
        id: 1,
        title: "Villa Moderna - Rendering Esterno",
        description: "Visualizzazione fotorealistica di villa moderna con piscina e giardino",
        category: "rendering",
        tags: ["Architettura", "Esterno", "Fotorealistico", "Villa"],
        image: "",
        fullDescription: "Progetto di rendering esterno per una villa moderna di lusso situata in Costa Smeralda. Il progetto include la visualizzazione completa dell'edificio, degli spazi esterni, della piscina infinity e del paesaggio circostante. Particolare attenzione è stata dedicata all'illuminazione naturale e ai materiali utilizzati per creare un risultato fotorealistico che cattura l'essenza del design architettonico contemporaneo.",
        client: "Studio Architettura XYZ",
        year: "2024",
        software: ["3ds Max", "V-Ray", "Photoshop"]
    },
    {
        id: 2,
        title: "Appartamento di Lusso - Interni",
        description: "Rendering d'interni per appartamento di lusso nel centro di Milano",
        category: "rendering",
        tags: ["Interni", "Lusso", "Design", "Milano"],
        image: "",
        fullDescription: "Progetto di interior design per un appartamento di 200mq nel quadrilatero della moda di Milano. Il rendering comprende soggiorno, cucina, camera da letto master e bagno principale. Lo stile contemporaneo si fonde con elementi classici per creare un ambiente sofisticato e accogliente. Utilizzo di materiali pregiati come marmo Calacatta, parquet in noce americano e complementi d'arredo di design italiano.",
        client: "Interior Design Studio ABC",
        year: "2024",
        software: ["3ds Max", "Corona Renderer", "Photoshop"]
    },
    {
        id: 3,
        title: "Padiglione Fieristico Tech Expo",
        description: "Stand espositivo innovativo per fiera tecnologica internazionale",
        category: "padiglioni",
        tags: ["Stand", "Tecnologia", "Innovativo", "Fiera"],
        image: "",
        fullDescription: "Progettazione e visualizzazione di un padiglione espositivo di 500mq per azienda leader nel settore tecnologico. Il design si caratterizza per l'uso di LED wall, strutture cinetiche e installazioni interattive. L'obiettivo era creare un'esperienza immersiva che comunicasse i valori di innovazione e futuro dell'azienda. Il padiglione include aree demo, spazi meeting e una zona lounge per i visitatori VIP.",
        client: "TechCorp International",
        year: "2023",
        software: ["SketchUp", "Lumion", "AutoCAD"]
    },
    {
        id: 4,
        title: "Centro Commerciale - Concept",
        description: "Visualizzazione architettonica per nuovo centro commerciale",
        category: "rendering",
        tags: ["Commerciale", "Architettura", "Concept", "Urbano"],
        image: "",
        fullDescription: "Rendering architettonico per un nuovo centro commerciale di 50.000mq che ridefinisce il concetto di shopping experience. Il progetto integra spazi commerciali, aree ristorazione, cinema multisala e spazi verdi. La facciata dinamica e gli interni luminosi creano un ambiente accogliente e moderno. Particolare attenzione è stata data alla sostenibilità ambientale e all'efficienza energetica dell'edificio.",
        client: "Retail Development Group",
        year: "2024",
        software: ["Rhino", "V-Ray", "Photoshop"]
    },
    {
        id: 5,
        title: "Padiglione Automotive Show",
        description: "Stand per salone dell'automobile con design futuristico",
        category: "padiglioni",
        tags: ["Automotive", "Futuristico", "Stand", "Design"],
        image: "",
        fullDescription: "Progetto per stand espositivo di casa automobilistica premium al Salone di Ginevra. Il design si ispira alle linee aerodinamiche delle auto sportive del brand. Utilizzo di materiali high-tech come carbonio, alluminio spazzolato e vetro strutturale. Il padiglione include una piattaforma rotante per l'auto principale, simulatori di guida e una area VIP con vista panoramica sul salone.",
        client: "Premium Auto Brand",
        year: "2023",
        software: ["3ds Max", "V-Ray", "After Effects"]
    },
    {
        id: 6,
        title: "Modello 3D Prodotto Design",
        description: "Modellazione e rendering di prodotto industriale innovativo",
        category: "3d",
        tags: ["Prodotto", "Industriale", "Modellazione", "Innovativo"],
        image: "",
        fullDescription: "Modellazione 3D dettagliata di dispositivo IoT per smart home. Il progetto include la creazione del modello tridimensionale completo, texturing fotorealistico e rendering per catalogo prodotto. Particolare attenzione ai dettagli costruttivi, alle finiture superficiali e all'integrazione con l'ambiente domestico. Il modello è stato utilizzato per prototipazione virtuale e marketing pre-lancio.",
        client: "Smart Home Tech",
        year: "2024",
        software: ["Fusion 360", "KeyShot", "Photoshop"]
    },
    {
        id: 7,
        title: "Ristorante Gourmet - Interni",
        description: "Rendering d'interni per ristorante stellato in centro storico",
        category: "rendering",
        tags: ["Ristorante", "Gourmet", "Interni", "Elegante"],
        image: "",
        fullDescription: "Progetto di interior design per ristorante gourmet in palazzo storico del XVI secolo. Il design contemporaneo rispetta l'architettura originale integrando elementi moderni con dettagli storici. Illuminazione scenografica, arredi su misura e materiali pregiati creano un'atmosfera intima ed elegante. Il progetto include sala principale, cucina a vista, cantina dei vini e terrazza panoramica.",
        client: "Chef Michelin Restaurant",
        year: "2023",
        software: ["3ds Max", "Corona Renderer", "Photoshop"]
    },
    {
        id: 8,
        title: "Padiglione Museale Interattivo",
        description: "Allestimento espositivo per mostra d'arte contemporanea",
        category: "padiglioni",
        tags: ["Museo", "Arte", "Interattivo", "Cultura"],
        image: "",
        fullDescription: "Progettazione di allestimento espositivo per mostra temporanea di arte contemporanea. Il concept si basa sull'interazione tra visitatore e opera d'arte attraverso tecnologie immersive. Percorsi dinamici, illuminazione adattiva e installazioni multimediali guidano il visitatore in un'esperienza unica. L'allestimento è modulare e riconfigurabili per diverse tipologie di esposizioni.",
        client: "Museo Arte Moderna",
        year: "2024",
        software: ["SketchUp", "Lumion", "TouchDesigner"]
    },
    {
        id: 9,
        title: "Uffici Corporate - Headquarters",
        description: "Rendering per nuova sede aziendale con spazi flessibili",
        category: "rendering",
        tags: ["Uffici", "Corporate", "Moderno", "Flessibile"],
        image: "",
        fullDescription: "Visualizzazione architettonica per nuova sede corporate di multinazionale tecnologica. Il progetto prevede spazi di lavoro flessibili, aree collaborative, zone relax e auditorium. Design biophilico con ampie vetrate, giardini verticali e materiali naturali per il benessere dei dipendenti. Integrazione di tecnologie smart building per gestione automatizzata di illuminazione, climatizzazione e sicurezza.",
        client: "Global Tech Corporation",
        year: "2024",
        software: ["Revit", "Enscape", "Photoshop"]
    }
];

// Configurazione animazioni
const animationConfig = {
    duration: 800,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    stagger: 200,
    threshold: 0.1
};

// Categorie portfolio
const portfolioCategories = {
    all: "Tutti",
    rendering: "Rendering",
    padiglioni: "Padiglioni", 
    "3d": "Modellazione 3D"
};

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
