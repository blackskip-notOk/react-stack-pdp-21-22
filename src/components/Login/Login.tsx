import { useStore } from 'effector-react';
import { FC } from 'react';
import { SERVER_MESSAGES, SERVER_MESSAGES_DESCRIPTIONS } from '../../constants/serverMessages';
import { LoginForm } from './LoginForm/LoginForm';
import styles from './Login.module.less';
import { $auth } from '../../models/auth/index';
import { SINGUP } from '../../constants/apiConstants';
import { LoginProps } from './types';

export const Login: FC<LoginProps> = ({ setShowGreeting }) => {
	const { message, isAuth } = useStore($auth);

	const localMessage =
		message === SERVER_MESSAGES.NOT_AUTHORIZED
			? SERVER_MESSAGES_DESCRIPTIONS.notAutorized
			: message;

	return (
		<div className={styles.loginContainer}>
			{!isAuth && <div className={styles.autorizationError}>{localMessage}</div>}
			<LoginForm setShowGreeting={setShowGreeting} />
			<div className={styles.singupLinkContainer}>
				<a href={SINGUP} rel='noreferrer' target='blanc' className={styles.singupLink}>
					Зарегистироваться
				</a>
			</div>
		</div>
	);
};
