const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

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

// Routes with error handling
try {
    app.use('/user', require('./routes/userRouter'));
    app.use('/product', require('./routes/productRouter'));
    app.use('/category', require('./routes/categoryRouter'));
    app.use('/pricing', require('./routes/pricingRouter'));
} catch (error) {
    console.error("Error loading routes:", error.message);
}

// Connect to MongoDB
const connectDB = async () => {
    try {
        const URI = process.env.MONGODB_URL;
        if (!URI) {
            console.warn("MONGODB_URL not found in environment variables");
            return;
        }
        
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        // Don't exit process in serverless environment
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    }
};

// Connect to database
connectDB();

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

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export for Vercel
module.exports = app;
