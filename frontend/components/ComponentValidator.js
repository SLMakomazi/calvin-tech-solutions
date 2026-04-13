// ===================================
// COMPONENT VALIDATOR - TESTING & VALIDATION
// ===================================
class ComponentValidator {
    constructor() {
        this.validationResults = {
            htmlLoaded: false,
            cssLoaded: false,
            jsInitialized: false,
            componentsWorking: {}
        };
        this.init();
    }

    init() {
        // Wait for components to load
        if (window.ComponentLoader) {
            window.ComponentLoader.on('componentsLoaded', () => {
                this.validateComponents();
            });
        } else {
            // Retry if ComponentLoader not ready
            setTimeout(() => this.init(), 100);
        }
    }

    // Validate all components
    async validateComponents() {
        console.log('Starting component validation...');
        
        // Test HTML loading
        await this.validateHTMLLoading();
        
        // Test CSS loading
        await this.validateCSSLoading();
        
        // Test JavaScript initialization
        await this.validateJSInitialization();
        
        // Test component functionality
        await this.validateComponentFunctionality();
        
        // Generate report
        this.generateValidationReport();
    }

    // Validate HTML loading
    async validateHTMLLoading() {
        const containers = ['hero-container', 'about-container', 'services-container', 'team-container', 'testimonials-container', 'projects-container', 'news-container', 'contact-container', 'footer-container'];
        let loadedCount = 0;

        for (const containerId of containers) {
            const container = document.getElementById(containerId);
            if (container && container.children.length > 0) {
                loadedCount++;
                console.log(`HTML loaded for: ${containerId}`);
            } else {
                console.warn(`HTML not loaded for: ${containerId}`);
            }
        }

        this.validationResults.htmlLoaded = loadedCount === containers.length;
    }

    // Validate CSS loading
    async validateCSSLoading() {
        const cssFiles = [
            'components/components.css',
            'components/Hero/Hero.css',
            'components/About/About.css',
            'components/Services/Services.css',
            'components/Team/Team.css',
            'components/Testimonials/Testimonials.css',
            'components/Projects/Projects.css',
            'components/News/News.css',
            'components/Contact/Contact.css',
            'components/Footer/Footer.css'
        ];

        let loadedCount = 0;
        for (const cssFile of cssFiles) {
            const link = document.querySelector(`link[href="${cssFile}"]`);
            if (link && link.sheet) {
                loadedCount++;
                console.log(`CSS loaded: ${cssFile}`);
            } else {
                console.warn(`CSS not loaded: ${cssFile}`);
            }
        }

        this.validationResults.cssLoaded = loadedCount === cssFiles.length;
    }

    // Validate JavaScript initialization
    async validateJSInitialization() {
        const jsFiles = [
            'components/ComponentLoader.js',
            'components/Footer/Footer.js',
            'components/Projects/Projects.js',
            'components/News/News.js',
            'components/Contact/Contact.js'
        ];

        let loadedCount = 0;
        for (const jsFile of jsFiles) {
            const script = document.querySelector(`script[src="${jsFile}"]`);
            if (script) {
                loadedCount++;
                console.log(`Script loaded: ${jsFile}`);
            } else {
                console.warn(`Script not loaded: ${jsFile}`);
            }
        }

        // Check if ComponentLoader is available and has components
        if (window.ComponentLoader && window.ComponentLoader.isComponentsLoaded()) {
            this.validationResults.jsInitialized = true;
            console.log('JavaScript components initialized successfully');
        } else {
            this.validationResults.jsInitialized = false;
            console.warn('JavaScript components not initialized');
        }
    }

    // Validate component functionality
    async validateComponentFunctionality() {
        // Test Hero component
        const heroWorking = this.validateHeroComponent();
        this.validationResults.componentsWorking.hero = heroWorking;

        // Test About component
        const aboutWorking = this.validateAboutComponent();
        this.validationResults.componentsWorking.about = aboutWorking;

        // Test Services component
        const servicesWorking = this.validateServicesComponent();
        this.validationResults.componentsWorking.services = servicesWorking;

        // Test Team component
        const teamWorking = this.validateTeamComponent();
        this.validationResults.componentsWorking.team = teamWorking;

        // Test Testimonials component
        const testimonialsWorking = this.validateTestimonialsComponent();
        this.validationResults.componentsWorking.testimonials = testimonialsWorking;

        // Test Projects component
        const projectsWorking = this.validateProjectsComponent();
        this.validationResults.componentsWorking.projects = projectsWorking;

        // Test News component
        const newsWorking = this.validateNewsComponent();
        this.validationResults.componentsWorking.news = newsWorking;

        // Test Contact component
        const contactWorking = this.validateContactComponent();
        this.validationResults.componentsWorking.contact = contactWorking;

        // Test Footer component
        const footerWorking = this.validateFooterComponent();
        this.validationResults.componentsWorking.footer = footerWorking;
    }

