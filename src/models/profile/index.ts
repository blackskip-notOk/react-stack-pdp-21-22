import { createEffect, createEvent, createStore } from 'effector';
import { ProfileResponse, UserId } from './types';
import { AxiosError } from 'axios';
import { BaseError } from '../types';

const defaultProfileStore = {
	userId: undefined,
	lookingForAJob: false,
	lookingForAJobDescription: undefined,
	fullName: undefined,
	contacts: {
		github: undefined,
		vk: undefined,
		facebook: undefined,
		instagram: undefined,
		twitter: undefined,
		website: undefined,
		youtube: undefined,
		mainLink: undefined,
	},
	photos: { small: null, large: null },
};

export const $profile = createStore<ProfileResponse>(defaultProfileStore, {
	name: 'profileStore',
});

export const getProfileFx = createEffect<UserId | undefined, ProfileResponse, AxiosError>({
	name: 'fetch profile',
});

export const setProfileError = createEvent<AxiosError>();
export const unSetProfileError = createEvent<null>();

export const $profileError = createStore<BaseError | null>(null, {
	name: 'profileErrorStore',
});

export const setProfileLoading = createEvent<boolean>();

export const unSetProfileLoading = createEvent<boolean>();

export const $profileLoading = createStore<boolean>(false, {
	name: 'loading profile data',
});
