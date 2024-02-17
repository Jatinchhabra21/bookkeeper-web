import { createSlice } from '@reduxjs/toolkit';

interface GlobalState {
	isNavExpanded: boolean;
}

const initialState: GlobalState = {
	isNavExpanded: false,
};

export const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		toggleIsNavExpanded: (state) => {
			return { ...state, isNavExpanded: !state.isNavExpanded };
		},
	},
});

export const { toggleIsNavExpanded } = globalSlice.actions;
export default globalSlice.reducer;
