import { fetchAuthApi } from '@/api/authApi';
import { AxiosError } from 'axios';
import { createEffect, createEvent, createStore } from 'effector-logger';
import { AuthResponse, AuthState, Owner } from './types';

export const autorize = createEvent<AuthState>({
	name: 'autorization check',
});

export const unautorize = createEvent<AuthState>();

const defaultAuthStore = { isAuth: false, message: '' };

export const $auth = createStore<AuthState>(defaultAuthStore, {
	name: 'authStore',
	serialize: 'ignore',
});

export const authFx = createEffect<void, AuthResponse, AxiosError>({
	name: 'fetch auth',
	handler: fetchAuthApi,
});

export const setOwner = createEvent<Owner>();

export const deleteOwner = createEvent<Owner>();

const defaultOwnerStore = { isOwner: false, ownerId: undefined };

export const $owner = createStore<Owner>(defaultOwnerStore, {
	name: 'owner',
});
