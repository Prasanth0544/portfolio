/**
 * Portfolio Website - Main JavaScript
 * Clean, minimal interactions for a professional portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initTheme();
    initTypingAnimation();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    setCurrentYear();
    initKeyboardNavigation();
});

/**
 * Theme Switcher (Dark Mode)
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference - default to light theme
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        // Default to light theme (remove any dark theme attribute)
        document.body.removeAttribute('data-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

/**
 * Typing Animation for Hero Section
 */
function initTypingAnimation() {
    const textElement = document.querySelector('.typing-text');
    if (!textElement) return;

    const textToType = 'Full Stack Developer';
    let charIndex = 0;
    
    function type() {
        if (charIndex < textToType.length) {
            textElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 500);
}

/**
 * Navigation functionality
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

/**
 * Scroll effects - Back to top button
 */
function initScrollEffects() {
    const backToTop = document.getElementById('back-to-top');

    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Classical animations on scroll with variety
 */
function initAnimations() {
    // Define animation mappings for different elements
    const animationMap = [
        // Section titles - slide in from left
        { selector: '.section-title', animation: 'slide-in-left' },
        
        // About section - slide in from right
        { selector: '.about-content', animation: 'slide-in-right' },
        { selector: '.about-image', animation: 'scale-in' },
        { selector: '.about-text', animation: 'fade-in' },
        { selector: '.stat-item', animation: 'bounce-in' },
        
        // Timeline items - staggered slide up
        { selector: '.timeline-item:nth-child(1)', animation: 'slide-in-up stagger-1' },
        { selector: '.timeline-item:nth-child(2)', animation: 'slide-in-up stagger-2' },
        { selector: '.timeline-item:nth-child(3)', animation: 'slide-in-up stagger-3' },
        
        // Skills - scale in with stagger
        { selector: '.skill-category:nth-child(1)', animation: 'scale-in stagger-1' },
        { selector: '.skill-category:nth-child(2)', animation: 'scale-in stagger-2' },
        { selector: '.skill-category:nth-child(3)', animation: 'scale-in stagger-3' },
        { selector: '.skill-category:nth-child(4)', animation: 'scale-in stagger-4' },
        
        // Projects - flip in
        { selector: '.project-card:nth-child(1)', animation: 'flip-in stagger-1' },
        { selector: '.project-card:nth-child(2)', animation: 'flip-in stagger-2' },
        
        // Certificates - zoom in
        { selector: '.certificate-card:nth-child(1)', animation: 'zoom-in stagger-1' },
        { selector: '.certificate-card:nth-child(2)', animation: 'zoom-in stagger-2' },
        { selector: '.certificate-card:nth-child(3)', animation: 'zoom-in stagger-3' },
        
        // Contact - fade blur
        { selector: '.contact-content', animation: 'fade-blur' },
        { selector: '.contact-item', animation: 'slide-in-left' },
        
        // Hero elements - special entrance
        { selector: '.hero-greeting', animation: 'fade-in' },
        { selector: '.hero-name', animation: 'slide-in-up' },
        { selector: '.hero-title', animation: 'fade-in stagger-2' },
        { selector: '.hero-description', animation: 'fade-blur stagger-3' },
        { selector: '.hero-buttons', animation: 'scale-in stagger-4' },
        { selector: '.hero-social a', animation: 'bounce-in' },
    ];

    // Apply animations
    animationMap.forEach(({ selector, animation }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            // Add animation classes
            const animClasses = animation.split(' ');
            animClasses.forEach(animClass => {
                if (animClass.startsWith('stagger-')) {
                    el.classList.add(animClass);
                } else {
                    el.classList.add(animClass);
                }
            });
        });
    });

    // Fallback: Apply fade-in to common elements that weren't mapped
    const fallbackElements = document.querySelectorAll(
        '.section-title, .about-content, .timeline-item, .skill-category, ' +
        '.project-card, .certificate-card, .contact-content'
    );
    
    fallbackElements.forEach(el => {
        // Only add fade-in if no other animation class exists
        if (!el.classList.contains('slide-in-left') && 
            !el.classList.contains('slide-in-right') && 
            !el.classList.contains('slide-in-up') && 
            !el.classList.contains('scale-in') && 
            !el.classList.contains('zoom-in') && 
            !el.classList.contains('flip-in') && 
            !el.classList.contains('bounce-in') && 
            !el.classList.contains('fade-blur')) {
            el.classList.add('fade-in');
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // For bounce-in and elastic-in, trigger animation
                if (entry.target.classList.contains('bounce-in') || 
                    entry.target.classList.contains('elastic-in')) {
                    // Animation is handled by CSS keyframes
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const allAnimatedElements = document.querySelectorAll(
        '.fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .slide-in-down, ' +
        '.scale-in, .zoom-in, .rotate-in, .flip-in, .bounce-in, .elastic-in, .fade-blur'
    );

    allAnimatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add pulse animation to social icons on hover
    const socialIcons = document.querySelectorAll('.hero-social a, .contact-social a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        icon.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    });

    // Add float animation to hero icon
    const heroIcon = document.querySelector('.hero-greeting');
    if (heroIcon) {
        setTimeout(() => {
            heroIcon.classList.add('float');
        }, 1000);
    }
}

/**
 * Contact form handling
 */
function initContactForm() {
    const form = document.getElementById('contact-form');

    // Skip if form doesn't exist (removed from HTML)
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Here you would normally send the form data to a server
        // For now, we'll just show a success message
        console.log('Form submitted:', { name, email, message });

        showNotification('Thank you for your message! I will get back to you soon.', 'success');
        form.reset();
    });
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#38a169' : type === 'error' ? '#e53e3e' : '#3182ce'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        animation: slideUp 0.3s ease;
    `;

    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideUp {
                from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    // Close button styling
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Close button handler
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideUp 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * Set current year in footer
 */
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Smooth scroll for anchor links (backup for browsers without CSS support)
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Keyboard Navigation - Improved Accessibility
 */
function initKeyboardNavigation() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Skip to main content with Alt+M
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            const mainContent = document.querySelector('main') || document.querySelector('section');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Improve button focus states
    const buttons = document.querySelectorAll('button, a[role="button"], .btn');
    buttons.forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
}
