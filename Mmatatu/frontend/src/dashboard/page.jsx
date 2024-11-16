import React from "react";
import Sidebar from "./components/sidebar";
import TopBar from "./components/topbar";
import { Outlet } from "react-router-dom";

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
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
