import { ColumnDef } from '@tanstack/react-table';
import { MONTH, Transaction, TransactionType } from './DataTable.types';
import { Badge } from '../../../components/ui/badge';

export const columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: 'date',
		header: '',
		cell: ({ row }) => {
			const date = new Date(row.getValue('date'));
			return (
				<div className="flex flex-col justify-center text-ellipsis uppercase">
					<span className="text-xs">{MONTH[date.getMonth()]}</span>
					<span className="text-xl">
						{date.getDate() < 10
							? '0' + date.getDate().toString()
							: date.getDate()}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'name',
		header: '',
		id: 'name',
		cell: ({ row }) => (
			<span className="text-sm sm:text-base">{row.getValue('name')}</span>
		),
	},
	{
		accessorKey: 'category',
		header: '',
		id: 'category',
		cell: ({ row }) => {
			return row.original.type === 'debit' ? (
				<Badge variant={'default'}>{row.getValue('category')}</Badge>
			) : (
				<></>
			);
		},
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
