import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import TopBar from "./components/topbar";
import DashboardHome from "./screens/DashboardHome";

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
            <Route path="/" element={<DashboardHome />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
