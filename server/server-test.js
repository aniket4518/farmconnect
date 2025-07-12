// Simple test server for Vercel
const express = require('express');
const cors = require('cors');

const app = express();

// Basic middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://farmconnect-2ifj.vercel.app"],
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

// Simple test route
app.get("/", (req, res) => {
    try {
        res.json({
            msg: "FarmConnect Backend API is working!",
            status: "success",
            timestamp: new Date().toISOString(),
            env: process.env.NODE_ENV || 'development',
            nodeVersion: process.version
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
});

// Health check
app.get("/health", (req, res) => {
    try {
        res.json({
            status: "healthy",
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            env: process.env.NODE_ENV
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Test route for basic functionality
app.get("/test", (req, res) => {
    res.json({
        message: "Test endpoint working",
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error("Error:", error);
    res.status(500).json({
        msg: "Internal server error",
        error: error.message,
        path: req.path
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        msg: "Route not found",
        path: req.originalUrl,
        method: req.method
    });
});

module.exports = app;
