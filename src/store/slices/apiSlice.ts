import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	OtpRequest,
	ResetPasswordRequest,
	UserPreference,
} from '../apiSlice.types';
import { Transaction } from 'src/components/DataTable/DataTable.types';

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
} = bookkeeperApi;
