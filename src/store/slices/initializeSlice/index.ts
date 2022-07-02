import { Slice } from '@/constants/systemConstants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitializeState } from './types';

const initialState: InitializeState = {
	initialize: false,
};

export const initializeSlice = createSlice({
	name: Slice.initialize,
	initialState,
	reducers: {
		inizialization: (state, action: PayloadAction<boolean>) => {
			state.initialize = action.payload;
		},
	},
});

export const { inizialization } = initializeSlice.actions;

export default initializeSlice.reducer;
