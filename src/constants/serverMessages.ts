export enum APP_MESSAGES {
	NOT_ROOT = 'Failed to find the root element',
}

export enum SERVER_MESSAGES {
	NOT_AUTHORIZED = 'You are not authorized',
	WRONG_LOGIN = 'Incorrect Email or Password',
	MAX_ATTEMPT = 'Incorrect anti-bot symbols',
	AUTORIZATION_SUCCESS = 'Autorization success',
	LOGOUT = 'You have logged out of your account',
	FAILED_INITIALIZATION = 'Initialization failed with error: ',
	ALREADY_FOLLOW = 'You are already following this user',
	ALREADY_UNFOLLOW = 'You are already unfollowed this user',
}

export const SERVER_MESSAGES_DESCRIPTIONS = {
	notAutorized: 'Вы не авторизованны, залогиньтесь или зарегистрируйтесь',
	wrongLogin: 'Неверный логин или пароль',
	maxAttempt: 'Превышено количество попыток',
	someError: 'Непредвиденная ошибка',
	autorized: 'Вы авторизованны, добро пожаловать',
	logout: 'Вы вышли из своего аккаунта',
	failedInitialization: 'При инициализации приложения возникла ошибка: ',
	alreadyFollow: 'Вы уже подписаны на этого пользователя',
	alreadyUnFollow: 'Вы уже отписаны от этого пользователя',
	successFollow: 'Вы успешно подписались на пользователя: ',
	successUnFollow: 'Вы успешно отписались от пользователя: ',
};

export const ServerMessage = {
	notAutorized: 'You are not authorized',
	wrongLogin: 'Incorrect Email or Password',
	maxAttemp: 'Incorrect anti-bot symbols',
	autorizationSiccess: 'Autorization success',
	logout: 'You have logged out of your account',
	initializationFailed: 'Initialization failed with error: ',
	alreadyFollow: 'You are already following this user',
	alreadyUnfollow: 'You are already unfollowed this user',
} as const;

export const Description = {
	failedInitialization: 'При инициализации приложения возникла ошибка: ',
	autorized: 'Вы авторизованны, добро пожаловать',
	someError: 'Непредвиденная ошибка',
	notAutorized: 'Вы не авторизованны, залогиньтесь или зарегистрируйтесь',

	wrongLogin: 'Неверный логин или пароль',
	maxAttempt: 'Превышено количество попыток',
	logout: 'Вы вышли из своего аккаунта',
	alreadyFollow: 'Вы уже подписаны на этого пользователя',
	alreadyUnFollow: 'Вы уже отписаны от этого пользователя',
	successFollow: 'Вы успешно подписались на пользователя: ',
	successUnFollow: 'Вы успешно отписались от пользователя: ',
} as const;
