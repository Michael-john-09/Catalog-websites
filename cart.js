// Cart State
let cart = [];

// DOM Elements
const cartSection = document.getElementById('cartSection');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const overlay = document.getElementById('overlay');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const startShoppingBtn = document.getElementById('startShopping');

// Local Storage Functions
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

// Cart Functions
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.product.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }
  
  updateCart();
  saveCart();
  
  // Show cart when adding item
  openCart();
  
  // Show a confirmation animation
  showAddToCartConfirmation(product.name);
}

function updateCart() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (cart.length === 0) {
    cartEmpty.style.display = 'flex';
    cartItems.style.display = 'none';
    cartSummary.style.display = 'none';
    cartTotal.textContent = formatCurrency(0);
    return;
  }
  
  cartEmpty.style.display = 'none';
  cartItems.style.display = 'block';
  cartSummary.style.display = 'block';
  
  cartItems.innerHTML = cart.map(item => `
    <li class="cart-item" data-id="${item.product.id}">
      <div class="cart-item-image">
        <img src="${item.product.image}" alt="${item.product.name}">
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.product.name}</h4>
        <div class="cart-item-price">${formatCurrency(item.product.price)}</div>
        <div class="cart-item-controls">
          <div class="quantity-control">
            <button class="quantity-btn decrease-quantity" data-id="${item.product.id}">-</button>
            <input type="number" min="1" max="99" value="${item.quantity}" class="quantity-input" data-id="${item.product.id}">
            <button class="quantity-btn increase-quantity" data-id="${item.product.id}">+</button>
          </div>
          <div class="cart-item-subtotal">
            ${formatCurrency(item.product.price * item.quantity)}
          </div>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.product.id}">×</button>
    </li>
  `).join('');
  
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  cartTotal.textContent = formatCurrency(total);
  
  // Add event listeners to cart item controls
  attachCartItemEventListeners();
}

function attachCartItemEventListeners() {
  // Remove item buttons
  document.querySelectorAll('.cart-item-remove').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      removeFromCart(productId);
    });
  });
  
  // Decrease quantity buttons
  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      updateCartItemQuantity(productId, -1);
    });
  });
  
  // Increase quantity buttons
  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      updateCartItemQuantity(productId, 1);
    });
  });
  
  // Quantity input fields
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      const newQuantity = parseInt(this.value);
      if (newQuantity > 0) {
        setCartItemQuantity(productId, newQuantity);
      } else {
        this.value = 1;
        setCartItemQuantity(productId, 1);
      }
    });
  });
}

function removeFromCart(productId) {
  const index = cart.findIndex(item => item.product.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCart();
    saveCart();
  }
}

function updateCartItemQuantity(productId, change) {
  const item = cart.find(item => item.product.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity < 1) {
      removeFromCart(productId);
    } else {
      updateCart();
      saveCart();
    }
  }
}

function setCartItemQuantity(productId, quantity) {
  const item = cart.find(item => item.product.id === productId);
  if (item) {
    item.quantity = quantity;
    updateCart();
    saveCart();
  }
}

function openCart() {
  cartSection.classList.add('active');
  overlay.classList.add('active');
}

function closeCart() {
  cartSection.classList.remove('active');
  overlay.classList.remove('active');
}

function showAddToCartConfirmation(productName) {
  // Create confirmation element
  const confirmation = document.createElement('div');
  confirmation.className = 'add-cart-confirmation';
  confirmation.innerHTML = `
    <div class="confirmation-icon">✓</div>
    <div class="confirmation-text">${productName} added to cart</div>
  `;
  
  // Add to body
  document.body.appendChild(confirmation);
  
  // Fade in
  setTimeout(() => {
    confirmation.classList.add('show');
  }, 10);
  
  // Remove after animation
  setTimeout(() => {
    confirmation.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(confirmation);
    }, 300);
  }, 2000);
}

// Initialize Cart
function initCart() {
  // Load cart from local storage
  loadCart();
  
  // Event listeners
  cartToggle.addEventListener('click', openCart);
  closeCart.addEventListener('click', closeCart);
  
  overlay.addEventListener('click', function(event) {
    if (event.target === this) {
      closeCart();
    }
  });
  
  checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) return;
    
    // Show processing feedback
    this.innerHTML = '<span class="loading"></span> Processing...';
    this.disabled = true;
    
    // Simulate processing
    setTimeout(() => {
      alert('Thank you for your purchase! Your order has been processed.');
      cart = [];
      updateCart();
      saveCart();
      closeCart();
      
      // Reset button
      this.innerHTML = 'Proceed to Checkout';
      this.disabled = false;
    }, 1500);
  });
  
  startShoppingBtn.addEventListener('click', function() {
    closeCart();
    // Scroll to products section
    document.getElementById('productSection').scrollIntoView({ behavior: 'smooth' });
  });
}