import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Maybe<T> = T | undefined;

export type UserState = {
	email: Maybe<string>;
	name: Maybe<string>;
	password: Maybe<string>;
	otp: Maybe<string>;
	accessToken: Maybe<string>;
	tokenId: Maybe<string>;
	isAuthenticated: boolean;
	expiresAt: Maybe<Date>;
};

const initialState: UserState = {
	email: undefined,
	name: undefined,
	password: undefined,
	otp: undefined,
	accessToken: undefined,
	tokenId: undefined,
	isAuthenticated: false,
	expiresAt: undefined,
};

type AuthenticateUser = {
	email: string;
	name: string;
	token: string;
	tokenId: string;
	isAuthenticated: boolean;
	expiresAt: Date;
};

export const UserSlice = createSlice({
	name: 'UnauthenticatedUser',
	initialState,
	reducers: {
		setUserDetails: (state, action: PayloadAction<Maybe<UserState>>) => {
			return {
				...state,
				state: action.payload
					? { ...action.payload }
					: {
							email: undefined,
							name: undefined,
							password: undefined,
							otp: undefined,
						},
			};
		},
		setOtp: (state, action: PayloadAction<string>) => {
			return {
				...state,
				otp: action.payload,
			};
		},
		setEmail: (state, action: PayloadAction<string>) => {
			return {
				...state,
				email: action.payload,
			};
		},
		setIsUserAuthenticated: (
			state,
			action: PayloadAction<AuthenticateUser>
		) => {
			return {
				...state,
				email: action.payload.email,
				isAuthenticated: action.payload.isAuthenticated,
				name: action.payload.name,
				accessToken: action.payload.token,
				tokenId: action.payload.tokenId,
				expiresAt: action.payload.expiresAt,
			};
		},
	},
});

export const { setUserDetails, setOtp, setEmail, setIsUserAuthenticated } =
	UserSlice.actions;
export default UserSlice.reducer;
