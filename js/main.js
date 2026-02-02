// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.textContent;
    mobileToggle.textContent = icon === '☰' ? '✕' : '☰';
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.textContent = '☰';
    });
  });
}

// Smooth Scrolling for anchor links
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

// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe service cards, feature items, and testimonials
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.service-card, .feature-item, .testimonial-card, .value-card, .info-card'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 16px rgba(10, 37, 64, 0.12)';
  } else {
    header.style.boxShadow = '0 2px 8px rgba(10, 37, 64, 0.08)';
  }
  
  lastScroll = currentScroll;
});

// Form Validation and Enhancement
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Get form data
    const formData = new FormData(contactForm);
    
    try {
      // Submit to Formspree
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Show success message
        showMessage('Thank you! We\'ll contact you within 24 hours.', 'success');
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Show error message
      showMessage('Oops! Something went wrong. Please call us instead.', 'error');
    } finally {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }
  });
  
  // Basic form validation
  const requiredFields = contactForm.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    field.addEventListener('blur', () => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
      } else {
        field.style.borderColor = '#e2e8f0';
      }
    });
    
    field.addEventListener('input', () => {
      if (field.value.trim()) {
        field.style.borderColor = '#00d4ff';
      }
    });
  });
}

// Show message function
function showMessage(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 1.25rem 2.5rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.125rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideDown 0.3s ease;
  `;
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => messageDiv.remove(), 300);
  }, 5000);
}

// Add CSS for message animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
  }
`;
document.head.appendChild(style);

// Click to call tracking (optional analytics)
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
  link.addEventListener('click', () => {
    console.log('Phone call initiated:', link.href);
    // Here you could add analytics tracking like Google Analytics
    // gtag('event', 'phone_call', { method: 'click' });
  });
});

// Emergency service notice
if (document.querySelector('.hero')) {
  const currentHour = new Date().getHours();
  if (currentHour >= 22 || currentHour < 6) {
    const emergencyNotice = document.createElement('div');
    emergencyNotice.style.cssText = `
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      text-align: center;
      padding: 0.75rem;
      font-weight: 600;
      font-size: 1rem;
    `;
    emergencyNotice.textContent = '⚡ 24/7 Emergency Service Available - Call Now!';
    
    const header = document.querySelector('.header');
    header.parentNode.insertBefore(emergencyNotice, header);
  }
}
