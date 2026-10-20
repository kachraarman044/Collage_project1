document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('active') && !event.target.closest('nav')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Number input controls
    const numberControls = document.querySelectorAll('.number-input');
    numberControls.forEach(control => {
        const decreaseBtn = control.querySelector('.decrease');
        const increaseBtn = control.querySelector('.increase');
        const input = control.querySelector('input');

        decreaseBtn && decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(input.value);
            const minValue = parseInt(input.getAttribute('min') || 0);
            if (currentValue > minValue) {
                input.value = currentValue - 1;
                input.dispatchEvent(new Event('change'));
            }
        });

        increaseBtn && increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(input.value);
            const maxValue = parseInt(input.getAttribute('max') || 99);
            if (currentValue < maxValue) {
                input.value = currentValue + 1;
                input.dispatchEvent(new Event('change'));
            }
        });
    });

    // Set min date for date inputs (today)
    const today = new Date().toISOString().split('T')[0];
    const departureDate = document.getElementById('departure-date');
    const returnDate = document.getElementById('return-date');

    if (departureDate && returnDate) {
        departureDate.min = today;
        returnDate.min = today;

        // Update return date min when departure date changes
        departureDate.addEventListener('change', function() {
            returnDate.min = this.value;
            if (returnDate.value && new Date(returnDate.value) < new Date(this.value)) {
                returnDate.value = this.value;
            }
            updatePrice();
        });

        returnDate.addEventListener('change', updatePrice);
    }

    // Destination card selection
    const destinationCards = document.querySelectorAll('.destination-card');
    const destinationSelect = document.getElementById('destination');

    destinationCards.forEach(card => {
        const selectBtn = card.querySelector('.btn-select');
        if (selectBtn) {
            selectBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const destinationValue = card.dataset.destination;
                destinationSelect.value = destinationValue;

                // Scroll to booking section
                document.getElementById('booking').scrollIntoView({
                    behavior: 'smooth'
                });

                // Update prices
                updatePrice();
            });
        }
    });

    // Price calculation
    const destinationPrices = {
        'Gujarat': { base: 899, standard: 1, premium: 1.5, luxury: 2.2 },
        'Andhra Pradesh': { base: 1199, standard: 1, premium: 1.5, luxury: 2.2 },
        'Arunachal Pradesh': { base: 1099, standard: 1, premium: 1.5, luxury: 2.2 },
        'Assam': { base: 999, standard: 1, premium: 1.5, luxury: 2.2 },
        'Bihar': { base: 1299, standard: 1, premium: 1.5, luxury: 2.2 },
        'Goa': { base: 2000, standard: 1, premium: 1.5, luxury: 2.2 },
        'Haryana': { base: 2500, standard: 1, premium: 1.5, luxury: 2.2 },
        'Himachal Pradesh': { base: 8504, standard: 1, premium: 1.5, luxury: 2.2 },
        'Jharkhand': { base: 7850, standard: 1, premium: 1.5, luxury: 2.2 },
        'Karnataka': { base: 20000, standard: 1, premium: 1.5, luxury: 2.2 },
        'Kerala': { base: 35000, standard: 1, premium: 1.5, luxury: 2.2 },
        'Madhya Pradesh': { base: 4050, standard: 1, premium: 1.5, luxury: 2.2 },
        'Maharashtra': { base: 78040, standard: 1, premium: 1.5, luxury: 2.2 },
        'Manipur': { base: 98000, standard: 1, premium: 1.5, luxury: 2.2 },
        'Meghalaya': { base: 7840, standard: 1, premium: 1.5, luxury: 2.2 },
        'Mizoram': { base: 79202, standard: 1, premium: 1.5, luxury: 2.2 },
        'Nagaland': { base: 7840, standard: 1, premium: 1.5, luxury: 2.2 },
        'Odisha': { base: 9840, standard: 1, premium: 1.5, luxury: 2.2 },
        'Punjab': { base: 50400, standard: 1, premium: 1.5, luxury: 2.2 },
        'Rajasthan': { base: 9530, standard: 1, premium: 1.5, luxury: 2.2 },
        'Sikkim': { base: 8740, standard: 1, premium: 1.5, luxury: 2.2 },
        'Tamil Nadu': { base: 60000, standard: 1, premium: 1.5, luxury: 2.2 },
        'Telangana': { base: 12000, standard: 1, premium: 1.5, luxury: 2.2 },
        'Tripura': { base: 7952, standard: 1, premium: 1.5, luxury: 2.2 },
        'Uttarakhand': { base: 30000, standard: 1, premium: 1.5, luxury: 2.2 },
        'Uttar Pradesh': { base: 41520, standard: 1, premium: 1.5, luxury: 2.2 },
        'West Bengal': { base: 10000, standard: 1, premium: 1.5, luxury: 2.2 },
        'Jammu And Kashmir': { base: 56010, standard: 1, premium: 1.5, luxury: 2.2 },
        'Andaman And Nicobar': { base: 80500, standard: 1, premium: 1.5, luxury: 2.2 },
        'Chandigarh': { base: 74500, standard: 1, premium: 1.5, luxury: 2.2 },
        'Diu & Daman': { base: 98520, standard: 1, premium: 1.5, luxury: 2.2 },
        'Lakshadweep': { base: 56201, standard: 1, premium: 1.5, luxury: 2.2 },
        'Puducherry': { base: 65201, standard: 1, premium: 1.5, luxury: 2.2 },
        'Ladakh': { base: 46201, standard: 1, premium: 1.5, luxury: 2.2 },
        'NCT Of Delhi': { base: 94050, standard: 1, premium: 1.5, luxury: 2.2 }
    };

    // Elements for price updates
    const basePrice = document.getElementById('base-price');
    const taxesElement = document.getElementById('taxes');
    const totalPrice = document.getElementById('total-price');

    // Add event listeners for price changes
    document.getElementById('destination').addEventListener('change', updatePrice);
    document.getElementById('adults').addEventListener('change', updatePrice);
    document.getElementById('children').addEventListener('change', updatePrice);

    const packageRadios = document.querySelectorAll('input[name="package"]');
    packageRadios.forEach(radio => {
        radio.addEventListener('change', updatePrice);
    });

    // Price update function
    function updatePrice() {
        const destination = document.getElementById('destination').value;
        const adults = parseInt(document.getElementById('adults').value);
        const children = parseInt(document.getElementById('children').value);

        // Get selected package type
        let packageType = 'standard';
        document.querySelectorAll('input[name="package"]').forEach(radio => {
            if (radio.checked) packageType = radio.value;
        });

        // Calculate nights if dates are selected
        let nights = 1;
        const departureDate = document.getElementById('departure-date').value;
        const returnDate = document.getElementById('return-date').value;

        if (departureDate && returnDate) {
            const departure = new Date(departureDate);
            const returningDate = new Date(returnDate);
            nights = Math.max(1, Math.round((returningDate - departure) / (1000 * 60 * 60 * 24)));
        }

        // Calculate prices
        let price = 0;

        if (destination && destinationPrices[destination]) {
            const baseAmount = destinationPrices[destination].base;
            const multiplier = destinationPrices[destination][packageType];

            price = baseAmount * multiplier * nights;

            // Add price for adults and children
            price = (price * adults) + (price * 0.7 * children);
        }

        // Calculate taxes (15% of base price)
        const taxes = price * 0.15;
        const total = price + taxes;

        // Update DOM elements
        if (basePrice) basePrice.textContent = `₹${Math.round(price).toLocaleString()}`;
        if (taxesElement) taxesElement.textContent = `₹${Math.round(taxes).toLocaleString()}`;
        if (totalPrice) totalPrice.textContent = `₹${Math.round(total).toLocaleString()}`;
    }

    // Initialize price
    updatePrice();

    // Form submission with AJAX
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Form validation
            const destination = document.getElementById('destination').value;
            const departureDate = document.getElementById('departure-date').value;
            const returnDate = document.getElementById('return-date').value;

            if (!destination || !departureDate || !returnDate) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Collect form data
            const formData = new FormData(bookingForm);

            // AJAX request
            fetch(bookingForm.action , {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                // Show modal with booking details
                const adults = document.getElementById('adults').value;
                const children = document.getElementById('children').value;

                let packageType = 'Standard';
                document.querySelectorAll('input[name="package"]').forEach(radio => {
                    if (radio.checked) {
                        packageType = radio.value.charAt(0).toUpperCase() + radio.value.slice(1);
                    }
                });

                const specialRequests = document.getElementById('special-requests').value;

                // Calculate nights
                const departure = new Date(departureDate);
                const returning = new Date(returnDate);
                const nights = Math.round((returning - departure) / (1000 * 60 * 60 * 24));

                // Format dates for display
                const formatDate = (dateString) => {
                    const date = new Date(dateString);
                    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
                };

                // Format destination for display
                let destinationDisplay = destination.replace('-', ' ');
                destinationDisplay = destinationDisplay.charAt(0).toUpperCase() + destinationDisplay.slice(1);

                // Get price information
                const total = document.getElementById('total-price').textContent;

                // Display booking details in modal
                const bookingDetails = document.querySelector('.booking-details');
                bookingDetails.innerHTML = `
                    <p><strong>Destination:</strong> <span>${destinationDisplay}</span></p>
                    <p><strong>Departure:</strong> <span>${formatDate(departureDate)}</span></p>
                    <p><strong>Return:</strong> <span>${formatDate(returnDate)}</span></p>
                    <p><strong>Duration:</strong> <span>${nights} night${nights !== 1 ? 's' : ''}</span></p>
                    <p><strong>Guests:</strong> <span>${adults} adult${adults !== "1" ? 's' : ''}, ${children} child${children !== "1" ? 'ren' : ''}</span></p>
                    <p><strong>Package:</strong> <span>${packageType}</span></p>
                    <p><strong>Total Cost:</strong> <span>${total}</span></p>
                `;
                if (specialRequests) {
                    bookingDetails.innerHTML += `
                        <p><strong>Special Requests:</strong> <span>${specialRequests}</span></p>
                    `;
                } 

                // Show success modal
                const modal = document.getElementById('booking-success');
                modal.classList.add('show');

                // Optionally reset form
                // bookingForm.reset();

                // Optionally show backend response as notification
                if (data && data.toLowerCase().includes('success')) {
                    showNotification('Booking successfully!', 'success');
                } else if (data && data.toLowerCase().includes('error')) {
                    showNotification('Booking failed: ' + data, 'error');
                }
            })
            .catch(error => {
                showNotification('Booking failed. Please try again.', 'error');
            });
        });
    }

    // Modal close functionality
    const closeModal = document.querySelector('.close-modal');
    const closeButton = document.getElementById('close-modal');

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('booking-success').classList.remove('show');
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            document.getElementById('booking-success').classList.remove('show');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('booking-success');
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            }
        });
    }
});

// Notification function
function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add styles if not already in CSS
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '9999';
    notification.style.fontSize = '0.9rem';
    notification.style.fontWeight = '500';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-10px)';
    notification.style.transition = 'all 0.3s ease';

    if (type === 'success') {
        notification.style.backgroundColor = '#22c55e';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#ef4444';
        notification.style.color = 'white';
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Show with animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}