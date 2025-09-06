import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
 
function Categoryform() {
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleOnChange = (e) => {
    const categoryName = e.target.value;
    setCategory(categoryName);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('name', category);
      if (image) {
        formData.append('image', image);
      }

      const res = await axios.post(`${API_BASE_URL}/category/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Server response:", res);
      setMessage('Category created successfully!');
      // Reset form
      setCategory('');
      setImage(null);
      setImagePreview(null);
      // Reset file input
      e.target.reset();
    } catch (error) {
      console.error('Error creating category:', error);
      setMessage('Error creating category: ' + (error.response?.data?.msg || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const CategoryPreview = () => (
    <div style={{ 
      border: '1px solid #ddd',
      padding: '15px',
      borderRadius: '5px',
      marginTop: '20px',
      backgroundColor: '#fff'
    }}>
      <h3 style={{ marginTop: 0, color: '#333' }}>Category Preview</h3>
      <div style={{ textAlign: 'center' }}>
        {imagePreview && (
          <img 
            src={imagePreview} 
            alt="Category Preview" 
            style={{ 
              maxHeight: '200px', 
              objectFit: 'cover', 
              width: '100%',
              borderRadius: '4px'
            }} 
          />
        )}
        <h4 style={{ margin: '10px 0', color: '#555' }}>
          {category || 'Category Name'}
        </h4>
      </div>
    </div>
  );
  
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
            Create New Category
          </h1>
          
          <form 
            onSubmit={handleOnSubmit} 
            style={{ 
              maxWidth: '600px', 
              margin: '0 auto', 
              padding: '30px', 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: 'bold', 
                color: '#333',
                fontSize: '16px'
              }}>
                Category Name *
              </label>
              <input 
                type="text" 
                name="category" 
                value={category} 
                onChange={handleOnChange} 
                required
                placeholder="Enter category name"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '2px solid #ddd', 
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }} 
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: 'bold', 
                color: '#333',
                fontSize: '16px'
              }}>
                Category Image *
              </label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !category.trim() || !image}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: isLoading ? '#ccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              {isLoading ? 'Creating Category...' : 'Create Category'}
            </button>

            {message && (
              <div style={{
                marginTop: '15px',
                padding: '10px',
                borderRadius: '4px',
                backgroundColor: message.includes('Error') ? '#ffebee' : '#e8f5e8',
                color: message.includes('Error') ? '#c62828' : '#2e7d32',
                textAlign: 'center'
              }}>
                {message}
              </div>
            )}
          </form>

          {/* Show preview if there's category name or image */}
          {(category.trim() || imagePreview) && <CategoryPreview />}
        </div>
      </div>
    </>
    )
}
export default Categoryform