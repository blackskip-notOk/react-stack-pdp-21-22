import { fetchProfileApi } from '@/api/profileApi';
import { createEffect, createEvent, createStore } from 'effector';
import { ProfileError, ProfileResponse, UserId } from './types';
import { AxiosError } from 'axios';

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
	handler: fetchProfileApi,
});

export const setProfileError = createEvent<AxiosError>();
export const unSetProfileError = createEvent<null>();

export const $profileError = createStore<ProfileError | null>(null, {
	name: 'profileErrorStore',
});
