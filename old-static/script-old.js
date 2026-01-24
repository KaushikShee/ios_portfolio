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

// About Section Interactive Effects
class AboutInteractiveEffects {
    constructor() {
        this.aboutSection = document.querySelector('.about');
        this.statCards = document.querySelectorAll('.stat');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        if (!this.aboutSection) return;
        this.createParticleSystem();
        this.addMouseTracking();
        this.addMagneticEffect();
        this.addIntersectionObserver();
    }

    createParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'about-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 3;
        `;
        this.aboutSection.appendChild(particleContainer);

        // Create floating particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'interactive-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: radial-gradient(circle, rgba(10, 132, 255, 0.8), rgba(255, 69, 58, 0.6));
                border-radius: 50%;
                opacity: 0.3;
                transition: all 0.3s ease;
                box-shadow: 0 0 10px rgba(10, 132, 255, 0.5);
            `;
            
            this.particles.push({
                element: particle,
                x: Math.random() * (this.aboutSection.offsetWidth || 800),
                y: Math.random() * 200,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 4 + 2
            });
            
            particleContainer.appendChild(particle);
        }

        this.animateParticles();
    }

    animateParticles() {
        this.particles.forEach(particle => {
            // Mouse attraction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                particle.vx += dx * 0.00005;
                particle.vy += dy * 0.00005;
                particle.element.style.opacity = Math.max(0.8 - distance / 150, 0);
                particle.element.style.transform = `scale(${1 + (150 - distance) / 150})`;
            } else {
                particle.element.style.opacity = '0.3';
                particle.element.style.transform = 'scale(1)';
            }

            particle.x += particle.vx;
            particle.y += particle.vy;

            // Boundary check
            const maxWidth = this.aboutSection.offsetWidth || 800;
            if (particle.x < 0 || particle.x > maxWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > 400) particle.vy *= -1;

            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });

        requestAnimationFrame(() => this.animateParticles());
    }

    addMouseTracking() {
        this.aboutSection.addEventListener('mousemove', (e) => {
            const rect = this.aboutSection.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }

    addMagneticEffect() {
        this.statCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.15;
                const moveY = y * 0.15;
                
                card.style.transform = `translateY(-15px) scale(1.05) rotateX(${-moveY * 0.1}deg) rotateY(${moveX * 0.1}deg) translate3d(${moveX}px, ${moveY}px, 0)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    addIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Trigger special animation
                    setTimeout(() => {
                        entry.target.style.animation = 'none';
                        entry.target.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
                    }, 800);
                }
            });
        }, { threshold: 0.3 });

        this.statCards.forEach(card => observer.observe(card));
    }
}

// Initialize About Interactive Effects when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AboutInteractiveEffects();
    });
} else {
    new AboutInteractiveEffects();
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
        
        // Disable heavy animations on mobile for better performance
        const floatingElements = document.querySelectorAll('.floating-icon');
        floatingElements.forEach(el => {
            el.style.display = 'none';
        });
        
        // Disable particle systems on mobile
        const particleContainers = document.querySelectorAll('.about-particles, .hero-particles');
        particleContainers.forEach(container => {
            if (container) container.remove();
        });
        
        // Reduce animation complexity
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        document.documentElement.style.setProperty('--blur-intensity', '5px');
    }
});

// Enhanced Skills Section Interactive Effects
class SkillsInteractiveEffects {
    constructor() {
        this.skillsSection = document.querySelector('.skills');
        this.skillCategories = document.querySelectorAll('.skill-category');
        this.skillItems = document.querySelectorAll('.skill-item');
        this.isMobile = window.innerWidth <= 768;
        this.isLowPerformance = this.detectLowPerformance();
        this.init();
    }

    detectLowPerformance() {
        // Simple performance detection
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        return isMobile || isSlowDevice;
    }

    init() {
        if (!this.skillsSection) return;
        this.addIntersectionObserver();
        
        // Only add complex effects on high-performance devices
        if (!this.isLowPerformance) {
            this.addSkillItemEffects();
            this.addCategoryEffects();
        } else {
            this.addSimpleMobileEffects();
        }
    }

    addIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Trigger staggered animations
                    this.triggerStaggeredAnimations();
                }
            });
        }, { threshold: 0.2 });

        observer.observe(this.skillsSection);
    }

    triggerStaggeredAnimations() {
        this.skillCategories.forEach((category, index) => {
            setTimeout(() => {
                category.style.animationPlayState = 'running';
            }, index * 200);
        });
    }

    addSkillItemEffects() {
        this.skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('i');
                
                // Enhanced icon animation (reduced for performance)
                if (icon) {
                    icon.style.transform = 'scale(1.15) rotate(3deg)';
                    icon.style.filter = 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))';
                }
                
                // Add ripple effect only on desktop
                if (!this.isMobile) {
                    this.createRippleEffect(item);
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                    icon.style.filter = 'drop-shadow(0 0 6px rgba(10, 132, 255, 0.3))';
                }
            });
        });
    }
    
    addSimpleMobileEffects() {
        // Simplified effects for mobile devices
        this.skillItems.forEach(item => {
            item.addEventListener('touchstart', () => {
                item.style.transform = 'scale(1.02)';
            });
            
            item.addEventListener('touchend', () => {
                item.style.transform = 'scale(1)';
            });
        });
    }

    addCategoryEffects() {
        // Only add complex category effects on desktop
        if (!this.isMobile) {
            this.skillCategories.forEach(category => {
                category.addEventListener('mouseenter', () => {
                    // Simplified glow effect
                    this.skillCategories.forEach(otherCategory => {
                        if (otherCategory !== category) {
                            otherCategory.style.opacity = '0.8';
                        }
                    });
                });

                category.addEventListener('mouseleave', () => {
                    // Reset all categories
                    this.skillCategories.forEach(otherCategory => {
                        otherCategory.style.opacity = '1';
                    });
                });
            });
        }
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        `;

        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Initialize Skills Interactive Effects
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SkillsInteractiveEffects();
        new ContactInteractiveEffects();
    });
} else {
    new SkillsInteractiveEffects();
    new ContactInteractiveEffects();
}

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

