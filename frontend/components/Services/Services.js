// ===================================
// SERVICES COMPONENT JAVASCRIPT
// ===================================
class ServicesComponent {
    constructor() {
        this.init();
    }

    init() {
        this.setupServiceAnimations();
        this.setupServiceInteractions();
        this.setupScrollAnimations();
        this.setupServiceFilters();
        this.setupAnalytics();
    }

    // Setup service card animations
    setupServiceAnimations() {
        const serviceCards = document.querySelectorAll('.services-component .service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateServiceCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateServiceCard(card, false);
            });
        });
    }

    // Animate individual service card
    animateServiceCard(card, isHover) {
        const icon = card.querySelector('.service-icon');
        const techTags = card.querySelectorAll('.service-tech span');
        
        if (isHover) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.boxShadow = '0 0 30px rgba(0, 174, 239, 0.5)';
            
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px) scale(1.05)';
                    tag.style.boxShadow = '0 4px 8px rgba(0, 174, 239, 0.3)';
                }, index * 50);
            });
        } else {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.boxShadow = 'none';
            
            techTags.forEach(tag => {
                tag.style.transform = 'translateY(0) scale(1)';
                tag.style.boxShadow = 'none';
            });
        }
    }

    // Setup service card interactions
    setupServiceInteractions() {
        const serviceCards = document.querySelectorAll('.services-component .service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                this.handleServiceClick(card);
            });
        });
    }

    // Handle service card click
    handleServiceClick(card) {
        const serviceName = card.querySelector('h3').textContent;
        const serviceTech = Array.from(card.querySelectorAll('.service-tech span')).map(tag => tag.textContent);
        
        // Create service detail modal
        this.showServiceModal(serviceName, serviceTech);
        
        // Track analytics
        this.trackServiceInteraction(serviceName, 'click');
        
        // Visual feedback
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    // Show service detail modal
    showServiceModal(serviceName, technologies) {
        // Remove existing modal
        const existingModal = document.querySelector('.service-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.className = 'service-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${serviceName}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <h4>Technologies & Expertise:</h4>
                        <div class="tech-list">
                            ${technologies.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                        </div>
                        <p>Our ${serviceName.toLowerCase()} services include comprehensive solutions using cutting-edge technologies. Contact us to discuss how we can help transform your business.</p>
                        <div class="service-features">
                            <h5>What We Offer:</h5>
                            <ul>
                                <li>Custom solution development</li>
                                <li>Integration with existing systems</li>
                                <li>Ongoing support and maintenance</li>
                                <li>Training and documentation</li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary modal-close-btn">Get Quote</button>
                        <button class="btn btn-secondary modal-close-btn">Learn More</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Setup modal close handlers
        this.setupModalHandlers(modal, serviceName);
        
        // Animate modal in
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    // Setup modal event handlers
    setupModalHandlers(modal, serviceName) {
        const closeBtns = modal.querySelectorAll('.modal-close, .modal-close-btn');
        const overlay = modal.querySelector('.modal-overlay');
        
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        };
        
        closeBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
        
        // Handle specific actions
        const getQuoteBtn = modal.querySelector('.modal-footer .btn-primary');
        const learnMoreBtn = modal.querySelector('.modal-footer .btn-secondary');
        
        if (getQuoteBtn) {
            getQuoteBtn.addEventListener('click', () => {
                this.trackServiceInteraction(serviceName, 'quote_request');
                this.showToast('Quote request sent! We\'ll contact you soon.');
                closeModal();
            });
        }
        
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', () => {
                this.trackServiceInteraction(serviceName, 'learn_more');
                this.showToast(`Opening ${serviceName} details...`);
                closeModal();
                // Could navigate to detailed service page
            });
        }
    }

    // Setup scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe service cards
        const serviceCards = document.querySelectorAll('.services-component .service-card');
        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // Setup service filters
    setupServiceFilters() {
        const sectionHeader = document.querySelector('.services-component .section-header');
        if (sectionHeader && !sectionHeader.querySelector('.service-filters')) {
            const filters = document.createElement('div');
            filters.className = 'service-filters';
            filters.innerHTML = `
                <button class="filter-btn active" data-filter="all">All Services</button>
                <button class="filter-btn" data-filter="digital">Digital Solutions</button>
                <button class="filter-btn" data-filter="development">Development</button>
                <button class="filter-btn" data-filter="infrastructure">Infrastructure</button>
                <button class="filter-btn" data-filter="ai">AI & Automation</button>
            `;
            sectionHeader.appendChild(filters);
            
            this.setupFilterEventListeners();
        }
    }

    // Setup filter event listeners
    setupFilterEventListeners() {
        const filterButtons = document.querySelectorAll('.services-component .filter-btn');
        const serviceCards = document.querySelectorAll('.services-component .service-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter service cards
                serviceCards.forEach(card => {
                    const serviceName = card.querySelector('h3').textContent.toLowerCase();
                    const serviceDescription = card.querySelector('p').textContent.toLowerCase();
                    
                    const matchesFilter = this.matchesFilter(serviceName, serviceDescription, filter);
                    
                    if (matchesFilter) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 100);
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
                
                // Track filter usage
                this.trackServiceInteraction(filter, 'filter');
            });
        });
    }

    // Check if service matches filter
    matchesFilter(serviceName, description, filter) {
        if (filter === 'all') return true;
        
        const filterMap = {
            'digital': ['digitalisation', 'website', 'seo', 'ecommerce', 'branding'],
            'development': ['software', 'development', 'web applications', 'mobile apps', 'database'],
            'infrastructure': ['systems', 'it', 'pos', 'network', 'cctv', 'backup', 'cloud', 'devops'],
            'ai': ['chat bot', 'ai', 'automation', 'nlp', 'social media']
        };
        
        const keywords = filterMap[filter] || [];
        
        return keywords.some(keyword => 
            serviceName.includes(keyword) || description.includes(keyword)
        );
    }

    // Setup analytics tracking
    setupAnalytics() {
        // Track service card impressions
        const serviceCards = document.querySelectorAll('.services-component .service-card');
        serviceCards.forEach((card, index) => {
            const serviceName = card.querySelector('h3').textContent;
            
            // Track when card becomes visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.trackServiceInteraction(serviceName, 'impression');
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(card);
        });
    }

    // Track service interactions
    trackServiceInteraction(serviceName, action) {
        console.log(`Service interaction: ${serviceName} - ${action}`);
        
        // Integration with analytics service would go here
        if (typeof gtag !== 'undefined') {
            gtag('event', 'service_interaction', {
                service_name: serviceName,
                action: action,
                category: 'services'
            });
        }
    }

    // Show toast notification
    showToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.service-toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'service-toast';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Public method to destroy services component
    destroy() {
        // Remove event listeners and clean up
        const serviceCards = document.querySelectorAll('.services-component .service-card');
        const filterButtons = document.querySelectorAll('.services-component .filter-btn');
        
        serviceCards.forEach(card => {
            card.removeEventListener('mouseenter', this.setupServiceAnimations);
            card.removeEventListener('mouseleave', this.setupServiceAnimations);
            card.removeEventListener('click', this.handleServiceClick);
        });
        
        filterButtons.forEach(button => {
            button.removeEventListener('click', this.setupFilterEventListeners);
        });
        
        // Remove modals
        const modals = document.querySelectorAll('.service-modal');
        modals.forEach(modal => modal.remove());
        
        // Remove toasts
        const toasts = document.querySelectorAll('.service-toast');
        toasts.forEach(toast => toast.remove());
    }
}

// Initialize services component when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ServicesComponent();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ServicesComponent;
}
