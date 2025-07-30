// Navigation Manager
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        
        this.isMenuOpen = false;
        this.currentSection = 'home';
        this.scrollThreshold = 100;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupIntersectionObserver();
        this.updateActiveLink();
    }

    bindEvents() {
        // Hamburger menu toggle
        this.hamburger?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Nav links click
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.closeMobileMenu();
            });
        });

        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Resize events
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar?.contains(e.target) && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        this.hamburger?.classList.toggle('active', this.isMenuOpen);
        this.navMenu?.classList.toggle('active', this.isMenuOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
        
        // Add animation delay for menu items
        if (this.isMenuOpen) {
            this.animateMenuItems();
        }
    }

    closeMobileMenu() {
        if (!this.isMenuOpen) return;
        
        // Animate items out before closing
        const menuItems = this.navMenu?.querySelectorAll('.nav-item');
        menuItems?.forEach((item, index) => {
            item.style.transition = 'all 0.2s ease-in';
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
        });
        
        // Close menu after animation
        setTimeout(() => {
            this.isMenuOpen = false;
            this.hamburger?.classList.remove('active');
            this.navMenu?.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset item styles
            menuItems?.forEach(item => {
                item.style.transition = '';
                item.style.opacity = '';
                item.style.transform = '';
            });
        }, 200);
    }

    animateMenuItems() {
        const menuItems = this.navMenu?.querySelectorAll('.nav-item');
        menuItems?.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100 + 100); // Slight delay to allow menu to start opening
        });
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const navbarHeight = this.navbar?.offsetHeight || 0;
        const targetPosition = section.offsetTop - navbarHeight;

        // Smooth scroll with custom easing
        this.smoothScrollTo(targetPosition, 800);
        
        // Update current section
        this.currentSection = sectionId;
        this.updateActiveLink();
    }

    smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuart(timeElapsed, startPosition, distance, duration);
            
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }

    handleScroll() {
        const scrollY = window.pageYOffset;
        
        // Update navbar style
        this.updateNavbarStyle(scrollY);
        
        // Throttle scroll events for performance
        if (!this.scrollTimer) {
            this.scrollTimer = setTimeout(() => {
                this.updateCurrentSection();
                this.scrollTimer = null;
            }, 100);
        }
    }

    updateNavbarStyle(scrollY) {
        if (scrollY > this.scrollThreshold) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }
    }

    updateCurrentSection() {
        const scrollPosition = window.pageYOffset + 200; // Offset for better detection
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (this.currentSection !== sectionId) {
                    this.currentSection = sectionId;
                    this.updateActiveLink();
                }
            }
        });
    }

    updateActiveLink() {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkHref = link.getAttribute('href').substring(1);
            if (linkHref === this.currentSection) {
                link.classList.add('active');
            }
        });
    }

    setupIntersectionObserver() {
        if (!window.IntersectionObserver) return;

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    if (sectionId && this.currentSection !== sectionId) {
                        this.currentSection = sectionId;
                        this.updateActiveLink();
                    }
                }
            });
        }, observerOptions);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    handleResize() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 1024 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }

    // Public methods
    getCurrentSection() {
        return this.currentSection;
    }

    navigateToSection(sectionId) {
        this.scrollToSection(sectionId);
    }

    setActiveSection(sectionId) {
        this.currentSection = sectionId;
        this.updateActiveLink();
    }
}

// Enhanced scroll behavior for better UX
class SmoothScrollBehavior {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scroll to all internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link && link.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                
                if (window.navigationManager) {
                    window.navigationManager.scrollToSection(targetId);
                }
            }
        });
    }
}

// Navbar background parallax effect
class NavbarEffects {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.init();
    }

    init() {
        if (!this.navbar) return;

        window.addEventListener('scroll', () => {
            this.updateNavbarBackground();
        });
    }

    updateNavbarBackground() {
        const scrollY = window.pageYOffset;
        const opacity = Math.min(scrollY / 500, 0.98);
        const blur = Math.min(scrollY / 100, 20);
        
        this.navbar.style.background = `rgba(255, 255, 255, ${opacity})`;
        this.navbar.style.backdropFilter = `blur(${blur}px)`;
    }
}

// Initialize Navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
    window.smoothScrollBehavior = new SmoothScrollBehavior();
    window.navbarEffects = new NavbarEffects();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NavigationManager,
        SmoothScrollBehavior,
        NavbarEffects
    };
}
