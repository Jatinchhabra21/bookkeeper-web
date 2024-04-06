import { ColumnDef, Row } from '@tanstack/react-table';
import { MONTH, Transaction, TransactionType } from './DataTable.types';
import { Badge } from '../../../components/ui/badge';

export const columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: 'date',
		header: '',
		cell: ({ row }) => {
			const date = new Date(row.getValue('date'));
			return (
				<span className="flex w-fit flex-col items-center justify-center text-ellipsis uppercase">
					<span className="text-xs">{MONTH[date.getMonth()]}</span>
					<span className="text-xl">
						{date.getDate() < 10
							? '0' + date.getDate().toString()
							: date.getDate()}
					</span>
				</span>
			);
		},
		filterFn: (row: Row<Transaction>, columnId: string, filterValue: any) => {
			const date = new Date(row.getValue('date'));
			const currentDate = new Date();
			if (filterValue === 'This month') {
				return date.getMonth() === currentDate.getMonth();
			} else if (filterValue === 'Last month') {
				return currentDate.getMonth() - 1 < 0
					? date.getMonth() === 12 &&
							date.getFullYear() === currentDate.getFullYear() - 1
					: date.getMonth() === currentDate.getMonth() - 1;
			} else if (filterValue === 'Last 30 days') {
				const minimumDate = new Date();
				minimumDate.setDate(currentDate.getDate() - 30);
				return date >= minimumDate && date <= currentDate;
			}
			return true;
		},
	},
	{
		accessorKey: 'name',
		header: '',
		id: 'name',
		cell: ({ row }) => (
			<span className="text-sm sm:text-base">{row.getValue('name')}</span>
		),
		filterFn: 'includesString',
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
		filterFn: 'equalsString',
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
