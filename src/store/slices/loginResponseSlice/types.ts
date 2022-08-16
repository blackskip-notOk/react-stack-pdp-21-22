import { BaseResponse } from '../types';

export interface LoginData {
	userId?: number;
}

type Login = Omit<BaseResponse, 'fieldsErrors'>;

export interface LoginResponse extends Login {
	data: LoginData;
}

export enum ErrorCode {
	wrongLogin = 'wrongLogin',
	maxAttempt = 'maxAttempt',
	unknown = 'unknown',
}

type Code = keyof typeof ErrorCode;
export interface LoginResponseState {
	error?: Code;
	isNeedCaptcha: boolean;
	userId?: number;
}

export interface LogoutResponse extends BaseResponse {
	data: Record<string, string>;
}
