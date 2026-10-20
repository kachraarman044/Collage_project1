// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Login/Register tab functionality
    const tabs = document.querySelectorAll('.tab');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                document.querySelectorAll('.tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all form contents
                document.querySelectorAll('.form-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the selected form content
                const formId = this.getAttribute('data-tab');
                document.getElementById(formId).classList.add('active');
            });
        });
    }

    // Form validation for login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            // ❌ पहले e.preventDefault(); था → remove कर दिया
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            let isValid = true;
            
            // Simple validation
            if (!email || !email.includes('@')) {
                highlightError('loginEmail', 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError('loginEmail');
            }
            
            if (!password || password.length < 6) {
                highlightError('loginPassword', 'Password must be at least 6 characters');
                isValid = false;
            } else {
                removeError('loginPassword');
            }
            
            if (!isValid) {
                e.preventDefault(); // अगर invalid है तभी रोकेंगे
            } 
            // ✅ अगर valid है तो form अब normal तरीके से submit होगा → Login.php पर जाएगा
        });
    }
    
    // Form validation for registration
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            // ❌ पहले e.preventDefault(); था → remove कर दिया
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsCheck = document.getElementById('termsCheck').checked;
            let isValid = true;
            
            // Simple validation
            if (!name || name.length < 3) {
                highlightError('registerName', 'Please enter your full name');
                isValid = false;
            } else {
                removeError('registerName');
            }
            
            if (!email || !email.includes('@')) {
                highlightError('registerEmail', 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError('registerEmail');
            }
            
            if (!password || password.length < 6) {
                highlightError('registerPassword', 'Password must be at least 6 characters');
                isValid = false;
            } else {
                removeError('registerPassword');
            }
            
            if (password !== confirmPassword) {
                highlightError('confirmPassword', 'Passwords do not match');
                isValid = false;
            } else {
                removeError('confirmPassword');
            }
            
            if (!termsCheck) {
                highlightError('termsCheck', 'You must agree to the Terms & Conditions');
                isValid = false;
            } else {
                removeError('termsCheck');
            }
            
            if (!isValid) {
                e.preventDefault(); // ❌ सिर्फ invalid होने पर रोकेंगे
            }
            // ✅ valid होने पर form अब PHP (registration.php) को submit होगा
        });
    }
    
    // Hero text animation on homepage
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.opacity = '0';
        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.animation = 'fadeInUp 1s ease-in-out forwards';
        }, 500);
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Helper function to highlight form errors
function highlightError(inputId, message) {
    const input = document.getElementById(inputId);
    input.classList.add('is-invalid');
    
    // Create error message if it doesn't exist
    if (!document.getElementById(`${inputId}-error`)) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.id = `${inputId}-error`;
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    } else {
        document.getElementById(`${inputId}-error`).textContent = message;
    }
}

// Helper function to remove error styling
function removeError(inputId) {
    const input = document.getElementById(inputId);
    input.classList.remove('is-invalid');
    
    const errorElement = document.getElementById(`${inputId}-error`);
    if (errorElement) {
        errorElement.remove();
    }
}

// Helper function to show alert messages 
function showAlert(message, type = 'info') {
    // Remove any existing alerts
    const existingAlerts = document.querySelectorAll('.alert-message');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-message alert-${type}`;
    alertDiv.textContent = message;
    
    // Add to body
    document.body.appendChild(alertDiv);
    
    // Show animation
    setTimeout(() => {
        alertDiv.classList.add('show');
    }, 10);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => {
            alertDiv.remove();
        }, 500);
    }, 5000);
}

// Add parallax effect for certain sections
window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('.cta-section');
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        element.style.backgroundPosition = 'center ' + (scrollPosition * 0.2) + 'px';
    });
});
