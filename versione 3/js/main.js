// ========================================
// Main Application Controller
// ========================================

class App {
    constructor() {
        this.navigationManager = null;
        this.portfolioManager = null;
        this.intersectionObserver = null;
        this.particlesContainer = null;
        this.particles = [];
        this.animationFrame = null;
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }
    
    initializeApp() {
        try {
            // Initialize managers
            this.navigationManager = new NavigationManager();
            this.portfolioManager = new PortfolioManager();
            
            // Setup core features
            this.setupParticles();
            this.setupAnimations();
            this.setupContactForm();
            this.setupNotifications();
            this.setupPerformanceOptimizations();
            
            // Initialize theme effects
            this.setupThemeEffects();
            
            console.log('✅ StudioDesign Portfolio initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing application:', error);
            this.showNotification('Errore durante l\'inizializzazione dell\'applicazione', 'error');
        }
    }
    
    // ========================================
    // Particles System
    // ========================================
    
    setupParticles() {
        this.particlesContainer = document.getElementById('particles-container');
        if (!this.particlesContainer) return;
        
        this.createParticles();
        this.animateParticles();
        
        // Responsive particles
        window.addEventListener('resize', () => this.handleParticleResize());
    }
    
    createParticles() {
        const particleCount = window.innerWidth > 768 ? particlesConfig.count : Math.floor(particlesConfig.count / 2);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = this.createParticle();
            this.particles.push(particle);
            this.particlesContainer.appendChild(particle.element);
        }
    }
    
    createParticle() {
        const element = document.createElement('div');
        element.className = 'particle';
        
        const size = this.randomBetween(particlesConfig.size.min, particlesConfig.size.max);
        const speed = this.randomBetween(particlesConfig.speed.min, particlesConfig.speed.max);
        const opacity = this.randomBetween(particlesConfig.opacity.min, particlesConfig.opacity.max);
        
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.opacity = opacity;
        
        return {
            element,
            x: this.randomBetween(0, window.innerWidth),
            y: this.randomBetween(0, window.innerHeight),
            vx: this.randomBetween(-speed, speed),
            vy: this.randomBetween(-speed, speed),
            size,
            speed,
            opacity
        };
    }
    
    animateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off walls
            if (particle.x <= 0 || particle.x >= window.innerWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= window.innerHeight) {
                particle.vy *= -1;
            }
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
            particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
            
            // Update element position
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        });
        
        this.animationFrame = requestAnimationFrame(() => this.animateParticles());
    }
    
    handleParticleResize() {
        // Clear existing particles
        this.particles.forEach(particle => {
            if (particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
        });
        this.particles = [];
        
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Recreate particles
        this.createParticles();
        this.animateParticles();
    }
    
    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    // ========================================
    // Scroll Animations
    // ========================================
    
    setupAnimations() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            this.setupFallbackAnimations();
            return;
        }
        
        this.intersectionObserver = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            animationConfig.observerOptions
        );
        
        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, [data-aos]');
        animatableElements.forEach(element => {
            this.intersectionObserver.observe(element);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('visible');
                    this.triggerCustomAnimation(element);
                }, parseInt(delay));
                
                // Stop observing once animated
                this.intersectionObserver.unobserve(element);
            }
        });
    }
    
    triggerCustomAnimation(element) {
        const animationType = element.getAttribute('data-aos');
        
        switch (animationType) {
            case 'fade-up':
                element.style.animation = 'fadeInUp 0.8s ease-out forwards';
                break;
            case 'slide-left':
                element.style.animation = 'slideInLeft 0.8s ease-out forwards';
                break;
            case 'slide-right':
                element.style.animation = 'slideInRight 0.8s ease-out forwards';
                break;
            case 'scale-in':
                element.style.animation = 'scaleIn 0.8s ease-out forwards';
                break;
            default:
                element.classList.add('visible');
        }
    }
    
    setupFallbackAnimations() {
        // Simple fallback for browsers without IntersectionObserver
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        elements.forEach(element => {
            element.classList.add('visible');
        });
    }
    
    // ========================================
    // Contact Form
    // ========================================
    
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea');
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Setup real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
        
        // Setup form submission
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Setup floating labels effect
        this.setupFloatingLabels(inputs);
    }
    
    setupFloatingLabels(inputs) {
        inputs.forEach(input => {
            const updateLabel = () => {
                const label = input.previousElementSibling;
                if (label && label.classList.contains('form-label')) {
                    if (input.value.trim() !== '' || input === document.activeElement) {
                        label.classList.add('active');
                    } else {
                        label.classList.remove('active');
                    }
                }
            };
            
            input.addEventListener('focus', updateLabel);
            input.addEventListener('blur', updateLabel);
            input.addEventListener('input', updateLabel);
            
            // Initial check
            updateLabel();
        });
    }
    
    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const rules = validationRules[fieldName];
        
        if (!rules) return true;
        
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (rules.required && !value) {
            isValid = false;
            errorMessage = `Il campo ${fieldName} è obbligatorio`;
        }
        
        // Min length validation
        if (isValid && rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = rules.message;
        }
        
        // Pattern validation
        if (isValid && rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = rules.message;
        }
        
        this.showFieldError(field, isValid ? '' : errorMessage);
        return isValid;
    }
    
    showFieldError(field, message) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        }
        
        if (message) {
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    }
    
    clearFieldError(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        field.classList.remove('error');
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showNotification('Controlla i campi evidenziati in rosso', 'error');
            return;
        }
        
        // Show loading state
        this.setButtonLoading(submitButton, true);
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await this.submitForm(formData);
            
            // Success
            this.showNotification('Messaggio inviato con successo! Ti risponderemo presto.', 'success');
            form.reset();
            
            // Clear floating labels
            inputs.forEach(input => {
                const label = input.previousElementSibling;
                if (label && label.classList.contains('form-label')) {
                    label.classList.remove('active');
                }
            });
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Errore durante l\'invio del messaggio. Riprova più tardi.', 'error');
        } finally {
            this.setButtonLoading(submitButton, false);
        }
    }
    
    async submitForm(formData) {
        // Replace this with your actual form submission logic
        // This could be a fetch request to your backend, a service like Formspree, etc.
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% of the time)
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Simulated server error'));
                }
            }, 2000);
        });
    }
    
    setButtonLoading(button, isLoading) {
        const textElement = button.querySelector('.btn-text');
        const loadingElement = button.querySelector('.btn-loading');
        
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
            if (textElement) textElement.style.display = 'none';
            if (loadingElement) loadingElement.style.display = 'inline';
        } else {
            button.classList.remove('loading');
            button.disabled = false;
            if (textElement) textElement.style.display = 'inline';
            if (loadingElement) loadingElement.style.display = 'none';
        }
    }
    
    // ========================================
    // Notification System
    // ========================================
    
    setupNotifications() {
        const notification = document.getElementById('notification');
        const closeButton = document.getElementById('notification-close');
        
        if (closeButton) {
            closeButton.addEventListener('click', () => this.hideNotification());
        }
    }
    
    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.getElementById('notification');
        const messageElement = document.getElementById('notification-message');
        
        if (!notification || !messageElement) return;
        
        // Set message and type
        messageElement.textContent = message;
        notification.className = `notification ${type}`;
        
        // Show notification
        notification.classList.add('show');
        
        // Auto hide after duration
        setTimeout(() => {
            this.hideNotification();
        }, duration);
    }
    
    hideNotification() {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.classList.remove('show');
        }
    }
    
    // ========================================
    // Performance Optimizations
    // ========================================
    
    setupPerformanceOptimizations() {
        // Lazy load images
        this.setupLazyLoading();
        
        // Debounce scroll events
        this.setupScrollOptimization();
        
        // Preload critical resources
        this.preloadCriticalResources();
    }
    
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
    
    setupScrollOptimization() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-based operations here
                    this.updateScrollIndicator();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    updateScrollIndicator() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Update scroll indicator if exists
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.width = `${scrollPercent}%`;
        }
    }
    
    preloadCriticalResources() {
        // Preload hero images
        const heroImages = [
            'foto designer/Immagine WhatsApp 2025-07-27 ore 13.47.15_5ea4392e.jpg'
        ];
        
        heroImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    // ========================================
    // Theme Effects
    // ========================================
    
    setupThemeEffects() {
        // Add subtle hover effects
        this.setupHoverEffects();
        
        // Setup smooth transitions
        this.setupSmoothTransitions();
    }
    
    setupHoverEffects() {
        // Card hover effects
        const cards = document.querySelectorAll('.floating-card, .service-card, .portfolio-item');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
    
    setupSmoothTransitions() {
        // Add smooth transitions to all interactive elements
        const interactiveElements = document.querySelectorAll('button, .btn, .nav-link, .card, .portfolio-item');
        interactiveElements.forEach(element => {
            if (!element.style.transition) {
                element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    }
    
    // ========================================
    // Public API
    // ========================================
    
    // Navigation methods
    navigateTo(section) {
        if (this.navigationManager) {
            this.navigationManager.navigateTo(section);
        }
    }
    
    getCurrentSection() {
        return this.navigationManager ? this.navigationManager.getCurrentSection() : null;
    }
    
    // Portfolio methods
    getPortfolioManager() {
        return this.portfolioManager;
    }
    
    // Utility methods
    showNotificationPublic(message, type, duration) {
        this.showNotification(message, type, duration);
    }
    
    // Cleanup method
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        
        // Clean up particles
        this.particles.forEach(particle => {
            if (particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
        });
        this.particles = [];
        
        console.log('🧹 App cleaned up');
    }
}

// ========================================
// Global Initialization
// ========================================

let app;

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new App();
    });
} else {
    app = new App();
}

// Make app globally accessible for debugging
window.StudioDesignApp = app;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
