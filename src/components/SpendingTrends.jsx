import React from "react";

const SpendingTrends = () => {
  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
      <h3 className="font-semibold mb-4 text-xl">Spending Trends</h3>
      <p className="text-3xl font-bold text-indigo-400">
        $152.85 <span className="text-sm text-green-400">↑ 5%</span>
      </p>
      <p className="text-gray-400 text-sm mb-4">vs. last month</p>

      {/* Replace with Chart.js / Recharts */}
      <div className="h-40 flex items-center justify-center text-gray-500 border border-gray-700 rounded-lg">
        Chart goes here
      </div>
    </div>
  );
};

export default SpendingTrends;
