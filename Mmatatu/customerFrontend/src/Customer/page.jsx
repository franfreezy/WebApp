import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function CustomerDashboard() {
  return (
    <div className="flex w-screen">
      <Sidebar />
      <main className="flex-1">
        <Header title="Customer Dashboard" />
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
