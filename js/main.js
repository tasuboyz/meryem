// Main Application Manager
class App {
    constructor() {
        this.init();
    }

    init() {
        this.setupParticles();
        this.setupAnimations();
        this.setupContactForm();
        this.setupNotifications();
        this.setupThemeEffects();
        this.addEventListeners();
    }

    setupParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        // Create particles
        for (let i = 0; i < particlesConfig.count; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * (particlesConfig.size.max - particlesConfig.size.min) + particlesConfig.size.min;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = Math.random() * (particlesConfig.opacity.max - particlesConfig.opacity.min) + particlesConfig.opacity.min;
        const duration = Math.random() * 4 + 4; // 4-8 seconds

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            opacity: ${opacity};
            animation-duration: ${duration}s;
            animation-delay: ${Math.random() * 2}s;
        `;

        container.appendChild(particle);
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        if (!window.IntersectionObserver) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: animationConfig.threshold,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale');
        animatableElements.forEach(el => observer.observe(el));
    }

    animateElement(element) {
        const animationType = this.getAnimationType(element);
        const delay = element.dataset.delay || 0;

        setTimeout(() => {
            element.classList.add('animate');
            
            if (animationType === 'stagger') {
                this.staggerChildAnimations(element);
            }
        }, delay);
    }

    getAnimationType(element) {
        if (element.classList.contains('fade-in-up')) return 'up';
        if (element.classList.contains('fade-in-left')) return 'left';
        if (element.classList.contains('fade-in-right')) return 'right';
        if (element.classList.contains('fade-in-scale')) return 'scale';
        return 'default';
    }

    staggerChildAnimations(container) {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('animate');
            }, index * 100);
        });
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        
        // Validate form
        if (!this.validateForm(form)) {
            this.showNotification(notificationMessages.error.validation, 'error');
            return;
        }

        // Show loading state
        this.setFormLoading(submitBtn, true);

        // Simulate form submission (replace with actual implementation)
        setTimeout(() => {
            this.setFormLoading(submitBtn, false);
            this.showNotification(notificationMessages.success.form, 'success');
            form.reset();
            this.clearFormValidation(form);
        }, 2000);
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Questo campo è obbligatorio';
        }

        // Email validation
        if (type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Inserisci un indirizzo email valido';
        }

        // Update field appearance
        this.updateFieldValidation(field, isValid, errorMessage);

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    updateFieldValidation(field, isValid, errorMessage) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        // Remove existing error elements
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Update field classes
        field.classList.toggle('error', !isValid);
        field.classList.toggle('valid', isValid && field.value.trim());

        // Add error message if needed
        if (!isValid && errorMessage) {
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = errorMessage;
            errorElement.style.cssText = `
                color: #f44336;
                font-size: 12px;
                margin-top: 5px;
                animation: slideInUp 0.3s ease-out;
            `;
            formGroup.appendChild(errorElement);
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup?.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    clearFormValidation(form) {
        const fields = form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.classList.remove('error', 'valid');
            this.clearFieldError(field);
        });
    }

    setFormLoading(button, isLoading) {
        const span = button.querySelector('span');
        const loader = button.querySelector('.btn-loader');

        button.disabled = isLoading;
        button.classList.toggle('loading', isLoading);

        if (span) {
            span.textContent = isLoading ? 'Invio in corso...' : 'Invia Messaggio';
        }
    }

    setupNotifications() {
        this.notificationContainer = document.getElementById('notification');
        this.notificationQueue = [];
        this.isShowingNotification = false;
    }

    showNotification(message, type = 'success', duration = 4000) {
        this.notificationQueue.push({ message, type, duration });
        
        if (!this.isShowingNotification) {
            this.processNotificationQueue();
        }
    }

    processNotificationQueue() {
        if (this.notificationQueue.length === 0) {
            this.isShowingNotification = false;
            return;
        }

        this.isShowingNotification = true;
        const { message, type, duration } = this.notificationQueue.shift();
        
        this.displayNotification(message, type, duration);
    }

    displayNotification(message, type, duration) {
        if (!this.notificationContainer) return;

        const messageElement = this.notificationContainer.querySelector('.notification-message');
        const closeButton = this.notificationContainer.querySelector('.notification-close');

        // Set content
        messageElement.textContent = message;
        
        // Set type
        this.notificationContainer.className = `notification ${type}`;
        
        // Show notification
        this.notificationContainer.classList.add('show');

        // Auto hide
        const hideTimeout = setTimeout(() => {
            this.hideNotification();
        }, duration);

        // Close button handler
        const closeHandler = () => {
            clearTimeout(hideTimeout);
            this.hideNotification();
        };

        closeButton.onclick = closeHandler;

        // Store timeout for cleanup
        this.notificationContainer.dataset.timeout = hideTimeout;
    }

    hideNotification() {
        if (!this.notificationContainer) return;

        this.notificationContainer.classList.remove('show');
        
        setTimeout(() => {
            this.processNotificationQueue();
        }, 300);
    }

    setupThemeEffects() {
        // Add glow effects on hover
        this.setupGlowEffects();
        
        // Setup background gradients
        this.setupBackgroundEffects();
        
        // Setup cursor effects
        this.setupCursorEffects();
    }

    setupGlowEffects() {
        const glowElements = document.querySelectorAll('.btn-primary, .service-card, .portfolio-item');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.addGlowEffect(e.target);
            });
            
            element.addEventListener('mouseleave', (e) => {
                this.removeGlowEffect(e.target);
            });
        });
    }

    addGlowEffect(element) {
        element.style.boxShadow = '0 0 30px rgba(202, 174, 77, 0.4)';
        element.style.borderColor = 'var(--primary-color)';
    }

    removeGlowEffect(element) {
        element.style.boxShadow = '';
        element.style.borderColor = '';
    }

    setupBackgroundEffects() {
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            this.updateParallaxEffect();
        });
    }

    updateParallaxEffect() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    setupCursorEffects() {
        // Create custom cursor for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                document.body.style.cursor = 'pointer';
            });
            
            element.addEventListener('mouseleave', () => {
                document.body.style.cursor = 'default';
            });
        });
    }

    addEventListeners() {
        // Performance optimization
        window.addEventListener('load', () => {
            this.onPageLoad();
        });

        // Handle resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.onResize();
            }, 250);
        });

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            this.onVisibilityChange();
        });
    }

    onPageLoad() {
        // Page loaded optimizations
        document.body.classList.add('loaded');
        
        // Start hero animations
        this.startHeroAnimations();
    }

    startHeroAnimations() {
        const heroElements = document.querySelectorAll('.hero .fade-in-up, .hero .fade-in-right');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * 200);
        });
    }

    onResize() {
        // Handle responsive changes
        this.updateLayout();
    }

    updateLayout() {
        // Recalculate positions if needed
        if (window.portfolioManager) {
            window.portfolioManager.updateLayout?.();
        }
    }

    onVisibilityChange() {
        if (document.hidden) {
            // Page is hidden, pause animations
            this.pauseAnimations();
        } else {
            // Page is visible, resume animations
            this.resumeAnimations();
        }
    }

    pauseAnimations() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    }

    resumeAnimations() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
}

// Utility functions
window.showNotification = function(message, type = 'success', duration = 4000) {
    if (window.app) {
        window.app.showNotification(message, type, duration);
    }
};

window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
