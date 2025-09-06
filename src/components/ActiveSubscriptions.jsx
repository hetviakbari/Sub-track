import React from "react";
import "./ActiveSubscriptions.css";

const ActiveSubscriptions = ({ subscriptions }) => {
  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
      <h3 className="font-semibold mb-4 text-xl">Active Subscriptions</h3>
      <table className="w-full text-sm">
        <thead className="text-gray-400 text-left">
          <tr>
            <th className="pb-2">Name</th>
            <th>Category</th>
            <th>Billing</th>
            <th>Next Payment</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => (
            <tr key={sub._id} className="border-t border-gray-700 hover:bg-[#27304a] transition">
              <td>{sub.name}</td>
              <td>{sub.category}</td>
              <td>{sub.billingCycle}</td>
              <td>{sub.nextPayment}</td>
              <td className="text-indigo-400 font-medium">${sub.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveSubscriptions;
