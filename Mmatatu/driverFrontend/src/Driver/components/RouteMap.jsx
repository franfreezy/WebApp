import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import the icons directly as ES Modules
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for Leaflet's default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function FitBounds({ bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] }); // Add padding for better visibility
    }
  }, [bounds, map]);

  return null;
}

export default function RouteMap({ selectedRoute }) {
  const [markers, setMarkers] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [bounds, setBounds] = useState([]);
  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  useEffect(() => {
    const fetchCoordinates = async (place) => {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          place
        )}.json?access_token=${mapboxAccessToken}`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        return data.features[0].center; 
      }
      return null; 
    };

    const fetchRoute = async (coordinates) => {
      const waypoints = coordinates.map((coord) => coord.join(",")).join(";");
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${waypoints}?geometries=geojson&access_token=${mapboxAccessToken}`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        return data.routes[0].geometry.coordinates; // [longitude, latitude] (no reverse here)
      }
      return [];
    };

    const getMarkersAndRoute = async () => {
      if (selectedRoute) {
        const stops = [];
        const coordinates = [];

        // Fetch coordinates for route_start
        if (selectedRoute.route_start) {
          const startCoordinates = await fetchCoordinates(selectedRoute.route_start);
          if (startCoordinates) {
            stops.push({
              id: "start",
              position: [startCoordinates[1], startCoordinates[0]], 
              name: selectedRoute.route_start,
            });
            coordinates.push(startCoordinates);
          }
        }

        // Fetch coordinates for route_end
        if (selectedRoute.route_end) {
          const endCoordinates = await fetchCoordinates(selectedRoute.route_end);
          if (endCoordinates) {
            stops.push({
              id: "end",
              position: [endCoordinates[1], endCoordinates[0]], 
              name: selectedRoute.route_end,
            });
            coordinates.push(endCoordinates);
          }
        }

        setMarkers(stops);

        // Fetch the route connecting the coordinates
        if (coordinates.length > 1) {
          const route = await fetchRoute(coordinates);
          setRouteCoordinates(route.map((coord) => [coord[1], coord[0]])); // Reverse for Leaflet

          // Calculate bounds for the map
          const allPoints = [
            ...coordinates.map((coord) => [coord[1], coord[0]]), // Reverse for Leaflet
            ...route.map((coord) => [coord[1], coord[0]]),
          ];
          setBounds(allPoints);
        }
      }
    };

    getMarkersAndRoute();
  }, [selectedRoute, mapboxAccessToken]);

  return (
    <MapContainer
      center={[-1.0045, 37.028]} // Default center
      zoom={13}
      className="h-[80vh] w-full rounded shadow-lg"
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
        attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Adjust the view to fit bounds */}
      <FitBounds bounds={bounds} />

      {/* Render markers for route_start and route_end */}
      {markers.map((stop) => (
        <Marker key={stop.id} position={stop.position}>
          <Popup>{stop.name}</Popup>
        </Marker>
      ))}

      {/* Draw a polyline connecting the markers */}
      {routeCoordinates.length > 0 && <Polyline positions={routeCoordinates} color="blue" />}
    </MapContainer>
  );
}
