import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Maybe<T> = T | undefined;

export type UnauthenticatedUserState = {
	email: Maybe<string>;
	name: Maybe<string>;
	password: Maybe<string>;
	otp: Maybe<string>;
};

const initialState: UnauthenticatedUserState = {
	email: undefined,
	name: undefined,
	password: undefined,
	otp: undefined,
};

export const UnauthenticatedUserSlice = createSlice({
	name: 'UnauthenticatedUser',
	initialState,
	reducers: {
		setUserDetails: (
			state,
			action: PayloadAction<Maybe<UnauthenticatedUserState>>
		) => {
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
	},
});

export const { setUserDetails, setOtp, setEmail } =
	UnauthenticatedUserSlice.actions;
export default UnauthenticatedUserSlice.reducer;
