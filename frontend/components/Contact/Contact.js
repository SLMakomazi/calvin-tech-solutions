// ===================================
// CONTACT COMPONENT JAVASCRIPT
// ===================================
class ContactComponent {
    constructor() {
        this.form = null;
        this.isSubmitting = false;
        this.init();
    }

    init() {
        this.setupForm();
        this.setupAnimations();
        this.setupInfoCardInteractions();
        this.setupValidation();
        this.setupScrollAnimations();
    }

    // Setup contact form functionality
    setupForm() {
        this.form = document.getElementById('contact-form');
        
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });

            // Add input event listeners for real-time validation
            const inputs = this.form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }

    // Handle form submission
    async handleFormSubmit() {
        if (this.isSubmitting) return;

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Validate form
        if (!this.validateForm(data)) {
            return;
        }

        this.isSubmitting = true;
        this.setSubmitButtonState('sending');

        try {
            // Simulate API call
            await this.submitForm(data);
            this.showSuccessMessage();
            this.resetForm();
        } catch (error) {
            this.showErrorMessage(error.message);
        } finally {
            this.isSubmitting = false;
            this.setSubmitButtonState('normal');
        }
    }

    // Validate entire form
    validateForm(data) {
        let isValid = true;
        const fields = ['name', 'email', 'subject', 'message'];

        fields.forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Validate individual field
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (!value) {
            errorMessage = 'This field is required';
            isValid = false;
        } else {
            // Specific field validations
            switch (fieldName) {
                case 'name':
                    if (value.length < 2) {
                        errorMessage = 'Name must be at least 2 characters';
                        isValid = false;
                    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                        errorMessage = 'Name should only contain letters';
                        isValid = false;
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        errorMessage = 'Please enter a valid email address';
                        isValid = false;
                    }
                    break;
                    
                case 'subject':
                    if (value.length < 3) {
                        errorMessage = 'Subject must be at least 3 characters';
                        isValid = false;
                    }
                    break;
                    
                case 'message':
                    if (value.length < 10) {
                        errorMessage = 'Message must be at least 10 characters';
                        isValid = false;
                    }
                    break;
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    // Show field error
    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);

        // Shake animation
        field.style.animation = 'shake 0.5s';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    // Clear field error
    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Set submit button state
    setSubmitButtonState(state) {
        const button = this.form.querySelector('button[type="submit"]');
        const buttonText = button.querySelector('.btn-text');
        
        switch (state) {
            case 'sending':
                buttonText.textContent = 'Sending...';
                button.disabled = true;
                button.style.opacity = '0.7';
                break;
            case 'normal':
                buttonText.textContent = 'Send Message';
                button.disabled = false;
                button.style.opacity = '1';
                break;
        }
    }

    // Submit form (simulated API call)
    async submitForm(data) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate API response
        console.log('Form submitted:', data);
        
        // Simulate occasional failure for demo
        if (Math.random() < 0.1) {
            throw new Error('Network error. Please try again.');
        }

        return { success: true };
    }

    // Show success message
    showSuccessMessage() {
        this.hideAllMessages();
        
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <strong>Success!</strong> Your message has been sent. We'll get back to you soon!
        `;
        
        this.form.insertBefore(successMessage, this.form.firstChild);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);

        // Track analytics
        this.trackFormSubmission('success');
    }

    // Show error message
    showErrorMessage(message) {
        this.hideAllMessages();
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <strong>Error:</strong> ${message}
        `;
        
        this.form.insertBefore(errorMessage, this.form.firstChild);

        // Track analytics
        this.trackFormSubmission('error');
    }

    // Hide all messages
    hideAllMessages() {
        const messages = this.form.querySelectorAll('.form-success, .form-error');
        messages.forEach(msg => msg.remove());
    }

    // Reset form
    resetForm() {
        this.form.reset();
        
        // Clear all field errors
        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => this.clearFieldError(field));
    }

    // Track form submission analytics
    trackFormSubmission(status) {
        console.log(`Form submission: ${status}`);
        // Integration with analytics service would go here
    }

    // Setup animations for info cards
    setupAnimations() {
        const infoCards = document.querySelectorAll('.contact-component .info-card');
        
        infoCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateInfoCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateInfoCard(card, false);
            });
        });
    }

    // Animate info card
    animateInfoCard(card, isHover) {
        const icon = card.querySelector('.info-icon');
        
        if (isHover) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        } else {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    }

    // Setup info card interactions
    setupInfoCardInteractions() {
        const infoCards = document.querySelectorAll('.contact-component .info-card');
        
        infoCards.forEach(card => {
            card.addEventListener('click', () => {
                this.handleInfoCardClick(card);
            });
        });
    }

    // Handle info card click
    handleInfoCardClick(card) {
        const content = card.querySelector('.info-content p').textContent;
        const type = card.querySelector('.info-content h4').textContent;
        
        // Copy to clipboard for phone/email
        if (type.includes('Call') || type.includes('Email')) {
            this.copyToClipboard(content);
            this.showToast('Copied to clipboard!');
        } else if (type.includes('Visit')) {
            // Open in maps
            window.open(`https://maps.google.com/?q=${encodeURIComponent(content)}`, '_blank');
        }
        
        // Visual feedback
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

    // Show toast notification
    showToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <i class="fas fa-check"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Setup form validation enhancements
    setupValidation() {
        // Add floating label animations
        const formGroups = this.form.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                input.addEventListener('focus', () => {
                    label.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        label.classList.remove('focused');
                    }
                });
            }
        });
    }

    // Setup scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const infoCards = document.querySelectorAll('.contact-component .info-card');
        const contactForm = document.querySelector('.contact-component .contact-form');
        
        infoCards.forEach(card => observer.observe(card));
        if (contactForm) observer.observe(contactForm);
    }

    // Public method to destroy contact component
    destroy() {
        // Remove event listeners and clean up
        if (this.form) {
            this.form.removeEventListener('submit', this.handleFormSubmit);
            
            const inputs = this.form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.removeEventListener('blur', this.validateField);
                input.removeEventListener('input', this.clearFieldError);
            });
        }

        const infoCards = document.querySelectorAll('.contact-component .info-card');
        infoCards.forEach(card => {
            card.removeEventListener('mouseenter', this.setupAnimations);
            card.removeEventListener('mouseleave', this.setupAnimations);
            card.removeEventListener('click', this.handleInfoCardClick);
        });

        // Remove messages
        this.hideAllMessages();
        
        // Remove toast
        const toast = document.querySelector('.toast-notification');
        if (toast) toast.remove();
    }
}

let contactComponentInitialized = false;

const initializeContactComponent = () => {
    if (contactComponentInitialized) return;
    if (!document.querySelector('.contact-component')) return;

    new ContactComponent();
    contactComponentInitialized = true;
};

document.addEventListener('componentsLoaded', initializeContactComponent);
document.addEventListener('DOMContentLoaded', initializeContactComponent);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactComponent;
}
