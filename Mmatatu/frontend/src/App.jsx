import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./@protect/ProtectedRoute";
import Login from "./auth/login/login";
import Register from "./auth/register/register";
import Dashboard from "./dashboard/page";

import BusTrackingMap from "./dashboard/screens/BusTrackingMap";
import FareRateManagementPage from "./dashboard/screens/FareRateManagementPage";
import PassengerInformationPage from "./dashboard/screens/PassengerInformationPage";
import RevenueCollectionPage from "./dashboard/screens/RevenueCollectionPage";
import BusManagementPage from "./dashboard/screens/BusManagementPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protect these routes */}
        
         <Route
         path="/dashboard"
         element={
           <ProtectedRoute>
             <Dashboard />
           </ProtectedRoute>
         }
       />
       <Route
         path="/dashboard"
         element={
           <ProtectedRoute>
             <BusTrackingMap />
           </ProtectedRoute>
         }
       />
       <Route
         path="/buses"
         element={
           <ProtectedRoute>
             <BusManagementPage/>
           </ProtectedRoute>
         }
       />
       <Route
         path="/revenue"
         element={
           <ProtectedRoute>
             <RevenueCollectionPage />
           </ProtectedRoute>
         }
       />
       <Route
          path="/fare"
          element={
            <ProtectedRoute>
              <FareRateManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passengers"
          element={
            <ProtectedRoute>
              <PassengerInformationPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
