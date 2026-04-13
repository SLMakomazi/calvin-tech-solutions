// ===================================
   // COMMON UTILITIES - SHARED ACROSS COMPONENTS
   // ===================================
   
   class ComponentUtils {
       // ===================================
       // DOM UTILITIES
       // ===================================
       static createElement(tag, className, content, attributes = {}) {
           const element = document.createElement(tag);
           if (className) element.className = className;
           if (content) element.innerHTML = content;
           
           Object.entries(attributes).forEach(([key, value]) => {
               element.setAttribute(key, value);
           });
           
           return element;
       }
   
       static findElement(selector, parent = document) {
           return parent.querySelector(selector);
       }
   
       static findElements(selector, parent = document) {
           return Array.from(parent.querySelectorAll(selector));
       }
   
       static addClass(element, className) {
           if (element) element.classList.add(className);
       }
   
       static removeClass(element, className) {
           if (element) element.classList.remove(className);
       }
   
       static toggleClass(element, className) {
           if (element) element.classList.toggle(className);
       }
   
       // ===================================
       // ANIMATION UTILITIES
       // ===================================
       static animateElement(element, keyframes, options = {}) {
           if (!element) return Promise.resolve();
           
           const defaultOptions = {
               duration: 300,
               easing: 'ease-out',
               fill: 'forwards'
           };
           
           return element.animate(keyframes, { ...defaultOptions, ...options }).finished;
       }
   
       static fadeIn(element, duration = 300) {
           if (!element) return Promise.resolve();
           
           element.style.opacity = '0';
           element.style.display = 'block';
           
           return this.animateElement(element, [
               { opacity: 0 },
               { opacity: 1 }
           ], { duration });
       }
   
       static fadeOut(element, duration = 300) {
           if (!element) return Promise.resolve();
           
           return this.animateElement(element, [
               { opacity: 1 },
               { opacity: 0 }
           ], { duration }).then(() => {
               element.style.display = 'none';
           });
       }
   
       static slideIn(element, direction = 'up', duration = 300) {
           if (!element) return Promise.resolve();
           
           const transforms = {
               up: ['translateY(100%)', 'translateY(0)'],
               down: ['translateY(-100%)', 'translateY(0)'],
               left: ['translateX(100%)', 'translateX(0)'],
               right: ['translateX(-100%)', 'translateX(0)']
           };
           
           element.style.transform = transforms[direction][0];
           element.style.opacity = '0';
           element.style.display = 'block';
           
           return this.animateElement(element, [
               { transform: transforms[direction][0], opacity: 0 },
               { transform: transforms[direction][1], opacity: 1 }
           ], { duration });
       }
   
       // ===================================
       // SCROLL UTILITIES
       // ===================================
       static scrollToElement(target, offset = 0, behavior = 'smooth') {
           const element = typeof target === 'string' ? document.querySelector(target) : target;
           if (!element) return;
           
           const elementPosition = element.getBoundingClientRect().top;
           const offsetPosition = elementPosition + window.pageYOffset - offset;
           
           window.scrollTo({
               top: offsetPosition,
               behavior
           });
       }
   
       static isElementInViewport(element, threshold = 0.5) {
           const rect = element.getBoundingClientRect();
           const windowHeight = window.innerHeight || document.documentElement.clientHeight;
           const windowWidth = window.innerWidth || document.documentElement.clientWidth;
           
           const vertInView = (rect.top <= windowHeight * threshold) && ((rect.top + rect.height) >= windowHeight * (1 - threshold));
           const horInView = (rect.left <= windowWidth * threshold) && ((rect.left + rect.width) >= windowWidth * (1 - threshold));
           
           return vertInView && horInView;
       }
   
       // ===================================
       // EVENT UTILITIES
       // ===================================
       static on(element, event, handler, options = {}) {
           if (element) element.addEventListener(event, handler, options);
       }
   
       static off(element, event, handler) {
           if (element) element.removeEventListener(event, handler);
       }
   
       static once(element, event, handler) {
           if (element) element.addEventListener(event, handler, { once: true });
       }
   
       static trigger(element, eventName, detail = {}) {
           if (element) {
               const event = new CustomEvent(eventName, { detail });
               element.dispatchEvent(event);
           }
       }
   
       // ===================================
       // STORAGE UTILITIES
       // ===================================
       static setStorage(key, value, isSession = false) {
           try {
               const storage = isSession ? sessionStorage : localStorage;
               storage.setItem(key, JSON.stringify(value));
           } catch (error) {
               console.warn('Storage set error:', error);
           }
       }
   
       static getStorage(key, defaultValue = null, isSession = false) {
           try {
               const storage = isSession ? sessionStorage : localStorage;
               const item = storage.getItem(key);
               return item ? JSON.parse(item) : defaultValue;
           } catch (error) {
               console.warn('Storage get error:', error);
               return defaultValue;
           }
       }
   
       static removeStorage(key, isSession = false) {
           try {
               const storage = isSession ? sessionStorage : localStorage;
               storage.removeItem(key);
           } catch (error) {
               console.warn('Storage remove error:', error);
           }
       }
   
       // ===================================
       // HTTP UTILITIES
       // ===================================
       static async fetch(url, options = {}) {
           try {
               const response = await fetch(url, {
                   headers: {
                       'Content-Type': 'application/json',
                       ...options.headers
                   },
                   ...options
               });
               
               if (!response.ok) {
                   throw new Error(`HTTP error! status: ${response.status}`);
               }
               
               return await response.json();
           } catch (error) {
               console.error('Fetch error:', error);
               throw error;
           }
       }
   
       static async loadHTML(filePath) {
           try {
               const response = await fetch(filePath);
               if (!response.ok) {
                   throw new Error(`Failed to load HTML: ${response.status}`);
               }
               return await response.text();
           } catch (error) {
               console.error('HTML load error:', error);
               throw error;
           }
       }
   
       // ===================================
       // VALIDATION UTILITIES
       // ===================================
       static isValidEmail(email) {
           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
           return emailRegex.test(email);
       }
   
       static isValidPhone(phone) {
           const phoneRegex = /^[\d\s\-\+\(\)]+$/;
           return phoneRegex.test(phone) && phone.length >= 10;
       }
   
       static isValidUrl(url) {
           try {
               new URL(url);
               return true;
           } catch {
               return false;
           }
       }
   
       static sanitizeInput(input) {
           const div = document.createElement('div');
           div.textContent = input;
           return div.innerHTML;
       }
   
       // ===================================
       // FORMAT UTILITIES
       // ===================================
       static formatCurrency(amount, currency = 'ZAR') {
           return new Intl.NumberFormat('en-ZA', {
               style: 'currency',
               currency
           }).format(amount);
       }
   
       static formatDate(date, options = {}) {
           const defaultOptions = {
               year: 'numeric',
               month: 'long',
               day: 'numeric'
           };
           
           return new Intl.DateTimeFormat('en-ZA', { ...defaultOptions, ...options }).format(date);
       }
   
       static formatNumber(number, locale = 'en-ZA') {
           return new Intl.NumberFormat(locale).format(number);
       }
   
       static truncateText(text, maxLength, suffix = '...') {
           if (text.length <= maxLength) return text;
           return text.substring(0, maxLength - suffix.length) + suffix;
       }
   
       static capitalizeFirst(str) {
           return str.charAt(0).toUpperCase() + str.slice(1);
       }
   
       static kebabCase(str) {
           return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
       }
   
       static camelCase(str) {
           return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
       }
   
       // ===================================
       // DEVICE UTILITIES
       // ===================================
       static isMobile() {
           return window.innerWidth <= 768;
       }
   
       static isTablet() {
           return window.innerWidth > 768 && window.innerWidth <= 1024;
       }
   
       static isDesktop() {
           return window.innerWidth > 1024;
       }
   
       static getDeviceType() {
           if (this.isMobile()) return 'mobile';
           if (this.isTablet()) return 'tablet';
           return 'desktop';
       }
   
       // ===================================
       // MODAL UTILITIES
       // ===================================
       static createModal(title, content, buttons = []) {
           const modal = this.createElement('div', 'modal-overlay');
           modal.innerHTML = `
               <div class="modal-content">
                   <div class="modal-header">
                       <h3>${title}</h3>
                       <button class="modal-close">&times;</button>
                   </div>
                   <div class="modal-body">
                       ${content}
                   </div>
                   <div class="modal-footer">
                       ${buttons.map(btn => `
                           <button class="btn ${btn.className}" data-action="${btn.action}">
                               ${btn.text}
                           </button>
                       `).join('')}
                   </div>
               </div>
           `;
           
           document.body.appendChild(modal);
           
           // Setup handlers
           const closeBtn = modal.querySelector('.modal-close');
           const overlay = modal.querySelector('.modal-overlay');
           
           const closeModal = () => {
               modal.classList.remove('show');
               setTimeout(() => modal.remove(), 300);
           };
           
           this.on(closeBtn, 'click', closeModal);
           this.on(overlay, 'click', (e) => {
               if (e.target === overlay) closeModal();
           });
           
           // Handle button actions
           buttons.forEach(btn => {
               const buttonElement = modal.querySelector(`[data-action="${btn.action}"]`);
               if (buttonElement && btn.handler) {
                   this.on(buttonElement, 'click', () => {
                       btn.handler();
                       closeModal();
                   });
               }
           });
           
           // Show modal
           setTimeout(() => modal.classList.add('show'), 10);
           
           return modal;
       }
   
       // ===================================
       // TOAST UTILITIES
       // ===================================
       static showToast(message, type = 'success', duration = 3000) {
           // Remove existing toast
           const existingToast = document.querySelector('.toast-notification');
           if (existingToast) {
               existingToast.remove();
           }
   
           const toast = this.createElement('div', 'toast-notification');
           toast.innerHTML = `
               <i class="fas fa-${this.getToastIcon(type)}"></i>
               <span>${message}</span>
           `;
           
           document.body.appendChild(toast);
   
           // Animate in
           setTimeout(() => toast.classList.add('show'), 10);
   
           // Auto-hide
           setTimeout(() => {
               toast.classList.remove('show');
               setTimeout(() => toast.remove(), 300);
           }, duration);
       }
   
       static getToastIcon(type) {
           const icons = {
               success: 'check-circle',
               error: 'exclamation-circle',
               warning: 'exclamation-triangle',
               info: 'info-circle'
           };
           return icons[type] || 'info-circle';
       }
   
       // ===================================
       // ANALYTICS UTILITIES
       // ===================================
       static trackEvent(category, action, label = '', value = 0) {
           console.log('Analytics Event:', { category, action, label, value });
           
           // Google Analytics integration
           if (typeof gtag !== 'undefined') {
               gtag('event', action, {
                   event_category: category,
                   event_label: label,
                   value: value
               });
           }
       }
   
       static trackPageView(page) {
           console.log('Page View:', page);
           
           if (typeof gtag !== 'undefined') {
               gtag('config', 'GA_MEASUREMENT_ID', {
                   page_path: page
               });
           }
       }
   
       // ===================================
       // PERFORMANCE UTILITIES
       // ===================================
       static debounce(func, wait) {
           let timeout;
           return function executedFunction(...args) {
               const later = () => {
                   clearTimeout(timeout);
                   func(...args);
               };
               clearTimeout(timeout);
               timeout = setTimeout(later, wait);
           };
       }
   
       static throttle(func, limit) {
           let inThrottle;
           return function(...args) {
               if (!inThrottle) {
                   func.apply(this, args);
                   inThrottle = true;
                   setTimeout(() => inThrottle = false, limit);
               }
           };
       }
   
       static async loadImage(src) {
           return new Promise((resolve, reject) => {
               const img = new Image();
               img.onload = () => resolve(img);
               img.onerror = reject;
               img.src = src;
           });
       }
   
       // ===================================
       // COLOR UTILITIES
       // ===================================
       static hexToRgb(hex) {
           const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
           return result ? {
               r: parseInt(result[1], 16),
               g: parseInt(result[2], 16),
               b: parseInt(result[3], 16)
           } : null;
       }
   
       static rgbToHex(r, g, b) {
           return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
       }
   
       static getContrastColor(hexColor) {
           const rgb = this.hexToRgb(hexColor);
           if (!rgb) return '#000000';
           
           const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
           return luminance > 0.5 ? '#000000' : '#ffffff';
       }
   }
   
   // Export for global use
   window.ComponentUtils = ComponentUtils;
   
   // Export for module systems
   if (typeof module !== 'undefined' && module.exports) {
       module.exports = ComponentUtils;
   }
