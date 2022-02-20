export interface LoginFormData {
	email: string,
	password: string,
	rememberMe?: boolean,
	captcha?: string,
};

export interface LoginFormResult {
    email: { value: string },
    password: { value: string },
    rememberMe: { checked: boolean },
    captcha?: { value?: string },
}