import { Slice } from '~/constants/systemConstants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileStatusState } from './types';

const initialState: ProfileStatusState = {
	status: '',
};

export const profileStatusSlice = createSlice({
	name: Slice.status,
	initialState,
	reducers: {
		setProfileStatus: (_, action: PayloadAction<ProfileStatusState>) => {
			return action.payload;
		},
	},
});

export const { setProfileStatus } = profileStatusSlice.actions;

export default profileStatusSlice.reducer;
