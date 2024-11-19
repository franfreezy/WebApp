import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function RouteMap() {
  const position = [51.505, -0.09]; // Example position
  const stops = [
    { id: 1, position: [51.515, -0.1], name: "Stop 1" },
    { id: 2, position: [51.525, -0.08], name: "Stop 2" },
  ];

  return (
    <MapContainer center={position} zoom={13} className="h-96 rounded shadow">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position}>
        <Popup>Your Current Location</Popup>
      </Marker>
      {stops.map((stop) => (
        <Marker key={stop.id} position={stop.position}>
          <Popup>{stop.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
