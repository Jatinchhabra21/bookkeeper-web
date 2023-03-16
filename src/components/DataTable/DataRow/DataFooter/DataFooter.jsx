import React from 'react';

export default function DataFooter({ totalSpent }) {
  return (
    <tr className="data-table__footer">
      <td className="data-table__footer-label" colSpan={3}>
        Total Amount Spent
      </td>
      <td className="align-text-right data-body__table-data">₹{totalSpent}</td>
    </tr>
  );
}
