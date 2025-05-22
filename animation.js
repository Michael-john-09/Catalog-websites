// DOM Elements
const header = document.querySelector('.header');

// Scroll animation for header
function handleHeaderScroll() {
  if (window.scrollY > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
}

// Lazy loading images
function lazyLoadImages() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Animate product cards on scroll
function animateProductCards() {
  const productObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('product-card-visible');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.product-card').forEach(card => {
    productObserver.observe(card);
  });
}

// Add hover animations
function addHoverAnimations() {
  // Product cards
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseover', function() {
      this.classList.add('product-card-hover');
    });
    
    card.addEventListener('mouseout', function() {
      this.classList.remove('product-card-hover');
    });
  });
}

// Initialize Animations
function initAnimations() {
  // Add header scroll styles
  const style = document.createElement('style');
  style.textContent = `
    .header {
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    .header-scrolled {
      background: var(--color-primary);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .product-card {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, transform 0.3s ease;
    }
    
    .product-card-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .product-card-hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-lg);
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .fade-in-up {
      animation: fadeInUp 0.5s ease forwards;
    }
  `;
  document.head.appendChild(style);
  
  // Initialize scroll listener
  window.addEventListener('scroll', handleHeaderScroll);
  
  // Call once to set initial state
  handleHeaderScroll();
  
  // Set up lazy loading
  lazyLoadImages();
  
  // Initialize product card animations
  animateProductCards();
  
  // Add hover animations
  addHoverAnimations();
}