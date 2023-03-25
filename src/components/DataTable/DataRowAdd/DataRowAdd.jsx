import React from "react";

export default function DataRowAdd({ columns, rowData, setRowData, row }) {
  function valuePos(col) {
    if (col === "Amount") return "align-text-right";
    else if (col === "Category") return "align-text-center";
    else if (col === "Expense") return "align-text-center";
    else if (col === "Date") return "align-text-right";
  }

  function inputType(col) {
    if (col === "Amount") return "number";
    else if (col === "Category") return "text";
    else if (col === "Expense") return "text";
    else if (col === "Date") return "date";
  }

  function handleValue(col, value) {
    setRowData((prevData) =>
      prevData.map((obj, index) => {
        if (index === row - 1) {
          return {
            ...obj,
            [col]: value,
          };
        } else {
          return obj;
        }
      })
    );
  }

  return (
    <tr>
      {columns.map((col) => {
        return (
          <td key={col}>
            <input
              className={"data-body__table-data " + valuePos(col)}
              type={inputType(col)}
              value={rowData[row - 1][col]}
              onChange={(event) => handleValue(col, event.target.value)}
              required
            />
          </td>
        );
      })}
    </tr>
  );
}
