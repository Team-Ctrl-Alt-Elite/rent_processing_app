import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Contract from "./Contract";
import History from "./History";
import PayBill from "./payments/PayBill";
import AccountOverview from "./AccountOverview";
import "../../styles/tenants/TDashboard.css";

export default function TDashboard() {
  const [counter, setCounter] = useState(0);
  const [contract, setContract] = useState([]);
  const userName = localStorage.getItem("name");
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContractInfo = async () => {
      try {
        const contractResponse = await axios.get(
          `http://localhost:8080/tenant/tenantContracts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: "include",
          }
        );
        setContract(contractResponse?.data);
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/auth/login");
        } else
          console.error(
            "TDashboard. Error Fetching Contract Information:",
            err
          );
      }
    };
    fetchContractInfo();
  }, [id, token, navigate]);

  return (
    <>
      <div className="tdash-background">
        <section className="tdash-section">
          <h2>Welcome, {userName}!</h2>
          <button onClick={() => setCounter(0)} className="tdash-button">
            Account Overview
          </button>
          <button onClick={() => setCounter(1)} className="tdash-button">
            Payment History
          </button>

          <div className="tdash-modal">
            <div className="tdash-left">
              {counter === 0 && (
                <div>
                  <AccountOverview />
                  <Contract {...contract[0]} />
                </div>
              )}
              {counter === 1 && <History />}
            </div>
            <div className="tdash-right">
              <PayBill {...contract[0]} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
