import { AxiosError } from 'axios';
import { createEffect, createEvent, createStore } from 'effector';
import { BaseError } from '../types';
import { UsersRequest, UsersResponse } from './types';

const defaultUsersStore = {
	items: [],
	totalCount: 10,
	error: null,
};

export const $users = createStore<UsersResponse>(defaultUsersStore, {
	name: 'usersStore',
});
export const getUsersFx = createEffect<UsersRequest, UsersResponse, AxiosError>({
	name: 'fetch users',
});

export const setUsersError = createEvent<AxiosError>();
export const unSetUsersError = createEvent<null>();
export const $usersError = createStore<BaseError | null>(null, {
	name: 'usersErrorStore',
});

export const setUsersLoading = createEvent<boolean>();
export const unSetUsersLoading = createEvent<boolean>();
export const $usersLoading = createStore<boolean>(false, {
	name: 'loading users',
});

const defaultUsersRequestParams = {
	count: 10,
	page: 1,
};

export const setUsersRequestParams = createEvent<UsersRequest>();
export const unSetUsersRequestParams = createEvent<UsersRequest>();
export const $usersRequestParams = createStore<UsersRequest>(defaultUsersRequestParams, {
	name: 'users request params',
});
