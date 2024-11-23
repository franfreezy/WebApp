import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./@protect/ProtectedRoute";
import Login from "./auth/login/login";
import Register from "./auth/register/register";
import DriverDashboard from "../../driverFrontend/src/Driver/page";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/driver"
          element={<ProtectedRoute element={<DriverDashboard />} />}
        >
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
