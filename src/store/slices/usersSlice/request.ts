import { Slice } from '@/constants/systemConstants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersRequestState } from './types';

const initialState: UsersRequestState = {
	count: 10,
	page: 1,
};

export const usersRequestSlice = createSlice({
	name: Slice.usersRequest,
	initialState,
	reducers: {
		setUsersRequest: (_, action: PayloadAction<UsersRequestState>) => {
			return action.payload;
		},
	},
});

export const { setUsersRequest } = usersRequestSlice.actions;

export default usersRequestSlice.reducer;
