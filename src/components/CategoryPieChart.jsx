import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CATEGORY_FINANCE, CATEGORY_FINANCE_BY_WEEK } from "constants/finance";

export default function CategoryPieChart({ byWeek }) {
  const getIntroOfPage = (label) => {
    return CATEGORY_FINANCE[label]["Category"];
  };

  const CustomTooltip = (props) => {
    if (props.active && props.payload && props.payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="intro">
            {getIntroOfPage(props.payload[0].name)}
            {`: ₹${props.payload[0].value}`}
          </p>
        </div>
      );
    }

    return null;
  };

  const DATA = byWeek ? CATEGORY_FINANCE_BY_WEEK : CATEGORY_FINANCE;

  const colors = ["#000000", "#1A1A1A", "#343232", "#4F4A4A", "#6A6262"];

  return (
    <ResponsiveContainer>
      <PieChart width="100%" height="100%">
        <Pie
          dataKey="Amount"
          data={DATA}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={({ Category }) => Category}
        >
          {DATA.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
