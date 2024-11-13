import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Line, Bar } from "react-chartjs-2";

// Dummy data for buses and passengers
const busesData = [
  {
    id: "bus1",
    name: "Bus A",
    passengers: 15,
    rfidScanTimes: ["10:00 AM", "10:15 AM", "10:30 AM"],
  },
  {
    id: "bus2",
    name: "Bus B",
    passengers: 22,
    rfidScanTimes: ["10:05 AM", "10:20 AM", "10:35 AM"],
  },
  {
    id: "bus3",
    name: "Bus C",
    passengers: 18,
    rfidScanTimes: ["10:10 AM", "10:25 AM", "10:40 AM"],
  },
];

const passengersData = [
  {
    rfidId: "12345",
    name: "John Doe",
    recentTrips: ["Route A", "Route B"],
    farePayments: ["$10", "$15"],
  },
  {
    rfidId: "67890",
    name: "Jane Smith",
    recentTrips: ["Route B", "Route C"],
    farePayments: ["$12", "$8"],
  },
  {
    rfidId: "11223",
    name: "Alice Johnson",
    recentTrips: ["Route C", "Route A"],
    farePayments: ["$8", "$14"],
  },
];

const PassengerInformationPage = () => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [passengerSearch, setPassengerSearch] = useState("");
  const [filteredPassengers, setFilteredPassengers] = useState(passengersData);

  useEffect(() => {
    setFilteredPassengers(
      passengersData.filter((passenger) =>
        passenger.rfidId.includes(passengerSearch)
      )
    );
  }, [passengerSearch]);

  const handleBusChange = (selectedOption) => {
    setSelectedBus(selectedOption ? selectedOption.value : null);
  };

  const handlePassengerSearchChange = (e) => {
    setPassengerSearch(e.target.value);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">
        Passenger Information
      </h2>

      {/* Bus Selection (For Real-Time Count) */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">
          Select Bus for Real-Time Count
        </h3>
        <Select
          options={busesData.map((bus) => ({ value: bus.id, label: bus.name }))}
          onChange={handleBusChange}
          placeholder="Select Bus"
          className="max-w-xs"
        />
        {selectedBus && (
          <div className="mt-4">
            <h4 className="text-xl font-semibold">{`Real-Time Count for ${selectedBus}`}</h4>
            {/* Display selected bus's real-time count here */}
          </div>
        )}
      </div>

      {/* Active Passengers on Each Bus */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {busesData.map((bus) => (
          <div
            key={bus.id}
            className="bg-white text-gray-800 rounded-lg shadow-lg p-6 transition-all hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-2xl font-semibold">{bus.name}</h3>
            <p className="text-xl mt-4">{`Active Passengers: ${bus.passengers}`}</p>
            <div className="mt-2">
              <span className="font-medium">RFID Scan Times:</span>
              <ul className="text-sm">
                {bus.rfidScanTimes.map((time, idx) => (
                  <li key={idx}>{time}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Real-Time Passenger Count */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">
          Real-Time Passenger Count
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {busesData.map((bus) => (
            <div
              key={bus.id}
              className="bg-white text-gray-800 rounded-lg shadow-lg p-6 transition-all hover:scale-105 hover:shadow-xl"
            >
              <h4 className="text-xl font-semibold">{`Bus ${bus.name}`}</h4>
              <div className="mt-4 text-3xl font-bold">{bus.passengers}</div>
              <p className="mt-2 text-gray-500">Real-Time Count</p>
            </div>
          ))}
        </div>
      </div>

      {/* Passenger Search */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">
          Search Passenger by RFID Card ID
        </h3>
        <input
          type="text"
          placeholder="Enter RFID Card ID"
          value={passengerSearch}
          onChange={handlePassengerSearchChange}
          className="p-4 rounded-lg w-full max-w-md bg-gray-100 border-none text-gray-700"
        />
        <div className="mt-8">
          <h4 className="text-xl font-semibold mb-4">Search Results</h4>
          {filteredPassengers.length > 0 ? (
            filteredPassengers.map((passenger) => (
              <div
                key={passenger.rfidId}
                className="bg-white p-4 rounded-lg shadow-lg mb-4 text-gray-800"
              >
                <h5 className="font-semibold">{`Passenger: ${passenger.name}`}</h5>
                <p>{`RFID ID: ${passenger.rfidId}`}</p>
                <p>{`Recent Trips: ${passenger.recentTrips.join(", ")}`}</p>
                <p>{`Fare Payments: ${passenger.farePayments.join(", ")}`}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No passenger found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassengerInformationPage;
