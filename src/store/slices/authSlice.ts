import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	email: string;
	name: string;
}

const initialState: AuthState = {
	email: '',
	name: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserEmail: (state, arg) => {
			return { ...state, email: arg.payload };
		},
		setUserName: (state, arg) => {
			return { ...state, name: arg.payload };
		},
	},
});

export const { setUserEmail, setUserName } = authSlice.actions;
export default authSlice.reducer;
