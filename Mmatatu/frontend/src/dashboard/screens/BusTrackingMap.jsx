import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const BusTrackingMap = () => {
  const [fares, setFares] = useState([]); // State to store fares data
  const [map, setMap] = useState(null); // Map instance
  const [selectedRoute, setSelectedRoute] = useState(null); // Selected route for zooming

  // Function to geocode a location name into coordinates
  const geocodeLocation = async (location) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location
      )}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      return data.features[0].geometry.coordinates; // [lng, lat]
    }
    throw new Error(`Geocoding failed for ${location}`);
  };

  // Function to fetch route directions
  const fetchRouteDirections = async (start, end) => {
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(",")};${end.join(",")}?geometries=geojson&access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      return data.routes[0].geometry.coordinates; // Route coordinates
    }
    throw new Error(`Failed to fetch route between ${start} and ${end}`);
  };

  // Generate a random color
  const generateRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  useEffect(() => {
    // Fetch fares data from the backend
    const fetchFares = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/backend/fares/');
        const data = await response.json();
        setFares(data.fares || []);
      } catch (error) {
        console.error("Error fetching fares:", error);
      }
    };

    fetchFares();
  }, []);

  useEffect(() => {
    // Initialize the map
    const mapInstance = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [36.9445, -1.1631], // Center between Nairobi and Thika
      zoom: 10,
    });

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (map && fares.length > 0) {
      const addRouteMarkers = async () => {
        for (const fare of fares) {
          try {
            // Geocode the start and end locations
            const startCoordinates = await geocodeLocation(fare.route_start);
            const endCoordinates = await geocodeLocation(fare.route_end);

            // Fetch the route that follows roads
            const routeCoordinates = await fetchRouteDirections(
              startCoordinates,
              endCoordinates
            );

            // Generate random colors for the route and markers
            const routeColor = generateRandomColor();
            const startMarkerColor = generateRandomColor();
            const endMarkerColor = generateRandomColor();

            // Add markers for start and end locations
            new mapboxgl.Marker({ color: startMarkerColor }) // Start marker
              .setLngLat(startCoordinates)
              .setPopup(new mapboxgl.Popup().setText(`Start: ${fare.route_start}`))
              .addTo(map);

            new mapboxgl.Marker({ color: endMarkerColor }) // End marker
              .setLngLat(endCoordinates)
              .setPopup(new mapboxgl.Popup().setText(`End: ${fare.route_end}`))
              .addTo(map);

            // Draw the route line
            map.addSource(`route-${fare.route_id}`, {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: routeCoordinates,
                },
              },
            });

            map.addLayer({
              id: `route-${fare.route_id}`,
              type: 'line',
              source: `route-${fare.route_id}`,
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': routeColor, // Random line color
                'line-width': 3,
              },
            });
          } catch (error) {
            console.error(`Error processing route ${fare.route_id}:`, error);
          }
        }
      };

      addRouteMarkers();
    }
  }, [map, fares]);

  const handleRouteSelection = (route) => {
    setSelectedRoute(route);

    // Geocode the start and end locations for zooming
    const zoomRoute = async () => {
      try {
        const startCoordinates = await geocodeLocation(route.route_start);
        const endCoordinates = await geocodeLocation(route.route_end);
        const routeCoordinates = await fetchRouteDirections(startCoordinates, endCoordinates);

        // Get the bounds of the selected route
        const bounds = new mapboxgl.LngLatBounds();
        routeCoordinates.forEach(coord => bounds.extend(coord));

        // Zoom the map to the bounds of the selected route
        map.fitBounds(bounds, { padding: 50 });

        // Clear all previous layers (so only the selected route is shown)
        const allLayers = map.getStyle().layers;
        allLayers.forEach(layer => {
          if (layer.id.startsWith("route-")) {
            map.removeLayer(layer.id);
            map.removeSource(layer.id);
          }
        });

        // Add the selected route again with its own random color
        const routeColor = generateRandomColor();
        map.addSource(`route-${route.route_id}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: routeCoordinates,
            },
          },
        });

        map.addLayer({
          id: `route-${route.route_id}`,
          type: 'line',
          source: `route-${route.route_id}`,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': routeColor, // Random line color
            'line-width': 3,
          },
        });
      } catch (error) {
        console.error(`Error zooming to route ${route.route_id}:`, error);
      }
    };

    zoomRoute();
  };

  return (
    <div>
      {/* Dropdown button */}
      <select onChange={(e) => handleRouteSelection(fares.find(fare => fare.route_id === e.target.value))}>
        <option value="">Select a route</option>
        {fares.map(fare => (
          <option key={fare.route_id} value={fare.route_id}>
            {`${fare.route_start} to ${fare.route_end}`}
          </option>
        ))}
      </select>

      {/* Map container */}
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default BusTrackingMap;
