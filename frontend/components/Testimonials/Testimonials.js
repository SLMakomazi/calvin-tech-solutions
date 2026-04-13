// ===================================
// TESTIMONIALS COMPONENT JAVASCRIPT
// ===================================
class TestimonialsComponent {
    constructor() {
        this.currentIndex = 0;
        this.totalCards = 0;
        this.autoPlayInterval = null;
        this.isAutoPlaying = true;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.init();
    }

    init() {
        this.setupCarousel();
        this.setupNavigation();
        this.setupTouchSupport();
        this.setupKeyboardSupport();
        this.setupAutoPlay();
        this.setupScrollAnimations();
        this.setupAnalytics();
        this.createIndicators();
    }

    // Setup carousel functionality
    setupCarousel() {
        const cards = document.querySelectorAll('.testimonials-component .testimonial-card');
        this.totalCards = cards.length;
        
        if (this.totalCards === 0) return;
        
        // Set initial positions
        this.updateCarousel();
        
        // Add click handlers to cards
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.goToCard(index);
                this.trackTestimonialInteraction(index, 'card_click');
            });
        });
    }

    // Update carousel positions
    updateCarousel() {
        const cards = document.querySelectorAll('.testimonials-component .testimonial-card');
        const track = document.querySelector('.testimonials-component .carousel-track');
        
        cards.forEach((card, index) => {
            card.classList.remove('active');
            
            // Calculate position relative to current index
            const offset = index - this.currentIndex;
            const angle = offset * 60; // degrees
            const translateZ = offset === 0 ? 0 : -150;
            const translateX = offset * 120;
            const scale = offset === 0 ? 1 : 0.8;
            const opacity = offset === 0 ? 1 : 0.4;
            
            // Apply 3D transforms
            card.style.transform = `
                translateX(${translateX}px) 
                translateZ(${translateZ}px) 
                rotateY(${angle}deg) 
                scale(${scale})
            `;
            card.style.opacity = opacity;
            
            // Mark active card
            if (index === this.currentIndex) {
                card.classList.add('active');
            }
        });
        
        // Update track position for smooth transitions
        track.style.transform = `translateX(${-this.currentIndex * 120}px)`;
        
        // Update indicators
        this.updateIndicators();
    }

    // Setup navigation buttons
    setupNavigation() {
        const prevBtn = document.querySelector('.testimonials-component .nav-prev');
        const nextBtn = document.querySelector('.testimonials-component .nav-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevCard();
                this.trackTestimonialInteraction(this.currentIndex, 'nav_prev');
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextCard();
                this.trackTestimonialInteraction(this.currentIndex, 'nav_next');
            });
        }
    }

    // Setup touch support for mobile
    setupTouchSupport() {
        const carousel = document.querySelector('.testimonials-component .carousel-container');
        
        if (!carousel) return;
        
        carousel.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    }

    // Handle swipe gestures
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextCard();
                this.trackTestimonialInteraction(this.currentIndex, 'swipe_next');
            } else {
                this.prevCard();
                this.trackTestimonialInteraction(this.currentIndex, 'swipe_prev');
            }
        }
    }

    // Setup keyboard support
    setupKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            const testimonialsSection = document.querySelector('.testimonials-component');
            
            // Only handle keyboard events when testimonials section is visible
            if (!testimonialsSection || !this.isElementInViewport(testimonialsSection)) {
                return;
            }
            
            if (e.key === 'ArrowLeft') {
                this.prevCard();
                this.trackTestimonialInteraction(this.currentIndex, 'keyboard_prev');
            } else if (e.key === 'ArrowRight') {
                this.nextCard();
                this.trackTestimonialInteraction(this.currentIndex, 'keyboard_next');
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

    // Setup auto-play functionality
    setupAutoPlay() {
        const startAutoPlay = () => {
            if (this.isAutoPlaying) {
                this.autoPlayInterval = setInterval(() => {
                    this.nextCard();
                }, 5000);
            }
        };
        
        const stopAutoPlay = () => {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        };
        
        // Start auto-play
        startAutoPlay();
        
        // Pause on hover
        const carousel = document.querySelector('.testimonials-component .carousel-container');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                stopAutoPlay();
            });
            
            carousel.addEventListener('mouseleave', () => {
                if (this.isAutoPlaying) {
                    startAutoPlay();
                }
            });
        }
        
        // Pause on touch
        carousel.addEventListener('touchstart', () => {
            stopAutoPlay();
        }, { passive: true });
        
        carousel.addEventListener('touchend', () => {
            if (this.isAutoPlaying) {
                startAutoPlay();
            }
        }, { passive: true });
    }

    // Navigation methods
    nextCard() {
        this.currentIndex = (this.currentIndex + 1) % this.totalCards;
        this.updateCarousel();
    }

    prevCard() {
        this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
        this.updateCarousel();
    }

    goToCard(index) {
        if (index >= 0 && index < this.totalCards) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }

    // Create carousel indicators
    createIndicators() {
        const carousel = document.querySelector('.testimonials-component .carousel-3d');
        if (!carousel || this.totalCards === 0) return;
        
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';
        
        for (let i = 0; i < this.totalCards; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'indicator';
            indicator.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            
            if (i === this.currentIndex) {
                indicator.classList.add('active');
            }
            
            indicator.addEventListener('click', () => {
                this.goToCard(i);
                this.trackTestimonialInteraction(i, 'indicator_click');
            });
            
            indicatorsContainer.appendChild(indicator);
        }
        
        carousel.appendChild(indicatorsContainer);
    }

    // Update indicators
    updateIndicators() {
        const indicators = document.querySelectorAll('.testimonials-component .indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    // Setup scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.trackTestimonialInteraction(this.currentIndex, 'impression');
                }
            });
        }, observerOptions);

        const cards = document.querySelectorAll('.testimonials-component .testimonial-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // Setup analytics tracking
    setupAnalytics() {
        // Track testimonial views
        const cards = document.querySelectorAll('.testimonials-component .testimonial-card');
        cards.forEach((card, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        this.trackTestimonialInteraction(index, 'view');
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(card);
        });
    }

    // Track testimonial interactions
    trackTestimonialInteraction(index, action) {
        const card = document.querySelectorAll('.testimonials-component .testimonial-card')[index];
        const author = card ? card.querySelector('h4').textContent : 'Unknown';
        
        console.log(`Testimonial interaction: ${author} - ${action}`);
        
        // Integration with analytics service would go here
        if (typeof gtag !== 'undefined') {
            gtag('event', 'testimonial_interaction', {
                author: author,
                index: index,
                action: action,
                category: 'testimonials'
            });
        }
    }

    // Public method to get current testimonial
    getCurrentTestimonial() {
        const card = document.querySelectorAll('.testimonials-component .testimonial-card')[this.currentIndex];
        if (!card) return null;
        
        return {
            author: card.querySelector('h4').textContent,
            title: card.querySelector('.author-title').textContent,
            text: card.querySelector('.testimonial-text').textContent,
            index: this.currentIndex
        };
    }

    // Public method to add new testimonial
    addTestimonial(testimonialData) {
        const track = document.querySelector('.testimonials-component .carousel-track');
        if (!track) return;
        
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.dataset.index = this.totalCards;
        
        card.innerHTML = `
            <div class="card-avatar">
                <img src="${testimonialData.avatar || 'assets/avatar-default.jpg'}" 
                     alt="${testimonialData.author}" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMUYxRjIzIi8+CjxwYXRoIGQ9Ik0zMiAyMEMzOS43MzIwIDIwIDQ2IDI2LjI2ODAgNDYgMzRDNDYgNDEuNzMyIDM5LjczMjAgNDggMzIgNDhDMjQuMjY4IDQ4IDE4IDQxLjczMiAxOCAzNEMxOCAyNi4yNjggMjQuMjY4IDIwIDMyIDIwWiIgZmlsbD0iIzAwQUVFRiIvPgo8cGF0aCBkPSJNMzIgMjhDMzQuMjA5MSAyOCAzNiAyOS43OTA5IDM2IDMyQzM2IDM0LjIwOTEgMzQuMjA5MSAzNiAzMiAzNkMyOS43OTA5IDM2IDI4IDM0LjIwOTEgMjggMzJDMjggMjkuNzkwOSAyOS43OTA5IDI4IDMyIDI4WiIgZmlsbD0iIzFGMUYyMyIvPgo8L3N2Zz4K'">
            </div>
            <div class="card-content">
                <div class="quote-icon">
                    <i class="fas fa-quote-left"></i>
                </div>
                <p class="testimonial-text">"${testimonialData.text}"</p>
                <div class="author-info">
                    <h4>${testimonialData.author}</h4>
                    <p class="author-title">${testimonialData.title}</p>
                </div>
            </div>
        `;
        
        track.appendChild(card);
        this.totalCards++;
        
        // Recreate indicators
        const indicatorsContainer = document.querySelector('.testimonials-component .carousel-indicators');
        if (indicatorsContainer) {
            indicatorsContainer.remove();
        }
        this.createIndicators();
        
        // Add click handler
        card.addEventListener('click', () => {
            this.goToCard(this.totalCards - 1);
            this.trackTestimonialInteraction(this.totalCards - 1, 'card_click');
        });
    }

    // Public method to destroy testimonials component
    destroy() {
        // Clear auto-play interval
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        
        // Remove event listeners
        const prevBtn = document.querySelector('.testimonials-component .nav-prev');
        const nextBtn = document.querySelector('.testimonials-component .nav-next');
        const carousel = document.querySelector('.testimonials-component .carousel-container');
        
        if (prevBtn) prevBtn.removeEventListener('click', this.prevCard);
        if (nextBtn) nextBtn.removeEventListener('click', this.nextCard);
        if (carousel) {
            carousel.removeEventListener('touchstart', this.setupTouchSupport);
            carousel.removeEventListener('touchend', this.setupTouchSupport);
            carousel.removeEventListener('mouseenter', this.stopAutoPlay);
            carousel.removeEventListener('mouseleave', this.startAutoPlay);
        }
        
        document.removeEventListener('keydown', this.setupKeyboardSupport);
    }
}

// Initialize testimonials component when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsComponent();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialsComponent;
}
