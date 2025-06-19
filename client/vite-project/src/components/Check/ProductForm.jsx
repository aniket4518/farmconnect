import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const navigate = useNavigate();
  // Form state
  const [product, setProduct] = useState({
    name: '',
    pricePerUnit: '',
    description: '',
    category: '',
    stock: ''
  });
  const [categories, setCategories] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/category/all');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productImage) {
      setMessage('Please select a product image');
      return;
    }

    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    // Append product details
    Object.keys(product).forEach(key => {
      formData.append(key, product[key]);
    });
    
    // Append image file - make sure this matches the expected field name in your multer setup
    formData.append('productImage', productImage);

    try {
      const response = await axios.post('http://localhost:3000/product/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setMessage('Product added successfully!');
      console.log('Server response:', response.data);
      
      // Navigate to products page after successful creation
      // setTimeout(() => {
      //   navigate('/products');
      // }, 2000);
      
      // Reset form
      setProduct({
        name: '',
        pricePerUnit: '',
        description: '',
        category: '',
        stock: ''
      });
      setProductImage(null);
      setImagePreview(null);
      
    } catch (error) {
      setMessage('Error adding product: ' + (error.response?.data?.message || error.message));
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Preview component to show how product will look in product list
  const ProductPreview = ({ product, imagePreview }) => (
    <div className="product_box" style={{ 
      border: '1px solid #ddd',
      padding: '15px',
      borderRadius: '5px',
      marginTop: '20px'
    }}>
      <div className="product_img">
        <img 
          src={imagePreview} 
          alt="Product Preview" 
          style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }} 
        />
      </div>
      <h2>
        <span  >{product.name || 'Product Name'}</span>
        <p>{product.description || 'Product Description'}</p>
        <p>price per unit - {product.pricePerUnit || '0'}</p>
        <p>{product.category ? 
          categories.find(cat => cat._id === product.category)?.name || product.category 
          : 'Category'}</p>
      </h2>
      <div className="row">
        <button disabled>add to cart</button>
        <button disabled>View More</button>
      </div>
    </div>
  );

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px'
    }}>
      <h2 style={{ color: '#2e7d32', marginBottom: '20px' }}>Add New Product</h2>
      
      {message && (
        <div style={{
          padding: '10px 15px',
          marginBottom: '20px',
          borderRadius: '4px',
          backgroundColor: message.includes('Error') ? '#ffebee' : '#e8f5e9',
          color: message.includes('Error') ? '#c62828' : '#2e7d32'
        }}>
          {message}
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* Product Form */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' , color: "black" }}>
                Product Name:
              </label>
              <input 
                type="text" 
                name="name" 
                value={product.name} 
                onChange={handleInputChange} 
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold',color:"black" }}>
                Price Per Unit (₹):
              </label>
              <input 
                type="number" 
                name="pricePerUnit" 
                value={product.pricePerUnit} 
                onChange={handleInputChange} 
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold',color:"black" }}>
                Description:
              </label>
              <textarea 
                name="description" 
                value={product.description} 
                onChange={handleInputChange} 
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  minHeight: '100px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color:"black" }}>
                Category:
              </label>
              <select 
                name="category" 
                value={product.category} 
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color:"black" }}>
                Stock Quantity:
              </label>
              <input 
                type="number" 
                name="stock" 
                value={product.stock} 
                onChange={handleInputChange} 
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold',color:"black" }}>
                Product Image:
              </label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              style={{
                backgroundColor: '#2e7d32',
                color: 'white',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Adding Product...' : 'Add Product'}
            </button>
          </form>
        </div>
        
        {/* Product Preview */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h3 style={{ marginBottom: '15px' }}>Preview</h3>
          {imagePreview && (
            <ProductPreview product={product} imagePreview={imagePreview} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
