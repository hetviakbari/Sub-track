import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Subscriptions.css";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all subscriptions
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subscriptions");
        if (!res.ok) throw new Error("Failed to fetch subscriptions");
        const data = await res.json();
        setSubscriptions(data.data || []); // API sends { success, data }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, []);

  if (loading) return <div className="subscriptions">Loading...</div>;
  if (error) return <div className="subscriptions">Error: {error}</div>;

  return (
    <div className="app-container">
      <Sidebar />
      <div className="subscriptions">
        <header className="subscriptions-header">
          <h1>Subscriptions</h1>
          <p>Manage your active subscriptions and payment history.</p>
        </header>

        {subscriptions.length === 0 ? (
          <p>No subscriptions found.</p>
        ) : (
          subscriptions.map((sub) => (
            <div key={sub._id} className="subscription-card">
              <div className="subscription-details">
                <h2>{sub.name}</h2>
                <p className="description">{sub.notes || "Manage your subscription details."}</p>

                <table>
  <tbody>
    <tr>
      <td>Service</td>
      <td>{sub.name}</td>
    </tr>
    <tr>
      <td>Cost</td>
      <td>${sub.amount} / {sub.cycle}</td>
    </tr>
    <tr>
      <td>Start Date</td>
      <td>{new Date(sub.startDate).toLocaleDateString()}</td>
    </tr>
    <tr>
      <td>Next Due Date</td>
      <td>{new Date(sub.nextBillingDate).toLocaleDateString()}</td>
    </tr>
    <tr>
      <td>Status</td>
      <td><span className={`status ${sub.status?.toLowerCase() || "active"}`}>{sub.status || "Active"}</span></td>
    </tr>
  </tbody>
</table>

                <div className="actions">
                  <button className="btn edit">Edit</button>
                  <button className="btn pause">Pause</button>
                  <button className="btn cancel">Cancel</button>
                </div>
              </div>

              {sub.paymentHistory?.length > 0 && (
                <div className="payment-history">
                  <h3>Payment History</h3>
                  <ul>
                    {sub.paymentHistory.map((payment, idx) => (
                      <li key={idx}>
                        <span>{new Date(payment.date).toLocaleDateString()}</span>
                        <span>${payment.amount}</span>
                        <span className={payment.paid ? "paid" : "unpaid"}>{payment.paid ? "Paid" : "Pending"}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
