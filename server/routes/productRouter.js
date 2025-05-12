const router = require('express').Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminauth');
const productCtrl = require('../controllers/productctrl.js');
const multerMiddleware = require('../middleware/multer');

// Define routes for product operations
router.post('/create',  multerMiddleware.array('productImage',11), productCtrl.createProduct);
router.get('/all', productCtrl.getProducts);
router.get('/:id', productCtrl.getProduct);
router.put('/:id', adminAuth, productCtrl.updateProduct);
router.delete('/:id', adminAuth, productCtrl.deleteProduct);

module.exports = router;