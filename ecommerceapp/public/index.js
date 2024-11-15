"use strict";

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  document.getElementById("order-form").addEventListener("submit", placeOrder);
});

/**
 * Fetches the list of products and displays them on the page.
 */
function loadProducts() {
  fetch("/api/products")
    .then(statusCheck)
    .then(response => response.json())
    .then(displayProducts)
    .catch(handleError);
}

/**
 * Displays products in the DOM.
 * @param {Object} data 
 */
function displayProducts(data) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  data.products.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `ID: ${product.id}, Name: ${product.name}, Price: $${product.price}, Stock: ${product.stock}`;
    productList.appendChild(li);
  });
}

/**
 * Places an order by sending a POST request to the server.
 * @param {Event} event 
 */
function placeOrder(event) {
  event.preventDefault();
  const productId = document.getElementById("product-id").value;
  const quantity = document.getElementById("quantity").value;

  fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity })
  })
    .then(statusCheck)
    .then(response => response.json())
    .then(data => {
      document.getElementById("order-status").textContent = data.message;
      loadProducts(); // Refresh product list
    })
    .catch(handleError);
}

/**
 * Checks the status of the response.
 * @param {Response} response 
 * @throws Error if the response is not OK
 */
function statusCheck(response) {
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response;
}

/**
 * Handles errors by displaying an error message.
 * @param {Error} error 
 */
function handleError(error) {
  const errorDiv = document.getElementById("order-status");
  errorDiv.textContent = error.message;
  errorDiv.style.color = "red";
}
