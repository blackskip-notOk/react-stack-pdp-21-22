import { useStore } from 'effector-react';
import { FC } from 'react';
import { SERVER_MESSAGES, SERVER_MESSAGES_DESCRIPTIONS } from '../../constants/serverMessages';
import { $inizialize } from '../../effector/initialStore/InitialStore';
import { LoginForm } from './LoginForm/LoginForm';
import styles from './Login.module.css';

export const Login: FC = () => {

	const {message, inizialized} = useStore($inizialize);

	const localMessage = message === SERVER_MESSAGES.NOT_AUTHORIZED
	? SERVER_MESSAGES_DESCRIPTIONS.notAutorized : message;

	return (
		<div className={styles.loginContainer}>
			{!inizialized && <div className={styles.autorizationError}>{localMessage}</div>}
			<LoginForm />
		</div>
	);
};
