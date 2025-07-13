import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MarketSummary from './MarketSummary';
import API_BASE_URL from '../../../config';

const Pricing = () => {
    const [priceData, setPriceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedState, setSelectedState] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;

    useEffect(() => {
        // Fetch real pricing data from backend
        const fetchPriceData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/pricing/government-prices`);
                if (response.data.success) {
                    setPriceData(response.data.data);
                } else {
                    setError('Failed to fetch pricing data');
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching price data:', err);
                setError('Failed to fetch pricing data');
                setLoading(false);
            }
        };

        fetchPriceData();
    }, []);

    // Filter data based on selected filters and search term
    const filteredData = priceData.filter(item => {
        const matchesState = selectedState === 'All' || item.state === selectedState;
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.variety.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesState && matchesCategory && matchesSearch;
    });

    // Get unique states and categories for filters
    const states = ['All', ...new Set(priceData.map(item => item.state))];
    const categories = ['All', ...new Set(priceData.map(item => item.category))];

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return '📈';
            case 'down': return '📉';
            case 'stable': return '➡️';
            default: return '➡️';
        }
    };

    const getTrendColor = (trend) => {
        switch (trend) {
            case 'up': return '#4caf50';
            case 'down': return '#f44336';
            case 'stable': return '#ff9800';
            default: return '#ff9800';
        }
    };

    if (loading) {
        return (
            <div style={{
                padding: '50px 20px',
                textAlign: 'center',
                minHeight: '400px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #40b959',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 20px'
                    }}></div>
                    <p style={{ color: '#666', fontSize: '18px' }}>Loading current market prices...</p>
                </div>
                <style>
                    {`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}
                </style>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                padding: '50px 20px',
                textAlign: 'center',
                color: '#f44336',
                fontSize: '18px'
            }}>
                {error}
            </div>
        );
    }

    return (
        <div style={{
            padding: isMobile ? '20px 15px' : '30px 20px',
            maxWidth: '1400px',
            margin: '0 auto',
            backgroundColor: '#f9f9f9',
            minHeight: '100vh'
        }}>
            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '40px',
                backgroundColor: 'white',
                padding: isMobile ? '30px 20px' : '40px 30px',
                borderRadius: '15px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{
                    color: '#2e7d32',
                    fontSize: isMobile ? '28px' : '36px',
                    marginBottom: '15px',
                    fontWeight: 'bold'
                }}>
                    🌾 Government Market Prices
                </h1>
                <p style={{
                    color: '#666',
                    fontSize: isMobile ? '16px' : '18px',
                    lineHeight: '1.6',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    Real-time crop and vegetable prices from major markets across India.
                    Updated daily based on government agricultural market data.
                </p>
                <div style={{
                    backgroundColor: '#e8f5e9',
                    padding: '15px',
                    borderRadius: '8px',
                    marginTop: '20px',
                    border: '1px solid #4caf50'
                }}>
                    <p style={{
                        margin: 0,
                        color: '#2e7d32',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        📅 Last Updated: {new Date().toLocaleDateString('en-IN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </div>

            {/* Market Summary */}
            <MarketSummary />

            {/* Filters and Search */}
            <div style={{
                backgroundColor: 'white',
                padding: isMobile ? '20px 15px' : '25px 30px',
                borderRadius: '12px',
                marginBottom: '30px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    alignItems: 'end'
                }}>
                    {/* Search */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '600',
                            color: '#333'
                        }}>
                            Search Commodity
                        </label>
                        <input
                            type="text"
                            placeholder="Search rice, wheat, tomato..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 15px',
                                border: '2px solid #e0e0e0',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.3s',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* State Filter */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '600',
                            color: '#333'
                        }}>
                            State
                        </label>
                        <select
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 15px',
                                border: '2px solid #e0e0e0',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none',
                                backgroundColor: 'white',
                                boxSizing: 'border-box'
                            }}
                        >
                            {states.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '600',
                            color: '#333'
                        }}>
                            Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 15px',
                                border: '2px solid #e0e0e0',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none',
                                backgroundColor: 'white',
                                boxSizing: 'border-box'
                            }}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Summary */}
            <div style={{
                marginBottom: '25px',
                padding: '15px 20px',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                border: '1px solid #2196f3'
            }}>
                <p style={{
                    margin: 0,
                    color: '#1976d2',
                    fontWeight: '600',
                    fontSize: '16px'
                }}>
                    📊 Showing {filteredData.length} price records
                    {selectedState !== 'All' && ` from ${selectedState}`}
                    {selectedCategory !== 'All' && ` in ${selectedCategory} category`}
                </p>
            </div>

            {/* Price Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 
                                   isSmallMobile ? '1fr' :
                                   'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '20px'
            }}>
                {filteredData.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '25px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            border: '1px solid #e0e0e0',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'default'
                        }}
                        onMouseOver={(e) => {
                            if (!isMobile) {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!isMobile) {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '20px'
                        }}>
                            <div>
                                <h3 style={{
                                    margin: '0 0 5px 0',
                                    color: '#2e7d32',
                                    fontSize: '20px',
                                    fontWeight: 'bold'
                                }}>
                                    {item.commodity}
                                </h3>
                                <p style={{
                                    margin: 0,
                                    color: '#666',
                                    fontSize: '14px'
                                }}>
                                    {item.variety}
                                </p>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                backgroundColor: getTrendColor(item.trend) + '20',
                                border: `1px solid ${getTrendColor(item.trend)}`
                            }}>
                                <span style={{ fontSize: '16px' }}>{getTrendIcon(item.trend)}</span>
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: getTrendColor(item.trend),
                                    textTransform: 'uppercase'
                                }}>
                                    {item.trend}
                                </span>
                            </div>
                        </div>

                        {/* Location */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '20px',
                            padding: '10px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px'
                        }}>
                            <span style={{ fontSize: '16px' }}>📍</span>
                            <div>
                                <p style={{
                                    margin: 0,
                                    fontWeight: '600',
                                    color: '#333',
                                    fontSize: '14px'
                                }}>
                                    {item.market}, {item.state}
                                </p>
                                <p style={{
                                    margin: 0,
                                    color: '#666',
                                    fontSize: '12px'
                                }}>
                                    Market Center
                                </p>
                            </div>
                        </div>

                        {/* Price Information */}
                        <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '20px',
                            borderRadius: '10px',
                            marginBottom: '15px'
                        }}>
                            {/* Modal Price */}
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '15px'
                            }}>
                                <p style={{
                                    margin: '0 0 5px 0',
                                    fontSize: '12px',
                                    color: '#666',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    Modal Price
                                </p>
                                <p style={{
                                    margin: 0,
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    color: '#2e7d32'
                                }}>
                                    ₹{item.modalPrice.toLocaleString('en-IN')}
                                </p>
                                <p style={{
                                    margin: 0,
                                    fontSize: '12px',
                                    color: '#666'
                                }}>
                                    {item.unit}
                                </p>
                            </div>

                            {/* Min and Max Prices */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '15px',
                                marginBottom: item.mspPrice ? '15px' : '0'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{
                                        margin: '0 0 5px 0',
                                        fontSize: '11px',
                                        color: '#666',
                                        textTransform: 'uppercase'
                                    }}>
                                        Min Price
                                    </p>
                                    <p style={{
                                        margin: 0,
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: '#f44336'
                                    }}>
                                        ₹{item.minPrice.toLocaleString('en-IN')}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{
                                        margin: '0 0 5px 0',
                                        fontSize: '11px',
                                        color: '#666',
                                        textTransform: 'uppercase'
                                    }}>
                                        Max Price
                                    </p>
                                    <p style={{
                                        margin: 0,
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: '#4caf50'
                                    }}>
                                        ₹{item.maxPrice.toLocaleString('en-IN')}
                                    </p>
                                </div>
                            </div>

                            {/* MSP Information */}
                            {item.mspPrice && (
                                <div style={{
                                    borderTop: '1px solid #ddd',
                                    paddingTop: '15px',
                                    textAlign: 'center'
                                }}>
                                    <p style={{
                                        margin: '0 0 5px 0',
                                        fontSize: '11px',
                                        color: '#666',
                                        textTransform: 'uppercase'
                                    }}>
                                        MSP (Minimum Support Price)
                                    </p>
                                    <p style={{
                                        margin: 0,
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: '#ff9800'
                                    }}>
                                        ₹{item.mspPrice.toLocaleString('en-IN')}
                                    </p>
                                    <p style={{
                                        margin: '5px 0 0 0',
                                        fontSize: '10px',
                                        color: item.modalPrice > item.mspPrice ? '#4caf50' : '#f44336'
                                    }}>
                                        {item.modalPrice > item.mspPrice ? 
                                            `₹${(item.modalPrice - item.mspPrice).toLocaleString('en-IN')} above MSP` :
                                            `₹${(item.mspPrice - item.modalPrice).toLocaleString('en-IN')} below MSP`
                                        }
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Category and Date */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: '15px',
                            borderTop: '1px solid #e0e0e0',
                            marginBottom: '10px'
                        }}>
                            <span style={{
                                backgroundColor: '#e3f2fd',
                                color: '#1976d2',
                                padding: '4px 12px',
                                borderRadius: '15px',
                                fontSize: '12px',
                                fontWeight: '600'
                            }}>
                                {item.category}
                            </span>
                            <span style={{
                                color: '#666',
                                fontSize: '12px'
                            }}>
                                {new Date(item.date).toLocaleDateString('en-IN')}
                            </span>
                        </div>

                        {/* Arrival Quantity */}
                        {item.arrivalQuantity && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '8px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '6px',
                                fontSize: '12px',
                                color: '#666'
                            }}>
                                <span>📦</span>
                                <span>Arrival: {item.arrivalQuantity.toLocaleString('en-IN')} quintals</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* No Results */}
            {filteredData.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
                    <h3 style={{
                        color: '#666',
                        fontSize: '20px',
                        marginBottom: '10px'
                    }}>
                        No price data found
                    </h3>
                    <p style={{ color: '#999', fontSize: '16px' }}>
                        Try adjusting your search criteria or filters
                    </p>
                </div>
            )}

            {/* Footer Info */}
            <div style={{
                marginTop: '50px',
                padding: '30px',
                backgroundColor: 'white',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{
                    color: '#2e7d32',
                    fontSize: '20px',
                    marginBottom: '15px'
                }}>
                    📊 About This Data
                </h3>
                <p style={{
                    color: '#666',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    maxWidth: '600px',
                    margin: '0 auto 20px'
                }}>
                    Price data is sourced from Agricultural Marketing Division, Ministry of Agriculture & Farmers Welfare, 
                    Government of India. Prices are indicative and may vary based on quality, quantity, and local market conditions.
                </p>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: '20px',
                    marginTop: '25px'
                }}>
                    <div>
                        <div style={{ fontSize: '24px', marginBottom: '10px' }}>🏛️</div>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                            Government Verified
                        </p>
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔄</div>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                            Daily Updates
                        </p>
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', marginBottom: '10px' }}>📍</div>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                            Pan-India Coverage
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
