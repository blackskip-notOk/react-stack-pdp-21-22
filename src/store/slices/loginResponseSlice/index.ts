import { Slice } from '~/constants/systemConstants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponseState } from './types';

const initialState: LoginResponseState = {
	isNeedCaptcha: false,
};

export const loginResponseSlice = createSlice({
	name: Slice.loginResponse,
	initialState,
	reducers: {
		setLoginResponseData: (state, action: PayloadAction<LoginResponseState>) => {
			const { userId, error, isNeedCaptcha } = action.payload;
			if (userId) {
				return { ...state, userId };
			}

			return { error, isNeedCaptcha };
		},
	},
});

export const { setLoginResponseData } = loginResponseSlice.actions;

export default loginResponseSlice.reducer;
