document.addEventListener('DOMContentLoaded', function() {
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
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
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
            icon: 'laptop-code',
            title: 'Web Development',
            description: 'Custom websites and web applications built with modern technologies.'
        },
        {
            icon: 'mobile-alt',
            title: 'Mobile Apps',
            description: 'Cross-platform mobile applications for iOS and Android.'
        },
        {
            icon: 'cloud',
            title: 'Cloud Solutions',
            description: 'Scalable cloud infrastructure and services for your business.'
        },
        {
            icon: 'paint-brush',
            title: 'UI/UX Design',
            description: 'Beautiful and intuitive user interfaces that enhance user experience.'
        },
        {
            icon: 'database',
            title: 'Database Design',
            description: 'Efficient and scalable database solutions for your applications.'
        },
        {
            icon: 'chart-line',
            title: 'Digital Marketing',
            description: 'Data-driven marketing strategies to grow your online presence.'
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
            quote: "Calvin Tech Solutions transformed our online presence. Their team delivered beyond our expectations.",
            author: "Sarah Johnson",
            position: "CEO, TechStart Inc."
        },
        {
            quote: "Professional, efficient, and delivered on time. Highly recommended for any web development needs.",
            author: "Michael Chen",
            position: "Marketing Director, InnovateCo"
        },
        {
            quote: "Outstanding service and support. They truly understand our business needs and deliver results.",
            author: "Emily Rodriguez",
            position: "Founder, DesignHub"
        }
    ];

    // Populate testimonials section
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.innerHTML = `
            <div class="testimonial-slide">
                ${testimonials.map(testimonial => `
                    <div class="testimonial-item">
                        <p class="quote">"${testimonial.quote}"</p>
                        <div class="author">
                            <h4>${testimonial.author}</h4>
                            <p class="position">${testimonial.position}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

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
});

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
