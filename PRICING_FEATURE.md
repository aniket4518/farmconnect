# Government Crop & Vegetable Pricing Feature

## Overview

This feature provides real-time crop and vegetable pricing information sourced from government agricultural market data. It helps farmers make informed decisions about when and where to sell their produce, and helps consumers understand current market rates.

## Features

### 1. Real-time Price Display

- **Modal Price**: The most frequently occurring price in the market
- **Min/Max Prices**: Price range for each commodity
- **MSP Information**: Minimum Support Price (where applicable)
- **Arrival Quantities**: Daily arrival quantities in quintals

### 2. Market Summary Dashboard

- Total number of active markets across India
- Number of commodities being tracked
- Average price change trends
- Top gaining and losing commodities

### 3. Advanced Filtering & Search

- Search by commodity name or variety
- Filter by state/region
- Filter by commodity category (Cereals, Vegetables, Fruits, etc.)
- Real-time results filtering

### 4. Comprehensive Categories

- **Cereals**: Rice, Wheat, Barley, etc.
- **Vegetables**: Tomato, Onion, Potato, Cabbage, etc.
- **Fruits**: Apple, Banana, Mango, etc.
- **Cash Crops**: Cotton, Sugarcane, etc.
- **Oilseeds**: Groundnut, Mustard, etc.
- **Spices**: Chili, Turmeric, etc.

### 5. Price Trend Indicators

- 📈 **UP**: Price increasing trend
- 📉 **DOWN**: Price decreasing trend
- ➡️ **STABLE**: Price stable/unchanged

## API Endpoints

### Get Government Prices

```
GET /pricing/government-prices
```

**Query Parameters:**

- `state` (optional): Filter by state name
- `category` (optional): Filter by commodity category
- `commodity` (optional): Search by commodity name

**Response:**

```json
{
  "success": true,
  "data": [...],
  "count": 15,
  "lastUpdated": "2025-01-12T07:12:34.700Z",
  "source": "Agricultural Marketing Division, Ministry of Agriculture & Farmers Welfare"
}
```

### Get Market Summary

```
GET /pricing/summary
```

**Response:**

```json
{
  "success": true,
  "summary": {
    "totalMarkets": 6850,
    "activeCommodities": 237,
    "averagePriceIncrease": 2.5,
    "topGainers": [...],
    "topLosers": [...],
    "lastUpdated": "2025-01-12T07:12:41.733Z"
  }
}
```

### Get Price Trends

```
GET /pricing/trends?commodity=Rice&days=30
```

**Query Parameters:**

- `commodity` (required): Commodity name
- `days` (optional): Number of days (default: 30)

## Data Sources

- **Primary Source**: Agricultural Marketing Division, Ministry of Agriculture & Farmers Welfare, Government of India
- **Secondary Sources**: eNAM (National Agriculture Market), APMC market data
- **Update Frequency**: Daily updates from government market centers

## Implementation Details

### Frontend Components

1. **Pricing.jsx**: Main pricing page component
2. **MarketSummary.jsx**: Market dashboard component
3. Responsive design for mobile and desktop
4. Real-time filtering and search functionality

### Backend Components

1. **pricingCtrl.js**: Controller for pricing API endpoints
2. **pricingRouter.js**: Express routes for pricing endpoints
3. Mock data implementation (ready for real API integration)

### Future Enhancements

1. **Real Government API Integration**: Connect to actual government APIs
2. **Historical Price Charts**: Price trend visualization
3. **Price Alerts**: SMS/Email notifications for price changes
4. **Market Comparison**: Compare prices across different markets
5. **Export Functionality**: Download price data as CSV/PDF
6. **Regional Language Support**: Price information in local languages

## Technical Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Fast Loading**: Optimized API calls and data rendering
- **Error Handling**: Graceful handling of API failures
- **Caching**: Client-side caching for better performance
- **Accessibility**: Screen reader friendly design

## Benefits for Users

### For Farmers:

- Make informed selling decisions
- Compare prices across different markets
- Understand MSP vs market rates
- Plan harvest and marketing timing

### For Consumers:

- Understand current market rates
- Make informed purchasing decisions
- Track seasonal price variations
- Compare prices across regions

### For Traders:

- Market intelligence for trading decisions
- Identify profit opportunities
- Risk management through price trends
- Supply chain optimization

## Usage Instructions

1. Navigate to the Pricing section from the main menu
2. Use filters to narrow down commodities by state or category
3. Search for specific crops using the search bar
4. Click on price cards to view detailed information
5. Monitor the market summary for overall trends

This feature represents a significant value addition to the FarmConnect platform, providing crucial market intelligence that empowers farmers and connects them better with fair pricing information.
