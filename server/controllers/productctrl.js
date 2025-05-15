const product = require('../models/productmodel');
const { uploadImageFromImagesFolder } = require('../middleware/Cloudinary');
// filter , sorting , pagenation in product list
class name {
    constructor(parameters) {
        
    }
}
const productctrl = {
    createProduct: async (req, res) => {
        try {
            const { name, category, description, pricePerUnit, quantity, farmerId } = req.body;
            let images = [];

            // If multer uploaded a file, upload it to Cloudinary and get the URL
            if (req.file && req.file.filename) {
                try {
                    const imageUrl = await uploadImageFromImagesFolder(req.file.filename);
                    images.push(imageUrl); // Save as string, not object
                } catch (cloudErr) {
                    console.error('Cloudinary upload failed:', cloudErr);
                    return res.status(500).json({ msg: 'Image upload failed', error: cloudErr.message });
                }
            }

            // If your schema expects images as an object, use images[0] or adjust accordingly
            const newProduct = new product({ name, category, description, pricePerUnit, quantity, images, farmerId });
            await newProduct.save();
            res.json({ msg: "Product created", product: newProduct });
        } catch (err) {
            console.error('Product creation failed:', err);
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