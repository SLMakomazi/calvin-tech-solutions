/**
 * Calvin Tech Solutions - News Section JavaScript
 * Handles news articles display, filtering, and search functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.querySelector('.news-container');
    const newsFilter = document.getElementById('newsFilter');
    const newsSearch = document.getElementById('newsSearch');
    
    // Initialize news functionality if the container exists
    if (newsContainer) {
        // Load news articles
        loadNews();
        
        // Add event listeners for filtering
        if (newsFilter) {
            newsFilter.addEventListener('change', filterNews);
        }
        
        // Add event listener for search
        if (newsSearch) {
            newsSearch.addEventListener('input', debounce(searchNews, 300));
        }
    }
});

/**
 * Load news articles from the API
 */
async function loadNews() {
    const newsContainer = document.querySelector('.news-container');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    
    try {
        // Show loading indicator
        if (loadingIndicator) loadingIndicator.style.display = 'block';
        if (errorMessage) errorMessage.style.display = 'none';
        
        // In a real application, you would fetch this from your API
        // const response = await fetch('/api/news');
        // const newsData = await response.json();
        
        // For demo purposes, we'll use sample data
        const newsData = getSampleNewsData();
        
        // Display news articles
        displayNews(newsData);
        
        // Initialize filter options
        initFilters(newsData);
        
    } catch (error) {
        console.error('Error loading news:', error);
        if (errorMessage) {
            errorMessage.textContent = 'Failed to load news. Please try again later.';
            errorMessage.style.display = 'block';
        }
    } finally {
        if (loadingIndicator) loadingIndicator.style.display = 'none';
    }
}

/**
 * Display news articles in the container
 */
function displayNews(articles) {
    const newsContainer = document.querySelector('.news-container');
    if (!newsContainer) return;
    
    // Clear existing content
    newsContainer.innerHTML = '';
    
    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-newspaper fa-3x mb-3 text-muted"></i>
                <p class="lead">No articles found.</p>
            </div>
        `;
        return;
    }
    
    // Create news cards
    const newsHTML = articles.map(article => `
        <div class="col-md-6 col-lg-4 mb-4" data-category="${article.category.toLowerCase()}" data-published="${article.published}">
            <div class="card h-100 news-card animate-on-scroll">
                ${article.image ? `
                    <img src="${article.image}" class="card-img-top" alt="${article.title}">
                ` : ''}
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-primary">${article.category}</span>
                        <small class="text-muted">${formatDate(article.published)}</small>
                    </div>
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text text-muted">${article.excerpt}</p>
                </div>
                <div class="card-footer bg-transparent border-top-0">
                    <a href="${article.url || '#'}" class="btn btn-link ps-0">
                        Read More <i class="fas fa-arrow-right ms-1"></i>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
    
    newsContainer.innerHTML = newsHTML;
    
    // Initialize tooltips on the newly created elements
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

/**
 * Initialize filter dropdown with unique categories from news data
 */
function initFilters(articles) {
    const newsFilter = document.getElementById('newsFilter');
    if (!newsFilter) return;
    
    // Get unique categories
    const categories = [...new Set(articles.map(article => article.category))];
    
    // Add category options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        newsFilter.appendChild(option);
    });
}

/**
 * Filter news articles by category
 */
function filterNews() {
    const newsFilter = document.getElementById('newsFilter');
    const selectedCategory = newsFilter ? newsFilter.value.toLowerCase() : '';
    const newsItems = document.querySelectorAll('.news-container .col-md-6');
    
    newsItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (!selectedCategory || selectedCategory === 'all' || itemCategory === selectedCategory) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * Search news articles by title and content
 */
function searchNews() {
    const searchInput = document.getElementById('newsSearch');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const newsItems = document.querySelectorAll('.news-container .col-md-6');
    
    if (!searchTerm) {
        // If search is empty, show all items and respect current filter
        newsItems.forEach(item => {
            item.style.display = 'block';
        });
        filterNews(); // Re-apply any active filters
        return;
    }
    
    newsItems.forEach(item => {
        const title = item.querySelector('.card-title').textContent.toLowerCase();
        const excerpt = item.querySelector('.card-text').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * Format date to a readable format
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Get sample news data (for demo purposes)
 */
function getSampleNewsData() {
    return [
        {
            id: 1,
            title: 'New Office Location in Downtown',
            excerpt: 'We are excited to announce the opening of our new office in the heart of the city.',
            category: 'Company',
            published: '2023-06-15',
            image: 'https://via.placeholder.com/600x400?text=Office+Opening',
            url: '#'
        },
        {
            id: 2,
            title: 'Tech Conference 2023',
            excerpt: 'Join us at the annual tech conference where we will showcase our latest innovations.',
            category: 'Events',
            published: '2023-06-10',
            image: 'https://via.placeholder.com/600x400?text=Tech+Conference',
            url: '#'
        },
        {
            id: 3,
            title: 'New Product Launch',
            excerpt: 'Discover our latest product that will revolutionize the way you work.',
            category: 'Products',
            published: '2023-06-05',
            image: 'https://via.placeholder.com/600x400?text=New+Product',
            url: '#'
        },
        {
            id: 4,
            title: 'Team Building Retreat',
            excerpt: 'Our team had an amazing time at the annual retreat, strengthening our bonds and planning for the future.',
            category: 'Team',
            published: '2023-05-28',
            image: 'https://via.placeholder.com/600x400?text=Team+Retreat',
            url: '#'
        },
        {
            id: 5,
            title: 'Industry Recognition',
            excerpt: 'We are proud to be recognized as one of the top companies in our industry for the third year in a row.',
            category: 'Awards',
            published: '2023-05-20',
            image: 'https://via.placeholder.com/600x400?text=Award',
            url: '#'
        },
        {
            id: 6,
            title: 'Community Outreach Program',
            excerpt: 'Giving back to the community through our new outreach program focused on technology education.',
            category: 'Community',
            published: '2023-05-15',
            image: 'https://via.placeholder.com/600x400?text=Community',
            url: '#'
        }
    ];
}

/**
 * Debounce function to limit the rate at which a function can fire
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Export functions if using modules
// export { loadNews, filterNews, searchNews };