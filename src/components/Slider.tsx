import React, { useState } from 'react';

// Define the type for a single slide object
interface Slide {
  src: string;
}

// Define the type for the component props
interface SliderProps {
  slides?: Slide[]; // Optional array of slides
}

// Placeholder slide data using the Slide interface
const SLIDE_DATA: Slide[] = [
  {
    src: '/home/LR-Marlene-apartment©Luca-Guadagnini-_Y0A3267.avif', // Placeholder image path
  },
  {
    src: '/home/LR-panda-bike-rooms-apartments-bz-_MG_2938-1280px.avif',
  },
  {
    src: '/home/villa-anita-bolzano-rooms-apartments-00061-scaled.avif',
  },
];

const Slider: React.FC<SliderProps> = ({ slides = SLIDE_DATA }) => {
  // Use <number> with useState to explicitly define the state type
  const [current, setCurrent] = useState<number>(0); 

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.src}
            className="h-full w-full object-cover"
          />
          {/* Optional: Caption/Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
            <p className="text-white text-lg font-semibold">
              {slide.alt}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 z-10"
        aria-label="Previous slide"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 z-10"
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
            className={`h-3 w-3 rounded-full transition-colors ${
              index === current ? 'bg-white' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;