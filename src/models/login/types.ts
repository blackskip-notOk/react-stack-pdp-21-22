import { BaseResponse } from "../types";

export interface LoginData {
    userId: number
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

export interface LoginError {
    error?: string,
    isNeedCaptcha?: boolean,
};

export interface CaptchaUrlResponse {
    url: string,
};

export interface Owner {
    isOwner: boolean,
    ownerId: number | null,
};