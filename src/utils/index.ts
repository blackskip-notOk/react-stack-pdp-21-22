import { SyntheticEvent } from 'react';
import { ServerMessage, Description } from '../constants/serverMessages';
import { ReultCode } from '../constants/systemConstants';
import { FollowResponse, FollowResult, UsersRequestState } from '~/store/slices/usersSlice/types';
import { isEmpty } from 'ramda';
import { ClearObject } from './types';

export const preventDefault = (event: SyntheticEvent) => {
	event.preventDefault();
};

export const getFollowResult = (
	response: FollowResponse | undefined,
	user: string,
	isFollow: boolean,
): FollowResult => {
	if (!response) {
		return {
			isSuccess: false,
			message: Description.someError,
		};
	}

	const { messages, resultCode } = response;

	const successMessage = `${
		isFollow ? Description.successFollow : Description.successUnFollow
	} ${user}`;

	const unSuccessMessage = `${isFollow ? Description.alreadyFollow : Description.alreadyUnFollow}`;

	if (resultCode === ReultCode.success) {
		return {
			isSuccess: true,
			message: successMessage,
		};
	}
	if (resultCode === ReultCode.error) {
		const message = messages.join();

		const errorMessage =
			message === ServerMessage.alreadyUnfollow || message === ServerMessage.alreadyFollow
				? unSuccessMessage
				: Description.someError;

		return {
			isSuccess: false,
			message: errorMessage,
		};
	}
	return {
		isSuccess: false,
		message: Description.someError,
	};
};

export function* idGenerator() {
	let id = 0;
	while (true) yield ++id;
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

export const searchParamsSerializer = (
	params: UsersRequestState,
): Record<string, string> | null => {
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
): Partial<UsersRequestState> | null => {
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
