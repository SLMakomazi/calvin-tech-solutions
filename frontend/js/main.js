// ===================================
// FUTURISTIC IT COMPANY WEBSITE JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initScrollAnimations();
    initHeroAnimations();
    initTeamSlider();
    initTestimonialSlider();
    initContactForm();
    initStatsCounters();
    initNavbarScroll();
    initSmoothScrolling();
    initParallaxEffects();
    initMobileVideo();
});

// ===================================
// MOBILE MENU FUNCTIONALITY
// ===================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!hamburger) {
        console.error('Hamburger menu not found!');
        return;
    }

    if (!mobileMenuOverlay) {
        console.error('Mobile menu overlay not found!');
        return;
    }

    hamburger.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on overlay click
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===================================
// NAVBAR SCROLL BEHAVIOR
// ===================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 15, 28, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.05)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });
}

// ===================================
// SMOOTH SCROLLING
// ===================================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ===================================
// HERO SECTION ANIMATIONS
// ===================================
function initHeroAnimations() {
    const titleLines = document.querySelectorAll('.title-line');
    const subtitle = document.querySelector('.hero-subtitle');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    // Enhanced typing effect for subtitle
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1500);
    }
    
    // Add glow pulse effect to highlight
    const highlight = document.querySelector('.title-line.highlight');
    if (highlight) {
        setInterval(() => {
            highlight.style.textShadow = '0 0 30px rgba(31, 111, 235, 0.8)';
            setTimeout(() => {
                highlight.style.textShadow = '0 0 50px rgba(31, 111, 235, 1)';
            }, 1000);
        }, 2000);
    }
}

