// ===================================
// HERO COMPONENT JAVASCRIPT
// ===================================
class HeroComponent {
    constructor() {
        this.init();
    }

    init() {
        this.setupVideoBackground();
        this.setupTypingEffect();
        this.setupCTAButtons();
        this.setupScrollEffects();
        this.setupParticles();
        this.setupAnalytics();
        this.setupKeyboardNavigation();
        this.setupLoadingState();
    }

    // Setup video background with fallback
    setupVideoBackground() {
        const video = document.querySelector('.hero-component #hero-video');
        const videoBackground = document.querySelector('.hero-component .video-background');
        
        if (video) {
            // Video loading states
            video.addEventListener('loadstart', () => {
                videoBackground.classList.add('loading');
            });
            
            video.addEventListener('canplay', () => {
                videoBackground.classList.remove('loading');
                videoBackground.classList.add('loaded');
                this.trackHeroInteraction('video_loaded');
            });
            
            video.addEventListener('error', () => {
                console.warn('Hero video failed to load, using fallback');
                this.handleVideoError();
            });
            
            // Optimize video playback
            video.playbackRate = 0.8; // Slower for better performance
            
            // Pause video when not visible
            this.setupVideoVisibility(video);
        }
    }

    // Handle video loading error
    handleVideoError() {
        const videoBackground = document.querySelector('.hero-component .video-background');
        if (videoBackground) {
            videoBackground.style.background = 'linear-gradient(135deg, var(--primary-bg), var(--secondary-bg))';
        }
        this.trackHeroInteraction('video_error');
    }

