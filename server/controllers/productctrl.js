const product = require('../models/productmodel');
// filter , sorting , pagenation in product list
class name {
    constructor(parameters) {
        
    }
}
const productctrl = {
    createProduct: async (req, res) => {
        try {
            const { name, category, description, pricePerUnit, quantity, images, farmerId } = req.body;
            const newProduct = new product({ name, category, description, pricePerUnit, quantity, images, farmerId });
            await newProduct.save();
            res.json({ msg: "Product created" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getProducts: async (req, res) => {
        try {
            const products = await product.find();
            res.json(products);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getProduct: async (req, res) => {
        try {
            const product = await product.findById(req.params.id);
            res.json(product);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { name, category, description, pricePerUnit, quantity, images, farmerId } = req.body;
            await product.findOneAndUpdate({ _id: req.params.id }, { name, category, description, pricePerUnit, quantity, images, farmerId });
            res.json({ msg: "Product updated" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await product.findByIdAndDelete(req.params.id);
            res.json({ msg: "Product deleted" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}
module.exports = productctrl;