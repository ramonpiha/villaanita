// src/components/ApartmentCardPopup.tsx
import React from 'react';

interface PopupProps {
  title: string;
  address: string;
  thumbnailUrl: string;
  bookingUrl: string;
  lang: 'de' | 'it' | 'en'; // Add the language prop
}

const buttonText = {
  de: "Ansehen", // German: "View" or "Watch"
  it: "Guarda",   // Italian: "View" or "Watch"
  en: "View"     // English: "View" or "Watch"
};

export default function ApartmentCardPopup({ title, address, thumbnailUrl, bookingUrl, lang }: PopupProps) {
  return (
    <div className="flex flex-col font-sans overflow-hidden">
      {/* Room Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          onError={(e) => {
             const target = e.target as HTMLImageElement;
             target.src = "https://placehold.co/600x400?text=Image+Missing";
          }}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 bg-[rgb(27, 36, 48)]">
        <h3 className="text-base font-medium uppercase m-0 tracking-wider text-[#e6ae48] leading-tight">
          {title}
        </h3>
        
        <p className="text-gray-300 text-xs m-0 font-light leading-relaxed">
          {address}
        </p>

        <a
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="block w-full py-3 text-center text-sm font-bold tracking-widest transition-all duration-300 hover:opacity-90 hover:shadow-lg uppercase rounded-md mt-2"
          style={{ 
            backgroundColor: '#e6ae48',
            color: 'rgb(27, 36, 48)',
          }}
        >
          {buttonText[lang]}
        </a>
      </div>
    </div>
  );
}