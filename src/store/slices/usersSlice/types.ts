import { Photos } from '../profileSlice/types';
import { BaseResponse } from '../types';

export type Friend = 'friends' | 'notFriends' | 'all';

export interface UsersRequestState {
	count: number;
	page: number;
	term?: string;
	friend?: boolean;
}

export interface User {
	name: string;
	id: number;
	photos: Photos;
	status?: string | null;
	followed: boolean;
}

export interface UsersState {
	items: Array<User>;
	totalCount: number;
	error: string | null;
}

type Follow = Omit<BaseResponse, 'fieldsErrors'>;

export interface FollowResponse extends Follow {
	data: Record<string, string>;
}

export interface FollowResult {
	isSuccess: boolean;
	message: string;
}
