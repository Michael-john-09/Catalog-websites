// Get product container element
const productContainer = document.getElementById('productContainer');

// Product Data
const products = [
  {
    id: 1,
    name: "Haven Pill",
    category: "Pill",
    description: "Our wellness pills are crafted with a balanced blend of essential vitamins.",
    size: "60 tablets",
    color: "White",
    materials: "Vitamins A, B, C, D, E, Zinc, Magnesium",
    nutritionFacts: [
      "Vitamin A - 5000 IU",
      "Vitamin C - 500mg",
      "Zinc - 15mg"
    ],
    features: [
      "Daily supplement",
      "Immune support",
      "Energy boost"
    ],
    price: 19.99,
    image: "FUGABAN_Advertising Posters_20250522_003130_0000.png"
  },
  {
    id: 2,
    name: "Vitagummies",
    category: "Vitagummies",
    description: "Tasty and fun alternative to traditional supplements.",
    size: "90 gummies",
    color: "Assorted",
    materials: "Vitamin C, Vitamin D, Zinc, Natural flavors",
    nutritionFacts: [
      "Vitamin C - 250mg",
      "Vitamin D - 1000 IU",
      "Zinc - 10mg"
    ],
    features: [
      "Great taste",
      "Kid-friendly",
      "No artificial colors"
    ],
    price: 14.99,
    image: "Packaging.jpg"
  },
  {
    id: 3,
    name: "Tea Atelier",
    category: "Herbal Teas",
    description: "Herbal teas infused with nature's finest ingredients.",
    size: "20 tea bags",
    color: "Brown",
    materials: "Chamomile, Lavender, Peppermint, Organic herbs",
    nutritionFacts: [
      "Caffeine-free",
      "No calories",
      "Rich in antioxidants"
    ],
    features: [
      "Relaxing blend",
      "Sleep aid",
      "Digestive support"
    ],
    price: 7.99,
    image: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg"
  },
  {
    id: 4,
    name: "Probiotic Yogurt",
    category: "Yogurt",
    description: "This probiotic-rich yogurt is designed to support gut health and improve digestion. Made with natural ingredients and no added sugars, it's a delicious way to nourish your body. Perfect as a snack or breakfast boost.",
    size: "500g",
    color: "Creamy white",
    materials: "Live cultures, Milk, Natural sweeteners",
    nutritionFacts: [
      "Protein - 5g per 100g",
      "Calcium - 120mg",
      "Probiotics - 1 billion CFU"
    ],
    features: [
      "Promotes digestion",
      "Rich in probiotics",
      "Low fat"
    ],
    price: 5.49,
    image: "ruby.jpg"
  },
  {
    id: 5,
    name: "Energy Shot",
    category: "Energy Drink",
    description: "Our clean energy drink delivers a natural boost with no crash. Formulated with plant-based caffeine, B-vitamins, and antioxidants, it fuels your day without artificial sweeteners. Stay sharp and energized—anytime, anywhere.",
    size: "60ml bottle",
    color: "Red",
    materials: "Caffeine, B Vitamins, Green Tea Extract",
    nutritionFacts: [
      "Caffeine - 200mg",
      "Vitamin B12 - 500% DV",
      "Green Tea Extract - 100mg"
    ],
    features: [
      "Fast-acting",
      "Zero sugar",
      "Natural energizers"
    ],
    price: 3.99,
    image: "productnimaykel.png"
  },
  {
    id: 6,
    name: "Essentials",
    category: "Essential Oils",
    description: "These 100% pure essential oils are perfect for aromatherapy, relaxation, and holistic wellness. Each bottle is carefully extracted to preserve the natural properties of the plant. Use them in diffusers, baths, or topically with a carrier oil.",
    size: "10ml x 5 bottles",
    color: "Amber",
    materials: "Lavender, Peppermint, Eucalyptus, Lemon, Tea Tree oils",
    nutritionFacts: [
      "100% pure oils",
      "No additives",
      "Non-edible"
    ],
    features: [
      "Multi-purpose use",
      "Aromatherapy quality",
      "Calming scents"
    ],
    price: 29.99,
    image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
  },
  {
    id: 7,
    name: "Elixora",
    category: "Herbal Drops",
    description: "Our herbal drops provide fast-acting support using concentrated botanical extracts. They're easy to take on the go—just add to water or place directly under the tongue. Ideal for boosting immunity, calming stress, or aiding digestion.",
    size: "30ml dropper bottle",
    color: "Brown",
    materials: "Elderberry, Echinacea, Purified Water",
    nutritionFacts: [
      "Elderberry - 400mg",
      "Echinacea - 200mg",
      "Preservative-free"
    ],
    features: [
      "Immune boost",
      "Easy to use",
      "Natural extraction"
    ],
    price: 12.99,
    image: "https://images.pexels.com/photos/14441326/pexels-photo-14441326.jpeg"
  }
];

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

