import { storeSelector } from './index';
import { createSelector } from '@reduxjs/toolkit';

export const loginRequestStateSelector = createSelector(
	storeSelector,
	(state) => state.loginRequest,
);
export const loginResponseStateSelector = createSelector(
	storeSelector,
	(state) => state.loginResponse,
);
export const captchaStateSelector = createSelector(storeSelector, (state) => state.captcha);
