  const mongoose = require("mongoose");
    const productSchema = new mongoose.Schema({
        name: String,
        category: String,  
        description: String,
        pricePerUnit: Number,
        quantity: Number,  
        images: [String], 
        farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      });
      
 module.exports = mongoose.model("Product", productSchema);