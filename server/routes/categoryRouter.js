const router = require('express').Router();
const categoryctrl = require('../controllers/categoryctrl');
const adminAuth = require('../middleware/adminauth');
const auth = require('../middleware/auth');


 

router.post('/create', adminAuth, categoryctrl.createCategory);
router.get('/all', categoryctrl.getCategory);

router.delete('/:id', auth, categoryctrl.deleteCategory);
router.put('/:id', auth, categoryctrl.updateCategory);
module.exports = router;