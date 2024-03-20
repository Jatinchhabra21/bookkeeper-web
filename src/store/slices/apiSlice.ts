import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	CreateUserRequest,
	OtpRequest,
	ResetPasswordRequest,
	UserPreference,
	LoginRequestType,
	LoginResponseType,
} from '../apiSlice.types';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://bookkeeper.azurewebsites.net/api',
	prepareHeaders: (headers) => {
		const token = Cookies.get('token');

		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

export const bookkeeperApi = createApi({
	baseQuery,
	endpoints: (builder) => ({
		// USER
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
	}),
});

export const {
	useGetUserQuery,
	useDeleteUserMutation,
	useUpdateUserPreferenceMutation,
	useRequestAccountActivationOtpMutation,
	useRequestResetPasswordOtpMutation,
	useResetPasswordMutation,
} = bookkeeperApi;