    // Validate Hero component
    validateHeroComponent() {
        const heroElement = document.querySelector('.hero-component');
        if (!heroElement) return false;

        const hasHeroContent = heroElement.querySelector('.hero-content');
        const hasHeroTitle = heroElement.querySelector('.hero-title');
        const hasCTAButtons = heroElement.querySelector('.cta-buttons');

        return !!(hasHeroContent && hasHeroTitle && hasCTAButtons);
    }

    // Validate About component
    validateAboutComponent() {
        const aboutElement = document.querySelector('.about-component');
        if (!aboutElement) return false;

        const hasAboutText = aboutElement.querySelector('.about-text');
        const hasStatsGrid = aboutElement.querySelector('.stats-grid');
        const hasValuesGrid = aboutElement.querySelector('.values-grid');

        return !!(hasAboutText && hasStatsGrid && hasValuesGrid);
    }

    // Validate Services component
    validateServicesComponent() {
        const servicesElement = document.querySelector('.services-component');
        if (!servicesElement) return false;

        const hasServicesGrid = servicesElement.querySelector('.services-grid');
        const hasServiceCards = servicesElement.querySelectorAll('.service-card').length > 0;

        return !!(hasServicesGrid && hasServiceCards);
    }

    // Validate Team component
    validateTeamComponent() {
        const teamElement = document.querySelector('.team-component');
        if (!teamElement) return false;

        const hasTeamMember = teamElement.querySelector('.team-member');
        const hasMemberInfo = teamElement.querySelector('.member-info');
        const hasSocialLinks = teamElement.querySelector('.social-links');

        return !!(hasTeamMember && hasMemberInfo && hasSocialLinks);
    }

    // Validate Testimonials component
    validateTestimonialsComponent() {
        const testimonialsElement = document.querySelector('.testimonials-component');
        if (!testimonialsElement) return false;

        const hasTestimonialsGrid = testimonialsElement.querySelector('.testimonials-grid');
        const hasTestimonialCards = testimonialsElement.querySelectorAll('.testimonial-card').length > 0;
        const hasTestimonialsActions = testimonialsElement.querySelector('.testimonials-actions');

        return !!(hasTestimonialsGrid && hasTestimonialCards && hasTestimonialsActions);
    }

    // Validate Projects component
    validateProjectsComponent() {
        const projectsElement = document.querySelector('.projects-component');
        if (!projectsElement) return false;

        const hasProjectsGrid = projectsElement.querySelector('.projects-grid');
        const hasProjectCards = projectsElement.querySelectorAll('.project-card').length > 0;

        return !!(hasProjectsGrid && hasProjectCards);
    }

    // Validate News component
    validateNewsComponent() {
        const newsElement = document.querySelector('.news-component');
        if (!newsElement) return false;

        const hasNewsGrid = newsElement.querySelector('.news-grid');
        const hasNewsCards = newsElement.querySelectorAll('.news-card').length > 0;
        const hasLoadMoreBtn = newsElement.querySelector('.load-more-btn');

        return !!(hasNewsGrid && hasNewsCards && hasLoadMoreBtn);
    }

    // Validate Contact component
    validateContactComponent() {
        const contactElement = document.querySelector('.contact-component');
        if (!contactElement) return false;

        const hasContactContainer = contactElement.querySelector('.contact-container');
        const hasContactInfo = contactElement.querySelector('.contact-info');
        const hasContactForm = contactElement.querySelector('.contact-form');

        return !!(hasContactContainer && hasContactInfo && hasContactForm);
    }

