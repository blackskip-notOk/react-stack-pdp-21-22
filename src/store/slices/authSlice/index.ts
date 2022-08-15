import { Slice } from '~/constants/systemConstants';
import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
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
	reducers: {
		setAuthData: (_, action: PayloadAction<AuthState>) => {
			return action.payload;
		},
		setAuthError: (state, action: PayloadAction<SerializedError>) => {
			state.authMessage = action.payload.message;
		},
	},
});

export const { setAuthData, setAuthError } = authSlice.actions;

export default authSlice.reducer;
