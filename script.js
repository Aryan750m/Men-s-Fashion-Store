let cart = [];

// Function to increase quantity on the product page
function increaseQty(productId) {
  let qtyElement = document.getElementById(`qty-${productId}`);
  let currentQty = parseInt(qtyElement.innerText);
  qtyElement.innerText = currentQty + 1;
}

// Function to decrease quantity on the product page
function decreaseQty(productId) {
  let qtyElement = document.getElementById(`qty-${productId}`);
  let currentQty = parseInt(qtyElement.innerText);
  if (currentQty > 1) {
    qtyElement.innerText = currentQty - 1;
  }
}

// Function to add a product to the cart
function addToCart(productName, productPrice, productId) {
  let quantity = parseInt(document.getElementById(`qty-${productId}`).innerText);

  // Check if the product is already in the cart
  let existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: quantity });
  }

  updateCart();
}

// Function to update the cart UI
function updateCart() {
  let cartItems = document.getElementById("cart-items");
  let totalPrice = 0;
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    totalPrice += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <p>${item.name} - ₹${item.price}</p>
        <div class="quantity-selector">
          <button onclick="updateCartQty(${index}, -1)">-</button>
          <span id="cart-qty-${index}">${item.quantity}</span>
          <button onclick="updateCartQty(${index}, 1)">+</button>
        </div>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });

  document.getElementById("total-price").innerText = totalPrice;
  document.getElementById("cart-count").innerText = cart.length; // Update cart count
}

// Function to update quantity inside the cart
function updateCartQty(index, change) {
  if (cart[index].quantity + change > 0) {
    cart[index].quantity += change;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Function to toggle the cart popup
function toggleCartPopup() {
  document.getElementById("cart-popup").classList.toggle("hidden");
}

// Function to show the payment modal
function showPaymentModal() {
  document.getElementById("payment-modal").classList.remove("hidden");
}

// Function to close the payment modal
function closePaymentModal() {
  document.getElementById("payment-modal").classList.add("hidden");
}

// Function to confirm payment
function confirmPayment() {
  document.getElementById("payment-modal").classList.add("hidden");
  document.getElementById("success-message").classList.remove("hidden");
  cart = []; // Empty cart after payment
  updateCart();
}

// Function to close the success message
function closeSuccessMessage() {
  document.getElementById("success-message").classList.add("hidden");
}
