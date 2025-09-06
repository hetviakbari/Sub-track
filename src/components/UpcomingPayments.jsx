import React from "react";
import "./UpcomingPayments.css";

const UpcomingPayments = ({ subscriptions }) => {
  return (
    <div className="upcoming-payments">
      <h3 className="title">Upcoming Payments</h3>
      <div className="cards">
        {subscriptions.map((sub) => (
          <div key={sub.id || sub._id} className="card">
            <h4 className="name">{sub.name}</h4>
            <p className="due">Due on: {sub.renewalDate || sub.nextPayment}</p>
            <p className="amount">${sub.price}</p>
          </div>
        ))}

        {/* Add new button card */}
        <div className="card add-card">
          <button className="add-btn">+ Add New</button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPayments;
