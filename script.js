document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Pre-order button handler
    document.querySelector('.cta').addEventListener('click', () => {
        alert('Thank you for your interest! Our team will contact you shortly.');
    });

    // Email validation for newsletter
    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            if(validateEmail(email)) {
                alert('Thank you for subscribing!');
                form.reset();
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}