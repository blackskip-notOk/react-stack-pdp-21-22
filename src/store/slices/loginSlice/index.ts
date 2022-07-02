import { fetchCaptcha } from '@/services/loginService';
import { Slice } from '@/constants/systemConstants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CaptchaUrlResponse, LoginFormData, LoginState, TransformLoginResponse } from './types';

const initialState: LoginState = {
	data: {
		email: '',
		password: '',
		rememberMe: true,
		captcha: '',
	},
};

export const loginSlice = createSlice({
	name: Slice.login,
	initialState,
	reducers: {
		setLoginData: (state, action: PayloadAction<LoginFormData>) => {
			state.data = action.payload;
		},
		setLoginResponse: (state, action: PayloadAction<TransformLoginResponse>) => {
			const { data, error, isNeedCaptcha } = action.payload;
			if (data) {
				return { ...state, userId: data.userId };
			}

			return { ...state, error, isNeedCaptcha };
		},
	},
	extraReducers: {
		[fetchCaptcha.fulfilled.type]: (state, action: PayloadAction<CaptchaUrlResponse>) => {
			state.captchaUrl = action.payload.url;
		},
		[fetchCaptcha.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export const { setLoginData, setLoginResponse } = loginSlice.actions;

export default loginSlice.reducer;
