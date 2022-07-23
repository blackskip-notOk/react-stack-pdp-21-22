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
		setRequestPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setRequestCount: (state, action: PayloadAction<number>) => {
			state.count = action.payload;
		},
		setRequestTerm: (state, action: PayloadAction<string>) => {
			state.term = action.payload;
		},
		setRequestFriend: (state, action: PayloadAction<boolean>) => {
			state.friend = action.payload;
		},
	},
});

export const {
	setUsersRequest,
	setRequestPage,
	setRequestCount,
	setRequestTerm,
	setRequestFriend,
} = usersRequestSlice.actions;

export default usersRequestSlice.reducer;
