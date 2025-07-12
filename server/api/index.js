// api/index.js - Alternative Vercel API structure
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

// Test route
app.get("/", (req, res) => {
    res.json({
        msg: "FarmConnect Backend API is working!",
        status: "success",
        timestamp: new Date().toISOString()
    });
});

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

// Connect to MongoDB only if URI is available
if (process.env.MONGODB_URL) {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("MongoDB connected successfully");
        })
        .catch(err => {
            console.error("MongoDB connection error:", err.message);
        });
} else {
    console.warn("MONGODB_URL not found in environment variables");
}

// Routes - only add if files exist
try {
    app.use('/user', require('../routes/userRouter'));
    app.use('/product', require('../routes/productRouter'));
    app.use('/category', require('../routes/categoryRouter'));
    app.use('/pricing', require('../routes/pricingRouter'));
} catch (error) {
    console.error("Error loading routes:", error.message);
}

// Export for Vercel
module.exports = app;
