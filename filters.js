// DOM Elements
const searchBar = document.getElementById('searchBar');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const resetFiltersBtn = document.getElementById('resetFilters');

// Filter Products
function filterProducts() {
  const searchTerm = searchBar.value.toLowerCase();
  const category = categoryFilter.value;
  const sortBy = sortFilter.value;
  
  let filtered = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                         product.description.toLowerCase().includes(searchTerm) ||
                         product.category.toLowerCase().includes(searchTerm);
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });
  
  // Sort products
  filtered.sort((a, b) => {
    switch(sortBy) {
      case 'nameAsc':
        return a.name.localeCompare(b.name);
      case 'nameDesc':
        return b.name.localeCompare(a.name);
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      default:
        return 0;
    }
  });
  
  // Save filter state
  saveFilterState();
  
  // Display filtered products
  displayProducts(filtered);
  
  // Animate filter section
  animateFilterResults();
}

// Save filter state to local storage
function saveFilterState() {
  const filterState = {
    search: searchBar.value,
    category: categoryFilter.value,
    sort: sortFilter.value
  };
  
  localStorage.setItem('filterState', JSON.stringify(filterState));
}

// Load filter state from local storage
function loadFilterState() {
  const savedState = localStorage.getItem('filterState');
  if (savedState) {
    const filterState = JSON.parse(savedState);
    
    searchBar.value = filterState.search || '';
    categoryFilter.value = filterState.category || 'all';
    sortFilter.value = filterState.sort || 'nameAsc';
    
    // Apply filters
    filterProducts();
  }
}

// Reset filters
function resetFilters() {
  searchBar.value = '';
  categoryFilter.value = 'all';
  sortFilter.value = 'nameAsc';
  
  // Save filter state
  saveFilterState();
  
  // Apply filters
  filterProducts();
}

// Animate filter results
function animateFilterResults() {
  // Add animation class to product container
  const productContainer = document.getElementById('productContainer');
  productContainer.classList.add('filtering');
  
  // Remove class after animation completes
  setTimeout(() => {
    productContainer.classList.remove('filtering');
  }, 500);
}

// Initialize Filters
function initFilters() {
  // Event listeners
  searchBar.addEventListener('input', filterProducts);
  categoryFilter.addEventListener('change', filterProducts);
  sortFilter.addEventListener('change', filterProducts);
  resetFiltersBtn.addEventListener('click', resetFilters);
  
  // Load saved filter state
  loadFilterState();
}