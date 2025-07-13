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

// Connect to MongoDB
const URI = process.env.MONGODB_URL;
if (!mongoose.connections[0].readyState) {
    mongoose.connect(URI);
}

//router
app.use('/user',require('./routes/userRouter'));
app.use('/product',require('./routes/productRouter'));
app.use('/category',require('./routes/categoryRouter'));
app.use('/pricing',require('./routes/pricingRouter'));

// Define a route
app.get("/", (req, res) => {
    res.json({msg:"Backend is working!", status: "connected"});
});

// Export for Vercel
module.exports = app;
