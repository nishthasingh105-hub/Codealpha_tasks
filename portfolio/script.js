// ===== SMOOTH SCROLLING & NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== ACTIVE NAVIGATION LINK =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== SKILL PROGRESS ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            if (skillProgress) {
                const width = skillProgress.style.width;
                skillProgress.style.width = '0';
                setTimeout(() => {
                    skillProgress.style.width = width;
                }, 100);
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-bar').forEach(bar => {
    observer.observe(bar);
});

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields!', 'error');
            return;
        }

        // Create mailto link
        const mailtoLink = `mailto:nishthasingh105@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        
        // Show success message
        showNotification('Message prepared! Opening email client...', 'success');
        
        // Open email client
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 1000);

        // Reset form
        contactForm.reset();
    });
}

// ===== NOTIFICATION FUNCTION =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#3498DB'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideInRight 0.5s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ===== DOWNLOAD RESUME =====
const downloadResumeBtn = document.getElementById('downloadResume');

if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
        // Create a text file with resume content
        const resumeContent = `
NISHTHA SINGH
============================================================
Contact Information:
- Phone: 9343896687
- Email: nishthasingh105@gmail.com
- Location: Jayant, Singrauli (M.P)

CAREER OBJECTIVE:
============================================================
Enthusiastic Diploma student in Computer Science Engineering 
seeking an internship opportunity to gain practical experience, 
enhance technical skills, and contribute positively to an organization.

EDUCATION:
============================================================
Diploma in Computer Science Engineering
Institution: Ambalika Institute of Management and Technology
Duration: 2024 - 2027
Current: 3rd Year, 5th Semester

TECHNICAL SKILLS:
============================================================
• HTML - Advanced
• CSS - Advanced
• JavaScript - Intermediate
• Python - Basic (Learning)
• Computer Fundamentals - Advanced
• Internet & Email - Proficient

PROFESSIONAL SKILLS:
============================================================
• Teamwork
• Quick Learner
• Communication Skills
• Problem Solving
• Hardworking
• Responsible
• Positive Attitude
• Willing to Learn

PROJECTS:
============================================================
1. Calculator Application
   - Functional calculator built with HTML, CSS, and JavaScript
   - Features: Basic arithmetic operations, clean UI

2. Image Gallery
   - Interactive image gallery with smooth transitions
   - Features: Lightbox functionality, responsive design

3. Portfolio Website
   - Personal portfolio showcasing skills and projects
   - Features: Responsive design, smooth animations

STRENGTHS:
============================================================
✓ Hardworking
✓ Responsible
✓ Positive Attitude
✓ Willing to Learn

LANGUAGES:
============================================================
• English (Basic)
• Hindi (Fluent)

============================================================
Generated on: ${new Date().toLocaleDateString()}
============================================================
        `;

        // Create blob and download
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Nishtha_Singh_Resume.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        showNotification('Resume downloaded successfully!', 'success');
    });
}

// ===== ANIMATIONS ON SCROLL =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .detail-item, .strength-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===== ADD ANIMATIONS TO CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== SCROLL TO TOP BUTTON =====
const createScrollToTopButton = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.id = 'scrollToTop';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #8B6F47 0%, #D4A574 100%);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
            scrollBtn.style.alignItems = 'center';
            scrollBtn.style.justifyContent = 'center';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
    });
};

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ===== LAZY LOADING FOR IMAGES =====
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(img);
    });
}

// ===== PARTICLE BACKGROUND (Optional) =====
const createParticles = () => {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 100 + 20}px;
            height: ${Math.random() * 100 + 20}px;
            background: radial-gradient(circle, rgba(212, 165, 116, 0.3), transparent);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 20 + 10}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        heroSection.appendChild(particle);
    }
};

window.addEventListener('load', createParticles);

// ===== PERFORMANCE: DEBOUNCE FUNCTION =====
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

// ===== SMOOTH HOVER EFFECTS =====
const addHoverEffects = () => {
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
};

document.addEventListener('DOMContentLoaded', addHoverEffects);

// ===== COUNTER ANIMATION =====
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        
        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 50);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// ===== CONSOLE MESSAGES =====
console.log('%cWelcome to Nishtha Singh\'s Portfolio!', 'font-size: 20px; color: #8B6F47; font-weight: bold;');
console.log('%cDesigned and developed with ❤️', 'font-size: 14px; color: #D4A574;');
console.log('%cContact: nishthasingh105@gmail.com', 'font-size: 12px; color: #666;');