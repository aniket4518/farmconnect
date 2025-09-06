const router = require('express').Router();
const pricingCtrl = require('../controllers/pricingCtrl');

// Get government market prices
router.get('/governmentPrices', pricingCtrl.getGovernmentPrices);

// Get price trends for a specific commodity
 

module.exports = router;
