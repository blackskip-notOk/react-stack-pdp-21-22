const AUTH = 'auth';
const ME = 'me';
const LOGIN = 'login';
const SECURITY = 'security';
const CAPTCHA = 'get-captcha-url';

export const API = {
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	authMe: `${AUTH}/${ME}`,
	login: `${AUTH}/${LOGIN}`,
	captchaUrl: `${SECURITY}/${CAPTCHA}`,
};
