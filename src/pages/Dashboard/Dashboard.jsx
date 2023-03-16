import {
  DailySpendChart,
  Navbar,
  CategoryPieChart,
  TotalPieChart,
} from "components";
import React, { useState } from "react";
import "./dashboard.css";

export default function Dashboard() {
  const [byWeek, setByWeek] = useState(false);

  const handleWeekBtnClick = () => {
    setByWeek(true);
  };

  const handleMonthBtnClick = () => {
    setByWeek(false);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="btn-wrapper">
          <button
            className={`btn ${byWeek ? "btn-active" : ""}`}
            onClick={handleWeekBtnClick}
          >
            Weekly
          </button>
          <button
            className={`btn ${!byWeek ? "btn-active" : ""}`}
            onClick={handleMonthBtnClick}
          >
            Monthly
          </button>
        </div>
        <div className="chart-container">
          <DailySpendChart byWeek={byWeek} />
          <CategoryPieChart byWeek={byWeek} />
          <TotalPieChart byWeek={byWeek} />
        </div>
      </div>
    </>
  );
}
