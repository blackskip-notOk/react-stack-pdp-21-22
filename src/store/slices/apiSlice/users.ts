import { API } from '~/constants/apiConstants';
import { Method } from '~/constants/systemConstants';
import { UserID } from '../profileSlice/types';
import { UsersRequestState } from '../usersSlice/types';

export const fetchUsersApi = {
	query: (requestParams: UsersRequestState) => ({
		url: API.users,
		params: { ...requestParams },
	}),
};

export const followUserApi = {
	query: (userId: UserID) => ({
		url: API.follow,
		method: Method.post,
		params: { userId },
	}),
};

export const unFollowUserApi = {
	query: (userId: UserID) => ({
		url: API.follow,
		method: Method.delete,
		params: { userId },
	}),
};
