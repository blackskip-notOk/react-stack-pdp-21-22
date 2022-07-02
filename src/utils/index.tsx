import { SyntheticEvent } from 'react';
import { ServerMessage, Description } from '../constants/serverMessages';
import { ResponseStatus, ReultCode, SESSION_STORAGE } from '../constants/systemConstants';
import { FollowResponse, FollowResult, UsersRequest } from '@/models/users/types';
import { AxiosResponse } from 'axios';
import { isEmpty } from 'ramda';
import { ClearObject } from './types';

export const preventDefault = (event: SyntheticEvent) => {
	event.preventDefault();
};

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
			message: Description.someError,
		};
	}

	const { data, status } = response;

	const successMessage = `${
		isFollow ? Description.successFollow : Description.successUnFollow
	} ${user}`;

	const unSuccessMessage = `${isFollow ? Description.alreadyFollow : Description.alreadyUnFollow}`;

	if (status === ResponseStatus.success) {
		if (data.resultCode === ReultCode.success) {
			return {
				isSuccess: true,
				message: successMessage,
			};
		}
		if (data.resultCode === ReultCode.error) {
			const errorMessage =
				data.messages.join() === (ServerMessage.alreadyUnfollow || ServerMessage.alreadyFollow)
					? unSuccessMessage
					: Description.someError;

			return {
				isSuccess: false,
				message: errorMessage,
			};
		}
	}
	return {
		isSuccess: false,
		message: Description.someError,
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
