import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import UpcomingPayments from "../components/UpcomingPayments";
import ActiveSubscriptions from "../components/ActiveSubscriptions";
import SpendingTrends from "../components/SpendingTrends";
import axios from "axios";

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try backend first
        const res = await axios.get("http://localhost:5000/api/subscriptions", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setSubscriptions(res.data);
      } catch (err) {
        console.error("Backend not connected. Using dummy data...", err);

        // ✅ Dummy data (will show until backend works)
        setSubscriptions([
          {
            id: 1,
            name: "Netflix",
            price: 500,
            category: "Entertainment",
            renewalDate: "2025-09-10",
          },
          {
            id: 2,
            name: "Spotify",
            price: 119,
            category: "Music",
            renewalDate: "2025-09-15",
          },
          {
            id: 3,
            name: "Adobe Creative Cloud",
            price: 2000,
            category: "Productivity",
            renewalDate: "2025-09-20",
          },
          {
            id: 4,
            name: "YouTube Premium",
            price: 129,
            category: "Entertainment",
            renewalDate: "2025-09-25",
          },
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <Header />
        <p className="text-gray-400 mb-6">
          Overview of your subscriptions and spending.
        </p>

        {/* Upcoming payments: show only next 3 */}
        <UpcomingPayments subscriptions={subscriptions.slice(0, 3)} />

        <div className="grid grid-cols-2 gap-6">
          <ActiveSubscriptions subscriptions={subscriptions} />
          <SpendingTrends subscriptions={subscriptions} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
