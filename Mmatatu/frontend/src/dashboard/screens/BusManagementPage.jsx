import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const BusManagementPage = () => {
  const [buses, setBuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddBusModal, setShowAddBusModal] = useState(false);
  const [showEditBusModal, setShowEditBusModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [busToEdit, setBusToEdit] = useState(null);
  const [newBus, setNewBus] = useState({
    routeStart: "",
    routeEnd: "",
    status: "Active",
    capacity: "",
    passengerCount: 0,
  });

  // Fetch buses from backend
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get("https://mmatatubackend.onrender.com/backend/buses/"); // Update with your backend endpoint
        setBuses(response.data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };

    fetchBuses();
  }, []);

  const handleNewBusChange = (e) => {
    const { name, value } = e.target;
    setNewBus({ ...newBus, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredBuses = buses.filter(
    (bus) =>
      bus.routeStart.toLowerCase().includes(searchQuery) ||
      bus.routeEnd.toLowerCase().includes(searchQuery) ||
      bus.id.toLowerCase().includes(searchQuery)
  );

  const generateBusID = () => {
    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const randomLetter = () =>
      letters.charAt(Math.floor(Math.random() * letters.length));
    const randomNumber = () => Math.floor(100 + Math.random() * 900);

    return `K${randomLetter()}${randomLetter()}${randomNumber()}${randomLetter()}`;
  };

  const addBus = async () => {
    const newBusWithID = { ...newBus, id: generateBusID() };
    console.log(newBusWithID);
    try {
      const response = await axios.post(
        "https://mmatatubackend.onrender.com/backend/buses/", 
        newBusWithID
      );
      setBuses([...buses, response.data]);
      setNewBus({
        routeStart: "",
        routeEnd: "",
        status: "Active",
        capacity: "",
        passengerCount: 0,
      });
      setShowAddBusModal(false);
    } catch (error) {
      console.error("Error adding bus:", error);
    }
  };

  const editBus = async () => {
    try {
      await axios.put(`https://mmatatubackend.onrender.com/backend/buses/${busToEdit.id}/edit/`, newBus);

      setBuses(
        buses.map((bus) =>
          bus.id === busToEdit.id ? { ...bus, ...newBus } : bus
        )
      );
      setShowEditBusModal(false);
    } catch (error) {
      console.error("Error updating bus:", error);
    }
  };

  const deleteBus = async () => {
    try {
      await axios.delete(`https://mmatatubackend.onrender.com/backend/buses/${busToEdit.id}/delete/`);
      setBuses(buses.filter((bus) => bus.id !== busToEdit.id));
      setShowDeleteConfirmModal(false);
    } catch (error) {
      console.error("Error deleting bus:", error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-8 text-shadow-md">
        Bus Management
      </h2>

      {/* Search and Add New Bus Button */}
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search by route, status, or ID"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setShowAddBusModal(true)}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transform hover:scale-110 transition-all duration-300"
        >
          Add New Bus
        </button>
      </div>

      {/* Bus Table */}
      <div className="overflow-x-auto shadow-lg sm:rounded-lg">
        {buses.length === 0 ? (
          <p className="text-center text-white">No buses available</p>
        ) : (
          <table className="min-w-full table-auto bg-white text-gray-800">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="px-6 py-3 text-left">Bus ID</th>
                <th className="px-6 py-3 text-left">Route Start</th>
                <th className="px-6 py-3 text-left">Route End</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Capacity</th>
                <th className="px-6 py-3 text-left">Passengers</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuses.map((bus) => (
                <tr
                  key={bus.id}
                  className="border-b hover:bg-blue-100 transition-all duration-300"
                >
                  <td className="px-6 py-4">{bus.id}</td>
                  <td className="px-6 py-4">{bus.routeStart}</td>
                  <td className="px-6 py-4">{bus.routeEnd}</td>
                  <td className="px-6 py-4">{bus.status}</td>
                  <td className="px-6 py-4">{bus.capacity}</td>
                  <td className="px-6 py-4">{bus.passengerCount}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button
                      onClick={() => {
                        setShowEditBusModal(true);
                        setBusToEdit(bus);
                        setNewBus(bus);
                      }}
                      className="text-yellow-500 hover:text-yellow-700 transform hover:scale-110 transition-all duration-300"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteConfirmModal(true);
                        setBusToEdit(bus);
                      }}
                      className="text-red-500 hover:text-red-700 transform hover:scale-110 transition-all duration-300"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Bus Modal */}
      <Dialog open={showAddBusModal} onClose={() => setShowAddBusModal(false)}>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Dialog.Panel className="bg-white p-8 rounded-lg max-w-sm w-full shadow-lg">
            <Dialog.Title className="text-xl font-semibold mb-4 text-blue-800">
              Add New Bus
            </Dialog.Title>
            <form>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800">Route Start</label>
                <input
                  type="text"
                  name="routeStart"
                  value={newBus.routeStart}
                  onChange={handleNewBusChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-800">Route End</label>
                <input
                  type="text"
                  name="routeEnd"
                  value={newBus.routeEnd}
                  onChange={handleNewBusChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-800">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={newBus.capacity}
                  onChange={handleNewBusChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={addBus}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
                >
                  Add Bus
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddBusModal(false)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit Bus Modal */}
      <Dialog
        open={showEditBusModal}
        onClose={() => setShowEditBusModal(false)}
      >
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Dialog.Panel className="bg-white p-8 rounded-lg max-w-sm w-full shadow-lg">
            <Dialog.Title className="text-xl font-semibold mb-4 text-blue-800">
              Edit Bus
            </Dialog.Title>
            <form>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800">Route Start</label>
                <input
                  type="text"
                  name="routeStart"
                  value={newBus.routeStart}
                  onChange={handleNewBusChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800">Route End</label>
                <input
                  type="text"
                  name="routeEnd"
                  value={newBus.routeEnd}
                  onChange={handleNewBusChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-800">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={newBus.capacity}
                  onChange={handleNewBusChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={editBus}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditBusModal(false)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={showDeleteConfirmModal}
        onClose={() => setShowDeleteConfirmModal(false)}
      >
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Dialog.Panel className="bg-white p-8 rounded-lg max-w-sm w-full shadow-lg">
            <Dialog.Title className="text-xl font-semibold mb-4 text-red-600">
              Are you sure?
            </Dialog.Title>
            <p className="mb-4 text-gray-700">This action cannot be undone.</p>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={deleteBus}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-300"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirmModal(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default BusManagementPage;
