import { useState } from "react";
export default function GalleryClient({ images }) {
  const [active, setActive] = useState(null);
  return (
    <div>
      {/* Increased gap and padding */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            loading="lazy"
            className="rounded-lg shadow-md cursor-pointer aspect-square object-cover
                       transition-transform duration-300 ease-in-out hover:scale-105" // Added hover effect
            onClick={() => setActive(src)}
          />
        ))}
      </div>
      {active && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50" // Added z-50
          onClick={() => setActive(null)}
        >
          <img src={active} className="max-h-[90vh] rounded-lg shadow-xl" />
        </div>
      )}
    </div>
  );
}