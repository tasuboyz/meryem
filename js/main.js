// Script principale per il portfolio
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactForm();
        this.setupIntersectionObserver();
        this.setupScrollToTop();
        this.loadSiteData();
    }

    // Gestione form di contatto
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm(contactForm);
        });
    }

    handleContactForm(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validazione base
        if (!this.validateContactForm(data)) {
            this.showNotification('Per favore compila tutti i campi.', 'error');
            return;
        }

        // Invio email tramite EmailJS
        this.sendEmailJS(data, form);
    }

    sendEmailJS(data, form) {
        // Sostituisci con i tuoi parametri EmailJS
        const serviceID = 'service_84fbmlh'; // Service ID fornito
        const templateID = 'template_4ayzqcf';

        // Mostra loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Invio in corso...';
        submitBtn.disabled = true;

        emailjs.send(serviceID, templateID, {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message
        })
        .then(() => {
            this.showNotification('Messaggio inviato con successo! Ti risponderò presto.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        })
        .catch((error) => {
            this.showNotification('Errore nell\'invio. Riprova più tardi.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            console.error('EmailJS error:', error);
        });
    }

    validateContactForm(data) {
        return data.name && data.email && data.subject && data.message && 
               this.isValidEmail(data.email);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    simulateEmailSending(data) {
        // Mostra loading
        const submitBtn = document.querySelector('#contact-form button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Invio in corso...';
        submitBtn.disabled = true;

        // Simula delay di invio
        setTimeout(() => {
            this.showNotification('Messaggio inviato con successo! Ti risponderò presto.', 'success');
            document.getElementById('contact-form').reset();
            
            // Ripristina pulsante
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Crea elemento notifica
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Aggiungi stili inline per la notifica
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            max-width: 400px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            animation: slideInNotification 0.3s ease;
            ${type === 'success' ? 'background: #27ae60;' : ''}
            ${type === 'error' ? 'background: #e74c3c;' : ''}
            ${type === 'info' ? 'background: #3498db;' : ''}
        `;

        // Aggiungi stili per il pulsante di chiusura
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        `;

        document.body.appendChild(notification);

        // Gestisci chiusura
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        // Auto-rimozione dopo 5 secondi
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Intersection Observer per animazioni
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Osserva elementi che devono essere animati
        const animateElements = document.querySelectorAll(
            '.service-card, .portfolio-item, .skill-item, .contact-item'
        );

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Aggiungi stili per l'animazione
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            @keyframes slideInNotification {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Scroll to top functionality
    setupScrollToTop() {
        // Crea pulsante scroll to top
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.setAttribute('aria-label', 'Torna in cima');
        
        // Stili per il pulsante
        scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
        `;

        document.body.appendChild(scrollTopBtn);

        // Mostra/nascondi pulsante in base allo scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        });

        // Gestisci click
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        scrollTopBtn.addEventListener('mouseenter', () => {
            scrollTopBtn.style.transform = 'scale(1.1)';
        });

        scrollTopBtn.addEventListener('mouseleave', () => {
            scrollTopBtn.style.transform = 'scale(1)';
        });
    }

    // Carica dati del sito dalla configurazione
    loadSiteData() {
        if (typeof siteConfig !== 'undefined') {
            // Aggiorna titoli e informazioni di contatto
            document.title = `${siteConfig.companyName} - ${siteConfig.tagline}`;
            
            // Aggiorna informazioni di contatto
            const emailElements = document.querySelectorAll('[data-email]');
            emailElements.forEach(el => el.textContent = siteConfig.email);
            
            const phoneElements = document.querySelectorAll('[data-phone]');
            phoneElements.forEach(el => el.textContent = siteConfig.phone);
            
            const locationElements = document.querySelectorAll('[data-location]');
            locationElements.forEach(el => el.textContent = siteConfig.location);
        }
    }

    // Utility per lazy loading delle immagini (per uso futuro)
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Gestione tema scuro/chiaro (feature futura)
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);

        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Performance monitoring (opzionale)
    setupPerformanceMonitoring() {
        // Monitora performance di caricamento
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            console.log(`Page load time: ${loadTime}ms`);
            
            // Invia dati analytics se necessario
            if (loadTime > 3000) {
                console.warn('Page load time is slow');
            }
        });
    }
}

// Inizializza l'applicazione
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Service Worker registration (per PWA future)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
