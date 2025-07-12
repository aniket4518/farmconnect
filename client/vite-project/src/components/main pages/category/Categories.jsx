import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config";
import { useNavigate } from "react-router-dom"; // Add this import

const CategoriesSection = () => {
    const [category, setcategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Add this line
   
    useEffect(() => {
        const getcategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${config.API_BASE_URL}/category/all`);
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
                gridTemplateColumns: window.innerWidth <= 480 ? 'repeat(auto-fill, minmax(120px, 1fr))' : 
                                   window.innerWidth <= 768 ? 'repeat(auto-fill, minmax(150px, 1fr))' : 
                                   'repeat(auto-fill, minmax(180px, 1fr))', 
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
                            borderRadius: '30px',
                            padding: '0',
                            textAlign: 'center',
                            backgroundColor: '#f9f9f9',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer',
                            width: window.innerWidth <= 480 ? '120px' : 
                                   window.innerWidth <= 768 ? '140px' : '150px',
                            height: window.innerWidth <= 480 ? '120px' : 
                                    window.innerWidth <= 768 ? '140px' : '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        onClick={() => navigate(`/products/category/${categoryItem.name}`)}
                    >
                        <span style={{ 
                            color: 'black', 
                            fontSize: window.innerWidth <= 480 ? '14px' : '16px',
                            fontWeight: 'bold',
                            padding: '10px',
                            lineHeight: '1.2'
                        }}>
                            {categoryItem.name} 
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesSection;