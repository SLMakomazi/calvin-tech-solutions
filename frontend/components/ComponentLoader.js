// ===================================
// COMPONENT LOADER - MANAGES ALL WEBSITE COMPONENTS
// ===================================

class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.isLoaded = false;
        this.init();
    }

    init() {
        this.loadComponentCSS();
        this.loadComponentJS();
        this.setupComponentLoader();
    }

    // Load all component CSS files
    loadComponentCSS() {
        const cssFiles = [
            'components/Hero/Hero.css',
            'components/About/About.css',
            'components/Services/Services.css',
            'components/Team/Team.css',
            'components/Testimonials/Testimonials.css',
            'components/Footer/Footer.css',
            'components/Projects/Projects.css',
            'components/News/News.css',
            'components/Contact/Contact.css'
        ];

        cssFiles.forEach(cssFile => {
            this.loadCSSFile(cssFile);
        });
    }

    // Load individual CSS file
    loadCSSFile(filePath) {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            if (document.querySelector(`link[href="${filePath}"]`)) {
                resolve();
                return;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = filePath;
            link.onload = resolve;
            link.onerror = reject;
            
            document.head.appendChild(link);
        });
    }

    // Load all component JavaScript files
    loadComponentJS() {
        const jsFiles = [
            'components/Footer/Footer.js',
            'components/Projects/Projects.js',
            'components/News/News.js',
            'components/Contact/Contact.js'
        ];

        jsFiles.forEach(jsFile => {
            this.loadJSFile(jsFile);
        });
    }

    // Load individual JavaScript file
    loadJSFile(filePath) {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            if (document.querySelector(`script[src="${filePath}"]`)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = filePath;
            script.onload = resolve;
            script.onerror = reject;
            
            document.body.appendChild(script);
        });
    }

    // Setup component loader functionality
    setupComponentLoader() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }

    // Initialize all components
    async initializeComponents() {
        try {
            // Wait for all CSS to load
            await this.waitForCSSToLoad();
            
            // Load component HTML into containers
            await this.loadComponentHTML();
            
            // Component instances will be initialized by their respective JS files
            // HTML content is now loaded and displayed
            console.log('All component HTML loaded successfully');
            
            this.isLoaded = true;
            
            // Emit loaded event
            this.emitEvent('componentsLoaded');
            
            console.log('All components loaded successfully');
            
        } catch (error) {
            console.error('Error loading components:', error);
            this.emitEvent('componentsError', error);
        }
    }

    // Load component HTML into containers
    async loadComponentHTML() {
        const components = [
            { name: 'hero', container: 'hero-container', file: 'components/Hero/Hero.html' },
            { name: 'services', container: 'services-container', file: 'components/Services/Services.html' },
            { name: 'team', container: 'team-container', file: 'components/Team/Team.html' },
            { name: 'testimonials', container: 'testimonials-container', file: 'components/Testimonials/Testimonials.html' },
            { name: 'about', container: 'about-container', file: 'components/About/About.html' },
            { name: 'projects', container: 'projects-container', file: 'components/Projects/Projects.html' },
            { name: 'news', container: 'news-container', file: 'components/News/News.html' },
            { name: 'contact', container: 'contact-container', file: 'components/Contact/Contact.html' },
            { name: 'footer', container: 'footer-container', file: 'components/Footer/Footer.html' }
        ];

        for (const component of components) {
            try {
                const response = await fetch(component.file);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const html = await response.text();
                const container = document.getElementById(component.container);
                
                if (container) {
                    container.innerHTML = html;
                } else {
                    console.error(`Container ${component.container} not found`);
                }
            } catch (error) {
                console.error(`Error loading ${component.name} HTML:`, error);
                
                // Fallback: Add a placeholder message
                const container = document.getElementById(component.container);
                if (container) {
                    container.innerHTML = `
                        <div style="padding: 2rem; text-align: center; background: rgba(255,0,0,0.1); border: 1px solid red; border-radius: 8px; margin: 1rem;">
                            <h3 style="color: red;">Component "${component.name}" failed to load</h3>
                            <p>Could not load: ${component.file}</p>
                            <p>Error: ${error.message}</p>
                            <p>Please check the browser console for more details.</p>
                        </div>
                    `;
                }
            }
        }
    }

    // Wait for CSS files to load
    waitForCSSToLoad() {
        return new Promise((resolve) => {
            const checkCSS = () => {
                const links = document.querySelectorAll('link[rel="stylesheet"]');
                const loadedCount = Array.from(links).filter(link => link.sheet).length;
                
                if (loadedCount >= links.length) { // Wait for all CSS files to load
                    resolve();
                } else {
                    setTimeout(checkCSS, 100);
                }
            };
            
            checkCSS();
        });
    }

    // Get component instance
    getComponent(name) {
        return this.components.get(name);
    }

    // Reload specific component
    async reloadComponent(name) {
        const component = this.components.get(name);
        if (component) {
            // Destroy existing component
            if (typeof component.destroy === 'function') {
                component.destroy();
            }
            
            // Remove from components map
            this.components.delete(name);
            
            // Reload CSS and JS for this component
            const cssFile = `components/${name.charAt(0).toUpperCase() + name.slice(1)}/${name.charAt(0).toUpperCase() + name.slice(1)}.css`;
            const jsFile = `components/${name.charAt(0).toUpperCase() + name.slice(1)}/${name.charAt(0).toUpperCase() + name.slice(1)}.js`;
            
            await this.loadCSSFile(cssFile);
            await this.loadJSFile(jsFile);
            
            // Re-initialize component
            this.initializeComponents();
        }
    }

    // Emit custom events
    emitEvent(eventName, data = null) {
        const event = new CustomEvent(eventName, { detail: data });
        document.dispatchEvent(event);
    }

    // Add event listener for component events
    on(eventName, callback) {
        document.addEventListener(eventName, callback);
    }

    // Remove event listener
    off(eventName, callback) {
        document.removeEventListener(eventName, callback);
    }

    // Destroy all components
    destroy() {
        this.components.forEach(component => {
            if (typeof component.destroy === 'function') {
                component.destroy();
            }
        });
        this.components.clear();
        this.isLoaded = false;
    }

    // Get loading status
    isComponentsLoaded() {
        return this.isLoaded;
    }

    // Get component loading statistics
    getLoadingStats() {
        return {
            totalComponents: this.components.size,
            isLoaded: this.isLoaded,
            components: Array.from(this.components.keys())
        };
    }
}

// Initialize component loader
let componentLoader;

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
    componentLoader = new ComponentLoader();
    
    // Make it globally available
    window.ComponentLoader = componentLoader;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentLoader;
}
