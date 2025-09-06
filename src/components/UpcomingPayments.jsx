import React from "react";

const UpcomingPayments = ({ subscriptions }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Upcoming Payments</h2>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {subscriptions.map((sub) => (
          <div
            key={sub._id}
            className="bg-[#1e293b] p-5 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            <p className="font-semibold text-lg">{sub.name}</p>
            <p className="text-gray-400 text-sm">Due in {sub.dueIn} days</p>
            <p className="text-indigo-400 mt-3 font-bold text-xl">${sub.price}</p>
          </div>
        ))}
        <div className="bg-[#1e293b] p-5 rounded-2xl shadow-lg flex items-center justify-center hover:bg-indigo-500 hover:text-white cursor-pointer">
          + Add New
        </div>
      </div>
    </div>
  );
};

export default UpcomingPayments;
