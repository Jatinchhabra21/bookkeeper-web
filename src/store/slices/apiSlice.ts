import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
	CreateUserRequest,
	ErrorResponseType,
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
		createUser: builder.mutation({
			query: (request: CreateUserRequest) => ({
				url: 'users/new',
				body: request,
				method: 'POST',
			}),
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
		// AUTH
		getAccessToken: builder.mutation({
			query: (request: LoginRequestType) => ({
				url: 'oauth2/token',
				body: request,
				method: 'POST',
			}),
			transformResponse: (response: LoginResponseType) => {
				Cookies.set('token', response.accessToken, {
					expires: 14,
					secure: true,
				});
			},
		}),
	}),
});

export const {
	useGetUserQuery,
	useDeleteUserMutation,
	useCreateUserMutation,
	useUpdateUserPreferenceMutation,
	useRequestAccountActivationOtpMutation,
	useRequestResetPasswordOtpMutation,
	useResetPasswordMutation,
	useGetAccessTokenMutation,
} = bookkeeperApi;
