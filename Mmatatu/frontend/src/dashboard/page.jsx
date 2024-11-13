import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import TopBar from "./components/topbar";
import DashboardHome from "./screens/DashboardHome";
import BusTrackingMap from "./screens/BusTrackingMap";
import RevenueCollectionPage from "./screens/RevenueCollectionPage ";
import PassengerInformationPage from "./screens/PassengerInformationPage";
import BusManagementPage from "./screens/BusManagementPage ";
import FareRateManagementPage from "./screens/FareRateManagementPage";

function Dashboard() {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content Area */}
        <div className="p-6 flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<FareRateManagementPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
