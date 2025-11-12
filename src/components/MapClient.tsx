import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

interface Location {
  id: string | number;
  coordinates: LatLngExpression;
  title: string;
  summary: string;
}

interface MapClientProps {
  locations: Location[];
}

export default function MapClient({ locations }: MapClientProps) {
  const center: LatLngExpression = locations.length ? locations[0].coordinates : [46.5, 11.34];
  
  return (
    <MapContainer center={center} zoom={13} className="h-80 w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map(loc => (
        <Marker key={loc.id} position={loc.coordinates}>
          <Popup>
            <strong>{loc.title}</strong><br />
            {loc.summary}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}