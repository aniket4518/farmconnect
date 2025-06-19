const router = require('express').Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminauth');
const productCtrl = require('../controllers/productctrl.js');
const multerMiddleware = require('../middleware/multer');
const cloudinary = require('../middleware/Cloudinary');

// Define routes for product operations
router.post('/create', multerMiddleware.single("productImage"), productCtrl.createProduct);
router.get('/all', productCtrl.getProducts);
router.get('/bycategory', productCtrl.getproductBycategory); // <-- This must be above '/:id'
router.get('/:id', productCtrl.getProduct);
router.put('/:id', adminAuth, productCtrl.updateProduct);
router.delete('/:id', adminAuth, productCtrl.deleteProduct);

module.exports = router;