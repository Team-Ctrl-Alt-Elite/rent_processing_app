import { Routes, Route } from "react-router-dom";

// HOME/AUTH COMPONENTS
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";

// LANDLORD COMPONENTS
import LDashboard from "./components/landlords/LDashboard";

// TENANT COMPONENTS
import TDashboard from "./components/tenants/TDashboard";

function App() {
  return (
    <Routes>
      {/* HOME/AUTH ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />

      <Route path="/auth/signup" element={<SignUp />} />

      {/* LANDLORD ROUTES */}
      <Route path="/admin" element={<LDashboard />} />


      {/* TENANT ROUTES */}
      <Route path="/tenant" element={<TDashboard />} />
    </Routes>
  );
}

export default App;
