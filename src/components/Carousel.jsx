import React, { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % images.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="carousel">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className={`carousel-image ${index === currentImageIndex ? 'carousel-image-active' : ''}`}
        />
      ))}
    </div>
  );
};

export default Carousel;