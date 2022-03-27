import { BaseResponse } from "../types";

export interface LoginData {
    userId: number | null
};

type Login = Omit<BaseResponse, 'fieldsErrors'>;

export interface LoginResponse extends Login {
    data: LoginData
};

export interface LoginFormData {
	email: string,
	password: string,
	rememberMe?: boolean,
	captcha?: string,
};

export interface TransformedLoginResponse {
    data?: LoginData,
    error?: string,
    isNeedCaptcha?: boolean,
};

export type LoginError = Omit<TransformedLoginResponse, 'data'>;

export interface CaptchaUrlResponse {
    url: string,
};

export interface Owner {
    isOwner: boolean,
    ownerId: number | null,
};