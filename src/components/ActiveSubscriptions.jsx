import React from "react";
import "./ActiveSubscriptions.css";

const ActiveSubscriptions = ({ subscriptions }) => {
  return (
    <div className="active-subscriptions">
      <h3 className="title">Active Subscriptions</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Billing</th>
            <th>Next Payment</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => (
            <tr key={sub._id || sub.id}>
              <td>{sub.name}</td>
              <td>{sub.category}</td>
              <td>{sub.billingCycle || "N/A"}</td>
              <td>{sub.nextPayment || sub.renewalDate}</td>
              <td className="amount">${sub.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveSubscriptions;
