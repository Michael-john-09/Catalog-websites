// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart first
  initCart();
  
  // Initialize products
  initProducts();
  
  // Initialize filters
  initFilters();
  
  // Initialize animations
  initAnimations();
});

// Custom event for product changes
const productChangeEvent = new CustomEvent('productsChanged');