// ===================================
// PARALLAX EFFECTS
// ===================================
function initParallaxEffects() {
    const heroContent = document.querySelector('.hero-content');
    const glowLines = document.querySelector('.glow-lines');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
        
        if (glowLines) {
            glowLines.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    const revealLeftElements = document.querySelectorAll('.reveal-left');
    const revealRightElements = document.querySelectorAll('.reveal-right');
    const revealScaleElements = document.querySelectorAll('.reveal-scale');
    
    // Add reveal classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionHeader = section.querySelector('.section-header');
        const cards = section.querySelectorAll('.service-card, .feature-card, .value-card, .stat-card, .team-member, .testimonial-card, .info-card');
        
        if (sectionHeader) sectionHeader.classList.add('reveal');
        cards.forEach((card, index) => {
            card.classList.add('reveal-scale');
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// TEAM SLIDER
// ===================================
function initTeamSlider() {
    const teamMembers = document.querySelector('.team-members');
    const prevBtn = document.querySelector('.team-prev');
    const nextBtn = document.querySelector('.team-next');
    const dotsContainer = document.querySelector('.team-dots');
    
    if (!teamMembers || !prevBtn || !nextBtn) return;
    
    const members = document.querySelectorAll('.team-member');
    const totalMembers = members.length;
    
    if (totalMembers === 0) return;
    
    let currentIndex = 0;
    
    // Handle image loading errors
    const images = document.querySelectorAll('.member-image img');
    images.forEach(img => {
        img.onerror = function() {
            // Create fallback with initials
            const memberInfo = this.closest('.team-member').querySelector('.member-info h3');
            const name = memberInfo ? memberInfo.textContent : 'Team';
            const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
            
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, var(--primary-gradient));
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--white);
                font-size: 3rem;
                font-family: var(--font-orbitron);
                font-weight: bold;
            `;
            fallback.textContent = initials;
            
            this.parentNode.replaceChild(fallback, this);
        };
    });
    
    // Create dots
    for (let i = 0; i < totalMembers; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.team-dots .dot');
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function updateSlider() {
        // Update active state for all members
        members.forEach((member, index) => {
            member.classList.toggle('active', index === currentIndex);
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Scroll to center the active member
        if (members[currentIndex]) {
            const activeMember = members[currentIndex];
            const containerWidth = teamMembers.scrollWidth;
            const containerVisibleWidth = teamMembers.parentElement.offsetWidth;
            const memberWidth = activeMember.offsetWidth;
            const memberOffsetLeft = activeMember.offsetLeft;
            
            // Calculate the perfect center position
            const scrollTo = memberOffsetLeft - (containerVisibleWidth / 2) + (memberWidth / 2);
            
            teamMembers.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalMembers;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalMembers) % totalMembers;
        updateSlider();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Add click event to team members
    members.forEach((member, index) => {
        member.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Auto-slide
    setInterval(nextSlide, 5000);
    
    // Initialize first slide
    updateSlider();
}

// ===================================
// TESTIMONIAL SLIDER
// ===================================
function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const cards = document.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    
    if (totalCards === 0) return;
    
    let currentIndex = 0;
    
    // Set first card as active initially
    cards[0].classList.add('active');
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function updateSlider() {
        // Update active state for all cards
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
        
        // Scroll to center the active card
        if (cards[currentIndex]) {
            const activeCard = cards[currentIndex];
            const containerWidth = track.scrollWidth;
            const containerVisibleWidth = track.parentElement.offsetWidth;
            const cardWidth = activeCard.offsetWidth;
            const cardOffsetLeft = activeCard.offsetLeft;
            
            // Calculate the perfect center position
            const scrollTo = cardOffsetLeft - (containerVisibleWidth / 2) + (cardWidth / 2);
            
            track.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateSlider();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Add click event to testimonial cards
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Auto-advance every 6 seconds
    setInterval(nextSlide, 6000);
    
    // Initialize first slide
    updateSlider();
}

// ===================================
// STATS COUNTERS
// ===================================
function initStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.dataset.target);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                        entry.target.classList.add('counted');
                    }
                };
                
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// ===================================
// CONTACT FORM
// ===================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Add loading state to button
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        submitBtn.classList.add('loading');
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual backend call)
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.classList.remove('loading');
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        }, 2000);
    });
    
    // Add floating label animations
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        input.addEventListener('focus', () => {
            label.style.color = '#00AEEF';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.color = '';
            }
        });
    });
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? '#10b981' : '#00AEEF',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===================================
// MOUSE MOVE EFFECTS
// ===================================
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.service-card, .feature-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
});

// ===================================
// RESET CARD TRANSFORMS ON MOUSE LEAVE
// ===================================
document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.service-card, .feature-card');
    cards.forEach(card => {
        card.style.transform = '';
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
let ticking = false;
function requestTick(callback) {
    if (!ticking) {
        requestAnimationFrame(callback);
        ticking = true;
        setTimeout(() => { ticking = false; }, 100);
    }
}

// ===================================
// LAZY LOADING FOR IMAGES
// ===================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// ===================================
// PRELOADER
// ===================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// ===================================
// ERROR HANDLING
// ===================================
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// ===================================
// CONSOLE BRANDING
// ===================================
console.log('%c Calvin Tech Solutions', 'font-size: 20px; font-weight: bold; color: #00AEEF;');
console.log('%cEngineering the Future of Technology', 'font-size: 14px; color: #1F6FEB;');
console.log('%cBuilt with passion and innovation in South Africa ', 'font-size: 12px; color: #A0A0A0;');

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Sample data for services (can be replaced with API call)
const services = [
    {
        icon: 'search',
        title: 'Search Engine Optimisation',
        description: 'Improve your online visibility and organic traffic.',
        bullets: [
            'Keyword research',
            'Link building and content creation',
            'Local SEO',
            'Analytics & Reports',
            'Technical SEO'
        ]
    },
    {
        icon: 'shopping-cart',
        title: 'E-commerce Solutions',
        description: 'Complete e-commerce solutions for your business.',
        bullets: [
            'Platform Solutions Set-Up',
            'Payment Gateways',
            'Inventory and Order Management',
            'Shipping and Fulfilment',
            'Marketing and Analytics',
            'Security & Compliance'
        ]
    },
    {
        icon: 'code',
        title: 'Software Development',
        description: 'Custom software solutions tailored to your needs.',
        bullets: [
            'Web Application Design',
            'Mobile App Development',
            'Custom Software Development',
            'Database Management & Design',
            'Business Intelligence',
            'System Integration Services'
        ]
    },
    {
        icon: 'briefcase',
        title: 'Business Solutions',
        description: 'Comprehensive business technology solutions.',
        bullets: [
            'Point of Sale Systems',
            'CCTV Solutions',
            'Data Backup & Recovery',
            'IT Consulting',
            'Hardware & Software Sales',
            'Network Setup & Management',
            'Office Setup'
        ]
    },
    {
        icon: 'paint-brush',
        title: 'Business Design & Branding',
        description: 'Create a strong brand identity and visual presence.',
        bullets: [
            'Logo Design',
            'Brand Identity',
            'Business Cards & Stationery',
            'Marketing Materials',
            'Social Media Graphics',
            'Brand Guidelines'
        ]
    },
    {
        icon: 'cogs',
        title: 'Other Solutions',
        description: 'Additional services to support your business.',
        bullets: [
            'Technical Services',
            'Support Services',
            'Maintenance Services',
            'Training Service'
        ]
    }
];

// Populate services section
const servicesGrid = document.querySelector('.services-grid');
if (servicesGrid) {
    servicesGrid.innerHTML = services.map(service => `
        <div class="feature-card">
            <i class="fas fa-${service.icon}"></i>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <ul class="service-bullets">
                ${service.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Sample news data (can be replaced with API call)
const news = [
    {
        title: 'New Office Location',
        date: 'May 26, 2025',
        excerpt: 'We are excited to announce the opening of our new office in the heart of the city.'
    },
    {
        title: 'Partnership Announcement',
        date: 'May 20, 2025',
        excerpt: 'We are proud to partner with TechCorp to deliver innovative solutions to our clients.'
    },
    {
        title: 'Product Launch',
        date: 'May 15, 2025',
        excerpt: 'Introducing our latest product that will revolutionize the industry.'
    }
];

// Populate news section
const newsGrid = document.querySelector('.news-grid');
if (newsGrid) {
    newsGrid.innerHTML = news.map(item => `
        <div class="feature-card">
            <h3>${item.title}</h3>
            <p class="date">${item.date}</p>
            <p>${item.excerpt}</p>
            <a href="#" class="btn btn-secondary" style="margin-top: 1rem;">Read More</a>
        </div>
    `).join('');
}


// Team Slider
const teamSlider = () => {
    const teamMembers = document.querySelector('.team-members');
    const prevBtn = document.querySelector('.team-prev');
    const nextBtn = document.querySelector('.team-next');
    const dotsContainer = document.querySelector('.team-dots');
    
    if (!teamMembers || !prevBtn || !nextBtn) return;
    
    const members = document.querySelectorAll('.team-member');
    const totalMembers = members.length;
    
    if (totalMembers === 0) return;
    
    let currentIndex = 0; // Start with first member as center
    
    // Clone all members for infinite loop effect
    const clonedMembers = [];
    members.forEach(member => {
        const clone = member.cloneNode(true);
        clonedMembers.push(clone);
    });
    
    // Clear and repopulate with cloned members for infinite scroll
    teamMembers.innerHTML = '';
    clonedMembers.forEach(member => {
        teamMembers.appendChild(member);
    });
    
    // Create dots
    for (let i = 0; i < totalMembers; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.team-dots .dot');
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function updateSlider() {
        // Update active state for all members
        clonedMembers.forEach((member, index) => {
            // Calculate which position this member should be in
            const relativeIndex = (index - currentIndex + totalMembers) % totalMembers;
            const position = relativeIndex - 1; // -1, 0, 1, 2 for positions
            
            // Apply styles based on position
            if (position === 0) {
                // Center member - focused
                member.classList.add('active');
            } else if (position === 1 || position === -1) {
                // Side members - blurred and reduced
                member.classList.remove('active');
            } else {
                // Far members - hidden
                member.classList.remove('active');
                member.style.opacity = '0';
                member.style.visibility = 'hidden';
                return;
            }
            
            member.style.opacity = '';
            member.style.visibility = '';
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Calculate transform to center the active member
        const cardWidth = 320;
        const gap = 32;
        const centerOffset = (cardWidth + gap) * currentIndex;
        
        // Apply transform to center the active member
        teamMembers.style.transform = `translateX(-${centerOffset}px)`;
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalMembers;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalMembers) % totalMembers;
        updateSlider();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Add click event to team members
    clonedMembers.forEach((member, index) => {
        member.addEventListener('click', () => {
            goToSlide(index % totalMembers);
        });
    });
    
    // Auto-slide
    setInterval(nextSlide, 5000);
    
    // Initialize with first slide
    updateSlider();
};

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .about-content, .contact-container > div');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial animation
window.addEventListener('load', () => {
    // Add animation classes after page load
    document.querySelectorAll('.feature-card, .about-content, .contact-container > div').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial animation
    setTimeout(animateOnScroll, 100);
});

// Animate on scroll
window.addEventListener('scroll', animateOnScroll);

// Sticky header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===================================
// MOBILE VIDEO PLAYBACK
// ===================================
function initMobileVideo() {
    const video = document.getElementById('hero-video');
    
    if (!video) return;
    
    // Try to play the video immediately
    const playVideo = () => {
        video.play().catch(error => {
            console.log('Autoplay prevented, trying user interaction trigger');
            
            // Fallback: Try to play on first user interaction
            const enableVideo = () => {
                video.play().catch(e => console.log('Video play failed:', e));
                document.removeEventListener('touchstart', enableVideo);
                document.removeEventListener('click', enableVideo);
            };
            
            document.addEventListener('touchstart', enableVideo, { once: true });
            document.addEventListener('click', enableVideo, { once: true });
        });
    };
    
    // Try to play immediately
    playVideo();
    
    // Also try when page becomes visible
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && video.paused) {
            playVideo();
        }
    });
    
    // Try when window gets focus
    window.addEventListener('focus', () => {
        if (video.paused) {
            playVideo();
        }
    });
}
