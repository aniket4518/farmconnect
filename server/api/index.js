const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "http://localhost:5174", 
        "https://farmconnect-2ifj.vercel.app",
        /\.vercel\.app$/  // Allow all Vercel preview deployments
    ],  
    credentials: true,  
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    preflightContinue: false,
    optionsSuccessStatus: 204
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

// Test route
app.get("/test", (req, res) => {
    res.json({ message: "Test endpoint working" });
});

// Import and use routes with error handling
try {
    console.log('Loading routes...');
    const userRouter = require('../routes/userRouter');
    const productRouter = require('../routes/productRouter');
    const categoryRouter = require('../routes/categoryRouter');
    const pricingRouter = require('../routes/pricingRouter');
    
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/category', categoryRouter);
    app.use('/pricing', pricingRouter);
    
    console.log('Routes loaded successfully');
} catch (error) {
    console.error('Error loading routes:', error.message);
    console.error('Stack:', error.stack);
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Export for Vercel
module.exports = app;
