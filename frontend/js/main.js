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
    
    let currentIndex = 0;
    const members = document.querySelectorAll('.team-member');
    const totalMembers = members.length;
    
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
        const offset = -currentIndex * 100;
        teamMembers.style.transform = `translateX(${offset}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
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
    
    // Auto-slide
    setInterval(nextSlide, 5000);
}

// ===================================
// TESTIMONIAL SLIDER
// ===================================
function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const cards = document.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    
    function goToSlide(index) {
        currentIndex = index;
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        goToSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        goToSlide(currentIndex);
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto-slide
    setInterval(nextSlide, 6000);
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

// Sample testimonials data (can be replaced with API call)
const testimonials = [
    {
        quote: "Calvin Tech Solutions transformed our online presence. Their team delivered beyond our expectations with their SEO expertise.",
        name: "Sarah Johnson",
        position: "CEO, TechStart Inc.",
        image: "https://randomuser.me/api/portraits/women/43.jpg"
    },
    {
        quote: "Professional, efficient, and delivered on time. Their e-commerce solution helped us increase our online sales by 150%.",
        name: "Michael Chen",
        position: "Marketing Director, InnovateCo",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        quote: "Outstanding service and support. Their custom software solution streamlined our business operations significantly.",
        name: "Emily Rodriguez",
        position: "Founder, DesignHub",
        image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
        quote: "The business solutions provided by Calvin Tech have been game-changing for our retail operations. Highly recommended!",
        name: "David Kim",
        position: "Operations Manager, RetailPro",
        image: "https://randomuser.me/api/portraits/men/75.jpg"
    }
];

// Populate testimonials section with slider
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    // Create slider container
    testimonialSlider.innerHTML = `
        <div class="testimonial-slide active">
            ${testimonials[0].quote}
            <div class="testimonial-author">
                <img src="${testimonials[0].image}" alt="${testimonials[0].name}" class="testimonial-img">
                <div class="author-info">
                    <h4>${testimonials[0].name}</h4>
                    <p class="position">${testimonials[0].position}</p>
                </div>
            </div>
        </div>
        <div class="testimonial-controls">
            <button class="testimonial-prev"><i class="fas fa-chevron-left"></i></button>
            <div class="testimonial-dots">
                ${testimonials.map((_, index) => 
                    `<span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`).join('')}
            </div>
            <button class="testimonial-next"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;

    // Add event listeners for slider controls
    let currentSlide = 0;
    const slides = []; // Will be populated with testimonial content
    
    // Create slides array with testimonial content
    testimonials.forEach((testimonial, index) => {
        if (index > 0) { // Skip first one as it's already in the HTML
            const slide = document.createElement('div');
            slide.className = 'testimonial-slide';
            slide.innerHTML = `
                ${testimonial.quote}
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-img">
                    <div class="author-info">
                        <h4>${testimonial.name}</h4>
                        <p class="position">${testimonial.position}</p>
                    </div>
                </div>
            `;
            testimonialSlider.insertBefore(slide, testimonialSlider.querySelector('.testimonial-controls'));
        }
        slides.push(testimonialSlider.querySelectorAll('.testimonial-slide')[index]);
    });

    // Function to update active slide
    function updateSlide(index) {
        // Update active class on slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update active dot
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }

    // Next/previous controls
    document.querySelector('.testimonial-next')?.addEventListener('click', () => {
        const nextSlide = (currentSlide + 1) % slides.length;
        updateSlide(nextSlide);
    });

    document.querySelector('.testimonial-prev')?.addEventListener('click', () => {
        const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(prevSlide);
    });

    // Dot navigation
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-index'));
            updateSlide(slideIndex);
        });
    });

    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % slides.length;
        updateSlide(nextSlide);
    }, 5000);

    // Pause auto-advancement on hover
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    testimonialSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % slides.length;
            updateSlide(nextSlide);
        }, 5000);
    });
}

// Team Slider
const teamSlider = () => {
    const teamMembers = document.querySelector('.team-members');
    const prevBtn = document.querySelector('.team-prev');
    const nextBtn = document.querySelector('.team-next');
    const dotsContainer = document.querySelector('.team-dots');
    
    // Team members data (you can replace this with your actual team data)
    const teamData = [
        {
            name: "Siseko Makomazi",
            position: "CEO & Founder",
            bio: "A visionary leader from Kayamandi who turned his passion for technology into a thriving business that creates opportunities for others.",
            image: "assets/team/siseko.jpg.jpg"
        },
        // Add more team members here
        // {
        //     name: "Team Member Name",
        //     position: "Position",
        //     bio: "Short bio about the team member and their role in the company.",
        //     image: "path/to/image.jpg"
        // }
    ];

    
    // Initialize slider with team members
    const initTeamSlider = () => {
        // Clear existing content
        teamMembers.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        // Create team member elements
        teamData.forEach((member, index) => {
            // Create team member element
            const memberElement = document.createElement('div');
            memberElement.className = 'team-member';
            memberElement.innerHTML = `
                <div class="member-image">
                    <img src="${member.image}" alt="${member.name}">
                    <div class="social-links">
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p class="position">${member.position}</p>
                    <p class="bio">${member.bio}</p>
                </div>
            `;
            
            // Create dot for navigation
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.setAttribute('data-index', index);
            if (index === 0) dot.classList.add('active');
            
            // Add click event to dot
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            // Append elements
            teamMembers.appendChild(memberElement);
            dotsContainer.appendChild(dot);
        });
        
        // Update slider state
        updateSlider();
    };
    
    // Go to specific slide
    const goToSlide = (index) => {
        const slides = document.querySelectorAll('.team-member');
        const dots = document.querySelectorAll('.dot');
        
        // Update active slide
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            }
        });
        
        // Update active dot
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };
    
    // Update slider state based on scroll position
    const updateSlider = () => {
        const slides = document.querySelectorAll('.team-member');
        const dots = document.querySelectorAll('.dot');
        
        // Update active dot based on scroll position
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(slides).indexOf(entry.target);
                    dots.forEach((dot, i) => {
                        if (i === index) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.5
        });
        
        // Observe each slide
        slides.forEach(slide => observer.observe(slide));
    };
    
    // Navigation event listeners
    prevBtn.addEventListener('click', () => {
        const slides = document.querySelectorAll('.team-member');
        const currentIndex = Array.from(slides).findIndex(slide => {
            const rect = slide.getBoundingClientRect();
            return rect.left >= 0;
        });
        
        const prevIndex = currentIndex <= 0 ? slides.length - 1 : currentIndex - 1;
        goToSlide(prevIndex);
    });

    nextBtn.addEventListener('click', () => {
        const slides = document.querySelectorAll('.team-member');
        const currentIndex = Array.from(slides).findIndex(slide => {
            const rect = slide.getBoundingClientRect();
            return rect.left >= 0;
        });
        
        const nextIndex = currentIndex >= slides.length - 1 ? 0 : currentIndex + 1;
        goToSlide(nextIndex);
    });
    
    // Initialize the slider
    initTeamSlider();
};

// Initialize team slider when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    teamSlider();
});

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
