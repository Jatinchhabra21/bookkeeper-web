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
import { BUDGET, PER_DAY_FINANCE } from 'constants/finance';
import { getCurrentWeek } from 'utils/date';
import { parse } from 'date-fns';

export default function TotalPieChart({ byWeek }) {
  const colors = ['#726969', '#070707'];
  let totalSpent = 0;
  const { weekStart, weekEnd } = getCurrentWeek(new Date());
  let budget = BUDGET;

  if (byWeek) {
    totalSpent = PER_DAY_FINANCE.filter((data) => {
      return (
        parse(data.Date, 'dd-MM-yyyy', new Date(), {
          weekStartsOn: 1,
        }) >= weekStart &&
        parse(data.Date, 'dd-MM-yyyy', new Date(), {
          weekStartsOn: 1,
        }) <= weekEnd
      );
    })
      .map((day) => day.Amount)
      .reduce((total, it) => total + it);
    budget = (BUDGET / 4).toFixed(2);
  } else {
    totalSpent = PER_DAY_FINANCE.map((category) => category.Amount).reduce(
      (total, it) => total + it
    );
  }

  const DATA = [
    { Label: 'Remaining', Amount: budget - totalSpent },
    { Label: 'Spent', Amount: totalSpent },
  ];

  const getIntroOfPage = (label) => {
    return DATA[label]['Label'];
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
          data={DATA}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="Amount"
        >
          {DATA.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          <Label
            value={`${(
              (DATA[1].Amount / (DATA[1].Amount + DATA[0].Amount)) *
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
