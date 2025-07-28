# Portfolio - Rendering & Padiglioni

Un portfolio professionale moderno per professionisti specializzati in rendering architettonici e progettazione di padiglioni espositivi.

## 🎯 Caratteristiche

- **Design Responsive**: Ottimizzato per tutti i dispositivi (desktop, tablet, mobile)
- **JavaScript Vanilla ES6**: Nessuna dipendenza da framework esterni
- **Modular Architecture**: Codice organizzato in moduli riutilizzabili
- **SEO Friendly**: Struttura HTML semantica e ottimizzata
- **Performance Optimized**: Caricamento veloce e animazioni fluide
- **Portfolio Dinamico**: Sistema di filtri per categorie di progetti
- **Form di Contatto**: Validazione lato client integrata
- **Animazioni Avanzate**: Intersection Observer per animazioni on-scroll

## 🚀 Funzionalità

### Portfolio Interattivo
- **Filtri per Categoria**: Rendering, Padiglioni, Modellazione 3D
- **Modal per Dettagli**: Visualizzazione dettagliata dei progetti
- **Lazy Loading**: Caricamento ottimizzato delle immagini
- **Responsive Grid**: Layout adattivo per tutti i dispositivi

### Navigazione Avanzata
- **Smooth Scrolling**: Navigazione fluida tra le sezioni
- **Active Links**: Evidenziazione automatica della sezione corrente
- **Mobile Menu**: Menu hamburger per dispositivi mobili
- **Scroll Effects**: Navbar dinamica con effetti di scroll

### Sistema di Notifiche
- **Feedback Utente**: Notifiche per azioni completate
- **Validazione Form**: Controlli in tempo reale
- **Auto-dismiss**: Rimozione automatica delle notifiche

## 📁 Struttura del Progetto

```
portfolio/
├── index.html              # Pagina principale
├── css/
│   └── style.css           # Stili principali
├── js/
│   ├── main.js            # Script principale
│   ├── portfolio.js       # Gestione portfolio
│   ├── navigation.js      # Gestione navigazione
│   └── data.js           # Dati demo e configurazione
└── README.md             # Documentazione
```

## 🛠️ Installazione e Setup

1. **Clona o scarica** il progetto nella directory desiderata
2. **Apri index.html** nel browser o configura un server locale
3. **Personalizza** i contenuti modificando i file appropriati

### Setup Server Locale (opzionale)

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server -p 8000

# Con PHP
php -S localhost:8000
```

## 📝 Personalizzazione

### 1. Informazioni Personali
Modifica il file `js/data.js` per aggiornare:
- Informazioni di contatto
- Dati aziendali
- Links social media

```javascript
const siteConfig = {
    companyName: "Il Tuo Nome",
    email: "tua@email.com",
    phone: "+39 xxx xxx xxxx",
    location: "La Tua Città, Italia"
};
```

### 2. Progetti Portfolio
Aggiungi i tuoi progetti nel file `js/data.js`:

```javascript
const portfolioData = [
    {
        id: 1,
        title: "Nome Progetto",
        description: "Descrizione breve",
        category: "rendering", // rendering, padiglioni, 3d
        tags: ["Tag1", "Tag2", "Tag3"],
        image: "path/to/image.jpg",
        fullDescription: "Descrizione completa del progetto..."
    }
];
```

### 3. Immagini
- Sostituisci i placeholder con le tue immagini
- Formati consigliati: JPG, PNG, WebP
- Dimensioni ottimali: 1200x800px per il portfolio

### 4. Colori e Stili
Modifica le variabili CSS in `css/style.css`:

```css
:root {
    --primary-color: #2c3e50;    /* Colore primario */
    --secondary-color: #3498db;  /* Colore secondario */
    --accent-color: #e74c3c;     /* Colore accento */
}
```

## 🔧 Funzionalità Avanzate

### Sistema di Filtri Portfolio
```javascript
// Aggiungere nuova categoria
filterPortfolio('nuova-categoria');

// Aggiungere nuovo progetto
portfolioManager.addProject({
    title: "Nuovo Progetto",
    category: "rendering",
    // ... altri dati
});
```

### Gestione Form Contatto
Il form include validazione completa:
- Controllo campi obbligatori
- Validazione formato email
- Feedback visivo per l'utente
- Prevenzione spam

### Animazioni Performance
- Intersection Observer per animazioni efficienti
- CSS transforms per prestazioni ottimali
- Throttling degli eventi scroll

## 📱 Compatibilità

- **Browser Moderni**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile**: iOS Safari 12+, Android Chrome 60+
- **Responsive**: Tutti i dispositivi da 320px a 2560px

## 🎨 Personalizzazione Avanzata

### Aggiungere Nuove Sezioni
```html
<section id="nuova-sezione" class="nuova-sezione">
    <div class="container">
        <!-- Contenuto sezione -->
    </div>
</section>
```

### Integrazioni Possibili
- **Google Analytics**: Tracking visitatori
- **EmailJS**: Invio email dal form
- **PWA**: Progressive Web App
- **CMS**: Collegamento a sistemi di gestione contenuti

## 🚀 Ottimizzazioni Future

### Planned Features
- [ ] Sistema di gestione contenuti (CMS)
- [ ] Integrazione con servizi email
- [ ] Progressive Web App (PWA)
- [ ] Tema scuro/chiaro
- [ ] Multilingua
- [ ] Ottimizzazione immagini automatica

### Performance
- [ ] Service Worker per caching
- [ ] Image optimization
- [ ] Critical CSS inlining
- [ ] Preload key resources

## 📞 Supporto

Per domande o supporto:
- Controlla la documentazione in questo README
- Verifica la console del browser per eventuali errori
- Testa su diversi dispositivi e browser

## 📄 Licenza

Questo progetto è fornito come template per uso personale e commerciale.

---

**Nota**: Questo è un template demo. Ricorda di sostituire tutti i contenuti placeholder con i tuoi dati reali prima della pubblicazione.
