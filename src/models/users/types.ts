import { Photos } from '../profile/types';

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
