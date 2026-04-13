// ===================================
// NEWS COMPONENT JAVASCRIPT
// ===================================
class NewsComponent {
    constructor() {
        this.newsItems = [];
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.isLoading = false;
        this.init();
    }

    init() {
        this.setupNewsAnimations();
        this.setupLoadMore();
        this.setupNewsLinks();
        this.setupScrollAnimations();
        this.setupNewsFilters();
        this.setupSearch();
    }

    // Setup initial news animations
    setupNewsAnimations() {
        const newsCards = document.querySelectorAll('.news-component .news-card');
        
        newsCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }

    // Setup load more functionality
    setupLoadMore() {
        const loadMoreBtn = document.querySelector('.news-component .load-more-btn');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreNews();
            });
        }
    }

    // Load more news items
    async loadMoreNews() {
        const loadMoreBtn = document.querySelector('.news-component .load-more-btn');
        
        if (this.isLoading) return;
        
        this.isLoading = true;
        loadMoreBtn.textContent = 'Loading...';
        loadMoreBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.addMoreNewsItems();
            this.isLoading = false;
            loadMoreBtn.textContent = 'Load More News';
            loadMoreBtn.disabled = false;
        }, 1500);
    }

    // Add more news items to the grid
    addMoreNewsItems() {
        const newsGrid = document.querySelector('.news-component .news-grid');
        const newItems = this.generateNewsItems(3); // Add 3 more items
        
        newItems.forEach((item, index) => {
            const newsCard = this.createNewsCard(item);
            newsGrid.appendChild(newsCard);
            
            // Animate new items
            setTimeout(() => {
                newsCard.classList.add('visible');
            }, index * 100);
        });
    }

    // Generate news items data
    generateNewsItems(count) {
        const templates = [
            {
                title: "New Partnership Announced",
                excerpt: "We're excited to announce our latest strategic partnership to bring cutting-edge solutions to more clients.",
                date: "October 2024",
                category: "partnership"
            },
            {
                title: "Team Expansion",
                excerpt: "Our team continues to grow with the addition of talented developers and designers joining our mission.",
                date: "September 2024",
                category: "team"
            },
            {
                title: "Product Launch Success",
                excerpt: "Our latest product launch has exceeded expectations with positive feedback from early adopters.",
                date: "August 2024",
                category: "product"
            }
        ];

        return Array.from({ length: count }, (_, i) => ({
            ...templates[i % templates.length],
            id: Date.now() + i,
            image: `assets/news/news-${Date.now() + i}.jpg`
        }));
    }

    // Create news card element
    createNewsCard(newsItem) {
        const card = document.createElement('article');
        card.className = 'news-card';
        card.innerHTML = `
            <div class="news-image">
                <img src="${newsItem.image}" alt="${newsItem.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjMUYxRjIzIi8+CjxwYXRoIGQ9Ik0yMDAgNjBDMjMwLjY2IDYwIDI1NSA4NC4zNDAyIDI1NSAxMTVDMjU1IDEzNS4yMjIgMjQzLjU1OSAxNTIuMjIyIDIyNSAxNjAuNEMyMDYuNDQxIDE2OC41NzggMTY5LjU1OSAxNjguNTc4IDE1MCAxNjAuNEMxMzEuNDQxIDE1Mi4yMjIgMTIwIDEzNS4yMjIgMTIwIDExNUMxMjAgODQuMzQwMiAxNDQuMzQgNjAgMjAwIDYwWiIgZmlsbD0iIzAwQUVFRiIvPgo8cGF0aCBkPSJNMjAwIDEwMEMyMTYuNTY4IDEwMCAyMzAgMTEzLjQzMiAyMzAgMTMwQzIzMCAxNDYuNTY4IDIxNi41NjggMTYwIDIwMCAxNjBDMTgzLjQzMiAxNjAgMTcwIDE0Ni41NjggMTcwIDEzMUMxNzAgMTEzLjQzMiAxODMuNDMyIDEwMCAyMDAgMTAwWiIgZmlsbD0iIzFGMUYyMyIvPgo8dGV4dCB4PSIyMDAiIHk9IjE0NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5OZXdzPC90ZXh0Pgo8L3N2Zz4K'">
                <div class="news-date">${newsItem.date}</div>
            </div>
            <div class="news-content">
                <h3 class="news-title">${newsItem.title}</h3>
                <p class="news-excerpt">${newsItem.excerpt}</p>
                <a href="#" class="news-link" data-news-id="${newsItem.id}">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        return card;
    }

    // Setup news link interactions
    setupNewsLinks() {
        const newsLinks = document.querySelectorAll('.news-component .news-link');
        
        newsLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNewsClick(link);
            });
        });
    }

    // Handle news item click
    handleNewsClick(link) {
        const newsId = link.dataset.newsId;
        const newsTitle = link.closest('.news-card').querySelector('.news-title').textContent;
        
        // Track analytics
        this.trackNewsClick(newsId, newsTitle);
        
        // Show news modal or navigate to article
        this.showNewsModal(newsTitle);
        
        // Visual feedback
        link.style.transform = 'translateX(10px)';
        setTimeout(() => {
            link.style.transform = 'translateX(5px)';
        }, 150);
    }

    // Track news click analytics
    trackNewsClick(newsId, title) {
        console.log(`News clicked: ${title} (ID: ${newsId})`);
        // Integration with analytics service would go here
    }

    // Show news modal
    showNewsModal(title) {
        // Remove existing modal
        const existingModal = document.querySelector('.news-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.className = 'news-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Full article content would be displayed here. This is where users can read the complete news story with all details, images, and related information.</p>
                        <div class="article-meta">
                            <span class="article-date">Published recently</span>
                            <span class="article-category">Company News</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary modal-close-btn">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Setup modal close handlers
        const closeBtn = modal.querySelector('.modal-close');
        const closeBtnFooter = modal.querySelector('.modal-close-btn');
        const overlay = modal.querySelector('.modal-overlay');
        
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        closeBtnFooter.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
        
        // Animate modal in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }

    // Setup scroll animations for news cards
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe news cards for scroll animations
        const observeNewsCards = () => {
            const newsCards = document.querySelectorAll('.news-component .news-card:not(.visible)');
            newsCards.forEach((card, index) => {
                observer.observe(card);
                
                // Fallback: ensure cards become visible even if observer doesn't trigger
                setTimeout(() => {
                    if (!card.classList.contains('visible')) {
                        card.classList.add('visible');
                    }
                }, 2000 + (index * 50));
            });
        };

        observeNewsCards();
        
        // Also ensure observer checks viewport on setup
        setTimeout(() => {
            const newsCards = document.querySelectorAll('.news-component .news-card');
            newsCards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                if (isInViewport && !card.classList.contains('visible')) {
                    card.classList.add('visible');
                }
            });
        }, 100);

        // Re-observe when new items are added
        const mutationObserver = new MutationObserver(() => {
            observeNewsCards();
        });

        const newsGrid = document.querySelector('.news-component .news-grid');
        if (newsGrid) {
            mutationObserver.observe(newsGrid, { childList: true });
        }
    }

    // Setup news filtering
    setupNewsFilters() {
        const sectionHeader = document.querySelector('.news-component .section-header');
        if (sectionHeader && !sectionHeader.querySelector('.news-filters')) {
            const filters = document.createElement('div');
            filters.className = 'news-filters';
            filters.innerHTML = `
                <button class="filter-btn active" data-filter="all">All News</button>
                <button class="filter-btn" data-filter="company">Company</button>
                <button class="filter-btn" data-filter="product">Products</button>
                <button class="filter-btn" data-filter="partnership">Partnerships</button>
                <button class="filter-btn" data-filter="team">Team</button>
            `;
            sectionHeader.appendChild(filters);
            
            this.setupFilterEventListeners();
        }
    }

    // Setup filter event listeners
    setupFilterEventListeners() {
        const filterButtons = document.querySelectorAll('.news-component .filter-btn');
        const newsCards = document.querySelectorAll('.news-component .news-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter news cards
                newsCards.forEach(card => {
                    const title = card.querySelector('.news-title').textContent.toLowerCase();
                    const excerpt = card.querySelector('.news-excerpt').textContent.toLowerCase();
                    
                    const matchesFilter = filter === 'all' || 
                                       title.includes(filter) || 
                                       excerpt.includes(filter);
                    
                    if (matchesFilter) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 100);
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Setup search functionality
    setupSearch() {
        const sectionHeader = document.querySelector('.news-component .section-header');
        if (sectionHeader && !sectionHeader.querySelector('.news-search')) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'news-search';
            searchContainer.innerHTML = `
                <input type="text" class="search-input" placeholder="Search news...">
                <button class="search-btn"><i class="fas fa-search"></i></button>
            `;
            sectionHeader.appendChild(searchContainer);
            
            this.setupSearchEventListeners();
        }
    }

    // Setup search event listeners
    setupSearchEventListeners() {
        const searchInput = document.querySelector('.news-component .search-input');
        const newsCards = document.querySelectorAll('.news-component .news-card');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                
                newsCards.forEach(card => {
                    const title = card.querySelector('.news-title').textContent.toLowerCase();
                    const excerpt = card.querySelector('.news-excerpt').textContent.toLowerCase();
                    
                    const matchesSearch = title.includes(searchTerm) || excerpt.includes(searchTerm);
                    
                    if (matchesSearch || searchTerm === '') {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 100);
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        }
    }

    // Public method to destroy news component
    destroy() {
        // Remove event listeners and clean up
        const loadMoreBtn = document.querySelector('.news-component .load-more-btn');
        const newsLinks = document.querySelectorAll('.news-component .news-link');
        const filterButtons = document.querySelectorAll('.news-component .filter-btn');
        const searchInput = document.querySelector('.news-component .search-input');
        
        if (loadMoreBtn) {
            loadMoreBtn.removeEventListener('click', this.loadMoreNews);
        }
        
        newsLinks.forEach(link => {
            link.removeEventListener('click', this.handleNewsClick);
        });
        
        filterButtons.forEach(button => {
            button.removeEventListener('click', this.setupFilterEventListeners);
        });
        
        if (searchInput) {
            searchInput.removeEventListener('input', this.setupSearchEventListeners);
        }
        
        // Remove modals
        const modal = document.querySelector('.news-modal');
        if (modal) modal.remove();
        
        // Remove created elements
        const filters = document.querySelector('.news-component .news-filters');
        const search = document.querySelector('.news-component .news-search');
        
        if (filters) filters.remove();
        if (search) search.remove();
    }
}

let newsComponentInitialized = false;
const initializeNewsComponent = () => {
    if (newsComponentInitialized) return;
    new NewsComponent();
    newsComponentInitialized = true;
};

document.addEventListener('DOMContentLoaded', initializeNewsComponent);
document.addEventListener('componentsLoaded', initializeNewsComponent);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NewsComponent;
}
