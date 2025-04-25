const express = require('express');
const router = express.Router();
const userctrl = require('../controllers/userctrl');
const auth = require('../middleware/auth'); // Middleware to authenticate the user

router.post('/register', userctrl.register);
router.post('/login', userctrl.login);
router.get('/refresh_token', userctrl.refreshtoken);
router.get('/logout', userctrl.logout);
router.patch("/update_cart", auth, userctrl.updateCart,async (req, res) => {
    console.log("update_cart route hit");
    console.log("Authenticated user ID:", req.user); // Log user ID from auth middleware
    console.log("Request body:", req.body);
    try {
        await userctrl.updateCart(req, res);
    } catch (error) {
        console.error("Error in update_cart route:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
