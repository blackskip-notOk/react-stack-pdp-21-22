import { Slice } from '@/constants/systemConstants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginRequestState } from './types';

export const initialState: LoginRequestState = {
	email: '',
	password: '',
	rememberMe: true,
	captcha: '',
};

export const loginRequestSlice = createSlice({
	name: Slice.loginRequest,
	initialState,
	reducers: {
		setLoginRequestData: (_, action: PayloadAction<LoginRequestState>) => {
			return action.payload;
		},
	},
});

export const { setLoginRequestData } = loginRequestSlice.actions;

export default loginRequestSlice.reducer;
