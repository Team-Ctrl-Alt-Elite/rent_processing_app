import { Routes, Route } from "react-router-dom";

// HOME/AUTH COMPONENTS
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";

// LANDLORD COMPONENTS
import LDashboard from "./components/landlords/LDashboard";
import Contracts from "./components/landlords/Contracts";
import Units from "./components/landlords/Units";
import RentLogs from "./components/landlords/RentLogs";

// TENANT COMPONENTS
import TDashboard from "./components/tenants/TDashboard";
import Contract from "./components/tenants/Contract";
import History from "./components/tenants/History";
import PayBill from "./components/tenants/PayBill";

function App() {
  return (
    <Routes>
      {/* HOME/AUTH ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<SignUp />} />

      {/* LANDLORD ROUTES */}
      <Route path="/admin" element={<LDashboard />} />
      <Route path="/admin/logs" element={<RentLogs />} />
      <Route path="/admin/contracts" element={<Contracts />} />
      <Route path="/admin/units" element={<Units />} />

      {/* TENANT ROUTES */}
      <Route path="/tenant" element={<TDashboard />} />
      <Route path="/tenant/pay" element={<PayBill />} />
      <Route path="/tenant/contract" element={<Contract />} />
      <Route path="/tenant/history" element={<History />} />
    </Routes>
  );
}

export default App;
