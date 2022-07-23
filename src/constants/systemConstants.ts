export const Method = {
	get: 'GET',
	post: 'POST',
	put: 'PUT',
	delete: 'DELETE',
} as const;

export const SUCCESS_MESSAGE_DURATION = 5000;
export const ERROR_MESSAGE_DURATION = 5000;
export const MODAL_SHOW_DURATION = 500;

export enum CONNECTION_STATUS {
	pending = 'pending',
	ready = 'ready',
	error = 'error',
}

export enum EVENT {
	message = 'messages-received',
	status = 'status-changed',
}

export const Slice = {
	auth: 'auth',
	initialize: 'initialize',
	loginRequest: 'loginRequest',
	loginResponse: 'loginResponse',
	captcha: 'captcha',
	profile: 'profile',
	status: 'status',
	avatar: 'avatar',
	users: 'users',
	usersRequest: 'usersRequest',
	chat: 'chat',
} as const;

export const Tag = {
	auth: 'fetchAuth',
	captcha: 'fetchCaptcha',
	profile: 'fetchProfile',
	status: 'fechStatus',
} as const;

export const ResponseStatus = {
	success: 200,
	clientError: 404,
	serverError: 500,
} as const;

export const ReultCode = {
	success: 0,
	error: 1,
	secure: 10,
} as const;
