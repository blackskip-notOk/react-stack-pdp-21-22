import { Slice } from '@/constants/systemConstants';
import { fetchAuth } from '@/services/authService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './types';

const initialState: AuthState = {
	isAuth: false,
	authMessage: undefined,
	data: {
		id: null,
		email: null,
		login: null,
	},
};

export const authSlice = createSlice({
	name: Slice.auth,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchAuth.fulfilled.type]: (_, action: PayloadAction<AuthState>) => {
			return action.payload;
		},
		[fetchAuth.rejected.type]: (state, action: PayloadAction<string>) => {
			state.authMessage = action.payload;
		},
	},
});

export default authSlice.reducer;
