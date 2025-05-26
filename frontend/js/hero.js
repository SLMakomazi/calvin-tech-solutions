/**
 * Calvin Tech Solutions - Hero Section JavaScript
 * Handles hero section animations and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero animations
    initHeroAnimations();
    
    // Initialize particle effect if using particles.js
    if (typeof particlesJS !== 'undefined') {
        initParticles();
    }
    
    // Initialize typewriter effect if needed
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        initTypewriter(typewriterElement);
    }
});

/**
 * Initialize hero animations
 */
function initHeroAnimations() {
    // Use GSAP for more complex animations if available
    if (typeof gsap !== 'undefined') {
        // Animate hero content
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) {
            gsap.from(heroContent, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                delay: 0.3
            });
        }
        
        if (heroImage) {
            gsap.from(heroImage, {
                opacity: 0,
                x: 50,
                duration: 1,
                ease: 'power3.out',
                delay: 0.5
            });
        }
        
        // Animate floating elements
        const floatingElements = document.querySelectorAll('.floating');
        floatingElements.forEach((el, index) => {
            const duration = 3 + Math.random() * 2; // Random duration between 3-5s
            const y = 10 + Math.random() * 20; // Random movement between 10-30px
            
            gsap.to(el, {
                y: y,
                duration: duration,
                repeat: -1, // Infinite repeat
                yoyo: true, // Go back and forth
                ease: 'sine.inOut',
                delay: index * 0.2 // Stagger the animations
            });
        });
    }
}

/**
 * Initialize particle.js effect
 */
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#3b82f6' // Primary color
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#3b82f6',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

/**
 * Initialize typewriter effect
 */
function initTypewriter(element) {
    const words = JSON.parse(element.getAttribute('data-words') || '["Web Development", "Mobile Apps", "UI/UX Design"]');
    const speed = parseInt(element.getAttribute('data-speed') || '100');
    const deleteSpeed = parseInt(element.getAttribute('data-delete-speed') || '50');
    const delay = parseInt(element.getAttribute('data-delay') || '2000');
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeTimeout;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add character
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Determine typing speed
        let typeSpeed = isDeleting ? deleteSpeed : speed;
        
        if (!isDeleting && charIndex === currentWord.length) {
            // At the end of the word, pause before deleting
            typeSpeed = delay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word deleted, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        clearTimeout(typeTimeout);
        typeTimeout = setTimeout(type, typeSpeed);
    }
    
    // Start the typewriter effect
    type();
    
    // Clean up on component unmount
    return () => clearTimeout(typeTimeout);
}

/**
 * Initialize video background if present
 */
function initVideoBackground() {
    const videoBg = document.querySelector('.video-background');
    
    if (videoBg) {
        // Play video when it's ready
        const video = videoBg.querySelector('video');
        if (video) {
            video.muted = true;
            video.loop = true;
            
            // Play video when it's loaded
            const playPromise = video.play();
            
            // Handle autoplay restrictions
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Autoplay was prevented, show fallback image
                    const poster = video.getAttribute('poster');
                    if (poster) {
                        videoBg.style.backgroundImage = `url(${poster})`;
                        video.style.display = 'none';
                    }
                });
            }
        }
    }
}

// Export functions if using modules
// export { initHeroAnimations, initParticles, initTypewriter, initVideoBackground };