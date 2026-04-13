// ===================================
// TESTIMONIALS COMPONENT
// ===================================
class TestimonialsComponent {
    constructor() {
        this.carousel = null;
        this.isInitialized = false;
        this.init();
    }

    init() {
        this.setupCarousel();
        this.setupAnimations();
    }

    // Setup Owl Carousel
    setupCarousel() {
        if (typeof $ !== 'undefined' && $('#customers-testimonials').length > 0) {
            this.carousel = $('#customers-testimonials').owlCarousel({
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
            console.log('Testimonials carousel initialized');
        } else {
            console.warn('jQuery or testimonials carousel not found');
        }
    }

    // Setup animations
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe testimonial cards
        const testimonialCards = document.querySelectorAll('.testimonials-component .testimonial-card');
        testimonialCards.forEach(card => observer.observe(card));
    }

    // Public method to destroy testimonials component
    destroy() {
        if (this.carousel && this.isInitialized) {
            this.carousel.trigger('destroy.owl.carousel');
            this.isInitialized = false;
        }
    }
}

// Initialize testimonials component
let testimonialsComponentInitialized = false;
const initializeTestimonialsComponent = () => {
    if (testimonialsComponentInitialized) return;
    new TestimonialsComponent();
    testimonialsComponentInitialized = true;
};

document.addEventListener('DOMContentLoaded', initializeTestimonialsComponent);
document.addEventListener('componentsLoaded', initializeTestimonialsComponent);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialsComponent;
}
