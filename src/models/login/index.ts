import { AxiosError } from 'axios';
import { createEffect, createEvent, createStore, restore } from "effector-logger";
import { CaptchaUrlResponse, LoginError, LoginFormData, LoginResponse, Owner } from "./types";

const defaultStore = {
    isOwner: false,
    ownerId: null
};

export const loginFx = createEffect<LoginFormData, LoginResponse, AxiosError>(
	{ name: 'fetch login' }
);

export const $serverSideError = restore(loginFx.failData, null);

export const checkLoginResponse = createEvent<LoginResponse>({
    name: 'check login response'
});

export const setLoginError = createEvent<LoginError>({
    name: 'set login error'
});
export const unSetLoginError = createEvent<LoginError>();

export const $loginError = createStore<LoginError>({}, {
    name: 'login error'
});

export const getCaptchaFx = createEffect<null, CaptchaUrlResponse, AxiosError>(
    { name: 'get captcha url'}
);

export const $captchaUrl = createStore<CaptchaUrlResponse>({url: ''}, {
    name: 'captcha url'
});

export const $loginResponse = createStore<LoginResponse | null>(null, { name: 'login response', });

export const setOwner = createEvent<Owner>();
export const deleteOwner = createEvent<Owner>();

export const $owner = createStore<Owner>(defaultStore);

