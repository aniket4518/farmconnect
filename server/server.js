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
 
//router
app.use('/user',require('./routes/userRouter'));
app.use('/product',require('./routes/productRouter'));
app.use('/category',require('./routes/categoryRouter'));
app.use('/pricing',require('./routes/pricingRouter'));

// Define a route
app.get("/", (req, res) => {
    res.json({msg:"FarmConnect Backend API is working!"});
    console.log("API called successfully")
});

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

// For local development only
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export for Vercel
module.exports = app;
