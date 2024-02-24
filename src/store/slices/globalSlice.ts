import { createSlice } from '@reduxjs/toolkit';

interface GlobalState {
	isSignUpDialogVisible: boolean;
}

const initialState: GlobalState = {
	isSignUpDialogVisible: false,
};

export const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		toggleIsSignUpDialogVisible: (state) => {
			return { ...state, isSignUpDialogVisible: !state.isSignUpDialogVisible };
		},
	},
});

export const { toggleIsSignUpDialogVisible } = globalSlice.actions;
export default globalSlice.reducer;
