import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Label,
  Text,
} from 'recharts';
import { CATEGORY_FINANCE } from 'constants/finance';

export default function TotalPieChart(props) {
  const colors = ['#726969', '#070707'];

  const totalSpent = CATEGORY_FINANCE.map((category) => category.Amount).reduce(
    (total, it) => total + it
  );
  const data = [
    { Label: 'Remaining', Amount: 14000 - totalSpent },
    { Label: 'Spent', Amount: totalSpent },
  ];

  const getIntroOfPage = (label) => {
    return data[label]['Label'];
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

  return (
    <ResponsiveContainer>
      <PieChart width="100%" height="100%">
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="Amount"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          <Label
            value={`${(
              (data[1].Amount / (data[1].Amount + data[0].Amount)) *
              100
            ).toFixed(0)}%`}
            offset={0}
            position={'center'}
            fill="#070707"
          />
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
