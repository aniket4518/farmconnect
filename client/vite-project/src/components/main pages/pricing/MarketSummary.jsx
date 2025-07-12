import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarketSummary = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axios.get('http://localhost:3000/pricing/summary');
                if (response.data.success) {
                    setSummary(response.data.summary);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching market summary:', error);
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    const isMobile = window.innerWidth <= 768;

    if (loading || !summary) {
        return (
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                marginBottom: '30px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                <p style={{ color: '#666' }}>Loading market summary...</p>
            </div>
        );
    }

    return (
        <div style={{
            backgroundColor: 'white',
            padding: isMobile ? '25px 20px' : '30px',
            borderRadius: '12px',
            marginBottom: '30px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{
                color: '#2e7d32',
                fontSize: isMobile ? '20px' : '24px',
                marginBottom: '25px',
                textAlign: 'center'
            }}>
                📊 Market Summary
            </h2>

            {/* Market Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                gap: '20px',
                marginBottom: '30px'
            }}>
                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px'
                }}>
                    <div style={{
                        fontSize: isMobile ? '24px' : '28px',
                        fontWeight: 'bold',
                        color: '#2e7d32',
                        marginBottom: '5px'
                    }}>
                        {summary.totalMarkets.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        Total Markets
                    </div>
                </div>

                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px'
                }}>
                    <div style={{
                        fontSize: isMobile ? '24px' : '28px',
                        fontWeight: 'bold',
                        color: '#2e7d32',
                        marginBottom: '5px'
                    }}>
                        {summary.activeCommodities}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        Active Commodities
                    </div>
                </div>

                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px'
                }}>
                    <div style={{
                        fontSize: isMobile ? '24px' : '28px',
                        fontWeight: 'bold',
                        color: summary.averagePriceIncrease >= 0 ? '#4caf50' : '#f44336',
                        marginBottom: '5px'
                    }}>
                        {summary.averagePriceIncrease >= 0 ? '+' : ''}{summary.averagePriceIncrease}%
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        Avg Price Change
                    </div>
                </div>

                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px'
                }}>
                    <div style={{
                        fontSize: isMobile ? '24px' : '28px',
                        fontWeight: 'bold',
                        color: '#2e7d32',
                        marginBottom: '5px'
                    }}>
                        🕒
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        Live Updates
                    </div>
                </div>
            </div>

            {/* Top Gainers and Losers */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '25px'
            }}>
                {/* Top Gainers */}
                <div>
                    <h3 style={{
                        color: '#4caf50',
                        fontSize: '16px',
                        marginBottom: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        📈 Top Gainers
                    </h3>
                    <div style={{ space: '10px' }}>
                        {summary.topGainers.map((item, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px 15px',
                                backgroundColor: '#e8f5e9',
                                borderRadius: '6px',
                                marginBottom: '8px'
                            }}>
                                <span style={{ color: '#333', fontWeight: '500' }}>
                                    {item.commodity}
                                </span>
                                <span style={{
                                    color: '#4caf50',
                                    fontWeight: 'bold',
                                    fontSize: '14px'
                                }}>
                                    +{item.increase}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Losers */}
                <div>
                    <h3 style={{
                        color: '#f44336',
                        fontSize: '16px',
                        marginBottom: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        📉 Top Losers
                    </h3>
                    <div style={{ space: '10px' }}>
                        {summary.topLosers.map((item, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px 15px',
                                backgroundColor: '#ffebee',
                                borderRadius: '6px',
                                marginBottom: '8px'
                            }}>
                                <span style={{ color: '#333', fontWeight: '500' }}>
                                    {item.commodity}
                                </span>
                                <span style={{
                                    color: '#f44336',
                                    fontWeight: 'bold',
                                    fontSize: '14px'
                                }}>
                                    {item.decrease}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketSummary;
