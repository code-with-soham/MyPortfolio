// Global Particles Animation
function createParticles(containerId, particleCount, minSize, maxSize, minDuration, maxDuration, colors) {
    const particlesContainer = document.getElementById(containerId);
    if (!particlesContainer) return;
  
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * (maxDuration - minDuration) + minDuration) + 's';
  
      if (minSize && maxSize) {
        const size = Math.random() * (maxSize - minSize) + minSize;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
      }
  
      if (colors && colors.length > 0) {
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      }
  
      particlesContainer.appendChild(particle);
    }
  }
  
  // Mobile Menu Functionality
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-menu a');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav a');
  
  function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  mobileMenuClose.addEventListener('click', closeMobileMenu);
  
  mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
      closeMobileMenu();
    }
  });
  
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  // Smooth scrolling for navigation links and scroll down button
  function setupSmoothScrolling() {
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - (document.querySelector('header')?.offsetHeight || 0), // Adjust for fixed header
            behavior: 'smooth'
          });
        }
        // Update active class for desktop nav
        desktopNavLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
      });
    });
  
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
      scrollDown.addEventListener('click', () => {
        const nextSection = document.getElementById('about'); // Assuming 'about' is the next section
        if (nextSection) {
          window.scrollTo({
            top: nextSection.offsetTop - (document.querySelector('header')?.offsetHeight || 0),
            behavior: 'smooth'
          });
        }
      });
    }
  }
  
  // Intersection Observer for active navigation link on scroll
  function setupActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Adjust this to control when the link becomes active
      threshold: 0
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSectionId = entry.target.id;
          desktopNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
              link.classList.add('active');
            }
          });
          mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);
  
    sections.forEach(section => {
      observer.observe(section);
    });
  }
  
  
  // Counter animation for stats (Contact Section)
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = counter.textContent;
      const isLessThan = target.includes('<');
      const number = parseInt(target.replace(/[^\d]/g, ''));
  
      if (!isNaN(number)) {
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= number) {
            current = number;
            clearInterval(timer);
          }
  
          if (isLessThan) {
            counter.textContent = `< ${Math.floor(current)}`;
          } else if (target.includes('.')) {
            counter.textContent = (current / 10).toFixed(1);
          } else if (target.includes('%')) {
            counter.textContent = Math.floor(current) + '%';
          } else {
            counter.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
          }
        }, 50);
      }
    });
  }
  
  // Form submission (Contact Section)
  function handleFormSubmit(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
  
    const formData = new FormData(e.target);
    const name = formData.get('name') || 'Anonymous';
    const email = formData.get('email') || 'No email provided';
    const company = formData.get('company') || 'Not specified';
    const message = formData.get('message') || 'No message provided';
  
    submitBtn.textContent = 'Sending...';
    submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
  
    try {
      const subject = `Portfolio Contact: Message from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}\n\n---\nThis message was sent from your portfolio contact form.`;
      const mailtoLink = `mailto:sohamkundu84@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
      window.location.href = mailtoLink;
  
      setTimeout(() => {
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
  
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = 'linear-gradient(45deg, #00d4ff, #ff00ff)';
          e.target.reset();
          showNotification('Email client opened! Please send the message from your email app.', 'success');
        }, 2000);
      }, 1500);
  
    } catch (error) {
      console.error('Error creating email:', error);
      setTimeout(() => {
        submitBtn.textContent = '✗ Error occurred';
        submitBtn.style.background = 'linear-gradient(45deg, #ff4444, #cc0000)';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = 'linear-gradient(45deg, #00d4ff, #ff00ff)';
          showNotification('Error occurred. Please try again or contact directly.', 'error');
        }, 2000);
      }, 1500);
    }
  }
  
  // Enhanced form interactions (Contact Section)
  function setupFormInteractions() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
      });
      input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
      });
    });
  }
  
  // Notification system (Contact Section)
  function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
  
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
  
    notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 15px 25px;
          border-radius: 10px;
          color: white;
          font-weight: 500;
          z-index: 1000;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          max-width: 300px;
          word-wrap: break-word;
      `;
  
    if (type === 'success') {
      notification.style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
    } else if (type === 'error') {
      notification.style.background = 'linear-gradient(45deg, #ff4444, #cc0000)';
    } else {
      notification.style.background = 'linear-gradient(45deg, #666, #999)';
    }
  
    document.body.appendChild(notification);
  
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
  
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 300);
    }, 4000);
  }
  
  // Contact method clicks (Contact Section)
  function setupContactMethods() {
    const methods = document.querySelectorAll('.contact-method');
    methods.forEach(method => {
      method.addEventListener('click', function() {
        const info = this.querySelector('.method-info p').textContent;
        if (info.includes('@')) {
          window.location.href = `mailto:${info}`;
        } else if (info.includes('+')) {
          window.location.href = `tel:${info}`;
        } else {
          console.log('Opening location:', info);
        }
      });
    });
  }
  
  // Intersection Observer for animations (General)
  function setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          if (entry.target.classList.contains('stats-grid')) {
            setTimeout(animateCounters, 500);
          }
          // For skill items stagger animation
          if (entry.target.classList.contains('skill-category')) {
            const skillItems = entry.target.querySelectorAll('.skill-item');
            skillItems.forEach((item, itemIndex) => {
              item.style.opacity = '0';
              item.style.transform = 'translateY(20px)';
              item.style.animation = `fadeInUp 0.5s ease-out ${(itemIndex * 0.05) + 0.8}s forwards`;
            });
          }
        }
      });
    }, observerOptions);
  
    document.querySelectorAll('.project-card, .stats-grid, .contact-form-section, .contact-info-section, .skill-category, .projects-header, .contact-header').forEach(el => {
      observer.observe(el);
    });
  }
  
  // Video play/pause on hover (Projects Section)
  function setupProjectVideoControls() {
    const videos = document.querySelectorAll('.project-vidbox video');
    videos.forEach(video => {
      const container = video.parentElement;
      container.addEventListener('mouseenter', () => {
        video.play().catch(e => console.log('Video play failed:', e));
      });
      container.addEventListener('mouseleave', () => {
        video.pause();
      });
    });
  }
  
  // Button click effects (Projects Section)
  function setupButtonEffects() {
    const buttons = document.querySelectorAll('.project-info button:not([disabled])');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
  
        ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }
  
  // Parallax effect for project cards
  function setupParallaxEffect() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card, index) => {
        const rate = scrolled * -0.05 * (index % 2 === 0 ? 1 : -1); // Reduced parallax effect
        card.style.transform = `translateY(${rate}px)`;
      });
    });
  }
  
  // Enhanced hover effects for cards (About, Contact, Projects)
  function setupCardHoverEffects() {
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.stat-card, .contact-method, .project-card, .skill-category, .info-cards .card');
  
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 15; // Adjusted sensitivity
          const rotateY = (centerX - x) / 15; // Adjusted sensitivity
  
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        } else {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        }
      });
    });
  }
  
  // Initialize all functionality when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    createParticles('particles', 50, 2, 2, 4, 8, ['rgba(0, 212, 255, 0.4)', 'rgba(255, 0, 255, 0.4)', 'rgba(0, 255, 136, 0.4)']); // Global particles
    setupSmoothScrolling();
    setupActiveNavLinkOnScroll();
    setupFormInteractions();
    setupContactMethods();
    setupScrollAnimations();
    setupProjectVideoControls();
    setupButtonEffects();
    setupParallaxEffect();
    setupCardHoverEffects();
  
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);
    }
  });
  
  // Lazy loading for videos
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('loadstart', () => {
      video.style.filter = 'blur(5px)';
    });
    video.addEventListener('canplay', () => {
      video.style.filter = 'none';
      video.style.transition = 'filter 0.3s ease';
    });
  });
  