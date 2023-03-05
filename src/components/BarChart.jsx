import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { PER_DAY_FINANCE } from 'constants/finance';
import { getCurrentWeek } from 'utils/date';
import { parse } from 'date-fns';

export default function ({ byWeek }) {
  let DATA = PER_DAY_FINANCE;
  const { weekStart, weekEnd } = getCurrentWeek(new Date());
  if (byWeek) {
    DATA = DATA.filter((data) => {
      return (
        parse(data.Date, 'dd-MM-yyyy', new Date(), {
          weekStartsOn: 1,
        }) >= weekStart &&
        parse(data.Date, 'dd-MM-yyyy', new Date(), {
          weekStartsOn: 1,
        }) <= weekEnd
      );
    });
  } else {
    DATA = DATA.filter((data) => {
      return (
        parse(data.Date, 'dd-MM-yyyy', new Date(), {
          weekStartsOn: 1,
        }).getMonth() === new Date().getMonth()
      );
    });
  }

  return (
    <ResponsiveContainer>
      <LineChart
        width={500}
        height={500}
        data={DATA}
        margin={{ top: 5, bottom: 5, left: 20, right: 30 }}
      >
        <CartesianGrid strokeDasharray={'6 6'} />
        <XAxis dataKey={'Date'} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="Amount" stroke="#343232" />
      </LineChart>
    </ResponsiveContainer>
  );
}
