export interface LoginRequestState {
	email: string;
	password: string;
	rememberMe?: boolean;
	captcha?: string;
}
