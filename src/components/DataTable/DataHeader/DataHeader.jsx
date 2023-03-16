import React from "react";

export default function DataHeader({ columns }) {
  return (
    <tr>
      {columns.map((col, it) => (
        <th className="data-header__table-head" key={it}>
          {col}
        </th>
      ))}
    </tr>
  );
}
