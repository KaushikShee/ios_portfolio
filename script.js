// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle function
function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add a little animation to the toggle button
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
}

// Mouse click event
themeToggle.addEventListener('click', toggleTheme);

// Keyboard support for theme toggle
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
    }
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = body.getAttribute('data-theme') === 'dark' 
            ? 'rgba(0, 0, 0, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = body.getAttribute('data-theme') === 'dark' 
            ? 'rgba(0, 0, 0, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .stat');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for animation classes
const style = document.createElement('style');
style.textContent = `
    .skill-category, .project-card, .stat {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .skill-category.animate-in, .project-card.animate-in, .stat.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Dynamic Island Animation
const dynamicIsland = document.querySelector('.dynamic-island');
let islandAnimationInterval;

function startIslandAnimation() {
    islandAnimationInterval = setInterval(() => {
        dynamicIsland.style.transform = 'translateX(-50%) scale(1.1)';
        dynamicIsland.style.background = '#333';
        
        setTimeout(() => {
            dynamicIsland.style.transform = 'translateX(-50%) scale(1)';
            dynamicIsland.style.background = '#000';
        }, 200);
    }, 3000);
}

function stopIslandAnimation() {
    if (islandAnimationInterval) {
        clearInterval(islandAnimationInterval);
    }
}

// Start island animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startIslandAnimation();
        } else {
            stopIslandAnimation();
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroPhone = document.querySelector('.hero-phone');
    const floatingElements = document.querySelectorAll('.floating-icon');
    
    if (heroPhone) {
        const rate = scrolled * -0.5;
        heroPhone.style.transform = `translateY(${rate}px)`;
    }
    
    floatingElements.forEach((element, index) => {
        const rate = scrolled * (0.2 + index * 0.1);
        element.style.transform = `translateY(${rate}px) rotate(${rate * 0.5}deg)`;
    });
});

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid var(--primary-color)';
    element.style.animation = 'blink 1s infinite';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 1000);
        }
    }
    
    type();
}

// Fix text rendering issues
function fixTextRendering() {
    // Ensure all text elements are properly rendered
    const textElements = document.querySelectorAll('.hero-title, .section-title, .gradient-text');
    textElements.forEach(element => {
        if (element.innerHTML.includes('<') && element.innerHTML.includes('>')) {
            // If HTML tags are showing as text, this indicates a rendering issue
            element.style.display = 'none';
            setTimeout(() => {
                element.style.display = 'block';
            }, 100);
        }
    });
}

// Sequential Hero Animation
function startHeroAnimation() {
    const heroPhone = document.querySelector('.hero-phone');
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    // Animation sequence timing (3-second total)
    const timings = {
        phoneSlideIn: 300,
        typingStart: 800,
        buildingAppsDelay: 1800, // After typing completes
        descriptionDelay: 2400,
        buttonsDelay: 2800
    };
    
    // Step 1: iPhone slides in from left
    setTimeout(() => {
        if (heroPhone) {
            heroPhone.classList.add('animate-in');
        }
    }, timings.phoneSlideIn);
    
    // Step 2: Set up and start typing animation
    if (heroTitle) {
        const gradientText = 'iOS Developer';
        
        // Set up the initial structure
        heroTitle.innerHTML = '<span class="gradient-text"></span><span class="rest-title" style="opacity: 0;"><br>Building Amazing Apps</span>';
        
        const gradientSpan = heroTitle.querySelector('.gradient-text');
        const restSpan = heroTitle.querySelector('.rest-title');
        
        // Start typing animation for "iOS Developer"
        setTimeout(() => {
            if (gradientSpan) {
                typeWriter(gradientSpan, gradientText, 80);
            }
        }, timings.typingStart);
        
        // Step 3: Show "Building Amazing Apps" after typing completes
        setTimeout(() => {
            if (restSpan) {
                restSpan.style.opacity = '1';
                restSpan.style.transition = 'opacity 0.8s ease';
            }
        }, timings.buildingAppsDelay);
    }
    
    // Step 4: Fade in hero description
    setTimeout(() => {
        if (heroDescription) {
            heroDescription.classList.add('animate-in');
        }
    }, timings.descriptionDelay);
    
    // Step 5: Fade in hero buttons
    setTimeout(() => {
        if (heroButtons) {
            heroButtons.classList.add('animate-in');
        }
    }, timings.buttonsDelay);
}

// Initialize animations and proper rendering when page loads
window.addEventListener('load', () => {
    fixTextRendering();
    
    // Start the sequential hero animation
    startHeroAnimation();
    
    // Add mobile-specific optimizations
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-device');
        
        // Disable some animations on mobile for better performance
        const floatingElements = document.querySelectorAll('.floating-icon');
        floatingElements.forEach(el => {
            el.style.display = 'none';
        });
    }
});

// Skill Item Hover Effects
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Project Card Tilt Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
    });
});

// Contact Link Ripple Effect
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .contact-link {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical images
function preloadImages() {
    const images = ['user.jpg'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Keyboard Navigation Support
function initKeyboardNavigation() {
    // Add keyboard support for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

    // Add keyboard support for buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Add keyboard support for project cards
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

    // Add keyboard support for non-clickable project cards
    document.querySelectorAll('.project-card:not(.project-link .project-card)').forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Add visual feedback for keyboard interaction
                card.style.transform = 'translateY(-8px)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-5px)';
                }, 150);
            }
        });
    });

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Alt + T for theme toggle
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            toggleTheme();
        }
        
        // Alt + H for home section
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Alt + A for about section
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Alt + P for projects section
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Alt + C for contact section
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Skip to main content link (accessibility)
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    initKeyboardNavigation();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Add loading state CSS
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn(`Failed to load image: ${this.src}`);
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Add focus styles for accessibility
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .nav-link:focus,
    .btn:focus,
    .theme-toggle:focus,
    .contact-link:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);
