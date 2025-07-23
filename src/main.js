const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') {
            return;
        }
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navMenu.classList.remove('active');
        }
    });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('hero')) {
                setTimeout(animateCounters, 500);
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.topic-card, .speaker-card, .pricing-card, .committee-member, .timeline-item');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    const slideLeftElements = document.querySelectorAll('.about-content');
    slideLeftElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });
    const slideRightElements = document.querySelectorAll('.about-image');
    slideRightElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
});

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

const registrationForm = document.getElementById('registrationForm');
const contactForm = document.getElementById('contactForm');

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#e2e8f0';
        }
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            }
        }
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(input.value.replace(/\s/g, ''))) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            }
        }
    });
    return isValid;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(registrationForm)) {
            const submitButton = registrationForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            setTimeout(() => {
                showNotification('Registration submitted successfully! You will receive a confirmation email shortly.');
                registrationForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        } else {
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(contactForm)) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            setTimeout(() => {
                showNotification('Message sent successfully! We will get back to you soon.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        } else {
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });
}

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(30, 64, 175, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(30, 64, 175, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('btn-primary') && this.type !== 'submit') {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

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

const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const heroCountdownEl = document.getElementById('hero-countdown');
if (heroCountdownEl) {
    function updateHeroCountdown() {
        const eventDate = new Date('2026-01-20T00:00:00+05:30');
        const now = new Date();
        const diff = eventDate - now;
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            heroCountdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            heroCountdownEl.textContent = 'Event Started!';
        }
    }
    updateHeroCountdown();
    setInterval(updateHeroCountdown, 1000);
}

const heroSection = document.querySelector('.hero');
const heroImages = [
    'nitraipur1.jpg',
    'nitraipur2.jpg',
    'nitraipur3.jpg',
    'nitraipur4.jpg',
    'nitraipur5.jpg'
];
let heroImageIndex = 0;
let heroBackgroundLayer1, heroBackgroundLayer2;
let isLayer1Active = true;

function initHeroBackgrounds() {
    if (heroSection) {
        heroBackgroundLayer1 = document.createElement('div');
        heroBackgroundLayer2 = document.createElement('div');
        const layerStyle = {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 3s ease-in-out',
            zIndex: '1'
        };
        Object.assign(heroBackgroundLayer1.style, layerStyle);
        Object.assign(heroBackgroundLayer2.style, layerStyle);
        heroBackgroundLayer1.style.backgroundImage = `linear-gradient(rgba(30, 64, 175, 0.5), rgba(59, 130, 246, 0.5)), url('${heroImages[0]}')`;
        heroBackgroundLayer1.style.opacity = '1';
        heroBackgroundLayer2.style.opacity = '0';
        heroSection.insertBefore(heroBackgroundLayer1, heroSection.firstChild);
        heroSection.insertBefore(heroBackgroundLayer2, heroSection.firstChild);
        const heroOverlay = heroSection.querySelector('.hero-overlay');
        if (heroOverlay) {
            heroOverlay.style.zIndex = '2';
        }
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.zIndex = '3';
        }
    }
}

function updateHeroBackground() {
    if (heroSection && heroBackgroundLayer1 && heroBackgroundLayer2) {
        heroImageIndex = (heroImageIndex + 1) % heroImages.length;
        if (isLayer1Active) {
            heroBackgroundLayer2.style.backgroundImage = `linear-gradient(rgba(30, 64, 175, 0.5), rgba(59, 130, 246, 0.5)), url('${heroImages[heroImageIndex]}')`;
            heroBackgroundLayer2.style.opacity = '1';
            heroBackgroundLayer1.style.opacity = '0';
        } else {
            heroBackgroundLayer1.style.backgroundImage = `linear-gradient(rgba(30, 64, 175, 0.5), rgba(59, 130, 246, 0.5)), url('${heroImages[heroImageIndex]}')`;
            heroBackgroundLayer1.style.opacity = '1';
            heroBackgroundLayer2.style.opacity = '0';
        }
        isLayer1Active = !isLayer1Active;
    }
}

if (heroSection) {
    heroSection.style.background = 'linear-gradient(rgba(30, 64, 175, 0.8), rgba(59, 130, 246, 0.8))';
    initHeroBackgrounds();
    setInterval(updateHeroBackground, 3000);
}
