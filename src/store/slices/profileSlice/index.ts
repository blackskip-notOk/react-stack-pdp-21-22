import { Slice } from '@/constants/systemConstants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState } from './types';

const initialState: ProfileState = {
	userId: undefined,
	lookingForAJob: false,
	lookingForAJobDescription: undefined,
	fullName: undefined,
	contacts: {
		github: undefined,
		vk: undefined,
		facebook: undefined,
		instagram: undefined,
		twitter: undefined,
		website: undefined,
		youtube: undefined,
		mainLink: undefined,
	},
	photos: { small: null, large: null },
};

export const profileSlice = createSlice({
	name: Slice.profile,
	initialState,
	reducers: {
		setProfileData: (_, action: PayloadAction<ProfileState>) => {
			return action.payload;
		},
	},
});

export const { setProfileData } = profileSlice.actions;

export default profileSlice.reducer;
