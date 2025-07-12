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
 
// Define a route
app.get("/", (req, res) => {
    res.json({msg:"FarmConnect Backend API is working!"});
    console.log("API called successfully")
});

// Test routes to debug
app.get("/test-routes", (req, res) => {
    res.json({
        msg: "Testing route loading",
        availableRoutes: [
            "GET /",
            "GET /test-routes", 
            "GET /user/*",
            "GET /product/*",
            "GET /category/*",
            "GET /pricing/*"
        ]
    });
});

// Direct test endpoints without dependencies
app.get("/test-products", (req, res) => {
    res.json({
        msg: "Direct product test endpoint working",
        data: [
            { id: 1, name: "Test Product", price: 100 },
            { id: 2, name: "Another Product", price: 200 }
        ]
    });
});

app.get("/test-categories", (req, res) => {
    res.json({
        msg: "Direct category test endpoint working", 
        data: [
            { id: 1, name: "Test Category" },
            { id: 2, name: "Another Category" }
        ]
    });
});

// Load routes with try-catch for better error handling
try {
    const userRouter = require('./routes/userRouter');
    app.use('/user', userRouter);
    console.log('User routes loaded successfully');
} catch (error) {
    console.error('Error loading user routes:', error.message);
}

try {
    const productRouter = require('./routes/productRouter');
    app.use('/product', productRouter);
    console.log('Product routes loaded successfully');
} catch (error) {
    console.error('Error loading product routes:', error.message);
}

try {
    const categoryRouter = require('./routes/categoryRouter');
    app.use('/category', categoryRouter);
    console.log('Category routes loaded successfully');
} catch (error) {
    console.error('Error loading category routes:', error.message);
}

try {
    const pricingRouter = require('./routes/pricingRouter');
    app.use('/pricing', pricingRouter);
    console.log('Pricing routes loaded successfully');
} catch (error) {
    console.error('Error loading pricing routes:', error.message);
}

// Connect to MongoDB
const URI = process.env.MONGODB_URL;
if (URI) {
    mongoose.connect(URI)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch(err => {
            console.error("MongoDB connection error:", err.message);
        });
} else {
    console.warn("MONGODB_URL not found in environment variables");
}

// Global error handling middleware
app.use((error, req, res, next) => {
    console.error("Global error:", error.message);
    res.status(500).json({
        msg: "Internal server error",
        error: error.message
    });
});

// 404 handler for unmatched routes
app.use("*", (req, res) => {
    console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        msg: "Route not found",
        path: req.originalUrl,
        method: req.method,
        hint: "Check if the route exists and is properly loaded"
    });
});

// For local development only
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export for Vercel
module.exports = app;
