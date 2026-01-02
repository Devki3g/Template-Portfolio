// Portfolio Data
const portfolioItems = [
    {
        id: 1,
        title: "E-Commerce Website",
        category: "web",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        description: "A fully responsive e-commerce website with shopping cart and payment integration.",
        tags: ["HTML", "CSS", "JavaScript", "React"]
    },
    {
        id: 2,
        title: "Task Management App",
        category: "app",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
        description: "A web application for managing tasks and projects with team collaboration features.",
        tags: ["React", "Node.js", "MongoDB"]
    },
    {
        id: 3,
        title: "Travel Blog",
        category: "web",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1035&q=80",
        description: "A responsive travel blog with beautiful imagery and interactive maps.",
        tags: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 4,
        title: "Fitness Tracker App",
        category: "mobile",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        description: "A mobile application for tracking workouts, nutrition, and fitness goals.",
        tags: ["React Native", "Firebase"]
    },
    {
        id: 5,
        title: "Restaurant Booking System",
        category: "app",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        description: "An online reservation system for restaurants with table management.",
        tags: ["Node.js", "Express", "MongoDB"]
    },
    {
        id: 6,
        title: "Portfolio Website",
        category: "web",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1115&q=80",
        description: "A modern portfolio website to showcase design and development work.",
        tags: ["HTML", "CSS", "JavaScript"]
    }
];

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-link');
const portfolioGrid = document.getElementById('portfolioGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');
const backToTopBtn = document.getElementById('backToTop');
const downloadCVBtn = document.getElementById('downloadCV');
const header = document.querySelector('.header');
const newsletterForm = document.querySelector('.newsletter-form');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Initialize portfolio
    initPortfolio();
    
    // Initialize skills animation
    initSkills();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize newsletter form
    initNewsletterForm();
});

// Navigation Functions
function initNavigation() {
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            // Update active link
            navLinksItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
}

// Portfolio Functions
function initPortfolio() {
    if (!portfolioGrid) return;
    
    // Render portfolio items
    renderPortfolio(portfolioItems);
    
    // Filter portfolio items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            if (filter === 'all') {
                renderPortfolio(portfolioItems);
            } else {
                const filteredItems = portfolioItems.filter(item => item.category === filter);
                renderPortfolio(filteredItems);
            }
        });
    });
}

function renderPortfolio(items) {
    portfolioGrid.innerHTML = '';
    
    items.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = `portfolio-item ${item.category}`;
        portfolioItem.setAttribute('data-category', item.category);
        
        const tagsHTML = item.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="portfolio-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="portfolio-tags">
                    ${tagsHTML}
                </div>
            </div>
        `;
        
        // Add click event to open project details
        portfolioItem.addEventListener('click', function() {
            openProjectModal(item);
        });
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

function openProjectModal(project) {
    // In a real application, you would open a modal with project details
    // For now, we'll show an alert
    alert(`Project: ${project.title}\n\n${project.description}\n\nTechnologies: ${project.tags.join(', ')}`);
}

// Skills Functions
function initSkills() {
    if (skillBars.length === 0) return;
    
    // Animate skill bars when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = `${width}%`;
    });
}

// Contact Form Functions
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name') || 'Visitor';
        const email = formData.get('email');
        
        // Show success message
        showNotification(`Thank you ${name}! Your message has been sent. I'll get back to you soon at ${email}.`, 'success');
        
        // Reset form
        contactForm.reset();
    });
    
    // Download CV button
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real application, this would download a PDF file
            showNotification('CV download started!', 'info');
            
            // Simulate download
            setTimeout(() => {
                showNotification('CV downloaded successfully!', 'success');
            }, 1500);
        });
    }
}

// Newsletter Form Functions
function initNewsletterForm() {
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('.newsletter-input');
        const email = emailInput.value;
        
        if (email && isValidEmail(email)) {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            this.reset();
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set colors based on type
    let bgColor = '#3498db'; // Default blue for info
    if (type === 'success') bgColor = '#2ecc71';
    if (type === 'error') bgColor = '#e74c3c';
    
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${bgColor};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
        animation: slideIn 0.3s ease;
        font-family: 'Roboto', sans-serif;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add animation styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Back to Top Functions
function initBackToTop() {
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-item, .portfolio-item, .contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const animatedElements = document.querySelectorAll('.skill-item, .portfolio-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger once on load
    setTimeout(animateOnScroll, 100);
}

// Header Scroll Effect
function initHeaderScroll() {
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate offset based on header height
            const headerHeight = header ? header.offsetHeight : 70;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});