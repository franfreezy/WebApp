import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";

// Replace with your actual Mapbox token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const BusTrackingMap = () => {
  const [busData, setBusData] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [map, setMap] = useState(null); // Store map instance
  const [selectedMarker, setSelectedMarker] = useState(null); // Store selected bus marker

  useEffect(() => {
    const fetchBusData = async () => {
      const sampleBusData = [
        {
          id: 1,
          route: "Route A",
          latitude: 40.7128,
          longitude: -74.006,
          speed: 50,
          status: "active",
          nextStop: "Stop 5",
        },
        {
          id: 2,
          route: "Route B",
          latitude: 40.73061,
          longitude: -73.935242,
          speed: 40,
          status: "inactive",
          nextStop: "Stop 3",
        },
        {
          id: 3,
          route: "Route C",
          latitude: 40.758,
          longitude: -73.9855,
          speed: 45,
          status: "active",
          nextStop: "Stop 1",
        },
      ];
      setBusData(sampleBusData);
    };

    fetchBusData();
  }, []);

  useEffect(() => {
    if (busData.length > 0) {
      initMap();
    }
  }, [busData]);

  const initMap = () => {
    const mapInstance = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006, 40.7128], // New York center
      zoom: 13, // Closer initial zoom level
    });

    mapInstance.on("load", () => {
      const bounds = new mapboxgl.LngLatBounds();

      busData.forEach((bus) => {
        const busMarker = document.createElement("div");
        busMarker.style.backgroundColor = "blue"; // Blue background
        busMarker.style.width = "50px"; // Larger size
        busMarker.style.height = "50px"; // Larger size
        busMarker.style.borderRadius = "50%"; // Make it circular
        busMarker.style.zIndex = "10"; // Ensure marker is visible above other elements

        const marker = new mapboxgl.Marker(busMarker)
          .setLngLat([bus.longitude, bus.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div style="color: black;">
                <strong>Bus ID:</strong> ${bus.id}<br>
                <strong>Route:</strong> ${bus.route}<br>
                <strong>Speed:</strong> ${bus.speed} km/h
              </div>
            `)
          )
          .addTo(mapInstance)
          .getElement()
          .addEventListener("click", () => setSelectedBus(bus));

        bounds.extend([bus.longitude, bus.latitude]);
      });

      mapInstance.fitBounds(bounds, { padding: 50 });
    });

    setMap(mapInstance); // Save map instance
  };

  const handleBusSelect = (e) => {
    const selectedBusId = e.target.value;
    const bus = busData.find((bus) => bus.id === Number(selectedBusId));
    if (bus) {
      setSelectedBus(bus);
      map.flyTo({ center: [bus.longitude, bus.latitude], zoom: 14 }); // Adjust zoom if needed
      addPingEffect(bus);
    }
  };

  // Add ping effect on the selected bus
  const addPingEffect = (bus) => {
    if (selectedMarker) {
      selectedMarker.remove(); // Remove the previous selected marker
    }

    const busMarker = document.createElement("div");
    busMarker.style.backgroundColor = "blue"; // Blue background
    busMarker.style.width = "50px"; // Larger size
    busMarker.style.height = "50px"; // Larger size
    busMarker.style.borderRadius = "50%"; // Circular shape
    busMarker.style.animation = "ping 1s ease-out infinite"; // Apply ping animation

    const marker = new mapboxgl.Marker(busMarker)
      .setLngLat([bus.longitude, bus.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="color: black;">
            <strong>Bus ID:</strong> ${bus.id}<br>
            <strong>Route:</strong> ${bus.route}<br>
            <strong>Speed:</strong> ${bus.speed} km/h
          </div>
        `)
      )
      .addTo(map);

    setSelectedMarker(marker);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Map Container */}
      <div id="map" style={{ width: "70%", height: "100%" }}></div>

      {/* Sidebar for Bus Details and Bus Selector */}
      <div
        style={{
          width: "30%",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          overflowY: "auto",
        }}
        className="text-gray-800"
      >
        <h3>Bus Details</h3>
        {selectedBus ? (
          <div>
            <p>
              <strong>Bus ID:</strong> {selectedBus.id}
            </p>
            <p>
              <strong>Route:</strong> {selectedBus.route}
            </p>
            <p>
              <strong>Current Speed:</strong> {selectedBus.speed} km/h
            </p>
            <p>
              <strong>Next Stop:</strong> {selectedBus.nextStop}
            </p>
            <p>
              <strong>Status:</strong> {selectedBus.status}
            </p>
          </div>
        ) : (
          <p>Select a bus marker or choose from the list to view details.</p>
        )}

        <h3>Select a Bus</h3>
        <select
          onChange={handleBusSelect}
          style={{ width: "100%", padding: "8px" }}
        >
          <option value="">-- Select Bus --</option>
          {busData.map((bus) => (
            <option key={bus.id} value={bus.id}>
              {bus.route} (Bus ID: {bus.id})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BusTrackingMap;
