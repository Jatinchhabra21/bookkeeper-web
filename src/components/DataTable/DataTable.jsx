import React from "react";
import DataHeader from "./DataHeader/DataHeader";
import DataRow from "./DataRow/DataRow";
import DataFooter from "./DataRow/DataFooter/DataFooter";
import { RAW_FINANCE_DATA } from "constants/finance";
import "./data-table.css";

export default function DataTable() {
  const totalSpent = RAW_FINANCE_DATA.map((row) => row.Amount).reduce(
    (curr, total) => total + curr,
    0
  );
  return (
    <table className="data-table">
      <thead className="data-table__row-header">
        <DataHeader columns={Object.keys(RAW_FINANCE_DATA[0])} />
      </thead>
      <tbody className="data-table__row-body">
        {RAW_FINANCE_DATA.map((el, it) => (
          <DataRow
            key={it}
            data={el}
            columns={Object.keys(RAW_FINANCE_DATA[0])}
          />
        ))}
        <DataFooter totalSpent={totalSpent} />
      </tbody>
    </table>
  );
}