    // Validate Footer component
    validateFooterComponent() {
        const footerElement = document.querySelector('.footer-component');
        if (!footerElement) return false;

        const hasFooterContent = footerElement.querySelector('.footer-content');
        const hasSocialLinks = footerElement.querySelector('.social-links');
        const hasFooterBottom = footerElement.querySelector('.footer-bottom');

        return !!(hasFooterContent && hasSocialLinks && hasFooterBottom);
    }

    // Validate Projects component
    validateProjectsComponent() {
        const projectsElement = document.querySelector('.projects-component');
        if (!projectsElement) return false;

        // Check for project elements
        const hasProjectsGrid = projectsElement.querySelector('.projects-grid');
        const hasProjectCards = projectsElement.querySelectorAll('.project-card').length > 0;

        return !!(hasProjectsGrid && hasProjectCards);
    }

    // Validate News component
    validateNewsComponent() {
        const newsElement = document.querySelector('.news-component');
        if (!newsElement) return false;

        // Check for news elements
        const hasNewsGrid = newsElement.querySelector('.news-grid');
        const hasNewsCards = newsElement.querySelectorAll('.news-card').length > 0;
        const hasLoadMoreBtn = newsElement.querySelector('.load-more-btn');

        return !!(hasNewsGrid && hasNewsCards && hasLoadMoreBtn);
    }

    // Validate Contact component
    validateContactComponent() {
        const contactElement = document.querySelector('.contact-component');
        if (!contactElement) return false;

        // Check for contact elements
        const hasContactContainer = contactElement.querySelector('.contact-container');
        const hasContactInfo = contactElement.querySelector('.contact-info');
        const hasContactForm = contactElement.querySelector('.contact-form');

        return !!(hasContactContainer && hasContactInfo && hasContactForm);
    }

    // Generate validation report
    generateValidationReport() {
        const report = {
            timestamp: new Date().toISOString(),
            overall: this.calculateOverallStatus(),
            details: this.validationResults
        };

        console.log('=== COMPONENT VALIDATION REPORT ===');
        console.log('Overall Status:', report.overall);
        console.log('HTML Loaded:', report.details.htmlLoaded);
        console.log('CSS Loaded:', report.details.cssLoaded);
        console.log('JS Initialized:', report.details.jsInitialized);
        console.log('Components Working:', report.details.componentsWorking);
        console.log('=====================================');

        // Display visual feedback
        this.displayValidationResults(report);
    }

    // Calculate overall status
    calculateOverallStatus() {
        const { htmlLoaded, cssLoaded, jsInitialized, componentsWorking } = this.validationResults;
        
        const componentStatus = Object.values(componentsWorking).every(status => status);
        
        if (htmlLoaded && cssLoaded && jsInitialized && componentStatus) {
            return 'SUCCESS';
        } else if (htmlLoaded && cssLoaded && jsInitialized) {
            return 'PARTIAL';
        } else {
            return 'FAILED';
        }
    }

    // Display validation results visually
    displayValidationResults(report) {
        // Create validation indicator
        const indicator = document.createElement('div');
        indicator.id = 'component-validator-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            border: 2px solid;
            transition: all 0.3s ease;
        `;

        // Style based on status
        switch (report.overall) {
            case 'SUCCESS':
                indicator.style.background = 'rgba(0, 255, 0, 0.1)';
                indicator.style.borderColor = '#00ff00';
                indicator.style.color = '#00ff00';
                indicator.innerHTML = 'Components: SUCCESS';
                break;
            case 'PARTIAL':
                indicator.style.background = 'rgba(255, 165, 0, 0.1)';
                indicator.style.borderColor = '#ffa500';
                indicator.style.color = '#ffa500';
                indicator.innerHTML = 'Components: PARTIAL';
                break;
            case 'FAILED':
                indicator.style.background = 'rgba(255, 0, 0, 0.1)';
                indicator.style.borderColor = '#ff0000';
                indicator.style.color = '#ff0000';
                indicator.innerHTML = 'Components: FAILED';
                break;
        }

        document.body.appendChild(indicator);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            indicator.style.opacity = '0';
            setTimeout(() => indicator.remove(), 300);
        }, 5000);

        // Store results globally for debugging
        window.componentValidationResults = report;
    }

    // Public method to get validation results
    getResults() {
        return this.validationResults;
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ComponentValidator();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentValidator;
}
