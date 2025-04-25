const router = require('express').Router();
const productCtrl = require('../controllers/productctrl.js');

// Define routes for product operations
router.post('/create', productCtrl.createProduct);
router.get('/all', productCtrl.getProducts);
router.get('/:id', productCtrl.getProduct);
router.put('/:id', productCtrl.updateProduct);
router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;