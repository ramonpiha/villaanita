import React, { useState, useEffect } from "react"; // Added useEffect

interface Slide {
  src: string;
  alt?: string;
}

interface SliderProps {
  slides?: Slide[];
}

const Slider: React.FC<SliderProps> = ({ slides = [] }) => {
  const [current, setCurrent] = useState<number>(0);

  // Function to move to next slide
  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!slides || slides.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 2000); // 2000ms = 2 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [current, slides.length]); // Restarts timer if user manually clicks next/prev

  if (!slides || slides.length === 0) {
    return null;
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full aspect-[20/11] overflow-hidden rounded-lg shadow-xl bg-gray-100">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.src}
            alt={slide.alt || `Slide ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 z-10 transition-colors"
        aria-label="Previous slide"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 z-10 transition-colors"
        aria-label="Next slide"
      >
        &gt;
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === current ? "bg-white w-4" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
