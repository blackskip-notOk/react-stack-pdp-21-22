export const SINGUP = 'https://social-network.samuraijs.com/signUp';
const AUTH = 'auth';
const ME = 'me';
const LOGIN = 'login';
const LOGOUT = 'logout';
const SECURITY = 'security';
const CAPTCHA = 'get-captcha-url';
const PROFILE = 'profile';
const USERS = 'users';

export const API = {
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	authMe: `${AUTH}/${ME}`,
	login: `${AUTH}/${LOGIN}`,
	logout: `${AUTH}/${LOGOUT}`,
	captchaUrl: `${SECURITY}/${CAPTCHA}`,
	profile: `${PROFILE}/{userId}`,
	users: `${USERS}`,
};
