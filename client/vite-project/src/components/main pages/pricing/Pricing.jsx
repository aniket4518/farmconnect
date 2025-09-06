 import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../config';

const Pricing = () => {
    const [priceData, setPriceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Input states
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [market, setMarket] = useState('');
    const [commodity, setCommodity] = useState('');

    // Function to capitalize first letter of each word for display
    const capitalizeWords = (str) => {
        if (!str) return '';
        return str.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
    };

    const fetchPriceData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Send the input values to API
            const params = {
                state: state.trim(),
                district: district.trim(),
                market: market.trim(),
                commodity: commodity.trim()
            };

            const response = await axios.get(`${API_BASE_URL}/pricing/governmentPrices/`, {
                params: params
            });

            setPriceData(response.data);
        } catch (err) {
            console.error('Error fetching price data:', err);
            setError('Failed to fetch pricing data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#2e7d32' }}>
                🌾 Government Market Prices
            </h1>

            {/* Input Form */}
            <form
                onSubmit={fetchPriceData}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px',
                    marginBottom: '30px',
                    background: 'white',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
            >
                <input
                    type="text"
                    placeholder="Enter State (e.g., Delhi, Karnataka)"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                />
                <input
                    type="text"
                    placeholder="Enter District (e.g., South Delhi)"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                />
                <input
                    type="text"
                    placeholder="Enter Market (e.g., Azadpur)"
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                    style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                />
                <input
                    type="text"
                    placeholder="Enter Commodity (e.g., Tomato, Rice)"
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                />

                <button
                    type="submit"
                    style={{
                        gridColumn: '1 / -1',
                        padding: '12px',
                        background: '#2e7d32',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    🔍 Search Prices
                </button>
            </form>

            {/* Loading */}
            {loading && <p style={{ textAlign: 'center' }}>Loading data...</p>}

            {/* Error */}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            {/* Results */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px'
                }}
            >
                {priceData.map((item, idx) => (
                    <div
                        key={idx}
                        style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h3 style={{ marginBottom: '5px', color: '#2e7d32' }}>
                            {capitalizeWords(item.commodity)} {item.variety && `(${capitalizeWords(item.variety)})`}
                        </h3>
                        <p style={{ margin: 0, color: '#666' }}>
                            Market: {capitalizeWords(item.market)}, {capitalizeWords(item.district)}, {capitalizeWords(item.state)}
                        </p>
                        <p style={{ fontWeight: 'bold', marginTop: '10px', fontSize: '18px' }}>
                            ₹{item.modal_price} / {item.unit}
                        </p>
                        <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>
                            <p style={{ margin: '2px 0' }}>Date: {item.arrival_date}</p>
                            {item.min_price && item.max_price && (
                                <p style={{ margin: '2px 0' }}>
                                    Range: ₹{item.min_price} - ₹{item.max_price}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* No Results */}
            {!loading && priceData.length === 0 && !error && (
                <p style={{ textAlign: 'center', marginTop: '20px', color: '#999' }}>
                    No results found. Try different filters.
                </p>
            )}
        </div>
    );
};

export default Pricing;
