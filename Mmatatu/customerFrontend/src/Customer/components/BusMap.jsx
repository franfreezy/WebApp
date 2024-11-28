import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function BusMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // If the map is already initialized, do nothing

    map.current = new mapboxgl.Map({
      container: mapContainer.current, // Container for the map
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: [36.8219, -1.2921], // Longitude, Latitude
      zoom: 12, // Initial zoom level
    });
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-72px)] overflow-hidden">
      <div ref={mapContainer} className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
}
