// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('products/products.json')
    .then(res => res.json())
    .then(products => {
      const productList = document.getElementById('product-list');
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-card');
        productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button data-id="${product.id}" class="add-to-cart-btn">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
      });

      // Add event listeners for add to cart buttons
      productList.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart-btn')) {
          const id = e.target.dataset.id;
          addToCart(id);
        }
      });
    });
});

function addToCart(productId) {
  // Retrieve cart from localStorage or initialize
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  cart[productId] = (cart[productId] || 0) + 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');
}
