// Government pricing data controller
const pricingCtrl = {
    // Get government market prices
    getGovernmentPrices: async (req, res) => {
        try {
            // In a real implementation, you would fetch from government APIs like:
            // - AGMARKNET API (Agricultural Marketing Division)
            // - eNAM (National Agriculture Market) API
            // - APMC (Agricultural Produce Market Committee) data
            
            // For demonstration, we'll return sample data
            // In production, replace with actual API calls
            
            const mockPricingData = [
                {
                    id: 1,
                    commodity: 'Rice',
                    variety: 'Basmati',
                    state: 'Punjab',
                    market: 'Amritsar',
                    modalPrice: 5200,
                    minPrice: 4800,
                    maxPrice: 5600,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Cereals',
                    trend: 'up',
                    mspPrice: 4600, // Minimum Support Price
                    arrivalQuantity: 1250 // in quintals
                },
                {
                    id: 2,
                    commodity: 'Wheat',
                    variety: 'PBW-725',
                    state: 'Haryana',
                    market: 'Karnal',
                    modalPrice: 2350,
                    minPrice: 2200,
                    maxPrice: 2500,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Cereals',
                    trend: 'stable',
                    mspPrice: 2125,
                    arrivalQuantity: 2800
                },
                {
                    id: 3,
                    commodity: 'Tomato',
                    variety: 'Hybrid',
                    state: 'Karnataka',
                    market: 'Bangalore',
                    modalPrice: 3500,
                    minPrice: 2800,
                    maxPrice: 4200,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Vegetables',
                    trend: 'down',
                    mspPrice: null, // No MSP for vegetables
                    arrivalQuantity: 450
                },
                {
                    id: 4,
                    commodity: 'Onion',
                    variety: 'Red',
                    state: 'Maharashtra',
                    market: 'Nashik',
                    modalPrice: 2800,
                    minPrice: 2400,
                    maxPrice: 3200,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Vegetables',
                    trend: 'up',
                    mspPrice: null,
                    arrivalQuantity: 890
                },
                {
                    id: 5,
                    commodity: 'Potato',
                    variety: 'Round',
                    state: 'West Bengal',
                    market: 'Kolkata',
                    modalPrice: 1800,
                    minPrice: 1500,
                    maxPrice: 2100,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Vegetables',
                    trend: 'stable',
                    mspPrice: null,
                    arrivalQuantity: 1650
                },
                {
                    id: 6,
                    commodity: 'Sugarcane',
                    variety: 'Co-238',
                    state: 'Uttar Pradesh',
                    market: 'Meerut',
                    modalPrice: 340,
                    minPrice: 320,
                    maxPrice: 360,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Cash Crops',
                    trend: 'up',
                    mspPrice: 315,
                    arrivalQuantity: 3200
                },
                {
                    id: 7,
                    commodity: 'Cotton',
                    variety: 'Shankar-6',
                    state: 'Gujarat',
                    market: 'Rajkot',
                    modalPrice: 6200,
                    minPrice: 5800,
                    maxPrice: 6600,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Cash Crops',
                    trend: 'down',
                    mspPrice: 5665,
                    arrivalQuantity: 980
                },
                {
                    id: 8,
                    commodity: 'Cabbage',
                    variety: 'Fresh',
                    state: 'Himachal Pradesh',
                    market: 'Shimla',
                    modalPrice: 1200,
                    minPrice: 1000,
                    maxPrice: 1400,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Vegetables',
                    trend: 'stable',
                    mspPrice: null,
                    arrivalQuantity: 320
                },
                {
                    id: 9,
                    commodity: 'Apple',
                    variety: 'Red Delicious',
                    state: 'Jammu & Kashmir',
                    market: 'Srinagar',
                    modalPrice: 8500,
                    minPrice: 7800,
                    maxPrice: 9200,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Fruits',
                    trend: 'up',
                    mspPrice: null,
                    arrivalQuantity: 180
                },
                {
                    id: 10,
                    commodity: 'Banana',
                    variety: 'Cavendish',
                    state: 'Tamil Nadu',
                    market: 'Chennai',
                    modalPrice: 3200,
                    minPrice: 2800,
                    maxPrice: 3600,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Fruits',
                    trend: 'stable',
                    mspPrice: null,
                    arrivalQuantity: 560
                },
                {
                    id: 11,
                    commodity: 'Groundnut',
                    variety: 'TG-37A',
                    state: 'Andhra Pradesh',
                    market: 'Guntur',
                    modalPrice: 5800,
                    minPrice: 5400,
                    maxPrice: 6200,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Oilseeds',
                    trend: 'up',
                    mspPrice: 5550,
                    arrivalQuantity: 750
                },
                {
                    id: 12,
                    commodity: 'Mustard',
                    variety: 'Pusa Bold',
                    state: 'Rajasthan',
                    market: 'Jaipur',
                    modalPrice: 5200,
                    minPrice: 4900,
                    maxPrice: 5500,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Oilseeds',
                    trend: 'stable',
                    mspPrice: 5050,
                    arrivalQuantity: 420
                },
                {
                    id: 13,
                    commodity: 'Mango',
                    variety: 'Alphonso',
                    state: 'Maharashtra',
                    market: 'Mumbai',
                    modalPrice: 8000,
                    minPrice: 7200,
                    maxPrice: 8800,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Fruits',
                    trend: 'up',
                    mspPrice: null,
                    arrivalQuantity: 220
                },
                {
                    id: 14,
                    commodity: 'Chili',
                    variety: 'Guntur Red',
                    state: 'Andhra Pradesh',
                    market: 'Guntur',
                    modalPrice: 12000,
                    minPrice: 11200,
                    maxPrice: 12800,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Spices',
                    trend: 'down',
                    mspPrice: null,
                    arrivalQuantity: 85
                },
                {
                    id: 15,
                    commodity: 'Turmeric',
                    variety: 'Salem',
                    state: 'Tamil Nadu',
                    market: 'Salem',
                    modalPrice: 9500,
                    minPrice: 8800,
                    maxPrice: 10200,
                    unit: 'per quintal',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Spices',
                    trend: 'stable',
                    mspPrice: null,
                    arrivalQuantity: 125
                }
            ];

            // Add some query parameters support for filtering
            const { state, category, commodity } = req.query;
            let filteredData = mockPricingData;

            if (state && state !== 'All') {
                filteredData = filteredData.filter(item => item.state === state);
            }

            if (category && category !== 'All') {
                filteredData = filteredData.filter(item => item.category === category);
            }

            if (commodity) {
                filteredData = filteredData.filter(item => 
                    item.commodity.toLowerCase().includes(commodity.toLowerCase()) ||
                    item.variety.toLowerCase().includes(commodity.toLowerCase())
                );
            }

            res.json({
                success: true,
                data: filteredData,
                count: filteredData.length,
                lastUpdated: new Date().toISOString(),
                source: "Agricultural Marketing Division, Ministry of Agriculture & Farmers Welfare"
            });

        } catch (error) {
            console.error('Error fetching government prices:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch government pricing data',
                error: error.message
            });
        }
    },

    // Get price trends for a specific commodity
    getPriceTrends: async (req, res) => {
        try {
            const { commodity, days = 30 } = req.query;

            if (!commodity) {
                return res.status(400).json({
                    success: false,
                    message: 'Commodity parameter is required'
                });
            }

            // Mock historical data - in real implementation, fetch from database
            const trendData = [];
            const basePrice = 3000;
            const currentDate = new Date();

            for (let i = parseInt(days); i >= 0; i--) {
                const date = new Date(currentDate);
                date.setDate(date.getDate() - i);
                
                // Generate some realistic price variation
                const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
                const price = Math.round(basePrice * (1 + variation));
                
                trendData.push({
                    date: date.toISOString().split('T')[0],
                    price: price,
                    volume: Math.round(100 + Math.random() * 500) // Volume in quintals
                });
            }

            res.json({
                success: true,
                commodity: commodity,
                period: `${days} days`,
                data: trendData
            });

        } catch (error) {
            console.error('Error fetching price trends:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch price trends',
                error: error.message
            });
        }
    },

    // Get market summary
    getMarketSummary: async (req, res) => {
        try {
            const summary = {
                totalMarkets: 6850,
                activeCommodities: 237,
                averagePriceIncrease: 2.5, // Percentage
                topGainers: [
                    { commodity: 'Apple', increase: 8.5 },
                    { commodity: 'Onion', increase: 6.2 },
                    { commodity: 'Groundnut', increase: 4.8 }
                ],
                topLosers: [
                    { commodity: 'Cotton', decrease: -5.3 },
                    { commodity: 'Chili', decrease: -3.7 },
                    { commodity: 'Tomato', decrease: -2.1 }
                ],
                lastUpdated: new Date().toISOString()
            };

            res.json({
                success: true,
                summary: summary
            });

        } catch (error) {
            console.error('Error fetching market summary:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch market summary',
                error: error.message
            });
        }
    }
};

module.exports = pricingCtrl;
