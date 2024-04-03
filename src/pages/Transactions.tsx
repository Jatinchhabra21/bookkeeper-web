import { columns } from '../components/DataTable/Columns';
import { useGetTransactionsQuery } from '../store/slices/apiSlice';

import logo from '../../public/assets/images/No data-cuate.svg';
import { lazy } from 'react';
import { DataTableType } from '../components/DataTable/DataTable';

const DataTable = lazy(
	() => import('../components/DataTable/DataTable')
) as DataTableType;

export default function Transactions() {
	const { data: transactions, isFetching: isTransactionsFetching } =
		useGetTransactionsQuery();
	const sortedTransactions = transactions
		?.slice()
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return (
		<div className="mx-auto my-8 flex h-full w-11/12 flex-col gap-6 sm:my-16 sm:gap-8 md:w-3/4 lg:my-8 xl:w-2/5">
			{transactions?.length && (
				<h1 className="text-2xl font-extralight text-slate-400 md:text-3xl xl:text-4xl">
					{'Transactions'}
				</h1>
			)}
			<div className="flex h-full flex-col justify-between gap-6">
				{sortedTransactions?.length && (
					<DataTable columns={columns} data={sortedTransactions} />
				)}
			</div>
			{!transactions?.length && !isTransactionsFetching && (
				<div className="flex h-full w-full flex-col items-center justify-center">
					<img src={logo} className="w-96" />
					<span className="text-3xl">No transactions found for you</span>
				</div>
			)}
		</div>
	);
}
