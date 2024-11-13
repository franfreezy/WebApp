import React, { useState } from "react";

const FareRateManagementPage = () => {
  const [routes, setRoutes] = useState([
    {
      id: "route1",
      name: "Route A",
      fareRate: 10.0,
      effectiveDate: "2024-11-01T09:00",
    },
    {
      id: "route2",
      name: "Route B",
      fareRate: 15.0,
      effectiveDate: "2024-11-01T09:00",
    },
    {
      id: "route3",
      name: "Route C",
      fareRate: 20.0,
      effectiveDate: "2024-11-01T09:00",
    },
  ]);

  const [newFareRate, setNewFareRate] = useState({
    fareRate: "",
    effectiveDate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const handleFareRateChange = (e) => {
    const { name, value } = e.target;
    setNewFareRate({ ...newFareRate, [name]: value });
  };

  const updateFareRate = () => {
    setRoutes(
      routes.map((route) =>
        route.id === selectedRouteId
          ? {
              ...route,
              fareRate: newFareRate.fareRate,
              effectiveDate: newFareRate.effectiveDate,
            }
          : route
      )
    );
    setIsModalOpen(false);
    setNewFareRate({ fareRate: "", effectiveDate: "" });
    setSelectedRouteId(null);
  };

  const openModal = (route) => {
    setSelectedRouteId(route.id);
    setNewFareRate({
      fareRate: route.fareRate,
      effectiveDate: route.effectiveDate,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewFareRate({ fareRate: "", effectiveDate: "" });
    setSelectedRouteId(null);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h2 className="text-4xl font-bold text-center mb-8 text-shadow-md">
        Fare Rate Management
      </h2>

      {/* Fare Overview Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">
          Current Fare Rates
        </h3>
        <table className="min-w-full table-auto bg-white text-gray-800">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="px-6 py-3 text-left">Route</th>
              <th className="px-6 py-3 text-left">Current Fare Rate</th>
              <th className="px-6 py-3 text-left">Effective Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr
                key={route.id}
                className="border-b hover:bg-blue-100 transition-all duration-300"
              >
                <td className="px-6 py-4">{route.name}</td>
                <td className="px-6 py-4">
                  ${parseFloat(route.fareRate).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  {new Date(route.effectiveDate).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openModal(route)}
                    className="text-yellow-500 hover:text-yellow-700 transform hover:scale-110 transition-all duration-300"
                  >
                    Modify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modify Fare Rate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">
              Modify Fare Rate for{" "}
              {routes.find((route) => route.id === selectedRouteId)?.name}
            </h3>
            <form>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800">
                  New Fare Rate ($)
                </label>
                <input
                  type="number"
                  name="fareRate"
                  value={newFareRate.fareRate}
                  onChange={handleFareRateChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800">
                  Effective Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="effectiveDate"
                  value={newFareRate.effectiveDate}
                  onChange={handleFareRateChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={updateFareRate}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
                >
                  Update Fare Rate
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FareRateManagementPage;
