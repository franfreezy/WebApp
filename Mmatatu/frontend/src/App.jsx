import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./middleware";
import Login from "./auth/login/login";
import Register from "./auth/register/register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        {/* Protect these routes */}
        {/* <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
