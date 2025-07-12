const router = require('express').Router();
const pricingCtrl = require('../controllers/pricingCtrl');

// Get government market prices
router.get('/government-prices', pricingCtrl.getGovernmentPrices);

// Get price trends for a specific commodity
router.get('/trends', pricingCtrl.getPriceTrends);

// Get market summary
router.get('/summary', pricingCtrl.getMarketSummary);

module.exports = router;