// Enhanced Contact Section Interactive Effects
class ContactInteractiveEffects {
    constructor() {
        this.contactSection = document.querySelector('.contact');
        this.contactLinks = document.querySelectorAll('.contact-link');
        this.contactText = document.querySelector('.contact-text');
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        if (!this.contactSection) return;
        this.addMouseTracking();
        this.addContactLinkEffects();
        this.addRippleEffect();
        this.addMagneticEffect();
        this.createFloatingElements();
    }

    addMouseTracking() {
        this.contactSection.addEventListener('mousemove', (e) => {
            const rect = this.contactSection.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            
            // Update CSS custom properties for mouse position
            this.contactSection.style.setProperty('--mouse-x', `${this.mouse.x}px`);
            this.contactSection.style.setProperty('--mouse-y', `${this.mouse.y}px`);
        });
    }

    addContactLinkEffects() {
        this.contactLinks.forEach((link, index) => {
            // Add staggered entrance animation
            link.style.animationDelay = `${0.9 + index * 0.2}s`;
            
            // Enhanced hover effects
            link.addEventListener('mouseenter', () => {
                // Add glow effect to other links
                this.contactLinks.forEach(otherLink => {
                    if (otherLink !== link) {
                        otherLink.style.opacity = '0.7';
                        otherLink.style.filter = 'blur(1px)';
                    }
                });
                
                // Create sparkle effect
                this.createSparkles(link);
            });
            
            link.addEventListener('mouseleave', () => {
                // Reset all links
                this.contactLinks.forEach(otherLink => {
                    otherLink.style.opacity = '1';
                    otherLink.style.filter = 'none';
                });
            });
        });
    }

    addRippleEffect() {
        this.contactLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const rect = link.getBoundingClientRect();
                const ripple = document.createElement('div');
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: contactRipple 0.8s ease-out;
                    pointer-events: none;
                    z-index: 10;
                `;
                
                link.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 800);
            });
        });
    }

    addMagneticEffect() {
        this.contactLinks.forEach(link => {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                link.style.transform = `translateY(-12px) scale(1.05) translate3d(${moveX}px, ${moveY}px, 0)`;
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
            });
        });
    }

    createSparkles(element) {
        const sparkleCount = 6;
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #007AFF, #FF3B30);
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                animation: sparkleFloat 1.5s ease-out forwards;
            `;
            
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            
            element.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1500);
        }
    }

    createFloatingElements() {
        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'contact-floating-elements';
        floatingContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        this.contactSection.appendChild(floatingContainer);
        
        // Create floating geometric shapes
        for (let i = 0; i < 8; i++) {
            const shape = document.createElement('div');
            const shapeType = Math.random() > 0.5 ? 'circle' : 'square';
            const size = Math.random() * 8 + 4;
            
            shape.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, rgba(10, 132, 255, 0.3), rgba(255, 69, 58, 0.2));
                border-radius: ${shapeType === 'circle' ? '50%' : '2px'};
                opacity: 0.4;
                animation: contactFloatShape ${8 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            floatingContainer.appendChild(shape);
        }
    }
}

// Contact Link Ripple Effect (Enhanced)
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

// Add enhanced ripple effect and contact animations CSS
const contactEnhancedStyle = document.createElement('style');
contactEnhancedStyle.textContent = `
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
    
    @keyframes contactRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-30px) scale(0) rotate(180deg);
            opacity: 0;
        }
    }
    
    @keyframes contactFloatShape {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.4;
        }
        25% {
            transform: translateY(-20px) rotate(90deg);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-10px) rotate(180deg);
            opacity: 0.3;
        }
        75% {
            transform: translateY(-25px) rotate(270deg);
            opacity: 0.5;
        }
    }
    
    /* Enhanced contact section mobile responsiveness */
    @media (max-width: 768px) {
        .contact-floating-elements {
            display: none;
        }
        
        .contact::before {
            animation-duration: 8s;
        }
        
        .contact-link {
            padding: 1.2rem 2rem;
            font-size: 1rem;
        }
        
        .contact-link i {
            font-size: 1.5rem;
        }
        
        .contact-text p {
            font-size: 1.2rem;
        }
    }
`;
document.head.appendChild(contactEnhancedStyle);

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


}

// Desktop-only: Projects slide from left to right based on scroll position
function initProjectsAnimation() {
    // Only run on desktop
    if (window.innerWidth <= 768) return;
    
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const cardIndex = Array.from(projectCards).indexOf(card);
                
                // Staggered animation with smooth CSS transitions
                setTimeout(() => {
                    card.style.transform = 'translateX(0)';
                    card.style.opacity = '1';
                }, cardIndex * 200);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    projectCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    initKeyboardNavigation();
    initProjectsAnimation();
    
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
