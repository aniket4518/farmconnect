import fruitImage from '../../../assets/images/fruit.jpg';
import vegitablesImage from '../../../assets/images/vegitable.jpg';
import React, { useState, useEffect } from 'react';
import CategoriesSection from '../category/Categories';
import './homepage.css'
import WhyChooseUs from '../why chose us/choose';
import About from '../about/about';
 
const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { 
      id: 1,
      image:  "sa",
      title: "Fresh Farm Produce",
      description: "Directly from farmers to your doorstep"
    },
    {
      id: 2,
      image: vegitablesImage,
      title: "Organic Vegetables",
      description: "Healthy options for your family"
    },
    {
      id: 3,
      image: fruitImage,
      title: "Seasonal Fruits",
      description: "Always fresh, always in season"
    },
    {
      id: 4,
      image: "LocalFarmers",
      title: "Support Local Farmers",
      description: "Communities thrive when you buy local"
    }
  ];

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);  

    return () => clearInterval(interval);
  }, [slides.length]);

  // Navigation functions
  const goToNextSlide = () => {
    setCurrentSlide(prevSlide => 
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentSlide(prevSlide => 
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="homepage-container">
      {/* Slideshow */}
      <div className="slideshow-container" style={{ height: '500px' }}>
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ height: '100%' }}
          >
            <div className="slide-image" style={{ backgroundImage: `url(${slide.image})`, height: '100%' }}></div>
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
        
        {/* Navigation arrows */}
        <button className="slide-arrow prev" onClick={goToPrevSlide}>&#10094;</button>
        <button className="slide-arrow next" onClick={goToNextSlide}>&#10095;</button>
        
        {/* Slide indicators */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={`indicator ${index === currentSlide ? 'active' : ''}`} 
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
      
      {/* Rest of your homepage content would go below */}
      <div className="homepage-content">
        {/* Your other homepage sections like featured products, categories, etc. */}
        <CategoriesSection/> 
        <WhyChooseUs/>
        <About/>
      </div>
    </div>
  );
};

export default Homepage;
