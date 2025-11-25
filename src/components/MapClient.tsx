// src/components/MapClient.tsx
import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import L, { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression, LatLngBoundsExpression } from "leaflet";
import ApartmentCardPopup from "./ApartmentCardPopup";
import React from "react";

// --- 1. CONFIGURATION ---
const MAP_WIDTH = 1920;
const MAP_HEIGHT = 1080;

const customIcon = new L.Icon({
  iconUrl: "/images/map/pointer.png",
  iconSize: [40, 40],
  iconAnchor: [20, 56],
  popupAnchor: [0, -50],
});

const pixelBounds: LatLngBoundsExpression = [
  [0, 0],
  [MAP_HEIGHT, MAP_WIDTH],
];

// --- 2. TYPES ---
interface Location {
  id: string | number;
  type: string;
  title: string;
  summary: string;
  coordinates: LatLngExpression;
  images: string[];
}

interface MapClientProps {
  locations: Location[];
}

// --- 3. COMPONENT ---
export default function MapClient({ locations }: MapClientProps) {
  const center: LatLngExpression = [MAP_HEIGHT / 2, MAP_WIDTH / 2];

  if (!locations.length) {
    return <p>No properties found to display on the map.</p>;
  }

  // Track which popup is currently open
  const markersRef = React.useRef<Map<string | number, L.Marker>>(new Map());

  const handleMarkerMouseOver = (markerId: string | number) => {
    const marker = markersRef.current.get(markerId);
    if (marker) {
      marker.openPopup();
    }
  };

  const handleMarkerMouseOut = (markerId: string | number) => {
    const marker = markersRef.current.get(markerId);
    if (marker) {
      // Add a small delay to allow moving to the popup
      setTimeout(() => {
        if (
          marker &&
          marker.getPopup() &&
          !marker.getPopup()?.getElement()?.matches(":hover")
        ) {
          marker.closePopup();
        }
      }, 100);
    }
  };

  // Remove the className from the outer div since we don't need map-wrapper anymore
  return (
    <div className="relative z-0">
      <MapContainer
        center={center}
        zoom={-1}
        minZoom={-2}
        maxZoom={4}
        crs={CRS.Simple}
        maxBounds={pixelBounds}
        maxBoundsViscosity={1.0}
        className="h-[600px] w-full shadow-2xl"
        style={{ background: "#fafafa" }}
        attributionControl={false}
      >
        <ImageOverlay url="/images/map/bolzano-map.png" bounds={pixelBounds} />

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={loc.coordinates}
            icon={customIcon}
            ref={(ref) => {
              if (ref) {
                markersRef.current.set(loc.id, ref as unknown as L.Marker);
              }
            }}
            eventHandlers={{
              mouseover: () => handleMarkerMouseOver(loc.id),
              mouseout: () => handleMarkerMouseOut(loc.id),
            }}
          >
            <Popup
              className="custom-dark-popup"
              closeButton={false}
              minWidth={300}
              autoPan={true} // ← The key change
              keepInView={true}
              autoPanPaddingTopLeft={[10, 10]}
              autoPanPaddingBottomRight={[10, 10]}
            >
              <div
                onMouseEnter={() => {
                  const marker = markersRef.current.get(loc.id);
                  if (marker) marker.openPopup();
                }}
                onMouseLeave={() => handleMarkerMouseOut(loc.id)}
              >
                <ApartmentCardPopup
                  title={loc.title}
                  address={loc.summary}
                  thumbnailUrl={loc.images[0] || ""}
                  bookingUrl={`/${loc.id}`}
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
