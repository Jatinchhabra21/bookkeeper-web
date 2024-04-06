import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
} from '../../../components/ui/pagination';
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from '../../../components/ui/table';
import { useEffect, useState } from 'react';
import { Input } from '../../../components/ui/input';
import OptionSelect from '../option-select/OptionSelect';
import { TransactionCategory } from './DataTable.types';

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
};

export type PaginationState = {
	pageIndex: number;
	pageSize: number;
};

export default function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const [category, setCategory] = useState<string | null | undefined>();
	const [time, setTime] = useState<string | null | undefined>();

	useEffect(() => {
		table.getColumn('category')?.setFilterValue(category);
	}, [category]);

	useEffect(() => {
		table.getColumn('date')?.setFilterValue(time);
	}, [time]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			pagination,
		},
	});

	return (
		<div className="flex flex-col justify-between gap-6">
			<div className="flex flex-col justify-between gap-4 lg:flex-row">
				<Input
					placeholder="Filter transactions..."
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
					className="w-full lg:max-w-sm"
				/>
				<div className="flex justify-end gap-6">
					<OptionSelect
						ctaText="Time"
						options={['This month', 'Last month', 'Last 30 days']}
						setOption={setTime}
						option={time}
					/>
					<OptionSelect
						ctaText="Category"
						options={Object.values(TransactionCategory)}
						setOption={setCategory}
						option={category}
					/>
				</div>
			</div>
			<div className="rounded-md border text-white">
				<Table>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="z-0">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div>
				<Pagination className="flex justify-end">
					<PaginationContent className="flex gap-6">
						<PaginationItem>
							<PaginationPrevious
								className={`cursor-pointer ${!table.getCanPreviousPage() ? 'cursor-not-allowed text-slate-700 hover:text-slate-600' : ''}`}
								aria-disabled={table.getCanPreviousPage()}
								onClick={() => table.previousPage()}
							/>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext
								className={`cursor-pointer ${!table.getCanNextPage() ? 'cursor-not-allowed text-slate-700 hover:text-slate-600' : ''}`}
								aria-disabled={table.getCanNextPage()}
								onClick={() => table.nextPage()}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}

export type DataTableType = typeof DataTable;
