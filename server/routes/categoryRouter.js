const router = require('express').Router();
const categoryctrl = require('../controllers/categoryctrl');
const adminAuth = require('../middleware/adminauth');
const auth = require('../middleware/auth');
const multerMiddleware = require('../middleware/multer');

 

router.post('/create', multerMiddleware.single('image'), categoryctrl.createCategory);
router.get('/all', categoryctrl.getCategory);

router.delete('/:id', auth, categoryctrl.deleteCategory);
router.put('/:id', auth, categoryctrl.updateCategory);
module.exports = router;