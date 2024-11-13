import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";

// Replace with your actual Mapbox token
// mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const BusTrackingMap = () => {
  const [busData, setBusData] = useState([]);

  useEffect(() => {
    // Hardcoded sample bus data
    const sampleBusData = [
      {
        id: 1,
        route: "Route A",
        latitude: 40.7128,
        longitude: -74.006,
        speed: 50,
      },
      {
        id: 2,
        route: "Route B",
        latitude: 40.73061,
        longitude: -73.935242,
        speed: 40,
      },
      {
        id: 3,
        route: "Route A",
        latitude: 40.758,
        longitude: -73.9855,
        speed: 45,
      },
    ];

    setBusData(sampleBusData);
  }, []);

  useEffect(() => {
    if (busData.length > 0) {
      initMap();
    }
  }, [busData]);

  const initMap = () => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006, 40.7128], // Initial center (e.g., New York)
      zoom: 12,
    });

    map.on("load", () => {
      busData.forEach((bus) => {
        // Create custom marker for each bus
        const busMarker = document.createElement("div");
        busMarker.style.backgroundImage = "url('/bus-icon.png')";
        busMarker.style.width = "30px";
        busMarker.style.height = "30px";
        busMarker.style.backgroundSize = "cover";

        // Add marker and popup for each bus
        new mapboxgl.Marker(busMarker)
          .setLngLat([bus.longitude, bus.latitude])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <strong>Bus ID:</strong> ${bus.id}<br>
              <strong>Route:</strong> ${bus.route}<br>
              <strong>Speed:</strong> ${bus.speed} km/h
            `)
          )
          .addTo(map);

        // Draw circle to show range
        const center = [bus.longitude, bus.latitude];
        const circle = turf.circle(center, 0.5, { units: "kilometers" });

        map.addSource(`circle-${bus.id}`, { type: "geojson", data: circle });
        map.addLayer({
          id: `circle-fill-${bus.id}`,
          type: "fill",
          source: `circle-${bus.id}`,
          paint: {
            "fill-color": "#FF4500",
            "fill-opacity": 0.25,
          },
        });
      });

      map.on("zoom", () => {
        const zoomLevel = map.getZoom();
        busData.forEach((bus) => {
          const center = [bus.longitude, bus.latitude];
          const updatedCircle = turf.circle(
            center,
            zoomLevel < 14 ? 0.3 : 0.5,
            {
              units: "kilometers",
            }
          );
          map.getSource(`circle-${bus.id}`).setData(updatedCircle);
        });
      });
    });
  };

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default BusTrackingMap;
