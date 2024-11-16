import React from "react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">
        Welcome to the Admin Dashboard
      </h2>
      <p className="text-gray-600 mt-2">
        Monitor and manage all operations in one place.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Example Cards for each section */}
        <Link
          to="/bus-tracking"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg text-center"
        >
          <h3 className="text-xl">Track Buses</h3>
          <p className="mt-2">View and track buses in real-time.</p>
        </Link>
        <Link
          to="/revenue"
          className="bg-green-500 text-white p-4 rounded-lg shadow-lg text-center"
        >
          <h3 className="text-xl">Revenue</h3>
          <p className="mt-2">Check the total revenue collection.</p>
        </Link>
        <Link
          to="/passenger-info"
          className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg text-center"
        >
          <h3 className="text-xl">Passenger Info</h3>
          <p className="mt-2">Access passenger details and stats.</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
