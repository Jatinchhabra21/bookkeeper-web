import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	OtpRequest,
	ResetPasswordRequest,
	UserPreference,
} from '../apiSlice.types';
import {
	CreateTransactionRequest,
	Transaction,
} from 'src/components/DataTable/DataTable.types';

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://bookkeeper.azurewebsites.net/api',
	prepareHeaders: (headers) => {
		const token = sessionStorage.getItem('token');
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

export const bookkeeperApi = createApi({
	baseQuery,
	tagTypes: ['Transaction'],
	endpoints: (builder) => ({
		// User
		getUser: builder.query({
			query: () => 'me/account',
		}),
		deleteUser: builder.mutation({
			query: () => 'me/account',
		}),
		updateUserPreference: builder.mutation({
			query: (request: UserPreference) => ({
				url: 'me/preference',
				body: request,
				method: 'PATCH',
			}),
		}),
		resetPassword: builder.mutation({
			query: (request: ResetPasswordRequest) => ({
				url: 'me/account/password',
				body: request,
				method: 'PATCH',
			}),
		}),
		requestAccountActivationOtp: builder.mutation({
			query: (request: OtpRequest) => ({
				url: 'otp/account/activation',
				body: request,
				method: 'POST',
			}),
		}),
		requestResetPasswordOtp: builder.mutation({
			query: (request: OtpRequest) => ({
				url: 'otp/account/reset',
				body: request,
				method: 'POST',
			}),
		}),
		// transactions CRUD
		getTransactions: builder.query<Transaction[], void>({
			query: () => ({
				url: `transactions`,
			}),
			providesTags: ['Transaction'],
		}),
		createTransactions: builder.mutation({
			query: (transaction: CreateTransactionRequest) => ({
				url: 'transactions',
				method: 'POST',
				body: transaction,
			}),
			invalidatesTags: ['Transaction'],
		}),
		updateTransaction: builder.mutation({
			query: (transaction: Transaction) => {
				return {
					url: `transactions/${transaction.id}`,
					method: 'PATCH',
					body: {
						date: transaction.date,
						name: transaction.name,
						amount: transaction.amount,
						category: transaction.category,
					},
				};
			},
			async onQueryStarted({ id, ..._patch }, { dispatch, queryFulfilled }) {
				try {
					const { data: updatedTransaction } = await queryFulfilled;
					dispatch(
						bookkeeperApi.util.updateQueryData(
							'getTransactions',
							undefined,
							(transactions) => {
								const idx = transactions.findIndex(
									(transaction) => transaction.id === updatedTransaction.id
								);
								transactions[idx].amount = updatedTransaction.amount;
								transactions[idx].date = updatedTransaction.date;
								transactions[idx].category = updatedTransaction.category;
								transactions[idx].name = updatedTransaction.name;
							}
						)
					);
				} catch { }
			},
		}),
		deleteTransaction: builder.mutation({
			query: (transactionId: string) => ({
				url: `transactions/${transactionId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Transaction'],
		}),
	}),
});

export const {
	useGetUserQuery,
	useDeleteUserMutation,
	useUpdateUserPreferenceMutation,
	useRequestAccountActivationOtpMutation,
	useRequestResetPasswordOtpMutation,
	useResetPasswordMutation,
	useGetTransactionsQuery,
	useCreateTransactionsMutation,
	useUpdateTransactionMutation,
	useDeleteTransactionMutation,
} = bookkeeperApi;
