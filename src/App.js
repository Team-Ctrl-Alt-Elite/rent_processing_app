import { Routes, Route } from "react-router-dom";

// GLOBAL COMPONENTS
import Nav from "./components/Nav";

// HOME/AUTH COMPONENTS
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";

// LANDLORD COMPONENTS
import LDashboard from "./components/landlords/LDashboard";
import CreateNewUser from "./components/landlords/register/CreateNewUser";
import CreateNewContract from "./components/landlords/register/CreateNewContract";

// TENANT COMPONENTS
import TDashboard from "./components/tenants/TDashboard";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        {/* HOME/AUTH ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />

        {/* LANDLORD ROUTES */}
        <Route path="/admin" element={<LDashboard />} />
        <Route path="/register/new-user" element={<CreateNewUser />} />
        <Route path="/register/new-contract" element={<CreateNewContract />} />

        {/* TENANT ROUTES */}
        <Route path="/tenant" element={<TDashboard />} />
      </Routes>
    </>
  );
}

export default App;
