import ControlPanel from "./components/ControlPanel";
import Header from "./components/header";
import Notifications from "./components/Notifications";
import PassengerList from "./components/PassengerList";
import RouteMap from "./components/RouteMap";

export default function DriverDashboard() {
  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Left Section: Map */}
        <div className="w-2/3 p-4">
          <RouteMap />
        </div>
        {/* Right Section: Passenger Info and Notifications */}
        <div className="w-1/3 p-4 space-y-4">
          <PassengerList />
          <Notifications />
        </div>
      </div>
      <ControlPanel />
    </div>
  );
}
