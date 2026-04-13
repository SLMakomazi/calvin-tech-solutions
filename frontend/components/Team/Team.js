// ===================================
// TEAM OWL CAROUSEL COMPONENT
// ===================================
class TeamComponent {
    constructor() {
        this.carousel = null;
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupCarousel());
        } else {
            this.setupCarousel();
        }
    }

    setupCarousel() {
        try {
            // Check if jQuery is available
            if (typeof $ === 'undefined') {
                console.error('[TeamComponent] jQuery not loaded. Owl Carousel requires jQuery.');
                return;
            }

            // Check if Owl Carousel is available
            if (typeof $.fn.owlCarousel === 'undefined') {
                console.error('[TeamComponent] Owl Carousel not loaded. Please check script dependencies.');
                return;
            }

            // Initialize Owl Carousel
            this.carousel = $('#customers-teams').owlCarousel({
                loop: true,
                center: true,
                items: 3,
                margin: 0,
                autoplay: true,
                dots: true,
                autoplayTimeout: 4500,
                checkVisibility: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    1170: {
                        items: 3
                    }
                }
            });

            this.isInitialized = true;
            console.log('[TeamComponent] Owl Carousel initialized successfully');

        } catch (error) {
            console.error('[TeamComponent] Error initializing carousel:', error);
        }
    }

    // Public methods for external control
    next() {
        if (this.carousel && this.isInitialized) {
            this.carousel.trigger('next.owl.carousel');
        }
    }

    prev() {
        if (this.carousel && this.isInitialized) {
            this.carousel.trigger('prev.owl.carousel');
        }
    }

    goTo(index) {
        if (this.carousel && this.isInitialized) {
            this.carousel.trigger('to.owl.carousel', [index]);
        }
    }

    // Destroy method for cleanup
    destroy() {
        if (this.carousel && this.isInitialized) {
            this.carousel.trigger('destroy.owl.carousel');
            this.isInitialized = false;
        }
    }
}

// Initialize component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.TeamComponent = new TeamComponent();
});
