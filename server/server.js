const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],  
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
app.listen(3000,()=> {
    console.log("Server is running ");
});
