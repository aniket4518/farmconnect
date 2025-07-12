const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://farmconnect-2ifj.vercel.app"],  
    credentials: true,  
    allowedHeaders:"Content-Type, Authorization",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

// Connect to MongoDB first
const URI = process.env.MONGODB_URL;
if (URI) {
    mongoose.connect(URI)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch(err => {
            console.error("MongoDB connection error:", err.message);
        });
}

// Import controllers directly - with error handling
let productCtrl, categoryctrl, pricingCtrl, userctrl, auth;

try {
    productCtrl = require('./controllers/productctrl');
} catch (err) {
    console.error('Error loading productctrl:', err.message);
}

try {
    categoryctrl = require('./controllers/categoryctrl');
} catch (err) {
    console.error('Error loading categoryctrl:', err.message);
}

try {
    pricingCtrl = require('./controllers/pricingCtrl');
} catch (err) {
    console.error('Error loading pricingCtrl:', err.message);
}

try {
    userctrl = require('./controllers/userctrl');
} catch (err) {
    console.error('Error loading userctrl:', err.message);
}

try {
    auth = require('./middleware/auth');
} catch (err) {
    console.error('Error loading auth middleware:', err.message);
}

// Define routes directly in server.js
app.get("/", (req, res) => {
    res.json({msg:"FarmConnect Backend API is working!"});
});

// Test route to see what's loaded
app.get("/debug", (req, res) => {
    res.json({
        productCtrl: !!productCtrl,
        categoryctrl: !!categoryctrl,
        pricingCtrl: !!pricingCtrl,
        userctrl: !!userctrl,
        auth: !!auth
    });
});

// Simple test routes first
app.get("/test/products", (req, res) => {
    res.json([
        { id: 1, name: "Test Product", price: 100 }
    ]);
});

app.get("/test/categories", (req, res) => {
    res.json([
        { id: 1, name: "Test Category" }
    ]);
});

// Product routes - with safety checks
if (productCtrl) {
    app.get('/product/all', productCtrl.getProducts);
    app.get('/product/bycategory', productCtrl.getproductBycategory);
    app.get('/product/:id', productCtrl.getProduct);
} else {
    app.get('/product/all', (req, res) => {
        res.status(500).json({ msg: "Product controller not loaded" });
    });
}

// Category routes - with safety checks
if (categoryctrl) {
    app.get('/category/all', categoryctrl.getCategory);
} else {
    app.get('/category/all', (req, res) => {
        res.status(500).json({ msg: "Category controller not loaded" });
    });
}

// Pricing routes - with safety checks
if (pricingCtrl) {
    app.get('/pricing/government-prices', pricingCtrl.getGovernmentPrices);
    app.get('/pricing/summary', pricingCtrl.getMarketSummary);
    app.get('/pricing/trends', pricingCtrl.getPriceTrends);
}

// User routes - with safety checks
if (userctrl) {
    app.post('/user/register', userctrl.register);
    app.post('/user/login', userctrl.login);
    if (auth) {
        app.patch('/user/update_cart', auth, userctrl.updateCart);
    }
    app.get('/user/logout', userctrl.logout);
}

// Export for Vercel
module.exports = app;
