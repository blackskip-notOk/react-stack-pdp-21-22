export const RESPONSE_STATUSES = {
	success: 200,
	clientError: 404,
	serverError: 500,
};

export const RESULT_CODES = {
	success: 0,
	error: 1,
	secure: 10,
};

export const SESSION_STORAGE = {
	LOCATION: 'session_location',
	USERS_REQUEST_PARAMS: 'users_request_params',
};

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
	chat: 'chat',
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
