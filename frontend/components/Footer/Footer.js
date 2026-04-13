// ===================================
// FOOTER COMPONENT JAVASCRIPT
// ===================================
class FooterComponent {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupSocialLinks();
        this.setupCurrentYear();
    }

    // Smooth scroll for footer links
    setupSmoothScroll() {
        const footerLinks = document.querySelectorAll('.footer-component a[href^="#"]');
        
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Setup social link interactions
    setupSocialLinks() {
        const socialLinks = document.querySelectorAll('.footer-component .social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-3px) scale(1.1)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Update current year in footer
    setupCurrentYear() {
        const footerText = document.querySelector('.footer-component .footer-bottom p');
        if (footerText) {
            const currentYear = new Date().getFullYear();
            footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
        }
    }

    // Add scroll to top functionality
    setupScrollToTop() {
        const footerBrand = document.querySelector('.footer-component .footer-brand');
        
        if (footerBrand) {
            footerBrand.style.cursor = 'pointer';
            footerBrand.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Initialize footer animations
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe footer elements for animation
        const footerElements = document.querySelectorAll('.footer-component .footer-brand, .footer-component .footer-links, .footer-component .footer-services');
        footerElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Public method to destroy footer component
    destroy() {
        // Remove event listeners and clean up
        const footerLinks = document.querySelectorAll('.footer-component a[href^="#"]');
        const socialLinks = document.querySelectorAll('.footer-component .social-link');
        
        footerLinks.forEach(link => {
            link.removeEventListener('click', this.setupSmoothScroll);
        });
        
        socialLinks.forEach(link => {
            link.removeEventListener('mouseenter', this.setupSocialLinks);
            link.removeEventListener('mouseleave', this.setupSocialLinks);
        });
    }
}

let footerComponentInitialized = false;
const initializeFooterComponent = () => {
    if (footerComponentInitialized) return;
    new FooterComponent();
    footerComponentInitialized = true;
};

document.addEventListener('DOMContentLoaded', initializeFooterComponent);
document.addEventListener('componentsLoaded', initializeFooterComponent);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FooterComponent;
}
