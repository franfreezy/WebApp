import { useState, useEffect } from "react";

export default function ControlPanel({ setSelectedRoute }) {
  const [fares, setFares] = useState([]);
  const [isRouteDropdownVisible, setIsRouteDropdownVisible] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [localSelectedRoute, setLocalSelectedRoute] = useState(null); // Renamed to avoid conflict

  // Fetch fares from the backend
  const fetchFares = async () => {
    try {
      const response = await fetch(
        "https://matatuback.onrender.com/backend/fares/"
      );
      const data = await response.json();
      setFares(data.fares || []);
    } catch (error) {
      console.error("Error fetching fares:", error);
    }
  };

  useEffect(() => {
    fetchFares();
  }, []);

  // Handle route selection
  const handleRouteSelection = (routeId) => {
    const selected = fares.find((fare) => fare.route_id === routeId);
    if (selected) {
      setLocalSelectedRoute(selected); // Update the local state
      setSelectedRoute(selected); // Update the parent state with selected route
      setSelectedRouteId(routeId); // Store the selected route id
      setIsRouteDropdownVisible(false); // Hide the route dropdown after selecting a route
    }
  };

  // End the route
  const endRoute = () => {
    setLocalSelectedRoute(null); // End the route by resetting the selected route
    setSelectedRouteId(null); // Reset the selected route ID
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl max-w-xl mx-auto">
      <div className="flex space-x-6 mb-6 justify-center">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-200"
          onClick={() => setIsRouteDropdownVisible(true)}
          disabled={selectedRouteId !== null} // Disable when a route is selected
        >
          Start Route
        </button>

        <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition ease-in-out duration-200">
          Emergency Contact
        </button>

        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition ease-in-out duration-200"
          onClick={endRoute}
          disabled={selectedRouteId === null} // Disable when no route is selected
        >
          End Route
        </button>
      </div>

      {isRouteDropdownVisible && fares.length > 0 && (
        <div className="w-full mb-6">
          <select
            onChange={(e) => handleRouteSelection(e.target.value)}
            value={selectedRouteId || ""} // Set the value of the select dropdown to the selected route
            className="border p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a route</option>
            {fares.map((fare) => (
              <option key={fare.route_id} value={fare.route_id}>
                {`${fare.route_start} to ${fare.route_end}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Check if localSelectedRoute is not null before rendering the route details */}
      {localSelectedRoute && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-black">
            Selected Route Details
          </h3>
          <p>
            <strong className="text-black">Start:</strong>{" "}
            <span className="text-black">{localSelectedRoute.route_start}</span>
          </p>
          <p>
            <strong className="text-black">End:</strong>{" "}
            <span className="text-black">{localSelectedRoute.route_end}</span>
          </p>
          <p>
            <strong className="text-black">Rate:</strong>{" "}
            <span className="text-black">Ksh. {localSelectedRoute.Rate}</span>
          </p>
        </div>
      )}
    </div>
  );
}
