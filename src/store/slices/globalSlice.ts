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
		toggleIsSignUpDialogVisible: (state) => {
			return { ...state, isSignUpDialogVisible: !state.isSignUpDialogVisible };
		},
		toggleIsLogInDialogVisible: (state) => {
			return { ...state, isLogInDialogVisible: !state.isLogInDialogVisible };
		},
	},
});

export const { toggleIsSignUpDialogVisible, toggleIsLogInDialogVisible } =
	globalSlice.actions;
export default globalSlice.reducer;
