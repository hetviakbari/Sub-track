import React from "react";
import "./SpendingTrends.css";

const SpendingTrends = () => {
  return (
    <div className="spending-trends">
      <h3 className="title">Spending Trends</h3>
      <p className="amount">
        $152.85 <span className="percent">↑ 5%</span>
      </p>
      <p className="subtitle">vs. last month</p>

      <div className="chart-placeholder">Chart goes here</div>
    </div>
  );
};

export default SpendingTrends;
