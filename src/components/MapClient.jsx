import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapClient({ locations }) {
  const center = locations.length ? locations[0].coordinates : [46.5, 11.34];
  return (
    // Use Tailwind classes for height
    <MapContainer center={center} zoom={13} className="h-80 w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map(loc => (
        <Marker key={loc.id} position={loc.coordinates}>
          <Popup>
            <strong>{loc.title}</strong><br/>
            {loc.summary}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}