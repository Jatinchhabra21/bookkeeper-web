import React, { useState } from "react";
import DataHeader from "./DataHeader/DataHeader";
import DataRowView from "./DataRowView/DataRowView";
import DataFooter from "./DataFooter/DataFooter";
import { RAW_FINANCE_DATA } from "constants/finance";
import "./data-table.css";
import DataRowAdd from "./DataRowAdd/DataRowAdd";

export default function DataTable({ mode }) {
  const [row, setRow] = useState(1);
  const [rowData, setRowData] = useState(
    Array.from({ length: row }, (_, index) => index + 1).map(() => ({
      Amount: 0,
      Date: new Date().toISOString().split("T")[0],
      Expense: "",
      Category: "",
    }))
  );
  const [viewData, setViewData] = useState(RAW_FINANCE_DATA);

  const totalSpent = viewData
    .map((row) => row.Amount)
    .reduce((curr, total) => total + curr, 0);

  const handleAddRow = () => {
    setRow((prevRows) => prevRows + 1);
    setRowData((prevRowData) => {
      return [
        ...prevRowData,
        {
          Amount: 0,
          Date: new Date().toISOString().split("T")[0],
          Expense: "",
          Category: "",
        },
      ];
    });
  };

  const handleDeleteRow = () => {
    setRow((prevRows) => (prevRows > 1 ? prevRows - 1 : prevRows));
    if (row > 1)
      setRowData((prevRowData) => {
        prevRowData.splice(row - 1, 1);
        return prevRowData;
      });
  };

  const saveData = () => {
    setViewData((prevData) => [...prevData, ...rowData]);
  };

  let tableBody;

  if (mode.add) {
    tableBody = Array.from({ length: row }, (_, index) => index + 1).map(
      (i) => (
        <DataRowAdd
          key={i + 1}
          columns={Object.keys(RAW_FINANCE_DATA[0])}
          rowData={rowData}
          setRowData={setRowData}
          row={i}
        />
      )
    );
  } else if (mode.view) {
    tableBody = RAW_FINANCE_DATA.map((el, it) => (
      <DataRowView
        key={it}
        data={el}
        columns={Object.keys(RAW_FINANCE_DATA[0])}
      />
    ));
  }

  return (
    <div className="align-flex-end flex-column">
      <table className="data-table">
        <thead className="data-table__row-header">
          <DataHeader columns={Object.keys(RAW_FINANCE_DATA[0])} />
        </thead>
        <tbody className="data-table__row-body">
          {tableBody}
          {!mode.add && !mode.edit && <DataFooter totalSpent={totalSpent} />}
        </tbody>
      </table>
      {mode.add ? (
        <div className="flex-end gap-1">
          <button className="btn" onClick={handleAddRow}>
            Add
          </button>
          <button className="btn" onClick={handleDeleteRow}>
            Delete
          </button>
          <button className="btn" onClick={saveData}>
            Save
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
