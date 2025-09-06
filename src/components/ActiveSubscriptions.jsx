import React from "react";
import "./ActiveSubscriptions.css";

const ActiveSubscriptions = ({ subscriptions }) => {
  return (
    <div className="card animate-fadeIn">
      <h3 className="card-title">Active Subscriptions</h3>
      <ul className="subscription-list">
        {subscriptions.map((sub) => (
          <li key={sub._id} className="subscription-item hover-row">
            <span className="sub-name">{sub.name}</span>
            <span className="sub-amount">${sub.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveSubscriptions;
