import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4">
      <div className="text-2xl font-semibold text-center mb-6">
        Commute Dashboard
      </div>

      <Link to="/" className="text-lg hover:bg-gray-700 p-2 rounded">
        Bus Tracking
      </Link>
      <Link to="/revenue" className="text-lg hover:bg-gray-700 p-2 rounded">
        Revenue Collection
      </Link>
      <Link to="/passengers" className="text-lg hover:bg-gray-700 p-2 rounded">
        Passenger Info
      </Link>
      <Link to="/buses" className="text-lg hover:bg-gray-700 p-2 rounded">
        Bus Management
      </Link>
      <Link to="/fare" className="text-lg hover:bg-gray-700 p-2 rounded">
        Fare Rate
      </Link>
    </div>
  );
};

export default Sidebar;
