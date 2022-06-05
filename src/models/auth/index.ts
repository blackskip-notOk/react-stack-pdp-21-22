import { AxiosError } from 'axios';
import { createEffect, createEvent, createStore } from 'effector';
import { AuthResponse, AuthState, Initialization } from './types';

export const initializeFx = createEffect<void, void, void>({
	name: 'fetch initialization',
});

export const initialize = createEvent<Initialization>();
export const unInitialize = createEvent<Initialization>();

const defaultInitializedStore = { initialize: false };

export const $initialization = createStore<Initialization>(defaultInitializedStore, {
	name: 'initialize store',
});

export const authFx = createEffect<void, AuthResponse, AxiosError>({
	name: 'fetch auth',
});

export const autorize = createEvent<AuthState>({
	name: 'autorization check',
});
export const unautorize = createEvent<AuthState>();

const defaultAuthStore = { isAuth: false, message: '' };

export const $auth = createStore<AuthState>(defaultAuthStore, {
	name: 'authStore',
	serialize: 'ignore',
});

export const setAuthLoading = createEvent<boolean>();

export const unSetAuthLoading = createEvent<boolean>();

export const $authLoading = createStore<boolean>(true, {
	name: 'loading auth data',
});
