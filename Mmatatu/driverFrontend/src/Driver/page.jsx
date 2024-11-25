import { useState } from "react";
import ControlPanel from "./components/ControlPanel";
import Header from "./components/header";
import Notifications from "./components/Notifications";
import PassengerList from "./components/PassengerList";
import RouteMap from "./components/RouteMap";

export default function DriverDashboard() {
  const [selectedRoute, setSelectedRoute] = useState(null);

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="w-4/5 p-4">
          {/* Pass selectedRoute to RouteMap */}
          <RouteMap selectedRoute={selectedRoute} />
        </div>

        <div className="w-1/5 p-4 space-y-4">
          <PassengerList />
          <Notifications />
        </div>
      </div>
      <ControlPanel setSelectedRoute={setSelectedRoute} />
    </div>
  );
}
