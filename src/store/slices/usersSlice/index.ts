import { Slice } from '@/constants/systemConstants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersState } from './types';

const initialState: UsersState = {
	items: [],
	totalCount: 0,
	error: null,
};

export const usersSlice = createSlice({
	name: Slice.users,
	initialState,
	reducers: {
		setUsersData: (_, action: PayloadAction<UsersState>) => {
			return action.payload;
		},
	},
});

export const { setUsersData } = usersSlice.actions;

export default usersSlice.reducer;
