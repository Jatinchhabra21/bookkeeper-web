import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	CreateUserRequest,
	OtpRequest,
	ResetPasswordRequest,
	UserPreference,
} from '../apiSlice.types';

export const bookkeeperApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://bookkeeper.azurewebsites.net/api',
	}),
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
} = bookkeeperApi;
