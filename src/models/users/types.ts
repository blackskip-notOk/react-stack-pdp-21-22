import { Photos } from '../profile/types';
import { BaseResponse } from '../types';

export interface UsersRequest {
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

export interface UsersResponse {
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