    // Setup video visibility optimization
    setupVideoVisibility(video) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(video);
    }

    // Setup typing effect for subtitle
    setupTypingEffect() {
        const typingElement = document.querySelector('.hero-component .typing-text');
        if (!typingElement) return;
        
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let index = 0;
        const typeSpeed = 50;
        
        const typeChar = () => {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, typeSpeed);
            } else {
                // Remove cursor after typing completes
                setTimeout(() => {
                    typingElement.style.setProperty('--cursor-opacity', '0');
                }, 2000);
                this.trackHeroInteraction('typing_completed');
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeChar, 1000);
    }

    // Setup CTA button interactions
    setupCTAButtons() {
        const buttons = document.querySelectorAll('.hero-component .cta-buttons .btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleCTAClick(button, e);
            });
            
            button.addEventListener('mouseenter', () => {
                this.animateButton(button, true);
            });
            
            button.addEventListener('mouseleave', () => {
                this.animateButton(button, false);
            });
        });
    }

    // Handle CTA button clicks
    handleCTAClick(button, event) {
        const buttonText = button.textContent.trim();
        const href = button.getAttribute('href');
        
        // Track interaction
        this.trackHeroInteraction('cta_click', { button: buttonText, href: href });
        
        // Visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Smooth scroll for anchor links
        if (href && href.startsWith('#')) {
            event.preventDefault();
            this.smoothScrollTo(href);
        }
    }

    // Smooth scroll to section
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const offset = 80; // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Animate button hover effects
    animateButton(button, isHover) {
        const glowEffect = button.querySelector('.btn-glow') || this.createButtonGlow(button);
        
        if (isHover) {
            glowEffect.style.opacity = '1';
            glowEffect.style.transform = 'scale(1.2)';
        } else {
            glowEffect.style.opacity = '0';
            glowEffect.style.transform = 'scale(1)';
        }
    }

    // Create button glow effect
    createButtonGlow(button) {
        const glow = document.createElement('div');
        glow.className = 'btn-glow';
        glow.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(0, 174, 239, 0.3), transparent);
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
            z-index: -1;
        `;
        
        button.appendChild(glow);
        return glow;
    }

    // Setup scroll effects
    setupScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-component');
            
            if (heroSection) {
                // Parallax effect
                heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
                
                // Fade out effect
                const opacity = Math.max(0, 1 - (scrolled / window.innerHeight));
                heroSection.style.opacity = opacity;
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Setup particle effects
    setupParticles() {
        const heroSection = document.querySelector('.hero-component');
        if (!heroSection) return;
        
        // Create particles container
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        heroSection.appendChild(particlesContainer);
        
        // Create particles
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(particlesContainer, i);
        }
    }

    // Create individual particle
    createParticle(container, index) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position and animation
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 10 + Math.random() * 20;
        
        particle.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;
        
        container.appendChild(particle);
    }

    // Setup analytics tracking
    setupAnalytics() {
        // Track hero section visibility
        const heroSection = document.querySelector('.hero-component');
        if (heroSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.trackHeroInteraction('section_visible');
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(heroSection);
        }
        
        // Track time spent on hero
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            this.trackHeroInteraction('time_spent', { seconds: timeSpent });
        });
    }

    // Setup keyboard navigation
    setupKeyboardNavigation() {
        const buttons = document.querySelectorAll('.hero-component .cta-buttons .btn');
        
        buttons.forEach((button, index) => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
                
                // Arrow key navigation
                if (e.key === 'ArrowRight' && index < buttons.length - 1) {
                    buttons[index + 1].focus();
                } else if (e.key === 'ArrowLeft' && index > 0) {
                    buttons[index - 1].focus();
                }
            });
        });
    }

    // Setup loading state
    setupLoadingState() {
        const heroSection = document.querySelector('.hero-component');
        
        // Add loading class initially
        heroSection.classList.add('loading');
        
        // Remove loading class when everything is ready
        window.addEventListener('load', () => {
            setTimeout(() => {
                heroSection.classList.remove('loading');
                heroSection.classList.add('loaded');
                this.trackHeroInteraction('hero_loaded');
            }, 500);
        });
    }

    // Track hero interactions
    trackHeroInteraction(action, data = {}) {
        console.log(`Hero interaction: ${action}`, data);
        
        // Integration with analytics service would go here
        if (typeof gtag !== 'undefined') {
            gtag('event', 'hero_interaction', {
                action: action,
                category: 'hero',
                ...data
            });
        }
    }

    // Public method to update hero content
    updateHeroContent(content) {
        const titleElement = document.querySelector('.hero-component .hero-title');
        const subtitleElement = document.querySelector('.hero-component .hero-subtitle');
        
        if (titleElement && content.title) {
            titleElement.innerHTML = content.title;
        }
        
        if (subtitleElement && content.subtitle) {
            const typingElement = subtitleElement.querySelector('.typing-text');
            if (typingElement) {
                typingElement.textContent = content.subtitle;
                this.setupTypingEffect(); // Restart typing animation
            }
        }
        
        this.trackHeroInteraction('content_updated', content);
    }

    // Public method to add new CTA button
    addCTAButton(text, href, className = 'btn-primary') {
        const ctaButtons = document.querySelector('.hero-component .cta-buttons');
        if (!ctaButtons) return;
        
        const button = document.createElement('a');
        button.href = href;
        button.className = `btn ${className}`;
        button.textContent = text;
        
        button.addEventListener('click', (e) => {
            this.handleCTAClick(button, e);
        });
        
        button.addEventListener('mouseenter', () => {
            this.animateButton(button, true);
        });
        
        button.addEventListener('mouseleave', () => {
            this.animateButton(button, false);
        });
        
        ctaButtons.appendChild(button);
        this.trackHeroInteraction('cta_added', { text, href, className });
    }

    // Public method to destroy hero component
    destroy() {
        // Remove event listeners
        const buttons = document.querySelectorAll('.hero-component .cta-buttons .btn');
        buttons.forEach(button => {
            button.removeEventListener('click', this.handleCTAClick);
            button.removeEventListener('mouseenter', this.animateButton);
            button.removeEventListener('mouseleave', this.animateButton);
        });
        
        // Remove scroll listener
        window.removeEventListener('scroll', this.setupScrollEffects);
        
        // Remove particles
        const particles = document.querySelector('.hero-component .particles');
        if (particles) {
            particles.remove();
        }
        
        // Clean up video
        const video = document.querySelector('.hero-component #hero-video');
        if (video) {
            video.pause();
            video.src = '';
        }
    }
}

let heroComponentInitialized = false;
const initializeHeroComponent = () => {
    if (heroComponentInitialized) return;
    new HeroComponent();
    heroComponentInitialized = true;
};

document.addEventListener('DOMContentLoaded', initializeHeroComponent);
document.addEventListener('componentsLoaded', initializeHeroComponent);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroComponent;
}
