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
