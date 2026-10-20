// DOM elements
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the form
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    } 
    
    // Initialize any tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (tooltips.length > 0) {
        tooltips.forEach(tooltip => {
            new bootstrap.Tooltip(tooltip);
        });
    }
});

/**
 * Handle form submission
 * @param {Event} e - Form submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form elements
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    const newsletter = document.getElementById('newsletter').checked;
    
    // Validate form
    if (!validateForm(firstName, lastName, email, subject, message)) {
        return;
    }
    
    // Collect form data
    const formData = {
        firstName,
        lastName,
        email,
        phone,
        subject,
        message,
        newsletter
    };
    
    // Submit form (simulation for demo)
    simulateFormSubmission(formData);
}

/**
 * Validate form fields
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @param {string} email - Email address
 * @param {string} subject - Subject
 * @param {string} message - Message
 * @returns {boolean} - Validation result
 */
function validateForm(firstName, lastName, email, subject, message) {
    // Reset previous messages
    formMessage.className = 'alert d-none';
    formMessage.textContent = '';
    
    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

/**
 * Display form message
 * @param {string} message - Message text
 * @param {string} type - Message type (success or error)
 */
function showFormMessage(message, type) {
    formMessage.textContent = message;
    
    if (type === 'success') {
        formMessage.className = 'alert alert-success';
    } else {
        formMessage.className = 'alert alert-danger';
    }
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Simulate form submission (for demo purposes)
 * @param {Object} formData - Form data
 */
function simulateFormSubmission(formData) {
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }, 1500);
}

// FAQ Accordion - Add smooth animation
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', function() {
        const accordionContent = this.nextElementSibling;
        
        if (this.classList.contains('collapsed')) {
            // Opening the accordion item
            accordionContent.style.maxHeight = '0px';
            setTimeout(() => {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            }, 10);
        } else {
            // Closing the accordion item
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            setTimeout(() => {
                accordionContent.style.maxHeight = '0px';
            }, 10);
        }
    });
}); 