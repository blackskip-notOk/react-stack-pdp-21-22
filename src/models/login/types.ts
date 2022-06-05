import { BaseResponse } from '../types';

export interface LoginData {
	userId?: number;
}

type Login = Omit<BaseResponse, 'fieldsErrors'>;

export interface TransformLoginResponse {
	data?: LoginData;
	error?: string;
	isNeedCaptcha?: boolean;
}

export type LoginError = Omit<TransformLoginResponse, 'data'>;

export type LoginSuccess = Pick<TransformLoginResponse, 'data'>;

export interface LoginResponse extends Login {
	data: LoginData;
}

export interface LoginFormData {
	email: string;
	password: string;
	rememberMe?: boolean;
	captcha?: string;
}

export interface CaptchaUrlResponse {
	url: string;
}

export interface LogoutResponse extends BaseResponse {
	data: Record<string, string>;
}
