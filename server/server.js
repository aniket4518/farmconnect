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

// Import controllers directly
const productCtrl = require('./controllers/productctrl');
const categoryctrl = require('./controllers/categoryctrl');
const pricingCtrl = require('./controllers/pricingCtrl');
const userctrl = require('./controllers/userctrl');
const auth = require('./middleware/auth');

// Define routes directly in server.js
app.get("/", (req, res) => {
    res.json({msg:"FarmConnect Backend API is working!"});
});

// Product routes
app.get('/product/all', productCtrl.getProducts);
app.get('/product/bycategory', productCtrl.getproductBycategory);
app.get('/product/:id', productCtrl.getProduct);

// Category routes
app.get('/category/all', categoryctrl.getCategory);

// Pricing routes
app.get('/pricing/government-prices', pricingCtrl.getGovernmentPrices);
app.get('/pricing/summary', pricingCtrl.getMarketSummary);
app.get('/pricing/trends', pricingCtrl.getPriceTrends);

// User routes
app.post('/user/register', userctrl.register);
app.post('/user/login', userctrl.login);
app.patch('/user/update_cart', auth, userctrl.updateCart);
app.get('/user/logout', userctrl.logout);

// Export for Vercel
module.exports = app;
