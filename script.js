// ============ Language Switcher ============
let currentLanguage = localStorage.getItem('language') || 'vi';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update all elements with data-i18n attribute
    updatePageTranslations();
}

function updatePageTranslations() {
    const lang = currentLanguage;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = translations[lang];

        for (let k of keys) {
            // Handle both string keys and numeric indices
            if (translation && typeof translation === 'object') {
                translation = translation[k];
            }
        }

        if (translation && typeof translation === 'string') {
            element.textContent = translation;
        }
    });
}

function initLanguageSwitcher() {
    const langBtn = document.getElementById('langBtn');

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLanguage === 'vi' ? 'en' : 'vi';
            setLanguage(newLang);
            updateLanguageSwitcherUI();
        });
    }

    // Set initial UI
    updateLanguageSwitcherUI();
    updatePageTranslations();
}

function updateLanguageSwitcherUI() {
    const langBtn = document.querySelector('.lang-text');
    if (langBtn) {
        langBtn.textContent = currentLanguage === 'vi' ? 'VI' : 'EN';
    }
}

// Initialize language switcher on page load
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
});

// ============ Mobile Menu Toggle ============
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for sticky navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.card, .esg-item, .culture-item, .process-step, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

