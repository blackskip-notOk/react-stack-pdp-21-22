import { AxiosError } from 'axios';
import { createEffect, createEvent, createStore } from "effector-logger";
import { AuthResponse, AuthState } from "./types";

export const autorize = createEvent<AuthState>({
	name: 'autorization check'
});
export const unautorize = createEvent<AuthState>();

const defaultStore = { isAuth: false, message: '' };

export const $auth = createStore<AuthState>(defaultStore, {
	name: 'authStore',
	serialize: 'ignore',
});

export const authFx = createEffect<void, AuthResponse, AxiosError>(
	{ name: 'fetch auth' }
);