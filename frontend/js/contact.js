/**
 * Calvin Tech Solutions - Contact Form JavaScript
 * Handles contact form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        initContactForm(contactForm);
    }
});

/**
 * Initialize contact form with validation and submission handling
 */
function initContactForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    
    // Add event listener for form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm(form)) {
            return;
        }
        
        // Disable submit button and show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
        }
        
        try {
            // Get form data
            const formData = new FormData(form);
            const formObject = {};
            
            // Convert FormData to object
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the data to your server
            // For now, we'll simulate a successful submission
            const response = await submitContactForm(formObject);
            
            // Show success message
            showAlert('success', 'Thank you for your message! We will get back to you soon.');
            
            // Reset form
            form.reset();
            
            // Remove was-validated class to reset validation state
            form.classList.remove('was-validated');
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showAlert('danger', 'An error occurred while sending your message. Please try again later.');
        } finally {
            // Re-enable submit button and restore original text
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        }
    });
    
    // Add real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        // Add blur validation
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

/**
 * Validate a single form field
 */
function validateField(field) {
    const formGroup = field.closest('.form-group') || field.closest('.mb-3');
    const errorElement = formGroup ? formGroup.querySelector('.invalid-feedback') : null;
    
    // Skip validation for hidden fields
    if (field.type === 'hidden') return true;
    
    // Reset validation state
    field.classList.remove('is-valid', 'is-invalid');
    
    // Check if field is required
    if (field.required && !field.value.trim()) {
        field.classList.add('is-invalid');
        if (errorElement) errorElement.textContent = 'This field is required';
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            field.classList.add('is-invalid');
            if (errorElement) errorElement.textContent = 'Please enter a valid email address';
            return false;
        }
    }
    
    // Phone number validation (basic)
    if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[+]?[\s\-]?(?:(?:(?:\d{1,3}[\s\-]?)?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4})|(?:\d[\s\-]?){10,})$/;
        if (!phoneRegex.test(field.value)) {
            field.classList.add('is-invalid');
            if (errorElement) errorElement.textContent = 'Please enter a valid phone number';
            return false;
        }
    }
    
    // If we got here, the field is valid
    if (field.value) {
        field.classList.add('is-valid');
    }
    
    return true;
}

/**
 * Validate the entire form
 */
function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('input, textarea, select');
    
    fields.forEach(field => {
        // Skip hidden fields and buttons
        if (field.type === 'hidden' || field.type === 'button' || field.type === 'submit') {
            return;
        }
        
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Submit the contact form data to the server
 */
async function submitContactForm(formData) {
    // This is where you would typically make an API call to your backend
    // For now, we'll simulate an API call with a timeout
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate a 90% success rate for testing
            if (Math.random() < 0.9) {
                resolve({ success: true, message: 'Message sent successfully' });
            } else {
                reject(new Error('Failed to send message. Please try again later.'));
            }
        }, 1500);
    });
}

/**
 * Show an alert message
 */
function showAlert(type, message) {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.alert-dismissible');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Find the form and insert the alert before it
    const form = document.getElementById('contactForm');
    if (form) {
        form.parentNode.insertBefore(alertDiv, form);
    } else {
        // If no form, append to the first .container or body
        const container = document.querySelector('.container') || document.body;
        container.insertBefore(alertDiv, container.firstChild);
    }
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alertDiv);
        bsAlert.close();
    }, 5000);
}

// Export functions if using modules
// export { initContactForm, validateForm, showAlert };