import { BaseResponse } from '../types';

export interface LoginData {
	userId?: number;
}

type Login = Omit<BaseResponse, 'fieldsErrors'>;

export interface LoginResponse extends Login {
	data: LoginData;
}

export interface LoginResponseState {
	error: string;
	isNeedCaptcha: boolean;
	userId?: number;
}

export interface LogoutResponse extends BaseResponse {
	data: Record<string, string>;
}
