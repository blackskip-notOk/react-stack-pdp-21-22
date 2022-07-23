import { BaseResponse } from '../types';

export interface AuthData {
	id: number | null;
	email: string | null;
	login: string | null;
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
	authMessage: string | undefined;
	data: AuthData;
}
