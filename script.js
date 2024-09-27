let cartCount = 0;
let cart = [];

// Function to add a product to the cart
async function addToCart(productId) {
    const response = await fetch('http://localhost:3000/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    cart = data.cart; // Update local cart
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;
}

// Function to fetch products from the backend
async function fetchProducts() {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();
    displayProducts(products);
}

// Function to display products
function displayProducts(products) {
    const main = document.querySelector('main');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <div class="glassmorphism">
                <img src="your-image-url-${product.id}.jpg" alt="${product.name} Display" />
            </div>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        main.appendChild(productDiv);
    });
}

// Function to place an order
async function placeOrder() {
    const response = await fetch('http://localhost:3000/place-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
    });
    const data = await response.json();
    alert(data.message);
    cartCount = 0;
    cart = [];
    document.getElementById("cart-count").innerText = cartCount;
}

// Fetch products on page load
window.onload = fetchProducts;
