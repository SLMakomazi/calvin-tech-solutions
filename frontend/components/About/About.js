// ===================================
// ABOUT COMPONENT JAVASCRIPT
// ===================================
class AboutComponent {
    constructor() {
        this.statsAnimated = false;
        this.init();
    }

    init() {
        this.setupStatCounters();
        this.setupValueCardAnimations();
        this.setupScrollAnimations();
        this.setupAnalytics();
        this.setupInteractions();
    }

    // Setup animated statistics counters
    setupStatCounters() {
        const statNumbers = document.querySelectorAll('.about-component .stat-number');
        
        const animateCounter = (element) => {
            const target = parseInt(element.dataset.target);
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                    element.classList.add('counting');
                }
            };
            
            updateCounter();
        };

        // Use Intersection Observer to trigger animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.statsAnimated) {
                    statNumbers.forEach(stat => {
                        animateCounter(stat);
                    });
                    this.statsAnimated = true;
                    this.trackAboutInteraction('stats_animated');
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        const statsGrid = document.querySelector('.about-component .stats-grid');
        if (statsGrid) {
            observer.observe(statsGrid);
        }
    }

    // Setup value card animations
    setupValueCardAnimations() {
        const valueCards = document.querySelectorAll('.about-component .value-card');
        
        valueCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateValueCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateValueCard(card, false);
            });
            
            card.addEventListener('click', () => {
                this.handleValueCardClick(card);
            });
        });
    }

    // Animate individual value card
    animateValueCard(card, isHover) {
        const icon = card.querySelector('.value-icon');
        const title = card.querySelector('h4');
        const description = card.querySelector('p');
        
        if (isHover) {
            icon.style.transform = 'scale(1.1) rotate(10deg)';
            title.style.transform = 'translateY(-2px)';
            description.style.transform = 'translateY(-2px)';
            description.style.color = 'var(--white)';
        } else {
            icon.style.transform = 'scale(1) rotate(0deg)';
            title.style.transform = 'translateY(0)';
            description.style.transform = 'translateY(0)';
            description.style.color = 'var(--soft-grey)';
        }
    }

    // Handle value card click
    handleValueCardClick(card) {
        const valueTitle = card.querySelector('h4').textContent;
        const valueDescription = card.querySelector('p').textContent;
        
        // Create detail modal
        this.showValueModal(valueTitle, valueDescription);
        
        // Track interaction
        this.trackAboutInteraction('value_card_click', { title: valueTitle });
        
        // Visual feedback
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    // Show value detail modal
    showValueModal(title, description) {
        // Remove existing modal
        const existingModal = document.querySelector('.about-value-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.className = 'about-value-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>${description}</p>
                        <div class="value-details">
                            <h4>How We Deliver This Value:</h4>
                            <ul>
                                <li>Comprehensive assessment of your business needs</li>
                                <li>Tailored solutions aligned with your goals</li>
                                <li>Continuous support and optimization</li>
                                <li>Measurable outcomes and ROI tracking</li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary modal-close-btn">Learn More</button>
                        <button class="btn btn-secondary modal-close-btn">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Setup modal handlers
        this.setupModalHandlers(modal, title);
        
        // Animate modal in
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    // Setup modal event handlers
    setupModalHandlers(modal, title) {
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
        const learnMoreBtn = modal.querySelector('.modal-footer .btn-primary');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', () => {
                this.trackAboutInteraction('value_learn_more', { title: title });
                this.showToast(`Learn more about ${title}`);
                closeModal();
            });
        }
    }

    // Setup scroll animations
    setupScrollAnimations() {
        // Get all animated elements
        const animatedElements = document.querySelectorAll('.about-component .lead, .about-component .stat-card, .about-component .value-card');
        
        if (animatedElements.length === 0) {
            console.warn('No animated elements found in About component');
            return;
        }

        // Immediately make all elements visible
        animatedElements.forEach((element) => {
            element.classList.add('visible');
        });
        
        // Optional: Add scroll-based animations for elements not yet visible
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        animatedElements.forEach((element) => {
            observer.observe(element);
        });
    }

    // Setup analytics tracking
    setupAnalytics() {
        // Track section impressions
        const aboutSection = document.querySelector('.about-component');
        if (aboutSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.trackAboutInteraction('section_impression');
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(aboutSection);
        }
        
        // Track stat impressions
        const statCards = document.querySelectorAll('.about-component .stat-card');
        statCards.forEach((card, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const label = card.querySelector('.stat-label').textContent;
                        this.trackAboutInteraction('stat_impression', { label, index });
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.8 });
            
            observer.observe(card);
        });
    }

    // Setup additional interactions
    setupInteractions() {
        // Add keyboard navigation for value cards
        const valueCards = document.querySelectorAll('.about-component .value-card');
        valueCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Learn more about ${card.querySelector('h4').textContent}`);
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleValueCardClick(card);
                }
            });
        });
        
        // Add copy functionality for stats
        const statNumbers = document.querySelectorAll('.about-component .stat-number');
        statNumbers.forEach(stat => {
            stat.style.cursor = 'pointer';
            stat.title = 'Click to copy';
            
            stat.addEventListener('click', () => {
                const value = stat.textContent;
                this.copyToClipboard(value);
                this.showToast(`Copied: ${value}`);
                this.trackAboutInteraction('stat_copy', { value });
            });
        });
    }

    // Copy text to clipboard
    copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    // Show toast notification
    showToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.about-toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'about-toast';
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

    // Track about interactions
    trackAboutInteraction(action, data = {}) {
        console.log(`About interaction: ${action}`, data);
        
        // Integration with analytics service would go here
        if (typeof gtag !== 'undefined') {
            gtag('event', 'about_interaction', {
                action: action,
                category: 'about',
                ...data
            });
        }
    }

    // Public method to get company stats
    getCompanyStats() {
        const statCards = document.querySelectorAll('.about-component .stat-card');
        const stats = {};
        
        statCards.forEach(card => {
            const label = card.querySelector('.stat-label').textContent;
            const value = card.querySelector('.stat-number').textContent;
            stats[label] = value;
        });
        
        return stats;
    }

    // Public method to update company stats
    updateCompanyStats(newStats) {
        Object.entries(newStats).forEach(([label, value]) => {
            const statCard = Array.from(document.querySelectorAll('.about-component .stat-card'))
                .find(card => card.querySelector('.stat-label').textContent === label);
            
            if (statCard) {
                const numberElement = statCard.querySelector('.stat-number');
                numberElement.dataset.target = value;
                numberElement.textContent = '0';
                
                // Re-animate if visible
                if (this.isElementInViewport(statCard)) {
                    this.animateCounter(numberElement);
                }
            }
        });
    }

    // Check if element is in viewport
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Public method to destroy about component
    destroy() {
        // Remove event listeners
        const valueCards = document.querySelectorAll('.about-component .value-card');
        const statNumbers = document.querySelectorAll('.about-component .stat-number');
        
        valueCards.forEach(card => {
            card.removeEventListener('mouseenter', this.animateValueCard);
            card.removeEventListener('mouseleave', this.animateValueCard);
            card.removeEventListener('click', this.handleValueCardClick);
            card.removeEventListener('keydown', this.handleValueCardClick);
        });
        
        statNumbers.forEach(stat => {
            stat.removeEventListener('click', this.copyToClipboard);
        });
        
        // Remove modals
        const modals = document.querySelectorAll('.about-value-modal');
        modals.forEach(modal => modal.remove());
        
        // Remove toasts
        const toasts = document.querySelectorAll('.about-toast');
        toasts.forEach(toast => toast.remove());
        
        // Reset animation states
        this.statsAnimated = false;
    }
}

let aboutComponentInitialized = false;
const initializeAboutComponent = () => {
    if (aboutComponentInitialized) return;
    new AboutComponent();
    aboutComponentInitialized = true;
};

document.addEventListener('DOMContentLoaded', initializeAboutComponent);
document.addEventListener('componentsLoaded', initializeAboutComponent);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AboutComponent;
}
