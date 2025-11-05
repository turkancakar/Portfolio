// ===== AOS ANIMATION INITIALIZATION =====
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
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

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
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

// Video Player Modal Functionality
const videoModals = document.querySelectorAll('[id^="videoModal"]');

videoModals.forEach(modal => {
    const modalElement = new bootstrap.Modal(modal);
    const video = modal.querySelector('video');
    
    // When modal is hidden, pause the video
    modal.addEventListener('hidden.bs.modal', () => {
        if (video) {
            video.pause();
            video.currentTime = 0; // Reset to beginning
        }
    });
    
    // When modal is shown, prepare video
    modal.addEventListener('shown.bs.modal', () => {
        if (video) {
            video.load(); // Reload video for fresh start
        }
    });
});

// Auto-pause all videos when any video modal is opened
document.addEventListener('DOMContentLoaded', () => {
    const allVideos = document.querySelectorAll('video');
    
    videoModals.forEach(modal => {
        modal.addEventListener('show.bs.modal', () => {
            allVideos.forEach(video => {
                if (video !== modal.querySelector('video')) {
                    video.pause();
                }
            });
        });
    });
});

// ===== TYPING ANIMATION FOR HERO TITLE =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// ===== SKILLS PROGRESS BAR ANIMATION =====
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 500);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize progress bar animation
document.addEventListener('DOMContentLoaded', animateProgressBars);

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const suffix = counter.textContent.replace(/\d/g, '');
                
                let current = 0;
                const increment = target / 100;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

// ===== PROJECT CARD HOVER EFFECTS =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Lütfen tüm alanları doldurun.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Geçerli bir email adresi girin.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Mesajınız gönderiliyor...', 'info');
        
        setTimeout(() => {
            showNotification('Mesajınız başarıyla gönderildi!', 'success');
            this.reset();
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== PARALLAX EFFECT FOR HERO SECTION =====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// ===== ACTIVE NAVIGATION LINK HIGHLIGHTING =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== MOBILE MENU CLOSE ON LINK CLICK =====
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// ===== LAZY LOADING FOR IMAGES =====
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===== SCROLL PROGRESS INDICATOR =====
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: #ffb26e;
        border-radius: 2px;
        z-index: 10000;
        transition: width 0.5s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// ===== CURSOR EFFECT (OPTIONAL) =====
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(102, 126, 234, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Add hover effect for interactive elements
    document.querySelectorAll('a, button, .project-card').forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(2)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Uncomment the line below to enable custom cursor
// document.addEventListener('DOMContentLoaded', createCustomCursor);

// ===== PRELOADER =====
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <p>Yükleniyor...</p>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100000;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = preloader.querySelector('.spinner');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    `;
    
    const text = preloader.querySelector('p');
    text.style.cssText = `
        color: white;
        font-size: 1.1rem;
        font-weight: 500;
    `;
    
    document.body.appendChild(preloader);
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500);
        }, 1000);
    });
}

// Initialize preloader
document.addEventListener('DOMContentLoaded', createPreloader);

// ===== UTILITY FUNCTIONS =====
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

// Optimize scroll events with debouncing
const optimizedScrollHandler = debounce(function() {
    // Scroll-related functions can be added here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
%c🚀 Web Developer Portfolio
%c
%cMerhaba! Bu portfolio'yu incelediğiniz için teşekkürler.
%c
%cTeknolojiler: HTML5, CSS3, JavaScript, Bootstrap
%c
%cİletişim: developer@example.com
%c
%c🎨 Tasarım: Modern ve Responsive
%c⚡ Performans: Optimize edilmiş
%c📱 Mobil: Uyumlu
%c
%c🌟 Orbit Animasyonu: Aktif
`,
'color: #667eea; font-size: 20px; font-weight: bold;',
'',
'color: #333; font-size: 14px;',
'',
'color: #666; font-size: 12px;',
'color: #999; font-size: 12px;',
'',
'color: #28a745; font-size: 12px;',
'color: #ffc107; font-size: 12px;',
'color: #17a2b8; font-size: 12px;',
'color: #f093fb; font-size: 12px;'
);



// ===== ANIMATED SKILLS ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    const floatingTechs = document.querySelectorAll('.inner-orbit-circles, .middle-orbit-circles, .outer-orbit-circles');
    const techItems = document.querySelectorAll('.tech-item');

    // Simple animation reset
    function resetOrbitAnimations() {
        floatingTechs.forEach(circle => {
            // Remove animation temporarily
            circle.style.animation = 'none';
            
            // Force reflow
            circle.offsetHeight;
            
            // Restore animation
            if (circle.classList.contains('middle-orbit-circles')) {
                circle.style.animation = 'counter-rotate-reverse 30s linear infinite';
            } else {
                circle.style.animation = 'counter-rotate 30s linear infinite';
            }
        });
    }
    
    // Reset once on load
    setTimeout(resetOrbitAnimations, 100);
    
    // Performance monitoring
    if (window.performance && window.performance.mark) {
        window.performance.mark('skills-animation-ready');
        console.log('🎯 Skills animation system ready!');
    }
});

// ===== PAGE LOAD PERFORMANCE =====
window.addEventListener('load', function() {
    // Sayfa yüklendikten sonra performans metriklerini logla
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`📊 Sayfa yükleme süresi: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
    }
});

// ===== SERVICE WORKER REGISTRATION (OPTIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('✅ Service Worker başarıyla kaydedildi:', registration.scope);
            })
            .catch(function(error) {
                console.log('❌ Service Worker kaydı başarısız:', error);
            });
    });
}