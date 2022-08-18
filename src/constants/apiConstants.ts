export const ApiName = {
	appApi: 'appApi',
	auth: 'authApi',
	login: 'loginApi',
	captcha: 'captcha',
} as const;

const AUTH = 'auth';
const ME = 'me';
const LOGIN = 'login';
const logout = 'logout';
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
	withCredentials: 'withCredentials',
	apiKey: 'API-KEY',
	apiToken: 'a4af1902-25f0-4736-91b5-89fa2233a13d',
	testLogin: 'free@samuraijs.com',
	testPassword: 'free',
	authMe: `${AUTH}/${ME}`,
	login: `${AUTH}/${LOGIN}`,
	logout: `${AUTH}/${logout}`,
	captchaUrl: `${SECURITY}/${CAPTCHA}`,
	profile: `${PROFILE}/{userId}`,
	users: `${USERS}`,
	follow: `${FOLLOW}/{userId}`,
	profilePhoto: `${PROFILE}/${PHOTO}`,
	getProfileStatus: `${PROFILE}/${STATUS}/{userId}`,
	setProfileStatus: `${PROFILE}/${STATUS}`,
} as const;
