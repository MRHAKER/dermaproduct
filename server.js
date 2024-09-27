// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample product data
const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 15 },
    { id: 3, name: 'Product 3', price: 20 },
];

// Cart to store products
let cart = [];

// Routes
app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/add-to-cart', (req, res) => {
    const productId = req.body.productId;
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        res.json({ message: 'Product added to cart', cart });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.post('/place-order', (req, res) => {
    // Here you would typically handle order processing, like saving to a database
    const orderDetails = req.body;
    console.log('Order placed:', orderDetails);
    cart = []; // Clear cart after order
    res.json({ message: 'Order placed successfully', orderDetails });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
