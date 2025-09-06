import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import UpcomingPayments from "../components/UpcomingPayments";
import ActiveSubscriptions from "../components/ActiveSubscriptions";
import SpendingTrends from "../components/SpendingTrends";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subscriptions", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const subs = res.data.data.map((sub) => ({
          ...sub,
          price: sub.amount.toFixed(2),
          nextPayment: new Date(sub.nextBillingDate).toLocaleDateString(),
          billingCycle: sub.cycle,
        }));

        setSubscriptions(subs);
      } catch (err) {
        console.error("Backend not connected. Using dummy data...", err);

        setSubscriptions([
          { _id: 1, name: "Netflix", price: 500, category: "Entertainment", startDate: "2025-09-10", billingCycle: "Monthly", nextPayment: "2025-09-10" },
          { _id: 2, name: "Spotify", price: 119, category: "Music", startDate: "2025-09-15", billingCycle: "Monthly", nextPayment: "2025-09-15" },
          { _id: 3, name: "Adobe CC", price: 2000, category: "Productivity", startDate: "2025-09-20", billingCycle: "Yearly", nextPayment: "2025-09-20" },
          { _id: 4, name: "YouTube Premium", price: 129, category: "Entertainment", startDate: "2025-09-25", billingCycle: "Monthly", nextPayment: "2025-09-25" },
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main">
        <Header />
        <p className="overview">Overview of your subscriptions and spending.</p>

        <UpcomingPayments subscriptions={subscriptions.slice(0, 3)} />

        <div className="grid">
          <ActiveSubscriptions subscriptions={subscriptions} />
          <SpendingTrends subscriptions={subscriptions} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
