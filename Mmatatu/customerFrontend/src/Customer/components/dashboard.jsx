import BalanceCard from "./BalanceCard";
import NotificationPanel from "./NotificationPanel";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const Dash = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Prevent multiple map initializations
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // Map container
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: [36.8219, -1.2921], // Longitude, Latitude
      zoom: 12, // Initial zoom level
    });
  }, []);

  return (
    <section className="relative h-[calc(100vh-72px)] w-full overflow-hidden">
      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0 h-full w-full z-0" />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col gap-4 p-4 w-1/4">
        <BalanceCard />
        <NotificationPanel />
      </div>
    </section>
  );
};

export default Dash;
