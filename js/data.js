// Dati demo del portfolio - da sostituire con dati reali
const portfolioData = [
    {
        id: 1,
        title: "Rendering Villa Moderna",
        description: "Visualizzazione fotorealistica di una villa moderna con ampi spazi aperti e design contemporaneo.",
        category: "rendering",
        tags: ["Architettura", "Esterno", "Fotorealismo"],
        image: "placeholder", // Sostituire con path immagine reale
        fullDescription: "Progetto di rendering per una villa moderna di 300mq, caratterizzata da linee pulite e grandi vetrate. Il lavoro ha incluso la modellazione completa della struttura, l'illuminazione naturale e artificiale, e la post-produzione per ottenere un risultato fotorealistico."
    },
    {
        id: 2,
        title: "Padiglione Fieristico Tech",
        description: "Design e visualizzazione di un padiglione espositivo per fiera tecnologica internazionale.",
        category: "padiglioni",
        tags: ["Fieristico", "Design", "Tecnologia"],
        image: "placeholder",
        fullDescription: "Progettazione completa di un padiglione espositivo di 500mq per una fiera tecnologica. Il design include zone interattive, spazi di presentazione e aree meeting, con un approccio moderno e tecnologico."
    },
    {
        id: 3,
        title: "Modello 3D Complesso Residenziale",
        description: "Modellazione dettagliata di un complesso residenziale con spazi comuni e aree verdi.",
        category: "3d",
        tags: ["Modellazione", "Residenziale", "Urbanistica"],
        image: "placeholder",
        fullDescription: "Modellazione 3D completa di un complesso residenziale composto da 4 edifici, complete di interni, spazi comuni, parcheggi e aree verdi. Il modello è stato utilizzato per presentazioni commerciali e autorizzazioni urbanistiche."
    },
    {
        id: 4,
        title: "Rendering Interni Ufficio",
        description: "Visualizzazione di spazi ufficio moderni con soluzioni innovative per il coworking.",
        category: "rendering",
        tags: ["Interni", "Ufficio", "Coworking"],
        image: "placeholder",
        fullDescription: "Rendering di interni per un ufficio di 800mq con soluzioni innovative per il coworking. Il progetto include zone di lavoro flessibili, sale riunioni, aree relax e spazi comuni, con particolare attenzione all'illuminazione e ai materiali."
    },
    {
        id: 5,
        title: "Stand Espositivo Automotive",
        description: "Progettazione di stand espositivo per presentazione di veicoli di lusso.",
        category: "padiglioni",
        tags: ["Automotive", "Lusso", "Espositivo"],
        image: "placeholder",
        fullDescription: "Design e visualizzazione di uno stand espositivo per il settore automotive di lusso. Lo stand include podium per veicoli, area VIP, spazi di presentazione multimediale e zone di intrattenimento clienti."
    },
    {
        id: 6,
        title: "Rendering Architettonico Ospedale",
        description: "Visualizzazione di una nuova ala ospedaliera con focus su funzionalità e comfort.",
        category: "rendering",
        tags: ["Sanità", "Architettura", "Pubblico"],
        image: "placeholder",
        fullDescription: "Rendering architettonico per una nuova ala ospedaliera di 2000mq. Il progetto ha richiesto particolare attenzione alle normative sanitarie, alla funzionalità degli spazi e al comfort dei pazienti, con visualizzazioni sia degli esterni che degli interni."
    },
    {
        id: 7,
        title: "Modello 3D Centro Commerciale",
        description: "Modellazione completa di centro commerciale con gallerie, negozi e aree di servizio.",
        category: "3d",
        tags: ["Commerciale", "Retail", "Complesso"],
        image: "placeholder",
        fullDescription: "Modellazione 3D di un centro commerciale su tre livelli con oltre 100 negozi, food court, cinema multisala e parcheggi. Il modello include tutti i dettagli architettonici e gli arredi per le visualizzazioni di marketing."
    },
    {
        id: 8,
        title: "Padiglione Culturale Museo",
        description: "Design di padiglione temporaneo per esposizioni museali itineranti.",
        category: "padiglioni",
        tags: ["Cultura", "Museo", "Temporaneo"],
        image: "placeholder",
        fullDescription: "Progettazione di un padiglione culturale modulare per esposizioni museali itineranti. La struttura è progettata per essere facilmente assemblabile e trasportabile, con sistemi di illuminazione e climatizzazione integrati."
    }
];

// Configurazione del sito
const siteConfig = {
    companyName: "Portfolio",
    tagline: "Rendering & Padiglioni",
    email: "info@portfolio.com",
    phone: "+39 123 456 7890",
    location: "Milano, Italia",
    social: {
        instagram: "#",
        linkedin: "#",
        behance: "#"
    }
};

// Esportazione per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { portfolioData, siteConfig };
}
