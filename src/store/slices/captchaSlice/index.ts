import { Slice } from '@/constants/systemConstants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CaptchaState } from './types';

const initialState: CaptchaState = {
	captchaUrl: '',
};

export const captchaSlice = createSlice({
	name: Slice.captcha,
	initialState,
	reducers: {
		setCaptchaData: (state, action: PayloadAction<CaptchaState>) => action.payload,
	},
});

export const { setCaptchaData } = captchaSlice.actions;

export default captchaSlice.reducer;
