const cors = require('cors');
const express = require('express');

const app = express();

// Middleware
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
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
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

// Load routes with error handling
const loadRoutes = () => {
    try {
        // Try to load each route individually
        console.log("Loading routes...");
        
        // Load user routes
        try {
            const userRouter = require('./routes/userRouter');
            app.use('/user', userRouter);
            console.log("User routes loaded");
        } catch (err) {
            console.error("Error loading user routes:", err.message);
        }
        
        // Load product routes
        try {
            const productRouter = require('./routes/productRouter');
            app.use('/product', productRouter);
            console.log("Product routes loaded");
        } catch (err) {
            console.error("Error loading product routes:", err.message);
        }
        
        // Load category routes
        try {
            const categoryRouter = require('./routes/categoryRouter');
            app.use('/category', categoryRouter);
            console.log("Category routes loaded");
        } catch (err) {
            console.error("Error loading category routes:", err.message);
        }
        
        // Load pricing routes
        try {
            const pricingRouter = require('./routes/pricingRouter');
            app.use('/pricing', pricingRouter);
            console.log("Pricing routes loaded");
        } catch (err) {
            console.error("Error loading pricing routes:", err.message);
        }
        
    } catch (error) {
        console.error("General error loading routes:", error.message);
    }
};

// Initialize database connection
const initializeDB = async () => {
    try {
        const mongoose = require('mongoose');
        require('dotenv').config();
        
        const URI = process.env.MONGODB_URL;
        if (!URI) {
            console.warn("MONGODB_URL not found in environment variables");
            return false;
        }
        
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // 5 second timeout
        });
        
        console.log("MongoDB connected successfully");
        return true;
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        return false;
    }
};

// Initialize everything
const initialize = async () => {
    try {
        // Load routes first (they don't depend on DB)
        loadRoutes();
        
        // Then try to connect to DB
        await initializeDB();
        
        console.log("Server initialization complete");
    } catch (error) {
        console.error("Initialization error:", error.message);
    }
};

// Initialize on startup
initialize();

// Error handling middleware
app.use((error, req, res, next) => {
    console.error("Global error handler:", error.message);
    res.status(500).json({
        msg: "Something went wrong!",
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        msg: "Route not found",
        path: req.originalUrl
    });
});

// Export for Vercel
module.exports = app;
