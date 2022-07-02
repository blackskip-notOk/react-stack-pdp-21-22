import { BaseResponse } from '../types';

export interface LoginData {
	userId?: number;
}

type Login = Omit<BaseResponse, 'fieldsErrors'>;

export interface LoginResponse extends Login {
	data: LoginData;
}

// export type LoginError = Omit<TransformLoginResponse, 'data'>;

// export type LoginSuccess = Pick<TransformLoginResponse, 'data'>;

export interface LoginFormData {
	email: string;
	password: string;
	rememberMe?: boolean;
	captcha?: string;
}

// export interface LogoutResponse extends BaseResponse {
// 	data: Record<string, string>;
// }

export interface LoginState {
	data: LoginFormData;
	error?: string;
	isNeedCaptcha?: boolean;
	userId?: number;
	captchaUrl?: string;
}

export interface TransformLoginResponse {
	data?: LoginData;
	error?: string;
	isNeedCaptcha?: boolean;
}

export interface CaptchaUrlResponse {
	url: string;
}