// Display Products
function displayProducts(productList = products) {
  productContainer.innerHTML = '';
  
  if (productList.length === 0) {
    productContainer.innerHTML = `
      <div class="no-products">
        <p>No products match your search criteria.</p>
        <button id="clearFilters" class="btn btn-primary">Clear Filters</button>
      </div>
    `;
    
    document.getElementById('clearFilters').addEventListener('click', resetFilters);
    return;
  }
  
  productList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-content">
        <div class="product-badges">
          <span class="product-badge product-badge-category">${product.category}</span>
        </div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price-row">
          <div class="product-price">${formatCurrency(product.price)}</div>
          <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    `;
    productContainer.appendChild(card);
    
    card.addEventListener('click', function(event) {
      if (!event.target.closest('.add-to-cart-btn')) {
        showProductModal(product.id);
      }
    });

    card.querySelector('.add-to-cart-btn').addEventListener('click', function(event) {
      event.stopPropagation();
      addToCart(product.id);
    });
  });
}

// Show Product Modal
function showProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = `
    <div class="modal-product">
      <div class="modal-product-header">
        <span class="modal-product-category">${product.category}</span>
        <h2 class="modal-product-title">${product.name}</h2>
      </div>
      <div class="modal-product-content">
        <div class="modal-product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="modal-product-details">
          <p class="modal-product-description">${product.description}</p>
          
          <div class="modal-product-meta">
            <div class="modal-product-meta-item">
              <span class="modal-product-meta-label">Size:</span>
              <span>${product.size}</span>
            </div>
            ${product.color ? `
            <div class="modal-product-meta-item">
              <span class="modal-product-meta-label">Color:</span>
              <span>${product.color}</span>
            </div>
            ` : ''}
            <div class="modal-product-meta-item">
              <span class="modal-product-meta-label">Materials:</span>
              <span>${product.materials}</span>
            </div>
          </div>
          
          <div class="modal-product-features">
            <h4>Key Features</h4>
            <ul class="features-list">
              ${product.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
          
          <div class="modal-product-features">
            <h4>Nutrition Facts</h4>
            <ul class="features-list">
              ${product.nutritionFacts.map(fact => `<li>${fact}</li>`).join('')}
            </ul>
          </div>
          
          <div class="modal-product-price">
            <span class="modal-product-price-value">${formatCurrency(product.price)}</span>
            <div class="modal-product-actions">
              <button class="btn btn-primary add-to-cart-modal-btn" data-id="${product.id}">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('productModal').classList.add('active');
  document.getElementById('overlay').classList.add('active');
  
  document.querySelector('.add-to-cart-modal-btn').addEventListener('click', function() {
    addToCart(product.id);
    hideProductModal();
  });
}

// Close Product Modal
function hideProductModal() {
  document.getElementById('productModal').classList.remove('active');
}

// Initialize Products
function initProducts() {
  displayProducts();
  document.getElementById('closeModal').addEventListener('click', hideProductModal);
}
