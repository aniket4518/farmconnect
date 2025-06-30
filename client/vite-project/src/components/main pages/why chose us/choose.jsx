import React from 'react';

const WhyChooseUs = () => {
  // Benefits data
  const benefits = [
    {
      id: 1,
      title: "Direct from Farms",
      description: "We source our produce directly from local farmers, ensuring you get the freshest products without any middlemen.",
      iconPlaceholder: "🚜" // Replace with actual image later
    },
    {
      id: 2,
      title: "Fresh & Organic",
      description: "Our products are harvested at the peak of freshness and delivered to you within hours, preserving nutrients and taste.",
      iconPlaceholder: "🌱" // Replace with actual image later
    },
    {
      id: 3,
      title: "No Preservatives",
      description: "We ensure that our products are 100% natural with no artificial preservatives, colors, or flavors added.",
      iconPlaceholder: "🍃" // Replace with actual image later
    },
    {
      id: 4,
      title: "Best Quality",
      description: "Each product undergoes strict quality checks to ensure you receive only the best from our farms to your table.",
      iconPlaceholder: "✅" // Replace with actual image later
    },
    {
      id: 5,
      title: "Support Local Farmers",
      description: "By choosing FarmConnect, you directly support local farmers and contribute to sustainable agricultural practices.",
      iconPlaceholder: "👨‍🌾" // Replace with actual image later
    },
    {
      id: 6,
      title: "Eco-Friendly Packaging",
      description: "We use environmentally friendly packaging materials to reduce waste and our carbon footprint.",
      iconPlaceholder: "♻️" // Replace with actual image later
    }
  ];

  return (
    <div style={{
      padding: window.innerWidth <= 480 ? '40px 15px' : 
               window.innerWidth <= 768 ? '50px 20px' : '60px 30px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      margin: window.innerWidth <= 480 ? '40px 0' : '60px 0',
      width: '100%',
      boxSizing: 'border-box',
      maxWidth: '100vw'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#2e7d32',
        marginBottom: window.innerWidth <= 480 ? '30px' : '50px',
        fontSize: window.innerWidth <= 480 ? '28px' : 
                  window.innerWidth <= 768 ? '32px' : '38px',
        fontWeight: 'bold'
      }}>Why Choose FarmConnect</h2>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        marginBottom: window.innerWidth <= 480 ? '30px' : '40px'
      }}>
        {/* Central Image */}
        <div style={{
          width: window.innerWidth <= 480 ? '200px' : 
                 window.innerWidth <= 768 ? '240px' : '280px',
          height: window.innerWidth <= 480 ? '200px' : 
                  window.innerWidth <= 768 ? '240px' : '280px',
          borderRadius: '50%',
          backgroundColor: '#e8f5e9',
          border: '5px solid #2e7d32',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: window.innerWidth <= 480 ? '30px' : '40px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
          zIndex: 2
        }}>
          <div style={{ fontSize: window.innerWidth <= 480 ? '60px' : '90px' }}>🌾</div>
          <p style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            margin: 0,
            fontSize: window.innerWidth <= 480 ? '16px' : 
                     window.innerWidth <= 768 ? '20px' : '22px',
            fontWeight: 'bold',
            color: '#2e7d32',
            textAlign: 'center'
          }}>Farm Connect</p>
        </div>
        
        {/* Benefits arranged around image */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 480 ? '1fr' : 
                              window.innerWidth <= 768 ? 'repeat(2, 1fr)' : 
                              'repeat(3, 1fr)',
          gap: window.innerWidth <= 480 ? '20px' : '30px',
          width: '100%',
          maxWidth: '1200px'
        }}>
          {benefits.map(benefit => (
            <div key={benefit.id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: window.innerWidth <= 480 ? '20px' : '30px',
              boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'default',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: window.innerWidth <= 480 ? '200px' : '250px'
            }}
            onMouseOver={(e) => {
              if (window.innerWidth > 768) {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.15)';
              }
            }}
            onMouseOut={(e) => {
              if (window.innerWidth > 768) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
              }
            }}
            >
              <div style={{
                fontSize: window.innerWidth <= 480 ? '36px' : '48px',
                marginBottom: '20px',
                width: window.innerWidth <= 480 ? '80px' : '100px',
                height: window.innerWidth <= 480 ? '80px' : '100px',
                borderRadius: '50%',
                backgroundColor: '#e8f5e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #2e7d32'
              }}>
                {benefit.iconPlaceholder}
              </div>
              
              <h3 style={{
                margin: '15px 0',
                color: '#2e7d32',
                fontSize: window.innerWidth <= 480 ? '18px' : '22px',
                textAlign: 'center'
              }}>
                {benefit.title}
              </h3>
              
              <p style={{
                color: '#555',
                textAlign: 'center',
                fontSize: window.innerWidth <= 480 ? '14px' : '16px',
                lineHeight: '1.7'
              }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{
        textAlign: 'center',
        marginTop: window.innerWidth <= 480 ? '40px' : '60px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <p style={{
          fontSize: window.innerWidth <= 480 ? '16px' : '20px',
          color: '#444',
          maxWidth: '900px',
          margin: '0 auto',
          lineHeight: '1.8'
        }}>
          Experience the difference with FarmConnect - where quality meets sustainability.
          Join thousands of satisfied customers who have made the switch to healthier, farm-fresh products.
        </p>
      </div>
    </div>
  );
};

export default WhyChooseUs;
