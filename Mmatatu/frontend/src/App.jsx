import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./@protect/ProtectedRoute";
import Login from "./auth/login/login";
import Register from "./auth/register/register";
import Dashboard from "./dashboard/page";
import BusManagementPage from "./dashboard/screens/BusManagementPage";
import BusTrackingMap from "./dashboard/screens/BusTrackingMap";
import RevenueCollectionPage from "./dashboard/screens/RevenueCollectionPage";
import PassengerInformationPage from "./dashboard/screens/PassengerInformationPage";
import FareRateManagementPage from "./dashboard/screens/FareRateManagementPage";
import DashboardHome from "./dashboard/screens/DashboardHome";
import DriverDashboard from "../../driverFrontend/src/Driver/page";
import CustomerDashboard from "./Customer/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />

        {/* Protect these routes */}

        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        >
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route
            path="/dashboard/bus-management"
            element={<BusManagementPage />}
          />
          <Route path="/dashboard/bus-tracking" element={<BusTrackingMap />} />
          <Route
            path="/dashboard/revenue"
            element={<RevenueCollectionPage />}
          />
          <Route
            path="/dashboard/passenger-info"
            element={<PassengerInformationPage />}
          />
          <Route
            path="/dashboard/fare-rate"
            element={<FareRateManagementPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
