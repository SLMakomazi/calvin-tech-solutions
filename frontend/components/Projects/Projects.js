// ===================================
// PROJECTS COMPONENT JAVASCRIPT
// ===================================
class ProjectsComponent {
    constructor() {
        this.init();
    }

    init() {
        this.setupProjectAnimations();
        this.setupProjectFilters();
        this.setupTechTagInteractions();
        this.setupProjectLinks();
        this.setupScrollAnimations();
    }

    // Setup project card animations on hover
    setupProjectAnimations() {
        const projectCards = document.querySelectorAll('.projects-component .project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateProjectCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateProjectCard(card, false);
            });
        });
    }

    // Animate individual project card
    animateProjectCard(card, isHover) {
        const techTags = card.querySelectorAll('.tech-tags span');
        const projectLink = card.querySelector('.project-link');
        
        if (isHover) {
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px) scale(1.05)';
                    tag.style.boxShadow = '0 4px 8px rgba(0, 174, 239, 0.3)';
                }, index * 50);
            });
            
            if (projectLink) {
                projectLink.style.transform = 'scale(1.1)';
            }
        } else {
            techTags.forEach(tag => {
                tag.style.transform = 'translateY(0) scale(1)';
                tag.style.boxShadow = 'none';
            });
            
            if (projectLink) {
                projectLink.style.transform = 'scale(1)';
            }
        }
    }

    // Setup project filtering functionality
    setupProjectFilters() {
        // Create filter buttons if they don't exist
        const sectionHeader = document.querySelector('.projects-component .section-header');
        if (sectionHeader && !sectionHeader.querySelector('.project-filters')) {
            const filters = document.createElement('div');
            filters.className = 'project-filters';
            filters.innerHTML = `
                <button class="filter-btn active" data-filter="all">All Projects</button>
                <button class="filter-btn" data-filter="web">Web Apps</button>
                <button class="filter-btn" data-filter="mobile">Mobile</button>
                <button class="filter-btn" data-filter="devops">DevOps</button>
                <button class="filter-btn" data-filter="backend">Backend</button>
            `;
            sectionHeader.appendChild(filters);
            
            this.setupFilterEventListeners();
        }
    }

    // Setup filter button event listeners
    setupFilterEventListeners() {
        const filterButtons = document.querySelectorAll('.projects-component .filter-btn');
        const projectCards = document.querySelectorAll('.projects-component .project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    const categories = this.getProjectCategories(card);
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Get project categories based on tech stack
    getProjectCategories(card) {
        const techTags = Array.from(card.querySelectorAll('.tech-tags span')).map(tag => 
            tag.textContent.toLowerCase()
        );
        
        const categories = [];
        
        if (techTags.some(tech => tech.includes('react') || tech.includes('vue') || tech.includes('angular'))) {
            categories.push('web');
        }
        
        if (techTags.some(tech => tech.includes('docker') || tech.includes('kubernetes') || tech.includes('devops'))) {
            categories.push('devops');
        }
        
        if (techTags.some(tech => tech.includes('node') || tech.includes('spring') || tech.includes('java'))) {
            categories.push('backend');
        }
        
        if (techTags.some(tech => tech.includes('ios') || tech.includes('android'))) {
            categories.push('mobile');
        }
        
        return categories.length > 0 ? categories : ['web'];
    }

    // Setup tech tag interactions
    setupTechTagInteractions() {
        const techTags = document.querySelectorAll('.projects-component .tech-tags span');
        
        techTags.forEach(tag => {
            tag.addEventListener('click', () => {
                this.showTechInfo(tag.textContent);
            });
        });
    }

    // Show technology information popup
    showTechInfo(techName) {
        const existingPopup = document.querySelector('.tech-info-popup');
        if (existingPopup) {
            existingPopup.remove();
        }
        
        const popup = document.createElement('div');
        popup.className = 'tech-info-popup';
        popup.innerHTML = `
            <div class="tech-popup-content">
                <h4>${techName}</h4>
                <p>Click to learn more about ${techName} and how we use it in our projects.</p>
                <button class="tech-popup-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Position popup
        const rect = event.target.getBoundingClientRect();
        popup.style.left = rect.left + 'px';
        popup.style.top = (rect.bottom + 10) + 'px';
        
        // Close popup handlers
        const closeBtn = popup.querySelector('.tech-popup-close');
        closeBtn.addEventListener('click', () => popup.remove());
        
        setTimeout(() => {
            document.addEventListener('click', () => popup.remove(), { once: true });
        }, 100);
    }

    // Setup project link interactions
    setupProjectLinks() {
        const projectLinks = document.querySelectorAll('.projects-component .project-link');
        
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.trackProjectClick(link);
            });
        });
    }

    // Track project click analytics
    trackProjectClick(link) {
        const projectName = link.closest('.project-card').querySelector('h3').textContent;
        const linkType = link.textContent.includes('GitHub') ? 'github' : 'demo';
        
        // Here you could integrate with analytics service
        console.log(`Project clicked: ${projectName} - ${linkType}`);
        
        // Add visual feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
        }, 150);
    }

    // Setup scroll animations for project cards
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe project cards for scroll animations
        const projectCards = document.querySelectorAll('.projects-component .project-card');
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // Add search functionality
    setupProjectSearch() {
        const sectionHeader = document.querySelector('.projects-component .section-header');
        if (sectionHeader && !sectionHeader.querySelector('.project-search')) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'project-search';
            searchContainer.innerHTML = `
                <input type="text" class="search-input" placeholder="Search projects...">
                <button class="search-btn"><i class="fas fa-search"></i></button>
            `;
            sectionHeader.appendChild(searchContainer);
            
            this.setupSearchEventListeners();
        }
    }

    // Setup search event listeners
    setupSearchEventListeners() {
        const searchInput = document.querySelector('.projects-component .search-input');
        const projectCards = document.querySelectorAll('.projects-component .project-card');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                
                projectCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const description = card.querySelector('.project-description').textContent.toLowerCase();
                    const techTags = Array.from(card.querySelectorAll('.tech-tags span'))
                        .map(tag => tag.textContent.toLowerCase());
                    
                    const matchesSearch = title.includes(searchTerm) || 
                                        description.includes(searchTerm) || 
                                        techTags.some(tech => tech.includes(searchTerm));
                    
                    if (matchesSearch) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        }
    }

    // Public method to destroy projects component
    destroy() {
        // Remove event listeners and clean up
        const projectCards = document.querySelectorAll('.projects-component .project-card');
        const techTags = document.querySelectorAll('.projects-component .tech-tags span');
        const projectLinks = document.querySelectorAll('.projects-component .project-link');
        
        projectCards.forEach(card => {
            card.removeEventListener('mouseenter', this.setupProjectAnimations);
            card.removeEventListener('mouseleave', this.setupProjectAnimations);
        });
        
        techTags.forEach(tag => {
            tag.removeEventListener('click', this.setupTechTagInteractions);
        });
        
        projectLinks.forEach(link => {
            link.removeEventListener('click', this.setupProjectLinks);
        });
        
        // Remove any created elements
        const filters = document.querySelector('.projects-component .project-filters');
        const search = document.querySelector('.projects-component .project-search');
        const popup = document.querySelector('.tech-info-popup');
        
        if (filters) filters.remove();
        if (search) search.remove();
        if (popup) popup.remove();
    }
}

// Initialize projects component when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsComponent();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectsComponent;
}
