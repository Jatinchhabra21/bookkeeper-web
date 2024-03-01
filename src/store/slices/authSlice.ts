import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Maybe<T> = T | undefined;

type AuthState = {
	signUpDetails: SignUpDetailsType;
};

export type SignUpDetailsType = {
	email: Maybe<string>;
	name: Maybe<string>;
	password: Maybe<string>;
};

const initialState: AuthState = {
	signUpDetails: {} as SignUpDetailsType,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setSignUpDetails: (
			state,
			action: PayloadAction<Maybe<SignUpDetailsType>>
		) => {
			return {
				...state,
				signUpDetails: action.payload
					? { ...action.payload }
					: { email: undefined, name: undefined, password: undefined },
			};
		},
	},
});

export const { setSignUpDetails } = authSlice.actions;
export default authSlice.reducer;
