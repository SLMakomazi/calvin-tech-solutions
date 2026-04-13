// ===================================
// CALVIN TECH SOLUTIONS - GLOBAL JAVASCRIPT
// ===================================
// This file contains only global functionality not handled by components

document.addEventListener('DOMContentLoaded', function() {
    // Initialize global functionality
    initMobileMenu();
    initNavbarScroll();
    initSmoothScrolling();
    initPreloader();
    initErrorHandling();
    
    // Console branding
    console.log('%c Calvin Tech Solutions', 'font-size: 20px; font-weight: bold; color: #00AEEF;');
    console.log('%cEngineering the Future of Technology', 'font-size: 14px; color: #1F6FEB;');
    console.log('%cBuilt with passion and innovation in South Africa', 'font-size: 12px; color: #A0A0A0;');
});

// ===================================
// MOBILE MENU FUNCTIONALITY (GLOBAL)
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
// NAVBAR SCROLL BEHAVIOR (GLOBAL)
// ===================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

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
    });
}

// ===================================
// SMOOTH SCROLLING (GLOBAL)
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
// PRELOADER (GLOBAL)
// ===================================
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
}

// ===================================
// ERROR HANDLING (GLOBAL)
// ===================================
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
    });
}















