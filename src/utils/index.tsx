import { SyntheticEvent } from 'react';
import { AuthResponse, AuthState } from '../models/auth/types';
import { SERVER_MESSAGES, SERVER_MESSAGES_DESCRIPTIONS } from '../constants/serverMessages';
import { RESPONSE_STATUSES, RESULT_CODES, SESSION_STORAGE } from '../constants/systemConstants';
import { LoginResponse, TransformLoginResponse } from '../models/login/types';
import { FollowResponse, FollowResult, UsersRequest } from '@/models/users/types';
import { authFx, initialize } from '@/models/auth';
import { AxiosResponse } from 'axios';
import { isEmpty } from 'ramda';
import { ClearObject } from './types';

export const preventDefault = (event: SyntheticEvent) => {
	event.preventDefault();
};

export const getInitialization = () => {
	const authorization = authFx();

	Promise.all([authorization])
		.then(() => {
			initialize({ initialize: true });
		})
		.catch((err) => console.error(SERVER_MESSAGES_DESCRIPTIONS.failedInitialization, err));
};

export const getAuthResponse = (authResponse: AuthResponse): AuthState => {
	if (authResponse.status === RESPONSE_STATUSES.success) {
		const { authInfo } = authResponse;
		const { success, error } = RESULT_CODES;

		if (authInfo.resultCode === error) {
			return { isAuth: false, message: authInfo.messages[0] };
		}

		if (authInfo.resultCode === success) {
			return { isAuth: true, message: authInfo.messages[0], ownerId: authInfo.data.id };
		}
	}

	return { isAuth: false, message: SERVER_MESSAGES_DESCRIPTIONS.someError };
};

export const transformLoginResponse = (response: LoginResponse): TransformLoginResponse => {
	const { resultCode, data, messages } = response;
	const [message] = messages;

	const { error, secure } = RESULT_CODES;

	if (resultCode === error) {
		return {
			error: SERVER_MESSAGES_DESCRIPTIONS.wrongLogin,
			isNeedCaptcha: false,
		};
	}
	if (resultCode === secure) {
		const errorMessage =
			message === SERVER_MESSAGES.MAX_ATTEMPT
				? SERVER_MESSAGES_DESCRIPTIONS.maxAttempt
				: message === SERVER_MESSAGES.WRONG_LOGIN
				? SERVER_MESSAGES_DESCRIPTIONS.wrongLogin
				: SERVER_MESSAGES_DESCRIPTIONS.someError;

		return {
			error: errorMessage,
			isNeedCaptcha: true,
		};
	}

	return { data };
};

export const getLoginResponse = (clockData: TransformLoginResponse): TransformLoginResponse => ({
	data: clockData.data,
	error: clockData.error,
	isNeedCaptcha: clockData.isNeedCaptcha,
});

export const getIsNeedCaptcha = (clockData: TransformLoginResponse): boolean =>
	!!clockData.isNeedCaptcha;

export const getIsAuth = (clockData: TransformLoginResponse): AuthState => ({
	isAuth: !!clockData.data,
	message: clockData.data ? SERVER_MESSAGES.AUTORIZATION_SUCCESS : SERVER_MESSAGES.NOT_AUTHORIZED,
	ownerId: clockData.data ? clockData.data.userId : undefined,
});

export const resetIsAuth = (): AuthState => ({
	isAuth: false,
	message: SERVER_MESSAGES.LOGOUT,
	ownerId: undefined,
});

export const saveSessionParams = (params: UsersRequest): void => {
	const savedRequestParams = JSON.stringify({ ...params });
	sessionStorage.setItem(SESSION_STORAGE.USERS_REQUEST_PARAMS, savedRequestParams);
};

export const getFollowResult = (
	response: AxiosResponse<FollowResponse> | undefined,
	user: string,
	isFollow: boolean,
): FollowResult => {
	if (!response) {
		return {
			isSuccess: false,
			message: SERVER_MESSAGES_DESCRIPTIONS.someError,
		};
	}

	const { data, status } = response;

	const successMessage = `${
		isFollow
			? SERVER_MESSAGES_DESCRIPTIONS.successFollow
			: SERVER_MESSAGES_DESCRIPTIONS.successUnFollow
	} ${user}`;

	const unSuccessMessage = `${
		isFollow
			? SERVER_MESSAGES_DESCRIPTIONS.alreadyFollow
			: SERVER_MESSAGES_DESCRIPTIONS.alreadyUnFollow
	}`;

	if (status === RESPONSE_STATUSES.success) {
		if (data.resultCode === RESULT_CODES.success) {
			return {
				isSuccess: true,
				message: successMessage,
			};
		}
		if (data.resultCode === RESULT_CODES.error) {
			const errorMessage =
				data.messages.join() ===
				(SERVER_MESSAGES.ALREADY_UNFOLLOW || SERVER_MESSAGES.ALREADY_FOLLOW)
					? unSuccessMessage
					: SERVER_MESSAGES_DESCRIPTIONS.someError;

			return {
				isSuccess: false,
				message: errorMessage,
			};
		}
	}
	return {
		isSuccess: false,
		message: SERVER_MESSAGES_DESCRIPTIONS.someError,
	};
};

export function* idGenerator() {
	let id = 0;
	while (true) yield id++;
}

export const clearObject: ClearObject = (obj) => {
	const result = {} as Record<string, string>;

	for (const key in obj) {
		if (Object.hasOwn(obj, key)) {
			const param = obj[key];
			if (param !== null) {
				result[key] = param;
			}
		}
	}

	return isEmpty(result) ? null : result;
};

const getBooleanParam = (param: boolean | undefined): string | null => {
	if (param) {
		return '1';
	}

	return param === undefined ? null : '0';
};

export const searchParamsSerializer = (params: UsersRequest): Record<string, string> | null => {
	const { page, count, term, friend } = params;

	const urlParams = {
		page: page === 1 ? null : String(page),
		count: count === 10 ? null : String(count),
		term: term ? term : null,
		friend: getBooleanParam(friend),
	};

	return clearObject(urlParams);
};

export const getSearchParamsFromUrl = (
	params: Record<string, string>,
): Partial<UsersRequest> | null => {
	if (isEmpty(params)) {
		return null;
	}

	const { page, count, term, friend } = params;

	const getFriendParam = (param?: string) => {
		if (param === undefined) {
			return undefined;
		}

		return param === '1';
	};

	const result = {
		page: page ? Number(page) : undefined,
		count: count ? Number(count) : undefined,
		term: term || undefined,
		friend: getFriendParam(friend),
	};

	return result;
};

export const getFriendParam = (param: string): boolean | undefined => {
	if (!param || param === 'all') {
		return undefined;
	}

	return param === 'friends';
};

export function* idGenerator() {
	let id = 0;
	while (true) yield id++;
}