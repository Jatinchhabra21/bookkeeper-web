import BarChart from 'components/BarChart';
import NavBar from 'components/NavBar';
import React, { useState } from 'react';
import 'assets/styles/dashboard.css';
import CategoryPieChart from 'components/CategoryPieChart';
import TotalPieChart from 'components/TotalPieChart';

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
      <NavBar />
      <div className="dashboard">
        <div className="btn-wrapper">
          <button
            className={`btn ${byWeek ? 'btn-active' : ''}`}
            onClick={handleWeekBtnClick}
          >
            Weekly
          </button>
          <button
            className={`btn ${!byWeek ? 'btn-active' : ''}`}
            onClick={handleMonthBtnClick}
          >
            Monthly
          </button>
        </div>
        <div className="chart-container">
          <BarChart byWeek={byWeek} />
          <CategoryPieChart byWeek={byWeek} />
          <TotalPieChart />
        </div>
      </div>
    </>
  );
}
