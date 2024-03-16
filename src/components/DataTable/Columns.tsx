import { ColumnDef } from '@tanstack/react-table';
import { MONTH, Transaction, TransactionType } from './DataTable.types';

export const columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: 'date',
		header: '',
		cell: ({ row }) => (
			<div className="flex flex-col items-center text-ellipsis uppercase">
				<span className="text-xs">
					{MONTH[(row.getValue('date') as Date).getMonth()]}
				</span>
				<span className="text-xl">
					{(row.getValue('date') as Date).getDate() < 10
						? '0' + (row.getValue('date') as Date).getDate().toString()
						: (row.getValue('date') as Date).getDate()}
				</span>
			</div>
		),
	},
	{
		accessorKey: 'name',
		header: '',
		id: 'name',
	},
	{
		accessorKey: 'amount',
		header: '',
		id: 'amount',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'));
			const formatted = new Intl.NumberFormat('en-IN', {
				style: 'currency',
				currency: 'INR',
			}).format(amount);

			return (
				<div
					className={`text-ellipsis text-right text-lg font-medium ${row.original.type === TransactionType.DEBIT ? 'text-red-400' : 'text-green-400'}`}
				>
					{formatted}
				</div>
			);
		},
	},
];
