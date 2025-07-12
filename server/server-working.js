// server-working.js - Progressive build
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://farmconnect-2ifj.vercel.app"],
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

// Basic routes
app.get("/", (req, res) => {
    res.json({
        msg: "FarmConnect Backend API is working!",
        status: "success",
        timestamp: new Date().toISOString()
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        uptime: process.uptime()
    });
});

// Test MongoDB connection separately
app.get("/test-db", async (req, res) => {
    try {
        const mongoose = require('mongoose');
        const URI = process.env.MONGODB_URL;
        
        if (!URI) {
            return res.json({
                status: "no_uri",
                message: "MONGODB_URL environment variable not set"
            });
        }
        
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        res.json({
            status: "connected",
            message: "MongoDB connection successful"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});

// Test individual routes
app.get("/test-pricing", (req, res) => {
    try {
        // Inline pricing data to test without external dependencies
        const mockData = [
            {
                id: 1,
                commodity: 'Rice',
                variety: 'Basmati',
                state: 'Punjab',
                market: 'Amritsar',
                modalPrice: 5200,
                unit: 'per quintal',
                date: new Date().toISOString().split('T')[0],
                category: 'Cereals'
            }
        ];
        
        res.json({
            success: true,
            data: mockData,
            source: "Test data"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Error handling
app.use((error, req, res, next) => {
    console.error("Error:", error);
    res.status(500).json({
        error: error.message,
        path: req.path
    });
});

module.exports = app;
