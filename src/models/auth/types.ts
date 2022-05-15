import { BaseResponse } from '../types';

export interface Initialization {
	initialize: boolean;
}

interface AuthData {
	id: number;
	email: string;
	login: string;
}

export interface Auth extends BaseResponse {
	data: AuthData;
}

export interface AuthResponse {
	status: number;
	authInfo: Auth;
}

export interface AuthState {
	isAuth: boolean;
	message: string;
	ownerId?: number;
}
