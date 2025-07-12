const express = require('express');
const router = express.Router();
const userctrl = require('../controllers/userctrl');
const auth = require('../middleware/auth'); // Middleware to authenticate the user

router.post('/register', userctrl.register);
router.post('/login', userctrl.login);
router.get('/refresh_token', userctrl.refreshtoken);
router.get('/logout', userctrl.logout);
router.patch("/update_cart", auth, userctrl.updateCart);

module.exports = router;
