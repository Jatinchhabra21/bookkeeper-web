import React from 'react';
import DataTable from '../components/DataTable/DataTable';
import { columns } from '../components/DataTable/Columns';
import {
	Transaction,
	TransactionCategory,
	TransactionType,
} from '../components/DataTable/DataTable.types';

const tempData: Transaction[] = [
	{
		amount: 400,
		category: TransactionCategory.HOUSING,
		date: new Date(2024, 2, 12),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 21000,
		category: TransactionCategory.FINANCIAL_EXPENSES,
		date: new Date(2024, 2, 13),
		id: '1',
		name: 'A really long fake transaction display name for testing purposes',
		type: TransactionType.CREDIT,
	},
	{
		amount: 100000,
		category: TransactionCategory.VEHICLE,
		date: new Date(2024, 2, 11),
		id: '1',
		name: 'A really long fake transaction display name for testing purposes V2',
		type: TransactionType.DEBIT,
	},
	{
		amount: 400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 12),
		id: '1',
		name: 'Fake transaction for maze ma',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
	{
		amount: 1400,
		category: TransactionCategory.ENTERTAINMENT,
		date: new Date(2024, 2, 9),
		id: '1',
		name: 'Fake transaction',
		type: TransactionType.DEBIT,
	},
];

export default function Transactions() {
	return (
		<div className="mx-auto mb-8 w-11/12 sm:mb-16 md:w-3/4 xl:w-2/5">
			<DataTable
				columns={columns}
				data={tempData.sort((t1, t2) => {
					if (t1.date === t2.date) return 0;
					else if (t1.date < t2.date) return -1;
					else return 1;
				})}
			/>
		</div>
	);
}
