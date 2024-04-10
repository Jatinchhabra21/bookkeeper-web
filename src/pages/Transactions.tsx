import { columns } from '../components/DataTable/Columns';
import { useGetTransactionsQuery } from '../store/slices/apiSlice';

import logo from '../../public/assets/images/No data-cuate.svg';
import { lazy } from 'react';
import { DataTableType } from '../components/DataTable/DataTable';
import TransactionSheet from '../components/transaction-sheet/TransactionSheet';

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
		<div className="flex flex-col gap-6 my-8 mx-auto w-11/12 h-full sm:gap-8 sm:my-16 md:w-3/4 lg:my-8 xl:w-[800px]">
			{transactions?.length && (
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-extralight md:text-3xl xl:text-4xl text-slate-400">
						{'Transactions'}
					</h1>
					<TransactionSheet mode="Add" />
				</div>
			)}
			<div className="flex flex-col gap-6 justify-between h-full">
				{sortedTransactions?.length && (
					<DataTable columns={columns} data={sortedTransactions} />
				)}
			</div>
			{!transactions?.length && !isTransactionsFetching && (
				<div className="flex flex-col justify-center items-center w-full h-full">
					<img src={logo} className="w-96" />
					<span className="text-3xl">No transactions found for you</span>
				</div>
			)}
		</div>
	);
}
