export enum APP_MESSAGES {
    NOT_ROOT = 'Failed to find the root element',
}


export enum SERVER_MESSAGES {
    NOT_AUTHORIZED = 'You are not authorized',
    WRONG_LOGIN = 'Incorrect Email or Password',
    MAX_ATTEMPT = 'Incorrect anti-bot symbols',
    AUTORIZATION_SUCCESS = 'Autorization success',
}

export const SERVER_MESSAGES_DESCRIPTIONS = {
    notAutorized: 'Вы не авторизованны, залогиньтесь или зарегистрируйтесь',
    wrongLogin: 'Неверный логин или пароль',
    maxAttempt: 'Превышено количество попыток',
    someError: 'Непредвиденная ошибка',
    autorized: 'Вы авторизованныб добро пожаловать',
}