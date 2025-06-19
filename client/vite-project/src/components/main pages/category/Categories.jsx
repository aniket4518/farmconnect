import { useState, useEffect } from "react";
import axios from "axios";
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
                const response = await axios.get("http://localhost:3000/category/all");
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
        <div style={{ padding: '0px' , textAlign:"center"}} >
            <h2 style={{ color: 'black', marginBottom: '70px' ,fontSize:"50px"}}>Our Categories!</h2>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
                gap: '30px',
                justifyItems: 'center'
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
                            width: '150px',
                            height: '150px',
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
                            fontSize: '16px',
                            fontWeight: 'bold',
                            padding: '10px'
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