import React from 'react';

const About = () => {
  return (
    <div style={{
      padding: '50px 20px',
      width: '100%',
      boxSizing: 'border-box',
      maxWidth: '100vw',
      margin: '0 auto',
      color: '#333'
    }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '50px'
      }}>
        <h1 style={{
          fontSize: '42px',
          color: '#2e7d32',
          marginBottom: '20px'
        }}>About FarmConnect</h1>
        
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          Bridging the gap between farmers and consumers through sustainable and ethical practices.
        </p>
      </div>

      {/* Our Story Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        marginBottom: '60px'
      }}>
        <h2 style={{
          fontSize: '32px',
          color: '#2e7d32',
          borderBottom: '2px solid #2e7d32',
          paddingBottom: '10px'
        }}>Our Story</h2>
        
        <div style={{
          backgroundColor: '#f9f9f9',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '20px' }}>
            FarmConnect was founded in 2023 with a simple yet powerful vision: to create a sustainable ecosystem where farmers receive fair compensation for their hard work, and consumers gain access to fresh, high-quality produce directly from the source.
          </p>
          
          <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '20px' }}>
            We started as a small team of agricultural enthusiasts who recognized the growing disconnect between those who grow our food and those who consume it. We witnessed the challenges faced by local farmers competing with large industrial operations and saw consumers increasingly seeking healthier, more transparent food sources.
          </p>
          
          <p style={{ fontSize: '17px', lineHeight: '1.8' }}>
            Today, FarmConnect has grown into a thriving platform connecting thousands of farmers with conscious consumers across the country, while maintaining our core values of sustainability, community support, and transparency.
          </p>
        </div>
      </div>

      {/* Mission & Values Section */}
      <div style={{
        marginBottom: '60px'
      }}>
        <h2 style={{
          fontSize: '32px',
          color: '#2e7d32',
          borderBottom: '2px solid #2e7d32',
          paddingBottom: '10px',
          marginBottom: '30px'
        }}>Our Mission & Values</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}>
            <h3 style={{ fontSize: '22px', color: '#2e7d32', marginBottom: '15px' }}>Mission</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.7' }}>
              To revolutionize the agriculture supply chain by eliminating unnecessary intermediaries, ensuring farmers receive fair compensation, and providing consumers with access to fresh, sustainably grown produce.
            </p>
          </div>

          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}>
            <h3 style={{ fontSize: '22px', color: '#2e7d32', marginBottom: '15px' }}>Vision</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.7' }}>
              A world where sustainable farming is the norm, where farmers thrive economically, and where every consumer has access to nutritious, transparently sourced food regardless of geographic or economic barriers.
            </p>
          </div>

          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}>
            <h3 style={{ fontSize: '22px', color: '#2e7d32', marginBottom: '15px' }}>Values</h3>
            <ul style={{ fontSize: '16px', lineHeight: '1.7', paddingLeft: '20px' }}>
              <li><strong>Sustainability</strong>: Promoting environmentally responsible farming practices</li>
              <li><strong>Transparency</strong>: Full disclosure of farming methods and supply chain</li>
              <li><strong>Fairness</strong>: Ensuring equitable compensation for farmers</li>
              {/* <li><strong>Community</strong>: Supporting local economies and agricultural communities</li>
              <li><strong>Quality</strong>: Never compromising on the freshness and nutritional value of our products</li> */}
            </ul>
          </div>
        </div>
      </div>

      {/* Our Impact Section */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{
          fontSize: '32px',
          color: '#2e7d32',
          borderBottom: '2px solid #2e7d32',
          paddingBottom: '10px',
          marginBottom: '30px'
        }}>Our Impact</h2>
        
        <div style={{
          backgroundColor: '#f9f9f9',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <div>
              <div style={{ fontSize: '42px', color: '#2e7d32', fontWeight: 'bold' }}>1000+</div>
              <p>Farmers Supported</p>
            </div>
            <div>
              <div style={{ fontSize: '42px', color: '#2e7d32', fontWeight: 'bold' }}>5000+</div>
              <p>Happy Customers</p>
            </div>
            <div>
              <div style={{ fontSize: '42px', color: '#2e7d32', fontWeight: 'bold' }}>30%</div>
              <p>Average Increase in Farmer Income</p>
            </div>
            <div>
              <div style={{ fontSize: '42px', color: '#2e7d32', fontWeight: 'bold' }}>40+</div>
              <p>Communities Served</p>
            </div>
          </div>
          
          <p style={{ fontSize: '17px', lineHeight: '1.8' }}>
            At FarmConnect, we measure our success not just in profits, but in the positive changes we bring to agricultural communities and consumer health. By creating a more direct path from farm to table, we've helped increase farmer incomes while reducing food costs for consumers. Our platform has also contributed to reducing food waste and transportation emissions by shortening the supply chain.
          </p>
        </div>
      </div>

      {/* Join Us Section */}
      <div style={{
        backgroundColor: '#e8f5e9',
        padding: '40px',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '32px', color: '#2e7d32', marginBottom: '20px' }}>Join the FarmConnect Movement</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.7', maxWidth: '800px', margin: '0 auto 30px' }}>
          Whether you're a farmer looking for fair market access, a consumer seeking fresh produce, or someone passionate about sustainable agriculture, there's a place for you in our community.
        </p>
        <button style={{
          backgroundColor: '#2e7d32',
          color: 'white',
          border: 'none',
          padding: '12px 25px',
          fontSize: '18px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default About;
