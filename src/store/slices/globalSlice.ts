import { createSlice } from '@reduxjs/toolkit';

interface GlobalState {
	isSignUpDialogVisible: boolean;
	isLogInDialogVisible: boolean;
}

const initialState: GlobalState = {
	isSignUpDialogVisible: false,
	isLogInDialogVisible: false,
};

export const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setIsSignUpVisible: (state, { payload }) => {
			return { ...state, isSignUpDialogVisible: payload };
		},
		setIsLogInVisible: (state, { payload }) => {
			return { ...state, isLogInDialogVisible: payload };
		},
	},
});

export const { setIsSignUpVisible, setIsLogInVisible } = globalSlice.actions;
export default globalSlice.reducer;
