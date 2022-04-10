import { AxiosError } from 'axios';
import { createEffect, createEvent, createStore, restore } from 'effector';
import { CaptchaUrlResponse, LoginFormData, LoginResponse, TransformLoginResponse } from './types';

export const loginFx = createEffect<LoginFormData, LoginResponse, AxiosError>({
	name: 'fetch login',
});

export const $serverSideError = restore(loginFx.failData, null);

export const $loginResponse = createStore<TransformLoginResponse>(
	{},
	{
		name: 'login store',
	},
);

export const getCaptchaTrigger = createEvent<boolean>({
	name: 'trigger get captcha effect',
});

export const getCaptchaFx = createEffect<boolean, CaptchaUrlResponse | null, AxiosError>({
	name: 'get captcha url',
});

export const $captchaUrl = createStore<CaptchaUrlResponse | null>(null, {
	name: 'captcha url',
});
