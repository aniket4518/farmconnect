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

// Connect to MongoDB with better error handling
const connectDB = async () => {
    try {
        const URI = process.env.MONGODB_URL;
        if (!URI) {
            throw new Error('MONGODB_URL not provided');
        }
        
        if (mongoose.connections[0].readyState === 0) {
            await mongoose.connect(URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('MongoDB connected successfully');
        }
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
    }
};

// Initialize DB connection
connectDB();

// Basic route for testing
app.get("/", (req, res) => {
    res.json({
        msg: "Backend is working!", 
        status: "connected",
        timestamp: new Date().toISOString()
    });
});

// Import and use routes
try {
    app.use('/user', require('../routes/userRouter'));
    app.use('/product', require('../routes/productRouter'));
    app.use('/category', require('../routes/categoryRouter'));
    app.use('/pricing', require('../routes/pricingRouter'));
} catch (error) {
    console.error('Error loading routes:', error.message);
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Export for Vercel
module.exports = app;
