import React from "react";

export default function DataRow({ data, columns }) {
  function valuePos(col) {
    if (col === "Amount") return "align-text-right";
    else if (col === "Category") return "align-text-center";
    else if (col === "Expense") return "align-text-center";
    else if (col === "Date") return "align-text-right";
  }

  return (
    <tr>
      {columns.map((col) => {
        const colValue = col === "Amount" ? `₹${data[col]}` : data[col];
        return (
          <td className={"data-body__table-data " + valuePos(col)} key={col}>
            {colValue}
          </td>
        );
      })}
    </tr>
  );
}
