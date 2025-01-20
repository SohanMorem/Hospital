import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const SlideImage = () => {
  const slides = [
    `${assets.hospitalLogo}`,
    `${assets.hospitalSlide1}`,
    `${assets.hospitalSlide2}`,
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full h-[65vh] flex items-center mb-[20px] justify-center bg-gray-100">
      <div className="relative w-full max-w-5xl overflow-hidden">
        {/* Slider */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full">
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full md:h-96 "
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() =>
            setCurrentSlide(
              (currentSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 md:p-4"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 md:p-4"
        >
          ❯
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentSlide ? "bg-blue-500" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideImage;
