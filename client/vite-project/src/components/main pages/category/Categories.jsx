import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Add this import
import API_BASE_URL from "../../../config";

const CategoriesSection = () => {
    const [category, setcategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Add this line
   
    useEffect(() => {
        const getcategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/category/all`);
                console.log("Categories data:", response.data);
                setcategory(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError(error.message);
                setLoading(false);
            }
        };
        getcategories();
    }, []);
    
    if (loading) return <div style={{ color: 'black', padding: '20px' }}>Loading categories...</div>;
    if (error) return <div style={{ color: 'black', padding: '20px' }}>Error loading categories: {error}</div>;
    if (category.length === 0) return <div style={{ color: 'black', padding: '20px' }}>No categories found</div>;
    
    return (
        <div style={{ padding: '20px', textAlign:"center"}} >
            <h2 style={{ 
                color: 'black', 
                marginBottom: '50px', 
                fontSize: window.innerWidth <= 480 ? '28px' : window.innerWidth <= 768 ? '36px' : '50px'
            }}>
                Our Categories!
            </h2>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: window.innerWidth <= 480 ? 'repeat(auto-fill, minmax(140px, 1fr))' : 
                                   window.innerWidth <= 768 ? 'repeat(auto-fill, minmax(180px, 1fr))' : 
                                   'repeat(auto-fill, minmax(200px, 1fr))', 
                gap: window.innerWidth <= 480 ? '20px' : '30px',
                justifyItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {category.map((categoryItem) => (
                    <div 
                        key={categoryItem._id} 
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '20px',
                            padding: '15px',
                            textAlign: 'center',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            width: window.innerWidth <= 480 ? '140px' : 
                                   window.innerWidth <= 768 ? '180px' : '200px',
                            height: window.innerWidth <= 480 ? '180px' : 
                                    window.innerWidth <= 768 ? '220px' : '240px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: '10px'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                        }}
                        onClick={() => navigate(`/products/category/${categoryItem.name}`)}
                    >
                        {/* Category Image */}
                        <div style={{
                            width: '100%',
                            height: window.innerWidth <= 480 ? '80px' : 
                                   window.innerWidth <= 768 ? '120px' : '140px',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            backgroundColor: '#f5f5f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {categoryItem.img ? (
                                <img 
                                    src={categoryItem.img} 
                                    alt={categoryItem.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '15px'
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#e8f5e8',
                                    color: '#666',
                                    fontSize: window.innerWidth <= 480 ? '24px' : '32px'
                                }}>
                              
                                </div>
                            )}
                            {/* Fallback icon (hidden by default, shown when image fails to load) */}
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'none',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#e8f5e8',
                                color: '#666',
                                fontSize: window.innerWidth <= 480 ? '24px' : '32px'
                            }}>
                                img loding
                            </div>
                        </div>

                        {/* Category Name */}
                        <div style={{ 
                            color: '#333', 
                            fontSize: window.innerWidth <= 480 ? '14px' : '16px',
                            fontWeight: 'bold',
                            marginTop: '10px',
                            lineHeight: '1.2',
                            textAlign: 'center',
                            width: '100%',
                            padding: '5px 0'
                        }}>
                            {categoryItem.name} 
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesSection;