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

// Connect to MongoDB
const URI = process.env.MONGODB_URL;
if (URI) {
    mongoose.connect(URI)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.error("MongoDB connection error:", err.message));
}

// Define routes directly without imports first - INLINE CONTROLLERS
app.get("/", (req, res) => {
    res.json({msg:"FarmConnect Backend API is working!"});
});

// INLINE PRODUCT ROUTES - NO EXTERNAL DEPENDENCIES
app.get('/product/all', async (req, res) => {
    try {
        const Product = require('./models/productmodel');
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

app.get('/product/bycategory', async (req, res) => {
    try {
        const Product = require('./models/productmodel');
        const { category } = req.query;
        if (!category) {
            return res.status(400).json({ msg: "Category is required" });
        }
        const products = await Product.find({ category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

app.get('/product/:id', async (req, res) => {
    try {
        const Product = require('./models/productmodel');
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// INLINE CATEGORY ROUTES
app.get('/category/all', async (req, res) => {
    try {
        const Category = require('./models/categorymodel');
        const categories = await Category.find();
        res.json(categories);
    } catch(err) {
        res.status(500).json({msg: err.message});
    }
});

// INLINE PRICING ROUTES - MOCK DATA FOR NOW
app.get('/pricing/government-prices', (req, res) => {
    const mockData = [
        {
            id: 1,
            commodity: 'Rice',
            variety: 'Basmati',
            state: 'Punjab',
            market: 'Amritsar',
            modalPrice: 5200,
            minPrice: 4800,
            maxPrice: 5600,
            unit: 'per quintal',
            date: new Date().toISOString().split('T')[0],
            category: 'Cereals',
            trend: 'up'
        },
        {
            id: 2,
            commodity: 'Wheat',
            variety: 'Durum',
            state: 'Maharashtra',
            market: 'Mumbai',
            modalPrice: 2500,
            minPrice: 2300,
            maxPrice: 2700,
            unit: 'per quintal',
            date: new Date().toISOString().split('T')[0],
            category: 'Cereals',
            trend: 'stable'
        }
    ];
    
    res.json({
        success: true,
        data: mockData,
        count: mockData.length
    });
});

app.get('/pricing/summary', (req, res) => {
    res.json({
        success: true,
        summary: {
            totalMarkets: 6850,
            activeCommodities: 237,
            averagePriceIncrease: 2.5,
            topGainers: [
                { commodity: 'Apple', increase: 8.5 },
                { commodity: 'Onion', increase: 6.2 }
            ],
            topLosers: [
                { commodity: 'Cotton', decrease: -5.3 },
                { commodity: 'Chili', decrease: -3.7 }
            ]
        }
    });
});

// INLINE USER ROUTES
app.post('/user/register', async (req, res) => {
    try {
        const bcrypt = require('bcrypt');
        const jwt = require('jsonwebtoken');
        const User = require('./models/usermodel');
        
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "All fields are required." });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists." });
        }
        
        const hashedPassword = await bcrypt.hash(password, 9);
        const newUser = new User({ name, email, password: hashedPassword, cart: [] });
        await newUser.save();
        
        const accesstoken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: "1d" });
        
        res.json({ accesstoken, cart: [] });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

app.post('/user/login', async (req, res) => {
    try {
        const bcrypt = require('bcrypt');
        const jwt = require('jsonwebtoken');
        const User = require('./models/usermodel');
        
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found." });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });
        
        const accesstoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: "1d" });
        
        res.json({
            accesstoken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                cart: user.cart || []
            }
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Export for Vercel
module.exports = app;
