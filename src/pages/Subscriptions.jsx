import React from "react";
import "./Subscriptions.css";
import Sidebar from "../components/Sidebar";

const Subscriptions = () => {
  return (
    <div className="app-container">
      <Sidebar />
    <div className="subscriptions">
      <header className="subscriptions-header">
        <h1>Subscriptions</h1>
        <p>Manage your active subscriptions and payment history.</p>
      </header>

      <div className="subscription-card">
        <div className="subscription-details">
          <h2>Premium Plan</h2>
          <p className="description">Manage your subscription details and settings.</p>

          <table>
            <tbody>
              <tr>
                <td>Service</td>
                <td>Premium Plan</td>
              </tr>
              <tr>
                <td>Cost</td>
                <td>$12.99 / Monthly</td>
              </tr>
              <tr>
                <td>Next Due Date</td>
                <td>July 15, 2024</td>
              </tr>
              <tr>
                <td>Payment Method</td>
                <td>Credit Card ending in **** 1234</td>
              </tr>
              <tr>
                <td>Status</td>
                <td><span className="status active">Active</span></td>
              </tr>
            </tbody>
          </table>

          <div className="actions">
            <button className="btn edit">Edit</button>
            <button className="btn pause">Pause</button>
            <button className="btn cancel">Cancel</button>
          </div>
        </div>

        <div className="payment-history">
          <h3>Payment History</h3>
          <ul>
            <li><span>June 15, 2024</span><span>$12.99</span><span className="paid">Paid</span></li>
            <li><span>May 15, 2024</span><span>$12.99</span><span className="paid">Paid</span></li>
            <li><span>April 15, 2024</span><span>$12.99</span><span className="paid">Paid</span></li>
            <li><span>March 15, 2024</span><span>$12.99</span><span className="paid">Paid</span></li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Subscriptions;
