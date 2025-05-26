// Hero section - Static slogan with fade-in effect
document.addEventListener('DOMContentLoaded', function() {
    // No JavaScript needed for the static slogan
    // The CSS animations handle the fade-in effects
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Calculate the position to scroll to
            const headerOffset = 80; // Height of your fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // Smooth scroll to the target
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without jumping (for deep linking)
            history.pushState(null, null, targetId);
        }
    });
});

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
            name: "Founder's Name",
            position: "CEO & Founder",
            bio: "A visionary leader from Kayamandi who turned his passion for technology into a thriving business that creates opportunities for others.",
            image: "https://via.placeholder.com/300x300"
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
