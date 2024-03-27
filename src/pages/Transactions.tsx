import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable/DataTable';
import { columns } from '../components/DataTable/Columns';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationEllipsis,
} from '../../components/ui/pagination';
import { useGetTransactionsQuery } from '../store/slices/apiSlice';

import logo from '../../public/assets/images/No data-cuate.svg';

export default function Transactions() {
	const [page, setPage] = useState<number>(1);
	const { data: transactions, isFetching: isTransactionsFetching } =
		useGetTransactionsQuery(page);

	useEffect(() => {
		console.log(transactions);
	}, [isTransactionsFetching]);

	const getPagesForPagination = () => {
		if (transactions?.pageCount <= 10) {
			return Array.from(
				{ length: transactions?.pageCount - 1 },
				(_, i) => i + 2
			);
		} else {
			if (page < 3) {
				return Array.from({ length: 4 }, (_, i) => i + 2);
			} else if (transactions?.pageCount - page <= 3) {
				return Array.from(
					{ length: 4 },
					(_, i) => transactions?.pageCount - i - 1
				).reverse();
			} else {
				return [page - 2, page - 1, page, page + 1, page + 2];
			}
		}
	};

	return (
		<div className="mx-auto my-8 flex h-full w-11/12 flex-col gap-6 sm:my-16 sm:gap-8 md:w-3/4 lg:my-8 xl:w-2/5">
			<h1 className="text-2xl font-extralight text-slate-400 md:text-3xl xl:text-4xl">
				{'Transactions'}
			</h1>
			<div className="flex h-full flex-col justify-between gap-6">
				{transactions?.data && (
					<DataTable columns={columns} data={transactions.data} />
				)}
				{transactions?.pageCount > 0 && (
					<Pagination>
						<PaginationContent>
							{transactions?.pageCount > 1 && (
								<PaginationItem>
									<PaginationLink
										className="text-xs sm:text-sm"
										onClick={() => setPage(1)}
										isActive={page === 1}
										href="#"
									>
										1
									</PaginationLink>
								</PaginationItem>
							)}
							{transactions?.pageCount > 1 && page - 1 > 3 && (
								<PaginationItem>
									<PaginationEllipsis className="text-xs sm:text-sm" />
								</PaginationItem>
							)}
							{getPagesForPagination().map((pageNumber) => {
								return (
									<PaginationItem>
										<PaginationLink
											className="text-xs sm:text-sm"
											onClick={() => setPage(pageNumber)}
											isActive={page === pageNumber}
											href="#"
										>
											{pageNumber}
										</PaginationLink>
									</PaginationItem>
								);
							})}
							{transactions?.pageCount > 10 &&
								transactions?.pageCount - page > 3 && (
									<PaginationItem>
										<PaginationEllipsis className="text-xs sm:text-sm" />
									</PaginationItem>
								)}
							{transactions?.pageCount > 10 && (
								<PaginationItem>
									<PaginationLink
										className="text-xs sm:text-sm"
										onClick={() => setPage(transactions?.pageCount)}
										isActive={page === transactions?.pageCount}
										href="#"
									>
										{transactions?.pageCount}
									</PaginationLink>
								</PaginationItem>
							)}
						</PaginationContent>
					</Pagination>
				)}
			</div>
			{!transactions?.data && !isTransactionsFetching && (
				<div className="flex h-full w-full flex-col items-center justify-center">
					<img src={logo} className="w-96" />
					<span className="text-3xl">No transactions found for you</span>
				</div>
			)}
		</div>
	);
}
