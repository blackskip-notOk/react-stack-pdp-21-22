export const ApiName = {
	auth: 'authApi',
} as const;

const AUTH = 'auth';
const ME = 'me';
const LOGIN = 'login';
const LOGOUT = 'logout';
const SECURITY = 'security';
const CAPTCHA = 'get-captcha-url';
const PROFILE = 'profile';
const USERS = 'users';
const FOLLOW = 'follow';
const PHOTO = 'photo';
const STATUS = 'status';

export const API = {
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	singUp: 'https://social-network.samuraijs.com/signUp',
	baseWebSocketUrl: 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
	authMe: `${AUTH}/${ME}`,
	login: `${AUTH}/${LOGIN}`,
	logout: `${AUTH}/${LOGOUT}`,
	captchaUrl: `${SECURITY}/${CAPTCHA}`,
	profile: `${PROFILE}/{userId}`,
	users: `${USERS}`,
	follow: `${FOLLOW}/{userId}`,
	profilePhoto: `${PROFILE}/${PHOTO}`,
	getProfileStatus: `${PROFILE}/${STATUS}/{userId}`,
	setProfileStatus: `${PROFILE}/${STATUS}`,
} as const;
