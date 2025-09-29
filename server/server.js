const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:5174", 
            "https://farmconnect-2ifj.vercel.app",
            "https://farmconnect-gamma.vercel.app"
        ];
        
        // Check if origin is in allowed list or is a Vercel domain
        if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }
        
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,  
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
 
//router
app.use('/user',require('./routes/userRouter'));
app.use('/product',require('./routes/productRouter'));
app.use('/category',require('./routes/categoryRouter'));
app.use('/pricing',require('./routes/pricingRouter'));

// Define a route
app.get("/", (req, res) => {
    res.json({msg:"this is an example"});
    console.log("this is an example")
});

// Connect to MongoDB
const URI = process.env.MONGODB_URL
console.log(process.env.MONGODB_URL)
mongoose.connect(URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err.message);
    });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export for Vercel
module.exports = app;
