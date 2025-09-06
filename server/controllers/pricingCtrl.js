// Government pricing data controller
const dotenv = require("dotenv");
dotenv.config();

const pricingCtrl = {
    // Get government market prices
    getGovernmentPrices: async (req, res) => {
        // Extract and capitalize query parameters
        const { state, district, market, commodity } = req.query;
        
        try {
            const url = new URL(
                "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070"
            );
            url.searchParams.append("api-key", process.env.API_REALTIME_CROPS_PRICE);
            url.searchParams.append("format", "json");
            url.searchParams.append("limit", "50");

            // Add filters if they exist
            if (state) url.searchParams.append("filters[state.keyword]", state);
            if (district) url.searchParams.append("filters[district]", district);
            if (market) url.searchParams.append("filters[market]", market);
            if (commodity) url.searchParams.append("filters[commodity]", commodity);

            const response = await fetch(url.toString());
            const data = await response.json();

            res.json(data.records || []);
        } catch (err) {
            console.error("Error fetching:", err);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    }
};

module.exports = pricingCtrl;
